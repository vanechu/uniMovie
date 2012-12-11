$("a").each(function(){
    if($(this).text().indexOf("豆邮") >= 0)
    {
        $(this).hide();
    };
});

// $("a").each(function(){
//     if($(this).text().indexOf("tt") >= 0){
//         chrome.extension.sendMessage({greeting: "hello"}, function(response) {
//             console.log(response.farewell);
//             console.log($(this).text());
//         });
//     }
// });

$("a:contains('tt')"){
    chrome.extension.sendMessage({greeting: "hello"}, function(response) {
        console.log(response.farewell);
        console.log($(this).text());
    });
}
