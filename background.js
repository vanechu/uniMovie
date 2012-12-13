var url='movie.douban.com/subject/';

var setBadgeText = function(text) {
    chrome.browserAction.setBadgeText({ text: text });
};

var getMovie =function(imdbNum) {
    $.getJSON('http://192.168.246.69/imdb/'+imdbNum, function(data, status, xhr){
        if( xhr.status == 200 ){
            sendMessage(data);
        }else{ 
            console.log(xhr.status);
            console.log(xhr.response);
            console.log(xhr.responseText)
            console.log(xhr.statusText);
        }
    });
}

var sendMessage =  function (MovieInfo){
    chrome.tabs.sendMessage(parseInt(localStorage.tabId), MovieInfo, function(response) {
        console.log(response.farewell);
    });
    // console.log(localStorage.tabId);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === "complete"){
        if(tab.url.search(url) !== -1) {
            chrome.tabs.executeScript(tabId, { file: "jquery.min.js" }, function() {
                chrome.tabs.executeScript(tabId, { file: "page.js" });
            });
            localStorage.tabId = tabId;
            // console.log(localStorage.tabId);
        }
    }
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.imdb){
        // console.log("Receive: "+request.imdb);
        getMovie(request.imdb);
    }
    // sendResponse({farewell: "goodbye"});
});
