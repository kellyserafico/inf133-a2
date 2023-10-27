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
    let textFilter = $("#textFilter");
	let searchCount = $("#searchCount");
	let searchText = $("#searchText");
	// searchCount.innerHTML = 0;
	searchText.text("");
	textFilter.on("keyup", (event) =>{
		searchCount.text(0);
		searchText.text(textFilter.val());
		filterTweets(textFilter.val(), tweet_array, searchCount);
		
	});
	
}

function filterTweets(input, tweet_array, searchCount){
	let tweetTable = $("#tweetTable");
	let cnt = 0;
	tweetTable.text("");
	tweet_array.map(function(tweet){
		if(input == ""){
			return;
		}
		else if(tweet.text.toLowerCase().includes(input.toLowerCase())){
            curCount = parseInt(searchCount.text());
            curCount++;
			searchCount.text(curCount);
			//populate table
			cnt++;
			let row = tweet.getHTMLTableRow(cnt)
			// console.log(typeof row)
			tweetTable.append(row)
		}
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
	
});