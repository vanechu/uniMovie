var url='movie.douban.com/subject/';

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';


var getUpdateFrequency = function() {
    return 6000;
};

var updateLoop = function() {
    window.setTimeout(autoDetect, getUpdateFrequency());
};

var setBadgeText = function(text) {
    chrome.browserAction.setBadgeText({ text: text });
};

// Called when the url of a tab changes.
var checkForValidUrl = function(tabId, changeInfo, tab) {
    if (tab.url.indexOf('douban.com') > 0) {
        console.log("Find");
    }
};

var autoDetect =function(imdbNum) {
    $.getJSON('http://192.168.246.69/imdb/'+imdbNum, function(data, status, xhr){
        if( xhr.status == 200 ){
            console.log(data.MovieName);
        }else{ 
        //error - check out the values for only in chrome for 'console'
        console.log(xhr.status);
        console.log(xhr.response);
        console.log(xhr.responseText)
        console.log(xhr.statusText);
        }
    });
}


console.log("init");
//autoDetect();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo.status === "complete"){
      if(tab.url.search(url) !== -1) {
        chrome.tabs.executeScript(tabId, { file: "jquery.js" }, function() {
            chrome.tabs.executeScript(tabId, { file: "page.js" });
        });
    }
}
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.imdb){
        console.log("Receive: "+request.imdb);
        autoDetect(request.imdb);
    }
    sendResponse({farewell: "goodbye"});
});