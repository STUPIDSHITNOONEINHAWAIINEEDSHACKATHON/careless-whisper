var API_ENDPOINT = "https://zorc2ihpm1.execute-api.us-east-1.amazonaws.com/dev/api/sendText";

function sendMessage(tabId, url) {
  chrome.storage.sync.get(null, function(items) {
    var number = items.lovedOnesNumber;
    var url = items[ tabId ];
    if (number && number.length > 0 && url) {
      var message = 'After opening an icognito browser to maintain anonymity, '
        + 'this number has visited the following site and decided '
        + 'to send you a message about it. Link: '
        + url;

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
        alert('ALERT! A TEXT MESSAGE OF THIS WEBSITE HAS BEEN SENT TO ' + number);
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
