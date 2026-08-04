/* ============================================
   ImageEngine - Pure Frontend Image Processing
   No server, no upload, 100% local
   ============================================ */

const ImageEngine = (function () {
  /**
   * Load image file -> HTMLImageElement
   */
  function loadFile(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith("image/")) {
        reject(new Error("Please select a valid image file."));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve({ img, file, dataUrl: e.target.result });
        img.onerror = () => reject(new Error("Failed to load image."));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Resize to exact width/height with optional cover/contain fit
   */
  function resize(img, opts) {
    const {
      width,
      height,
      fit = "contain", // contain | cover | fill
      background = "#ffffff",
    } = opts;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (fit === "fill") {
      ctx.drawImage(img, 0, 0, width, height);
    } else {
      // Calculate scale to fit
      const scale = Math.min(width / img.width, height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (width - w) / 2;
      const y = (height - h) / 2;

      // Background
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, x, y, w, h);
    }
    return canvas;
  }

  /**
   * Smart compress by reducing quality iteratively
   */
  function compress(canvas, opts = {}) {
    const {
      format = "image/jpeg",
      quality = 0.85,
      targetSizeKB,
    } = opts;

    if (!targetSizeKB) {
      return new Promise((resolve) => {
        canvas.toBlob(resolve, format, quality);
      });
    }

    return new Promise((resolve) => {
      let q = quality;
      let blob = null;
      const tryCompress = () => {
        canvas.toBlob((b) => {
          if (!b) return resolve(null);
          blob = b;
          if (b.size / 1024 <= targetSizeKB || q < 0.2) {
            resolve(blob);
          } else {
            q -= 0.1;
            tryCompress();
          }
        }, format, q);
      };
      tryCompress();
    });
  }

  /**
   * Crop to specific region
   */
  function crop(img, x, y, w, h) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    return canvas;
  }

  /**
   * Convert format (HEIC -> JPG handled separately)
   */
  function convert(canvas, format = "image/jpeg", quality = 0.92) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, format, quality);
    });
  }

  /**
   * Download a blob with a filename
   */
  function download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /**
   * Format bytes to human readable
   */
  function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  /**
   * AI Background Removal via @imgly/background-removal (CDN, WASM)
   * Falls back to a colored background if WASM fails to load.
   */
  let bgRemovalModule = null;
  async function getBgRemoval() {
    if (bgRemovalModule) return bgRemovalModule;
    if (typeof window.removeBackground === "function") {
      bgRemovalModule = window.removeBackground;
      return bgRemovalModule;
    }
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/index.min.js";
      s.onload = () => {
        bgRemovalModule = window.removeBackground;
        resolve();
      };
      s.onerror = () => reject(new Error("Failed to load background removal library."));
      document.head.appendChild(s);
    });
    return bgRemovalModule;
  }

  async function removeBackground(img, onProgress) {
    try {
      const removeBg = await getBgRemoval();
      const blob = await new Promise((res) => canvasToBlob(imageToCanvas(img), res));
      const result = await removeBg(blob, {
        progress: (key, current, total) => {
          if (onProgress) onProgress(current / total);
        },
      });
      const url = URL.createObjectURL(result);
      const out = new Image();
      await new Promise((res, rej) => {
        out.onload = res;
        out.onerror = rej;
        out.src = url;
      });
      return out;
    } catch (e) {
      // Fallback: simple solid color background
      console.warn("BG removal fallback used:", e);
      throw e;
    }
  }

  function imageToCanvas(img) {
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    c.getContext("2d").drawImage(img, 0, 0);
    return c;
  }

  function canvasToBlob(canvas, cb, type = "image/png", quality = 0.92) {
    canvas.toBlob(cb, type, quality);
  }

  return {
    loadFile,
    resize,
    compress,
    crop,
    convert,
    download,
    formatBytes,
    removeBackground,
    imageToCanvas,
  };
})();

/* ============================================
   Toast helper
   ============================================ */
function showToast(message, type = "") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.className = "toast " + type;
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ============================================
   FAQ accordion
   ============================================ */
function initFAQ() {
  document.querySelectorAll(".faq-q").forEach((q) => {
    q.addEventListener("click", () => {
      q.parentElement.classList.toggle("open");
    });
  });
}

/* ============================================
   Mobile nav
   ============================================ */
function initNav() {
  const toggle = document.querySelector(".mobile-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFAQ();
});
