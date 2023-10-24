function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	//TODO: convert to jQuery
	
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	document.getElementById('firstDate').innerText = formatDate(tweet_array[tweet_array.length - 2]["time"]);
	document.getElementById("lastDate").innerText = formatDate(tweet_array[0]["time"]);
	
	console.log(tweet_array[0].source());
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});

function formatDate(date){
	let words = date.toString().split(' ');
	let formatDate = words[1] + " " + words[2] + ", " + words[3];
	return formatDate;
	
}