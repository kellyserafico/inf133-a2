document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});

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

	
	let maxAvg = findDistanceActivity(tweet_array, [firstMost, secondMost,thirdMost])[1]; 
	let minAvg = findDistanceActivity(tweet_array, [firstMost, secondMost,thirdMost])[0];
	longestActivityType = document.getElementById("longestActivityType");
	shortestActivityType = document.getElementById("shortestActivityType");

	switch(maxAvg){
		case 0: longestActivityType.innerText = firstMost;
			break;
		case 1: longestActivityType.innerText = secondMost;
			break;
		default: longestActivityType.innerText = thirdMost;
			break;
	}

	switch(minAvg){
		case 0: shortestActivityType.innerText = firstMost;
	
			break;
		case 1: shortestActivityType.innerText = secondMost;
			break;
		default: shortestActivityType.innerText = thirdMost;	
			break;
	}


	document.getElementById("numberActivities").innerText = activities.length;
	document.getElementById("firstMost").innerText = firstMost;
	document.getElementById("secondMost").innerText = secondMost;
	document.getElementById("thirdMost").innerText = thirdMost;
	document.getElementById("weekdayOrWeekendLonger").innerText = longestActivities(tweet_array);

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

function findDistanceActivity(tweet_array, freq){
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


	//calculate averages for all 3
	let avg1 = 0;
	let avg2 = 0;
	let avg3 = 0;
	let sum1 = 0;
	let sum2 = 0;
	let sum3 = 0;
	let arrSize1 = distanceArr1.length
	let arrSize2 = distanceArr2.length
	let arrSize3 = distanceArr3.length
	//distanceArr1 ::::::::::
	for(let i = 0; i < distanceArr1.length; i++){
		if(!(distanceArr1[i] === false || Number.isNaN(distanceArr1[i]))){
			sum1 += distanceArr1[i];
			
		}
		else{
			arrSize1--;
		}
		
	}
	avg1 = (sum1 / arrSize1).toFixed(2);


	//distanceArr2 ::::::::::
	for(let i = 0; i < distanceArr2.length; i++){
		if(!(distanceArr2[i] === false || Number.isNaN(distanceArr2[i]))){
			sum2 += distanceArr2[i];
			
		}
		else{
			arrSize2--;
		}
		
	}
	avg2 = (sum2 / arrSize2).toFixed(2);


	//distanceArr3::::::::::
	for(let i = 0; i < distanceArr3.length; i++){
		if(!(distanceArr3[i] === false || Number.isNaN(distanceArr3[i]))){
			sum3 += distanceArr3[i];
			
		}
		else{
			arrSize3--;
		}
		
	}
	
	avg3 = (sum3 / arrSize3).toFixed(2);
	
    let max = Math.max(avg1, avg2, avg3);
	let min = Math.min(avg1, avg2, avg3);

	switch(min){
		case 0: min = 0;
			break;
		case 1: min = 1;
			break;
		default: min = 2;
			break;
	}
	
	switch(max){
		case 0: max = 0;
			break;
		case 1: max = 1;
			break;
		default: max = 2;
			break;
	}


	return([min, max])
}

function longestActivities(tweet_array){ // take the average distance of all activities on weekedays vs the same on weekends.

	let weekends = ["Sat", "Sun"]
	let day = "";
	let weekendSum = 0;
	let weekendArrLength = 0;
	let weekdaySum = 0;
	let weekdayArrLength = 0;

	tweet_array.map(function(tweet) {
		day = tweet.time.toString();
		if(weekends.includes(day.split(" ")[0])){ // if the tweet was made on a weekend
			if(!(tweet.distance === false || Number.isNaN(tweet.distance))){ // if tweet has a distance
				weekendSum += tweet.distance;
				weekendArrLength++;
			}

		}
		else{ // if tweet was made on weekday
			if(!(tweet.distance === false || Number.isNaN(tweet.distance))){ // if tweet has a distance
				weekdaySum += tweet.distance;
				weekdayArrLength++;
			}
		}
		
	});
	
	if((weekendSum / weekendArrLength).toFixed(2) > (weekdaySum / weekdayArrLength).toFixed(2)){
		return "weekends"
	}
	


}

//Wait for the DOM to load
