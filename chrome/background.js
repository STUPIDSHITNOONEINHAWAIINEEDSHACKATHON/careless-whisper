function sendMessage(tabId, url) {
  chrome.storage.sync.get('lovedOnesNumber', function(items) {
    var number = items.lovedOnesNumber;
    if (number) {
      var default_handler = number.length == 0;

      if (!default_handler) {
        console.log('number', number);
        console.log('url', url);
        chrome.storage.sync.remove(tabId);
      }
    }
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    var tabObject = {};
    tabObject[ tabId ] = tab.url;
    chrome.storage.sync.set(tabObject);
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  if (typeof tabId === 'number') {
    tabId = tabId.toString();
  }

  chrome.storage.sync.get(tabId, function(items) {
    if (items[ tabId ]) {
      sendMessage(tabId, items[ tabId ]);
    }
  });
});
