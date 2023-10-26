class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if(this.text.startsWith("Just posted") || this.text.startsWith("Just completed")){
			return "completed_event";
		}
        else if(this.text.startsWith("Watch")){
			return "live_event";
		}
        else if(this.text.startsWith("Achieved") || (this.text.startsWith("I just s"))){
			return "achievement";
		}
        else{
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        let filter = ['https://t.co/', '#Runkeeper', 'Just completed a', '@Runkeeper', 'Just posted a', 'Check it out!'];
        for(let i = 0; i < filter.length; i++){
            if (!this.text.includes(filter[i])){ // if tweet does NOT have all words in filter, then it is a user-written tweet
                return true;
            }
        }
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string { //'Just completed a 5.17 km run with Runkeeper. Check it out! ♫ ♪ #Runkeeper https://t.co/XNYqY90VCG'
        //Just completed a 5.17 km '
       
        if(this.source == "completed_event"){
            if(this.text.includes(" km ")){
            let pos = this.text.indexOf("km") + "km ".length;
            if(this.text.includes(" - ")){
                // console.log("case1")
                return this.text.substring(pos, this.text.indexOf(" -"));
            }
            else if(this.text.includes("with Runkeeper")){
                // console.log("no@");
                return this.text.substring(pos, this.text.indexOf(" with Runkeeper"))
            }
            else{
                // console.log("case2")
                return this.text.substring(pos, this.text.indexOf(" with @Runkeeper"));
            }
            
            }
            else if(this.text.includes("mi ")){
                let pos = this.text.indexOf("mi") + "mi ".length;
                if(this.text.includes(" - ")){
                    // console.log("case3")
                    return this.text.substring(pos, this.text.indexOf(" -"));   
                }
                else{
                    // console.log("case4")
                    return this.text.substring(pos, this.text.indexOf(" with @Runkeeper"));
                }
                
            }
            else{
                let pos;
                if(this.text.includes(" an ")){
                    pos = this.text.indexOf("posted an ") + "posted an ".length;
                }
                else{
                    pos = this.text.indexOf("posted a ") + "posted a ".length;
                }

                if(this.text.includes(" in")){
                    // console.log("case5")
                    return this.text.substring(pos, this.text.indexOf(" in "));
                }
                else if(this.text.includes(" - ")){
                    // console.log("case6")
                    return this.text.substring(pos, this.text.indexOf(" - "));
                }
                else{
                    // console.log("case7")
                    return this.text.substring(pos, this.text.indexOf(" with @Runkeeper"));
                }
            }
            

        }
        else{
            return "unknown";
        }
    }

    get distance():number {
        if(this.source == "completed_event"){
            
            // console.log(this.text);
            let distance = "";
            let phrase = this.text.split(".");
            let split = phrase[0].split(" ");
            let split2 = phrase[1].split(" ");
            distance = split[split.length - 1] + "." + split2[0];
            if(this.text.includes("km")){
                distance = (parseFloat(distance) / 1.609).toFixed(2)
            }
            return parseFloat(distance);
            
            
        }
        else{
            return 0;
        }
    
    }

    getHTMLTableRow(rowNumber:string):Node {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        let row = document.createElement("tr");

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = rowNumber;
        cell2.innerHTML = this.activityType;
        cell3.innerHTML = this.text;
        return row;
        
    }
}