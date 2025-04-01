chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) return;

  chrome.storage.sync.get("allSites", (data) => {
    let blockedSites = data.allSites || [];

    if (!Array.isArray(blockedSites) || blockedSites.length === 0) {
      console.log("Список пуст, ничего не блокируем");
      return;
    }

    const url = tab.url.toLowerCase();

    const shouldBlock = blockedSites.some(site =>
      site && typeof site === "string" && url.includes(site.toLowerCase())
    );

    if (shouldBlock) {
      console.log("БЛОКИРУЕМ САЙТ:", url);
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
      });
    } else {
      console.log("Сайт разрешён:", url);
    }
  });
});
