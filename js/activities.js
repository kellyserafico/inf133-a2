function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// console.log(tweet_array[422].activityType)
	let activities = [];
	let frequency = [];
	tweet_array.map(function(tweet){

		if(tweet.source == "completed_event"){
			if(!(activities.includes(tweet.activityType))){
			activities.push(tweet.activityType);
			frequency.push([tweet.activityType, 0]);
			}
			else{
				for(let i = 0; i < frequency.length; i++){
					if(frequency[i][0] == tweet.activityType){
						frequency[i][1] = frequency[i][1] + 1;
					}
				}
			}
		}
	});
	let topThree = findTopThree(frequency);
	let firstMost = secondMost = thirdMost = "";
	console.log(firstMost)
	for(let i = 0; i < frequency.length; i++){
		if (topThree[0] == frequency[i][1]){
			firstMost = frequency[i][0];
		}
		else if(topThree[1] == frequency[i][1]){
			secondMost = frequency[i][0];
		}
		else if(topThree[2] == frequency[i][1]){
			thirdMost = frequency[i][0];
		}
	}
	
	
	
	document.getElementById("numberActivities").innerText = activities.length
	document.getElementById("firstMost").innerText = firstMost;
	document.getElementById("secondMost").innerText = secondMost;
	document.getElementById("thirdMost").innerText = thirdMost;


	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	// activity_vis_spec = {
	//   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	//   "description": "A graph of the number of Tweets containing each type of activity.",
	//   "data": {
	//     "values": tweet_array
	//   }
	//   //TODO: Add mark and encoding
	// };
	// vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

function findTopThree(freq){
	let nums = [];
	for(let i = 0; i < freq.length; i++){
		nums[i] = freq[i][1];
	}
	nums = nums.sort(function (a, b) {  return a - b;  }).reverse();
	return [nums[0], nums[1], nums[2]]
}





//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});