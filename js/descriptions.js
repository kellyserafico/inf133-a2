function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	addEventHandlerForSearch(tweet_array);
	
}

function addEventHandlerForSearch(tweet_array) {

	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	let textFilter = document.getElementById("textFilter");
	let searchCount = document.getElementById("searchCount");
	let searchText = document.getElementById("searchText");
	// searchCount.innerHTML = 0;
	searchText.innerHTML = "";
	textFilter.addEventListener("keyup", (event) =>{
		searchCount.innerHTML = 0;
		// console.log(textFilter.value)
		searchText.innerHTML = textFilter.value;
		filterTweets(textFilter.value, tweet_array, searchCount);
		
	});
	
}

function filterTweets(input, tweet_array, searchCount){
	let tweetTable = document.getElementById("tweetTable");
	let cnt = 0;
	tweetTable.innerHTML = "";
	tweet_array.map(function(tweet){
		if(input == ""){
			return;
		}
		else if(tweet.text.toLowerCase().includes(input.toLowerCase())){
			searchCount.innerHTML++;
			//populate table
			cnt++;
			let row = tweet.getHTMLTableRow(cnt)
			// console.log(typeof row)
			tweetTable.appendChild(row)
		}
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
	
});