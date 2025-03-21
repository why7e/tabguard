(function() {
  // Got some unmatchable pattern from SO for now
  const pattern = /a\bc/;
  // const pattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=.*$/;
  let locked = false;

  function lockIcon() {
    browser.runtime.sendMessage({
      action: 'setIcon',
      icon: 'icons/lock.svg'
    });
  }

  function unlockIcon() {
    browser.runtime.sendMessage({
      action: 'setIcon',
      icon: 'icons/unlock.svg'
    });
  }

  function checkAndUpdateState() {
    const patternMatch = pattern.test(window.location.href);
    if (patternMatch !== locked) {
      toggleLock();
    }
  }

  function lockTab() {
    lockIcon();
    locked = true;
    window.addEventListener('beforeunload', lockHandler);
  }

  function unlockTab() {
    unlockIcon();
    locked = false;
    window.removeEventListener('beforeunload', lockHandler);
  }

  // Separate the event handler function so we can add/remove it
  function lockHandler(e) {
    const message = 'Are you sure you want to leave this page?';

    // Legacy: https://developer.mozilla.org/en-US/docs/Web/API/BeforeUnloadEvent/returnValue#browser_compatibility
    e.returnValue = message;

    // Prevent the default behavior
    e.preventDefault();
    return message;
  }

  function toggleLock() {
    console.log('toggling');
    if (locked) {
      unlockTab();
    } else {
      lockTab();
    }
  }

  //////////////////////////////
  // On load
  //////////////////////////////

  checkAndUpdateState();

  // Listen for changes in URL
  // This fixed issues with single page apps that have persistent DOM elements
  window.addEventListener('popstate', checkAndUpdateState);

  // Listen for when the extension icon is clicked
  browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggleLock') {
      toggleLock();
    }
  });
})();