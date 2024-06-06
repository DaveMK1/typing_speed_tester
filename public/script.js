const quote = "I took to my heels when the brown dog began to bark.";

const quoteElement = document.getElementById("text-to-type");
const inputElement = document.getElementById("user-input");
const startButton = document.getElementById("startButton");
const resultElement = document.getElementById("results");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

function startTest() {
	resultElement.style.display = "none";
	wpmElement.textContent = "";
	accuracyElement.textContent = "";

	startButton.disabled = true;

	inputElement.value = "";
	inputElement.disabled = false;
	inputElement.focus();

	const startTime = new Date().getTime();

	inputElement.addEventListener("input", function () {
		const inputText = inputElement.value;
		const quoteText = quote.trim();

		if (inputText === quoteText) {
			const endTime = new Date().getTime();
			const totalTime = (endTime - startTime) / 1000; // in seconds
			const speed = Math.round((quote.length / totalTime) * 60); // in words per minute

			const accuracy = Math.round((quote.length / inputText.length) * 100);

			wpmElement.textContent = speed;
			accuracyElement.textContent = accuracy;
			resultElement.style.display = "block";

			inputElement.disabled = true;
			startButton.disabled = false;
		}
	});
}

startButton.addEventListener("click", startTest);
