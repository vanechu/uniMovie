var imdbNum = $('a:contains(tt)').text();

console.log(imdbNum);

$.getJSON("http://192.168.246.69/imdb/"+imdbNum,
	function(movieInfo){
		console.log(movieInfo.movieName);
    });


chrome.extension.sendMessage({imdb:imdbNum}, function(response){
	console.log(response.farewell);
})