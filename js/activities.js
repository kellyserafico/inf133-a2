function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	let activities = [];
	let frequency = [];
	tweet_array.map(function(tweet){ // populating activities with unique activities and populating frequency with # of occurences
		
		if(tweet.source == "completed_event"){
			if(!(activities.includes(tweet.activityType))){
			activities.push(tweet.activityType);
			frequency.push([tweet.activityType, 1]);
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
	

	console.log(topThree)
	for(let i = 0; i < frequency.length; i++){ // setting most = top 3 activity name 
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

	
	findLongDistanceActivity(tweet_array, [firstMost, secondMost,thirdMost])
	
	document.getElementById("numberActivities").innerText = activities.length;
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
	for(let i = 0; i < freq.length; i++){ // number of occurances will be assigned to nums array
		nums[i] = freq[i][1];
	}
	nums = nums.sort(function (a, b) {  return a - b;  }).reverse(); //sorts nums in descending order (nums = # of occurances)
	return [nums[0], nums[1], nums[2]]
}

function findLongDistanceActivity(tweet_array, freq){
	// console.log(freq);
	let distanceArr1 = []
	let distanceArr2 = [];
	let distanceArr3 = [];
	
	tweet_array.map(function(tweet){ 
		if(freq[0] == tweet.activityType){ // if "run" == this.activityType, then populate distanceArr1 w/ this.distance
			distanceArr1.push(tweet.distance);
			
		}
		else if(freq[1] == tweet.activityType){
			distanceArr2.push(tweet.distance)
		}
		else if(freq[2] == tweet.activityType){

			distanceArr3.push(tweet.distance);

			
		}
	});

	let avg3 = 0;
	let sum = 0;
	hasDistance3 = distanceArr3.length;
	console.log(distanceArr3)
	// console.log((distanceArr3[0] + distanceArr3[1]) / 2)
	// console.log((distanceArr3[0] + distanceArr3[1] + distanceArr3[2]) / distanceArr3.length)
	for(let i = 0; i < distanceArr3.length; i++){
		// if()
		// sum += distanceArr3[i];
		
		// console.log(distanceArr3[i].toFixed(2)) //1909, 1904 PROBLEM: some don't have distance
		if(distanceArr3[i] === false || Number.isNaN(distanceArr3[i])){
			console.log(typeof distanceArr3[i])
		}
		
	}
	
    
}




//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});