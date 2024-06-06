document.getElementById("startButton").addEventListener("click", startTest);

let startTime;
let endTime;
let timer;
const textToType = "I took to my heels when the brown dog began to bark.";

function startTest() {
	console.log("Test started");
	const userInput = document.getElementById("user-input");
	userInput.value = "";
	userInput.disabled = false;
	userInput.focus();
	document.getElementById("wpm").innerText = "";
	document.getElementById("accuracy").innerText = "";

	startTime = new Date().getTime();
	clearInterval(timer);
	timer = setInterval(() => {
		console.log("Checking input...");
		if (userInput.value === textToType) {
			console.log("Text matched");
			clearInterval(timer);
			endTime = new Date().getTime();
			const timeTaken = (endTime - startTime) / 1000; // in seconds
			calculateResults(textToType, userInput.value, timeTaken);
			userInput.disabled = true; // Disable the text area after completion
		}
	}, 100);
}

function calculateResults(originalText, typedText, timeTaken) {
	console.log("Calculating results");
	const wordsTyped = typedText.split(" ").length;
	console.log("Words typed:", wordsTyped);
	const wpm = Math.round((wordsTyped / timeTaken) * 60);
	console.log("WPM:", wpm);
	const accuracy = calculateAccuracy(originalText, typedText);
	console.log("Accuracy:", accuracy);

	document.getElementById("wpm").innerText = wpm;
	document.getElementById("accuracy").innerText = accuracy;
}

function calculateAccuracy(originalText, typedText) {
	console.log("Calculating accuracy");
	const originalWords = originalText.split(" ");
	const typedWords = typedText.split(" ");
	let correctWords = 0;

	originalWords.forEach((word, index) => {
		if (word === typedWords[index]) {
			correctWords++;
		}
	});

	return Math.round((correctWords / originalWords.length) * 100);
}
