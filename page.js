var imdbNum = $('a:contains(tt)').text();

// console.log(imdbNum);


chrome.extension.sendMessage({imdb:imdbNum}, function(response){
	console.log(response.farewell);
})

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.greeting == "hello"){
    	sendResponse({farewell: "goodbye"});
    }
    // console.log(request.Task[0].Name);
    $("a:contains(tt)").after("<br> <span class='pl'> 下载地址:  </span><a href='"+request.FtpPath+request.Task[0].Name+"' target='_blank' rel='nofollow'>"+request.FtpPath+request.Task[0].Name+"</a>");

});