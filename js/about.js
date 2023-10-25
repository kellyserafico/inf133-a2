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
	let completedEventsPct = document.querySelectorAll(".completedEventsPct");
	completedEventsPct.forEach(completedEventsPct => {completedEventsPct.innerHTML = math.format((numCompletedEvents(tweet_array) / tweet_array.length * 100), {notation: 'fixed', precision: 2}) + "%"});

	let liveEvents = document.querySelectorAll('.liveEvents');
	liveEvents.forEach(liveEvents => {
	liveEvents.innerHTML = numLiveEvents(tweet_array);
	});
	let liveEventsPct = document.querySelectorAll(".liveEventsPct");
	liveEventsPct.forEach(liveEventsPct => {liveEventsPct.innerHTML = math.format((numLiveEvents(tweet_array) / tweet_array.length * 100), {notation: 'fixed', precision: 2}) + "%"});


	let achievements = document.querySelectorAll('.achievements');
	achievements.forEach(achievements => {
		achievements.innerHTML = numAchievements(tweet_array);
	});
	let achievementsPct = document.querySelectorAll(".achievementsPct");
	achievementsPct.forEach(achievementsPct => {achievementsPct.innerHTML = math.format((numAchievements(tweet_array) / tweet_array.length * 100), {notation: 'fixed', precision: 2}) + "%"});


	let miscellaneous = document.querySelectorAll(".miscellaneous");
	miscellaneous.forEach(miscellaneous => {
		miscellaneous.innerHTML = numMisc(tweet_array)//63
	});
	let miscellaneousPct = document.querySelectorAll(".miscellaneousPct");
	miscellaneousPct.forEach(miscellaneousPct => {miscellaneousPct.innerHTML = math.format((numMisc(tweet_array) / tweet_array.length * 100), {notation: 'fixed', precision: 2}) + "%"});
	console.log(typeof miscellaneous.innerHTML)

	let written = document.querySelectorAll(".written");
	written.forEach(written => {
		written.innerHTML = numWritten(tweet_array);
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
		if(tweet.text.startsWith("Achieved") || (tweet.text.startsWith("I just s"))){
			count++;
		}
	});
	//61
	return count;
}

function numMisc(tweet_array){
	return tweet_array.length - numCompletedEvents(tweet_array) - numLiveEvents(tweet_array) - numAchievements(tweet_array);
}

function numWritten(tweet_array){
	let cnt = 0;
	//"Just completed a 10.61 km run with @Runkeeper. Check it out! https://t.co/9GnepQIr70 #Runkeeper
	//"Just posted a 0.11 km run - TomTom MySports Watch https://t.co/coP26wbwm9 #Runkeeper",
	//"Just posted a 1.02 mi walk - Treadmill walking  https://t.co/nswZ3CyNtz #Runkeeper

	let filter = ['https://t.co/', '#Runkeeper']
	let num = tweet_array.map(function(tweet){
		// let words = tweet.text.toString().split(' ');
		// console.log(tweet.text.toString())
		// shouldFilter = true;
		for(let i = 0; i < filter.length; i++){
			if (!tweet.text.includes(filter[i])){
				// console.log(tweet.text)
				console.log(tweet.text, 'FILTER: ', filter[i])
				cnt++;
				break;
			}
		}
		// if (!(tweet.text.includes("Just completed a") && (tweet.text.includes("with @Runkeeper. Check it out! https://t.co/")) && (tweet.text.includes("#Runkeeper")))){
		// 	console.log(tweet.text);
		// 	cnt++
		// 	// console.log(typeof tweet.text)
		// }

	});
	console.log(cnt)
}