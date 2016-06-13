// create the quote constructor responsible for creating all quote objects

var quote = function(quote, source, citation, year, tags) {
	this.quote = quote;
	this.source = source;
	this.citation = citation;
	this.year = year;
	this.tags = tags;
};

// using the quote constructor, create multiple quotes 
var loisMcMaster = new quote("Adversity does teach who your real friends are", "Lois McMaster Bujold", "A Civil Campaign", "1999", ["informative", "dark"]);
var williamShakespeare = new quote("The very substance of the ambitious is merely the shadow of a dream", "William Shakespeare", "Hamlet", "1603", ["dark", "hard to understand"]);
var lesMiserables = new quote("Life's greatest happiness is to be convinced we are loved", "Victor Hugo", "Les Miserables", "1862", ["defeating", "sad"]);
var davidAllen = new quote("You can do anything but not everything", "David Allen", "Making It All Work", "2009", ["eye opening", "enlightening"]);
var hlMencken = new quote("Faith may be defined briefly as an illogical belief in the occurence of the improbable", "H.L. Mencken", undefined, undefined, ["anti-religious"]);
var daveBarry = new quote("Camping is nature's way of promoting the motel business", "Dave Barry", undefined, undefined, ["humor", "funny"]);


var quotesArray = [loisMcMaster, williamShakespeare, lesMiserables, davidAllen, hlMencken, daveBarry];

// random numbers are used quite a bit in this small program, so i created a random number generator. using the 'lim' parameter, you can define the 'limit' of the random number
var randomNumber = function(lim) {
	return Math.floor(Math.random() * lim);
};


// create the variables that will be utilized by getRandomQuote. log will be used to store a log of entries, while choice is used to store the choice number
var log = [];
var choice = randomNumber(quotesArray.length);

// create the getRandomQuote function
var getRandomQuote = function (arr) {
	// check to see if the length of the choice log is equal to that of the array length. if it is, then I know that I need to clear the log and start over 
	if (log.length === arr.length) {
		log = [];
		// set the choice back to a random default value
		choice = randomNumber(arr.length);
	}
	// iterate through the log entries to see if the choice number has already been used, if it has, create a new random number and call the function again
	for (var i = 0; i < log.length; i++) {
		if (log[i] === choice) {
			choice = randomNumber(arr.length);
			return getRandomQuote(arr);
			}
		}
	// if the choice is unique, this block will then execute thereby supplying an object to the calling function
	log.push(choice);
	return arr[choice];
};

var printQuote = function() {
	// create values ranging from 0 to 255 with a random number generating algorithm. one for red, green, and blue
	var r = randomNumber(255);
	var g = randomNumber(255);
	var b = randomNumber(255);
	
	// create a local variable named quote, and store the result of getRandomQuote inside of it
	var quote = getRandomQuote(quotesArray);
	
	// initially create a string containing only the required variables such as quote and source; the others are optional and should be treated as such
	var quoteString = "<p class='quote'>" + quote.quote + "</p>" + "<p class='source'>" + quote.source;
	
	// check to see if the object has a citation property, if it does, then append it to the quoteString
	if (quote.citation !== undefined) {
		quoteString += "<span class='citation'>" + quote.citation + "</span>";
	}
	
	// check to see if the object has a year property, if it does, then append it to the quoteString
	if (quote.year !== undefined) {
		quoteString += "<span class='year'>" + quote.year + "</span>";
	}
	
	// close the string
	quoteString += "</p>";
	
	// print the results to the quote-box
	document.getElementsByTagName("body")[0].style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
	document.getElementById("quote-box").innerHTML = quoteString;
};

printQuote();
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
window.setInterval(printQuote, 10000);


