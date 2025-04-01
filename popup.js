const defaultSites = [
    "youtube.com",
    "tiktok.com",
    "vk.com",
    "reddit.com",
    "twitter.com",
    "x.com",
    "instagram.com",
    "pinterest.com",
    "facebook.com",
    "ok.ru",
    "twitch.tv",
    "netflix.com"
  ];
  
  let allSites = [];
  
  const siteList = document.getElementById("site-list");
  const addBtn = document.getElementById("add-site");
  const customSiteInput = document.getElementById("custom-site");
  
  // Рендерим список без чекбоксов
  function renderSites() {
    siteList.innerHTML = "";
    allSites.forEach(site => {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "space-between";
      wrapper.style.alignItems = "center";
      wrapper.style.marginBottom = "6px";
  
      const text = document.createElement("span");
      text.textContent = site;
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.style.background = "transparent";
      deleteBtn.style.border = "none";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.title = "Удалить сайт";
      deleteBtn.addEventListener("click", () => {
        allSites = allSites.filter(s => s !== site);
        chrome.storage.sync.set({ allSites: allSites });
        renderSites();
      });
  
      wrapper.appendChild(text);
      wrapper.appendChild(deleteBtn);
      siteList.appendChild(wrapper);
    });
  }
  
  // Загрузка сохранённых сайтов
  chrome.storage.sync.get("allSites", data => {
    allSites = data.allSites || [...defaultSites];
    chrome.storage.sync.set({ allSites: allSites }); // сразу обновим
    renderSites();
  });
  
  // Добавление нового сайта
  addBtn.addEventListener("click", () => {
    const newSite = customSiteInput.value.trim();
    if (newSite && !allSites.includes(newSite)) {
      allSites.push(newSite);
      chrome.storage.sync.set({ allSites: allSites });
      renderSites();
      customSiteInput.value = "";
    }
  });
  
  document.getElementById("disable-extension").addEventListener("click", () => {
    chrome.management.getSelf(ext => {
      chrome.management.setEnabled(ext.id, false);
    });
  });