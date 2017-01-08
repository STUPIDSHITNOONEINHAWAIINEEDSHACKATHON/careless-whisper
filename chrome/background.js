var API_ENDPOINT = "https://zorc2ihpm1.execute-api.us-east-1.amazonaws.com/dev/api/sendText";

function sendMessage(tabId, url) {
  chrome.storage.sync.get(null, function(items) {
    var number = items.lovedOnesNumber;
    var nastyStorage = items[ tabId ];
    if (number && number.length > 0 && nastyStorage) {
      var message = 'Your child has been viewing this site: ' + nastyStorage;
      var payload = JSON.stringify({
        to: number,
        message: message
      });

      $.ajax({
        headers: {
          "Content-type": "application/json"
        },
        method: "POST",
        data: payload,
        url: API_ENDPOINT
      })
      .done(function( data ) {
        console.log(data);
      });

    }
    chrome.storage.sync.remove(tabId);
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.incognito) {
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
