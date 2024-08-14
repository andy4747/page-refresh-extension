let refreshIntervalId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }

    refreshIntervalId = setInterval(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    }, request.interval * 1000);

    sendResponse({ success: true });
  } else if (request.action === "stop") {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      refreshIntervalId = null;
    }
    sendResponse({ success: true });
  } else if (request.action === "getStatus") {
    sendResponse({ isRunning: refreshIntervalId !== null });
  }
});
