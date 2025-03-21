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

// Initialize patterns
let patterns;
getPatterns().then(result => {
  patterns = result;
});

