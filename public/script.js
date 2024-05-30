let startTime;
let endTime;
let timer;

function startTest() {
	const textToType = document.getElementById("text-to-type").innerText;
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
