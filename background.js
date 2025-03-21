// Handle icon clicks
browser.action.onClicked.addListener(async (tab) => {
  await browser.tabs.sendMessage(tab.id, {
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
}); 