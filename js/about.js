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
	
	let completedEvents = document.querySelectorAll('.completedEvents');
	completedEvents.forEach(completedEvents => {
	completedEvents.innerHTML = numCompletedEvents(tweet_array);
	});

	let liveEvents = document.querySelectorAll('.liveEvents');
	liveEvents.forEach(liveEvents => {
	liveEvents.innerHTML = numLiveEvents(tweet_array);
	});

	let achievements = document.querySelectorAll('.achievements');
	achievements.forEach(achievements => {
		achievements.innerHTML = numAchievements(tweet_array);
	});

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

function numCompletedEvents(tweet_array){
	let count = 0;

	let num = tweet_array.map(function(tweet){
		if(tweet.text.startsWith("Just posted") || tweet.text.startsWith("Just completed")){
			count++;
		}
	});
	//7982
	return count;
}

function numLiveEvents(tweet_array){
	let count = 0;

	let num = tweet_array.map(function(tweet){
		if(tweet.text.startsWith("Watch")){
			count++;
		}
	});
	//141
	return count;
}

function numAchievements(tweet_array){
	let count = 0;

	let num = tweet_array.map(function(tweet){
		if(tweet.text.startsWith("Achieved")){
			count++;
		}
	});
	//56
	return count;
}