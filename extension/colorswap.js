(function applyColorChannelSwap() {
    console.log("Applying color channel swap to elements...");
  
    const elements = document.querySelectorAll("img, video");
    elements.forEach((el) => {
      el.style.filter = "hue-rotate(180deg)";
    });
  })();
  