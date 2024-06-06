// Define the quote that the user needs to type
const quote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
// Get the necessary elements from the DOM
const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("startButton");
const resultElement = document.getElementById("result");
// Function to start the typing speed test
function startTest() {
// Clear the previous result
resultElement.textContent = "";
// Disable the start button
startButton.disabled = true;
// Set the focus to the input element
inputElement.focus();
// Store the start time
const startTime = new Date().getTime();
// Event listener to check the input against the quote
inputElement.addEventListener("input", function () {
const inputText = inputElement.value;
const quoteText = quoteElement.textContent.trim();
if (inputText === quoteText
) {
// Calculate the typing speed
const endTime = new Date().getTime();
const totalTime = (endTime - startTime) / 1000; // in seconds
const speed = Math.round((quote.length / totalTime) * 60); // in words per minute
// Calculate accuracy
const accuracy = Math.round((quote.length / inputText.length) * 100);
// Display the result
resultElement.textContent = `Speed: ${speed} WPM | Accuracy: ${accuracy}%`;
}
});
}
// Event listener for the start button
startButton.addEventListener("click", startTest);
