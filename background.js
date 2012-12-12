var url='movie.douban.com/subject/';

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';

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
    console.log("dadasdas"+localStorage.tabId);
}



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === "complete"){
        if(tab.url.search(url) !== -1) {
            chrome.tabs.executeScript(tabId, { file: "jquery.js" }, function() {
            chrome.tabs.executeScript(tabId, { file: "page.js" });
            });
            localStorage.tabId = tabId;
            console.log("sadasd"+localStorage.tabId);
        }
    }
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.imdb){
        console.log("Receive: "+request.imdb);
        getMovie(request.imdb);
    }
    sendResponse({farewell: "goodbye"});
});
