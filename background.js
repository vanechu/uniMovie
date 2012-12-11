var url="http://douban.com";

var setBadgeText = function(text) {
    chrome.browserAction.setBadgeText({ text: text });
};

// Called when the url of a tab changes.
var checkForValidUrl = function(tabId, changeInfo, tab) {
    if (tab.url.indexOf('douban.com') > 0) {

    }
};
    
var autoDetect =function() {

    // if(localStorage.auto_detect != 0) {

    //     setBadgeText("4");
    // }else{
    //     setBadgeText("5");
    // }
    setBadgeText("66");
}

//autoDetect();
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });
    console.log('aaaaaaa');