(function initializeColorControl() {
    console.log("Initializing color control...");
  
    let effectEnabled = false;
    let panelVisible = false;
    const elements = document.querySelectorAll("img, video");
  

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
  
    panel.innerHTML = `
      <label>Contrast: <input type="range" id="contrast-slider" min="100" max="300" value="100"></label><br>
      <label>Saturation: <input type="range" id="saturation-slider" min="100" max="300" value="100"></label><br>
      <label>Hue Rotate: <input type="range" id="hue-slider" min="-180" max="180" value="0"></label><br>
      <button id="toggle-effect">Toggle Effect</button>
    `;
  
    document.body.appendChild(panel);
  
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
    const toggleButton = document.getElementById("toggle-effect");
  
    function applyEffect() {
      const contrast = contrastSlider.value;
      const saturation = saturationSlider.value;
      const hue = hueSlider.value;
  
      elements.forEach((el) => {
        el.style.filter = `contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`;
      });
    }
  
    function resetEffect() {
      elements.forEach((el) => {
        el.style.filter = "none";
      });
    }
  
    toggleButton.addEventListener("click", () => {
      effectEnabled = !effectEnabled;
      if (effectEnabled) {
        console.log("Effect enabled.");
        applyEffect();
      } else {
        console.log("Effect disabled.");
        resetEffect();
      }
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
