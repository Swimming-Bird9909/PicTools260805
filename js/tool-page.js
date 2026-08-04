/* ============================================
   Tool Page - Universal tool UI controller
   Each tool page initializes with its own config
   ============================================ */

class ToolPage {
  constructor(config) {
    this.config = {
      // Default presets (can be overridden)
      presets: [
        { label: "Original", w: null, h: null, fit: "contain" },
      ],
      defaultPreset: 0,
      defaultFormat: "image/jpeg",
      defaultQuality: 0.92,
      maxFileSizeMB: 20,
      showBackgroundRemover: false,
      ...config,
    };
    this.state = {
      img: null,
      file: null,
      selectedPreset: this.config.defaultPreset,
      width: this.config.presets[this.config.defaultPreset]?.w || 1000,
      height: this.config.presets[this.config.defaultPreset]?.h || 1000,
      fit: this.config.presets[this.config.defaultPreset]?.fit || "contain",
      quality: this.config.defaultQuality,
      format: this.config.defaultFormat,
      bgColor: "#ffffff",
    };
    this.output = null;
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.renderPresets();
    this.updateDimensionInputs();
  }

  cacheElements() {
    this.dropzone = document.getElementById("dropzone");
    this.fileInput = document.getElementById("fileInput");
    this.editor = document.getElementById("editor");
    this.previewImg = document.getElementById("previewImg");
    this.presetGrid = document.getElementById("presetGrid");
    this.widthInput = document.getElementById("widthInput");
    this.heightInput = document.getElementById("heightInput");
    this.fitSelect = document.getElementById("fitSelect");
    this.bgColorInput = document.getElementById("bgColor");
    this.qualityInput = document.getElementById("quality");
    this.qualityVal = document.getElementById("qualityVal");
    this.formatSelect = document.getElementById("formatSelect");
    this.processBtn = document.getElementById("processBtn");
    this.downloadBtn = document.getElementById("downloadBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.fileInfo = document.getElementById("fileInfo");
    this.bgRemoveBtn = document.getElementById("bgRemoveBtn");
  }

  bindEvents() {
    this.fileInput.addEventListener("change", (e) => this.handleFile(e.target.files[0]));

    ["dragover", "dragenter"].forEach((ev) => {
      this.dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        this.dropzone.classList.add("drag-over");
      });
    });
    ["dragleave", "drop"].forEach((ev) => {
      this.dropzone.addEventListener(ev, (e) => {
        e.preventDefault();
        this.dropzone.classList.remove("drag-over");
      });
    });
    this.dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) this.handleFile(file);
    });

    this.widthInput.addEventListener("input", () => {
      this.state.width = parseInt(this.widthInput.value) || 1;
    });
    this.heightInput.addEventListener("input", () => {
      this.state.height = parseInt(this.heightInput.value) || 1;
    });
    this.fitSelect.addEventListener("change", () => {
      this.state.fit = this.fitSelect.value;
    });
    this.bgColorInput.addEventListener("input", () => {
      this.state.bgColor = this.bgColorInput.value;
    });
    this.qualityInput.addEventListener("input", () => {
      this.state.quality = parseFloat(this.qualityInput.value);
      this.qualityVal.textContent = Math.round(this.state.quality * 100) + "%";
    });
    this.formatSelect.addEventListener("change", () => {
      this.state.format = this.formatSelect.value;
    });

    this.processBtn.addEventListener("click", () => this.process());
    this.downloadBtn.addEventListener("click", () => this.download());
    this.resetBtn.addEventListener("click", () => this.reset());

    if (this.bgRemoveBtn) {
      this.bgRemoveBtn.addEventListener("click", () => this.runBgRemoval());
    }
  }

  renderPresets() {
    this.presetGrid.innerHTML = "";
    this.config.presets.forEach((p, i) => {
      const btn = document.createElement("button");
      btn.className = "preset-btn" + (i === this.state.selectedPreset ? " active" : "");
      btn.innerHTML = `${p.label}${p.w ? `<small>${p.w}×${p.h}px</small>` : "<small>Keep original</small>"}`;
      btn.addEventListener("click", () => this.selectPreset(i));
      this.presetGrid.appendChild(btn);
    });
  }

  selectPreset(i) {
    this.state.selectedPreset = i;
    const p = this.config.presets[i];
    if (p.w) {
      this.state.width = p.w;
      this.state.height = p.h;
    }
    this.state.fit = p.fit || "contain";
    this.updateDimensionInputs();
    this.renderPresets();
  }

  updateDimensionInputs() {
    this.widthInput.value = this.state.width;
    this.heightInput.value = this.state.height;
    this.fitSelect.value = this.state.fit;
    this.qualityInput.value = this.state.quality;
    this.qualityVal.textContent = Math.round(this.state.quality * 100) + "%";
  }

  async handleFile(file) {
    if (!file) return;
    if (file.size > this.config.maxFileSizeMB * 1024 * 1024) {
      showToast(`File too large. Max ${this.config.maxFileSizeMB}MB.`, "error");
      return;
    }
    try {
      const { img, file: f } = await ImageEngine.loadFile(file);
      this.state.img = img;
      this.state.file = f;
      this.previewImg.src = img.src;
      this.fileInfo.textContent = `${f.name} • ${ImageEngine.formatBytes(f.size)} • ${img.width}×${img.height}px`;
      this.dropzone.style.display = "none";
      this.editor.classList.add("active");
      // Auto-process
      await this.process();
    } catch (e) {
      showToast(e.message, "error");
    }
  }

  async process() {
    if (!this.state.img) return;
    this.processBtn.disabled = true;
    this.processBtn.textContent = "Processing...";
    try {
      const canvas = ImageEngine.resize(this.state.img, {
        width: this.state.width,
        height: this.state.height,
        fit: this.state.fit,
        background: this.state.bgColor,
      });
      const blob = await ImageEngine.compress(canvas, {
        format: this.state.format,
        quality: this.state.quality,
      });
      this.output = { canvas, blob };
      const url = URL.createObjectURL(blob);
      this.previewImg.src = url;
      this.fileInfo.textContent = `Output: ${ImageEngine.formatBytes(blob.size)} • ${this.state.width}×${this.state.height}px • ${this.state.format.split("/")[1].toUpperCase()}`;
      this.downloadBtn.disabled = false;
    } catch (e) {
      showToast("Process failed: " + e.message, "error");
    } finally {
      this.processBtn.disabled = false;
      this.processBtn.textContent = "Apply Changes";
    }
  }

  download() {
    if (!this.output) return;
    const ext = this.state.format.split("/")[1];
    const baseName = (this.state.file?.name || "image").replace(/\.[^.]+$/, "");
    const filename = `${baseName}_${this.state.width}x${this.state.height}.${ext}`;
    ImageEngine.download(this.output.blob, filename);
    showToast("Downloaded!", "success");
  }

  reset() {
    this.state.img = null;
    this.state.file = null;
    this.output = null;
    this.fileInput.value = "";
    this.previewImg.src = "";
    this.dropzone.style.display = "";
    this.editor.classList.remove("active");
    this.downloadBtn.disabled = true;
    this.fileInfo.textContent = "";
  }

  async runBgRemoval() {
    if (!this.state.img) {
      showToast("Upload an image first.", "error");
      return;
    }
    this.bgRemoveBtn.disabled = true;
    this.bgRemoveBtn.textContent = "Loading AI model...";
    try {
      const out = await ImageEngine.removeBackground(this.state.img, (p) => {
        this.bgRemoveBtn.textContent = `Processing ${Math.round(p * 100)}%`;
      });
      this.state.img = out;
      this.previewImg.src = out.src;
      this.fileInfo.textContent = `Background removed • ${out.width}×${out.height}px`;
      this.dropzone.style.display = "none";
      this.editor.classList.add("active");
      showToast("Background removed! You can now resize or download.", "success");
    } catch (e) {
      showToast("BG removal failed. Try a smaller image.", "error");
      console.error(e);
    } finally {
      this.bgRemoveBtn.disabled = false;
      this.bgRemoveBtn.textContent = "AI Remove Background";
    }
  }
}
