(function initializeColorControl() {
    console.log("Initializing color control...");

    let effectEnabled = false;
    let panelVisible = false;
    const elements = document.querySelectorAll("img, video");
  
    // Control panel
    const panel = document.createElement("div");
    panel.id = "color-control-panel";
    panel.style.position = "fixed";
    panel.style.top = "10px";
    panel.style.right = "10px";
    panel.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    panel.style.color = "white";
    panel.style.padding = "15px";
    panel.style.borderRadius = "10px";
    panel.style.zIndex = "10000";
    panel.style.display = "none"; // hidden

    // Sliders and Buttons
    panel.innerHTML = `
      <label>Contrast: <input type="range" id="contrast-slider" min="100" max="300" value="100" step="25"></label><br>
      <label>Saturation: <input type="range" id="saturation-slider" min="100" max="300" value="100" step="25"></label><br>
      <label>Hue Rotate: <input type="range" id="hue-slider" min="-180" max="180" value="0" step="20"></label><br>
      <label>Protanopia: <input type="range" id="protanopia-slider" min="0" max="2" value="0" step="1"></label><br>
      <label>Deuteranopia: <input type="range" id="deuteranopia-slider" min="0" max="2" value="0" step="1"></label><br>
      <label>Tritanopia: <input type="range" id="tritanopia-slider" min="0" max="2" value="0" step="1"></label><br>
      <button id="toggle-effect">Toggle Effect</button>
      <button id="reset-button">Reset</button>
    `;

    document.body.appendChild(panel);

    // popUpButton
    const popupButton = document.createElement("button");
    popupButton.id = "toggle-panel";
    popupButton.innerText = "Show/Hide Settings Panel";
    popupButton.style.position = "fixed";
    popupButton.style.bottom = "10px";
    popupButton.style.right = "10px";
    popupButton.style.padding = "10px 15px";
    popupButton.style.backgroundColor = "black";
    popupButton.style.color = "white";
    popupButton.style.border = "none";
    popupButton.style.borderRadius = "5px";
    popupButton.style.cursor = "pointer";
    popupButton.style.zIndex = "10001";

    document.body.appendChild(popupButton);

    const contrastSlider = document.getElementById("contrast-slider");
    const saturationSlider = document.getElementById("saturation-slider");
    const hueSlider = document.getElementById("hue-slider");
    const protanopiaSlider = document.getElementById("protanopia-slider");
    const deuteranopiaSlider = document.getElementById("deuteranopia-slider");
    const tritanopiaSlider = document.getElementById("tritanopia-slider");
    const toggleButton = document.getElementById("toggle-effect");
    const resetButton = document.getElementById("reset-button");

    // Color Vision Deficient Corrective Presets
    const cvdSettings = {
      protanopia: [
        { contrast: 125, saturation: 150, hue: 20 }, // mild
        { contrast: 150, saturation: 175, hue: 40 }, // moderate
        { contrast: 200, saturation: 200, hue: 60 }, // severe
      ],
      deuteranopia: [
        { contrast: 125, saturation: 150, hue: -20 }, // mild
        { contrast: 150, saturation: 175, hue: -40 }, // moderate
        { contrast: 200, saturation: 200, hue: -60 }, // severe
      ],
      tritanopia: [
        { contrast: 125, saturation: 150, hue: 100 }, // mild
        { contrast: 150, saturation: 175, hue: 120 }, // moderate
        { contrast: 200, saturation: 200, hue: 140 }, // severe
      ],
    };

    function applyEffect() {
      const contrast = contrastSlider.value;
      const saturation = saturationSlider.value;
      const hue = hueSlider.value;

      elements.forEach((el) => {
        el.style.filter = `contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`;
      });
    }

    function updateSettings(contrast, saturation, hue) {
      contrastSlider.value = contrast;
      saturationSlider.value = saturation;
      hueSlider.value = hue;
      if (effectEnabled) applyEffect();
    }

    toggleButton.addEventListener("click", () => {
      effectEnabled = !effectEnabled;
      if (effectEnabled) {
        console.log("Effect enabled.");
        applyEffect();
      } else {
        console.log("Effect disabled.");
        elements.forEach((el) => {
          el.style.filter = "none";
        });
      }
    });

    protanopiaSlider.addEventListener("input", () => {
      const level = protanopiaSlider.value;
      const settings = cvdSettings.protanopia[level];
      updateSettings(settings.contrast, settings.saturation, settings.hue);
    });

    deuteranopiaSlider.addEventListener("input", () => {
      const level = deuteranopiaSlider.value;
      const settings = cvdSettings.deuteranopia[level];
      updateSettings(settings.contrast, settings.saturation, settings.hue);
    });

    tritanopiaSlider.addEventListener("input", () => {
      const level = tritanopiaSlider.value;
      const settings = cvdSettings.tritanopia[level];
      updateSettings(settings.contrast, settings.saturation, settings.hue);
    });

    resetButton.addEventListener("click", () => {
      contrastSlider.value = "100";
      saturationSlider.value = "100";
      hueSlider.value = "0";
      protanopiaSlider.value = "0";
      deuteranopiaSlider.value = "0";
      tritanopiaSlider.value = "0";
      if (effectEnabled) {
        elements.forEach((el) => {
          el.style.filter = "none";
        });
      }
      console.log("Reset to default settings.");
    });

    contrastSlider.addEventListener("input", () => {
      if (effectEnabled) applyEffect();
    });

    saturationSlider.addEventListener("input", () => {
      if (effectEnabled) applyEffect();
    });

    hueSlider.addEventListener("input", () => {
      if (effectEnabled) applyEffect();
    });

    popupButton.addEventListener("click", () => {
      panelVisible = !panelVisible;
      panel.style.display = panelVisible ? "block" : "none";
      console.log(panelVisible ? "Settings panel shown." : "Settings panel hidden.");
    });
})();
