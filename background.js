function getPatterns() {
  return new Promise((resolve) => {
    browser.storage.local.get('patterns').then(async (result) => {
      if (!result.patterns) {
        await browser.storage.sync.set({ patterns: [] });
        resolve([]);
      } else {
        resolve(result.patterns);
      }
    });
  });
}

// Initialize patterns
let patterns;
getPatterns().then(result => {
  patterns = result;
});

// Handle icon clicks
browser.action.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, {
    action: 'toggleLock'
  });
});

// Handle messages from content script
browser.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'setIcon') {
    return browser.action.setIcon({
      tabId: sender.tab.id,
      path: message.icon
    }).catch(error => {
      console.error('Error setting icon:', error);
      throw error;
    });
  }
  if (message.action === 'getPatterns') {
    return Promise.resolve(patterns);
  }
}); 

// Update patterns when they change
browser.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.patterns) {
    getPatterns().then((patterns) => {
      console.log('Patterns updated:', patterns);
    });
  }
});

// Create a menu item to lock tabs
browser.menus.create({
  id: "toggle-lock",
  contexts: ['tab', 'action'],
  command: "_execute_action",
  title: "Lock tab"
});

// Create button to access the settings menu
browser.menus.create({
  id: "tabguard-settings",
  contexts: ['action'],
  title: "Open settings"
});
browser.menus.onClicked.addListener((info) => {
  if (info.menuItemId === "tabguard-settings") {
    browser.runtime.openOptionsPage();
  }
});
