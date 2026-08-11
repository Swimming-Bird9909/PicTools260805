/* ============================================
   Tool Page - Universal tool UI controller
   Each tool page initializes with its own config
   ============================================ */

class ToolPage {
  constructor(config) {
    this.config = {
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
    this.previewTimer = null;
    this.init();
  }

  get lang() {
    return (window.I18N && window.I18N.lang) || 'en';
  }

  tr(key, en, vars) {
    return (window.I18N ? window.I18N.t(key, en, vars) : en);
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.renderPresets();
    this.updateDimensionInputs();
    window.addEventListener('imagefitly:lang', () => this.refreshI18n());
  }

  cacheElements() {
    this.dropzone = document.getElementById("dropzone");
    this.fileInput = document.getElementById("fileInput");
    this.editor = document.getElementById("editor");
    this.previewImg = document.getElementById("previewImg");
    this.previewCanvasBox = document.getElementById("previewCanvasBox");
    this.previewBadge = document.getElementById("previewBadge");
    this.previewZoom = document.getElementById("previewZoom");
    this.replaceLink = document.getElementById("replaceLink");
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
      this.schedulePreview();
    });
    this.heightInput.addEventListener("input", () => {
      this.state.height = parseInt(this.heightInput.value) || 1;
      this.schedulePreview();
    });
    this.fitSelect.addEventListener("change", () => {
      this.state.fit = this.fitSelect.value;
      this.schedulePreview();
    });
    this.bgColorInput.addEventListener("input", () => {
      this.state.bgColor = this.bgColorInput.value;
      this.schedulePreview();
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

    // Click the preview image to replace it with another file
    if (this.previewCanvasBox) {
      this.previewCanvasBox.addEventListener("click", () => this.openFilePicker());
    }
    // Persistent "click image to replace" link below the preview
    if (this.replaceLink) {
      this.replaceLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openFilePicker();
      });
    }
  }

  renderPresets() {
    const lang = this.lang;
    this.presetGrid.innerHTML = "";
    this.config.presets.forEach((p, i) => {
      const btn = document.createElement("button");
      btn.className = "preset-btn" + (i === this.state.selectedPreset ? " active" : "");
      const label = (lang === 'zh' && p.labelZh) ? p.labelZh : p.label;
      btn.innerHTML = `${label}${p.w ? `<small>${p.w}×${p.h}px</small>` : "<small>Keep original</small>"}`;
      if (p.labelZh) {
        btn.setAttribute('data-en', p.label);
        btn.setAttribute('data-zh', p.labelZh);
      }
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
    this.schedulePreview();
  }

  updateDimensionInputs() {
    this.widthInput.value = this.state.width;
    this.heightInput.value = this.state.height;
    this.fitSelect.value = this.state.fit;
    this.qualityInput.value = this.state.quality;
    this.qualityVal.textContent = Math.round(this.state.quality * 100) + "%";
  }

  openFilePicker() {
    if (!this.fileInput) return;
    this.fileInput.value = ""; // allow re-selecting the same file
    this.fileInput.click();
  }

  async handleFile(file) {
    if (!file) return;
    if (file.size > this.config.maxFileSizeMB * 1024 * 1024) {
      showToast(this.tr('tool.fileTooLarge', `File too large. Max ${this.config.maxFileSizeMB}MB.`, { max: this.config.maxFileSizeMB }), "error");
      return;
    }
    try {
      const { img, file: f } = await ImageEngine.loadFile(file);
      this.state.img = img;
      this.state.file = f;
      this.output = null;
      this.previewImg.src = img.src;
      this.updatePreviewDisplay(img.naturalWidth || img.width, img.naturalHeight || img.height, "Original");
      this.fileInfo.textContent = `${f.name} \u2022 ${ImageEngine.formatBytes(f.size)} \u2022 ${img.width}\u00d7${img.height}px`;
      this.dropzone.style.display = "none";
      this.editor.classList.add("active");
      // Auto-preview with default preset
      this.schedulePreview();
    } catch (e) {
      showToast(e.message, "error");
    }
  }

  schedulePreview() {
    if (this.previewTimer) clearTimeout(this.previewTimer);
    this.previewTimer = setTimeout(() => this.livePreview(), 120);
  }

  livePreview() {
    if (!this.state.img) return;
    try {
      const canvas = ImageEngine.resize(this.state.img, {
        width: this.state.width,
        height: this.state.height,
        fit: this.state.fit,
        background: this.state.bgColor,
      });
      this.previewImg.src = canvas.toDataURL("image/png");
      this.updatePreviewDisplay(canvas.width, canvas.height);
    } catch (e) {
      console.error("Preview error:", e);
    }
  }

  updatePreviewDisplay(w, h, label) {
    if (!w || !h) {
      this.previewBadge.textContent = this.tr('tool.previewPlaceholder', 'Upload an image to preview');
      this.previewZoom.textContent = "";
      this.previewImg.style.width = "";
      this.previewImg.style.height = "";
      this.previewCanvasBox.style.width = "";
      this.previewCanvasBox.style.height = "";
      return;
    }

    // Compute scale based on this tool's largest preset so size differences feel real
    const presetSizes = this.config.presets
      .map((p) => Math.max(p.w || 0, p.h || 0))
      .filter((s) => s > 0);
    const maxPreset = presetSizes.length > 0 ? Math.max(...presetSizes) : 2000;
    const BASE_DISPLAY = 300; // largest preset shows at 300px
    let scale = BASE_DISPLAY / maxPreset;

    // For original-size preview (no preset match), cap so it doesn't dwarf everything
    const rawMax = this.state.img ? Math.max(this.state.img.width, this.state.img.height) : maxPreset;
    if (rawMax > maxPreset * 1.5) {
      scale = BASE_DISPLAY / rawMax;
    }

    let displayW = Math.round(w * scale);
    let displayH = Math.round(h * scale);

    // Ensure minimum visibility
    const MIN_DISPLAY = 50;
    if (displayW < MIN_DISPLAY || displayH < MIN_DISPLAY) {
      const minScale = MIN_DISPLAY / Math.min(w, h);
      displayW = Math.round(w * minScale);
      displayH = Math.round(h * minScale);
    }

    // Apply size to both img and its container for crisp border
    this.previewImg.style.width = displayW + "px";
    this.previewImg.style.height = displayH + "px";
    this.previewCanvasBox.style.width = displayW + "px";
    this.previewCanvasBox.style.height = displayH + "px";

    let displayLabel = label;
    if (label && this.lang === 'zh') {
      if (label === 'Original') displayLabel = this.tr('tool.origLabel', 'Original');
      else if (label === 'Output') displayLabel = this.tr('tool.outputLabel', 'Output');
      else if (label === 'Background Removed') displayLabel = this.tr('tool.bgRemovedLabel', 'Background Removed');
    }
    const badgeText = displayLabel ? `${displayLabel}: ${w}\u00d7${h}px` : `${w}\u00d7${h}px`;
    this.previewBadge.textContent = badgeText;

    const pct = Math.round(scale * 100);
    this.previewZoom.textContent = pct < 100 ? `Preview at ${pct}%` : "";
  }

  async   process() {
    if (!this.state.img) return;
    this.processBtn.disabled = true;
    this.processBtn.textContent = this.tr('tool.processing', 'Processing...');
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
      this.updatePreviewDisplay(canvas.width, canvas.height, "Output");
      this.fileInfo.textContent = `Output: ${ImageEngine.formatBytes(blob.size)} \u2022 ${this.state.width}\u00d7${this.state.height}px \u2022 ${this.state.format.split("/")[1].toUpperCase()}`;
      this.downloadBtn.disabled = false;
      showToast(this.tr('tool.processed', 'Processed! Click Download to save.'), "success");
    } catch (e) {
      showToast(this.tr('tool.processFailed', 'Process failed: ') + e.message, "error");
    } finally {
      this.processBtn.disabled = false;
      this.processBtn.textContent = this.tr('tool.apply', 'Apply Changes');
    }
  }

  download() {
    if (!this.output) return;
    const ext = this.state.format.split("/")[1];
    const baseName = (this.state.file?.name || "image").replace(/\.[^.]+$/, "");
    const filename = `${baseName}_${this.state.width}x${this.state.height}.${ext}`;
    ImageEngine.download(this.output.blob, filename);
    showToast(this.tr('tool.downloaded', 'Downloaded!'), "success");
  }

  reset() {
    this.state.img = null;
    this.state.file = null;
    this.output = null;
    this.fileInput.value = "";
    this.previewImg.src = "";
    this.previewImg.style.width = "";
    this.previewImg.style.height = "";
    this.previewCanvasBox.style.width = "";
    this.previewCanvasBox.style.height = "";
    this.previewBadge.textContent = this.tr('tool.previewPlaceholder', 'Upload an image to preview');
    this.previewZoom.textContent = "";
    this.dropzone.style.display = "";
    this.editor.classList.remove("active");
    this.downloadBtn.disabled = true;
    this.fileInfo.textContent = "";
  }

  refreshI18n() {
    this.renderPresets();
    if (this.processBtn) this.processBtn.textContent = this.tr('tool.apply', 'Apply Changes');
    if (this.downloadBtn) this.downloadBtn.textContent = this.tr('tool.download', 'Download');
    if (this.resetBtn) this.resetBtn.textContent = this.tr('tool.uploadNew', 'Upload New');
    if (this.bgRemoveBtn && !this.bgRemoveBtn.disabled) this.bgRemoveBtn.textContent = this.tr('tool.bgRemove', 'AI Remove Background');
    if (!this.state.img) {
      this.previewBadge.textContent = this.tr('tool.previewPlaceholder', 'Upload an image to preview');
    }
  }

  async runBgRemoval() {
    if (!this.state.img) {
      showToast(this.tr('tool.uploadFirst', 'Upload an image first.'), "error");
      return;
    }
    this.bgRemoveBtn.disabled = true;
    this.bgRemoveBtn.textContent = this.tr('tool.loadingModel', 'Loading AI model...');
    try {
      const out = await ImageEngine.removeBackground(this.state.img, (p) => {
        this.bgRemoveBtn.textContent = `${this.tr('tool.processing', 'Processing')} ${Math.round(p * 100)}%`;
      });
      this.state.img = out;
      this.previewImg.src = out.src;
      this.updatePreviewDisplay(out.width, out.height, "Background Removed");
      this.fileInfo.textContent = `Background removed \u2022 ${out.width}\u00d7${out.height}px`;
      this.dropzone.style.display = "none";
      this.editor.classList.add("active");
      showToast(this.tr('tool.bgDone', 'Background removed! You can now resize or download.'), "success");
    } catch (e) {
      showToast(this.tr('tool.bgFailed', 'BG removal failed. Try a smaller image.'), "error");
      console.error(e);
    } finally {
      this.bgRemoveBtn.disabled = false;
      this.bgRemoveBtn.textContent = this.tr('tool.bgRemove', 'AI Remove Background');
    }
  }
}
