document.getElementById("open-webpage").addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:3000" });
  });
  
  document.getElementById("other-option").addEventListener("click", () => {
    alert("Another option clicked!");
  });
  