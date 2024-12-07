document.getElementById("open-webpage").addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:3000" });
});

document.getElementById("apply-filter").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        if (url.startsWith("http://") || url.startsWith("https://")) {
          chrome.scripting.executeScript(
            {
              target: { tabId: tabs[0].id },
              files: ["colorswap.js"],
            },
            () => {
              if (chrome.runtime.lastError) {
                console.error("Error injecting script:", chrome.runtime.lastError.message);
              } else {
                console.log("Script injected successfully!");
              }
            }
          );
        } else {
          console.error("Cannot run the script on this URL:", url);
        }
    });
      
});
  
  
  
  

document.getElementById("other-option").addEventListener("click", () => {
    alert("Another option clicked!");
});
