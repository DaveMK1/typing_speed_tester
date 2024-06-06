let startTime;
let endTime;
let timer;
const textToType = "I took to my heels when the brown dog began to bark.";

function startTest() {
	const userInput = document.getElementById("user-input");
	userInput.value = "";
	userInput.disabled = false;
	userInput.focus();
	document.getElementById("wpm").innerText = "";
	document.getElementById("accuracy").innerText = "";

	startTime = new Date().getTime();
	clearInterval(timer);
	timer = setInterval(() => {
		if (userInput.value === textToType) {
			clearInterval(timer);
			endTime = new Date().getTime();
			const timeTaken = (endTime - startTime) / 1000; // in seconds
			calculateResults(textToType, userInput.value, timeTaken);
			userInput.disabled = true; // Disable the text area after completion
		}
	}, 100);
}

function calculateResults(originalText, typedText, timeTaken) {
	const wordsTyped = typedText.split(" ").length;
	const wpm = Math.round((wordsTyped / timeTaken) * 60);
	const accuracy = calculateAccuracy(originalText, typedText);

	document.getElementById("wpm").innerText = wpm;
	document.getElementById("accuracy").innerText = accuracy;
}

function calculateAccuracy(originalText, typedText) {
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
