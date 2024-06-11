// Define the quote that the user needs to type
const quote = "I took to my heels when the brown dog began to bark.";

// Get the necessary elements from the DOM
const quoteElement = document.getElementById("text-to-type");
const inputElement = document.getElementById("user-input");
const startButton = document.getElementById("startButton");
const resultElement = document.getElementById("results");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

// Variables to keep track of the start time and intervals
let startTime;
let speedInterval;

// Function to start the typing speed test
function startTest() {
    // Hide previous results and clear WPM and accuracy display
    resultElement.style.display = "none";
    wpmElement.textContent = "";
    accuracyElement.textContent = "";

    // Disable the start button to prevent multiple clicks
    startButton.disabled = true;

    // Clear the input field, enable it, and focus on it for typing
    inputElement.value = "";
    inputElement.disabled = false;
    inputElement.focus();

    // Record the start time
    startTime = new Date().getTime();

    // Set interval to update typing speed every 200ms
    speedInterval = setInterval(updateSpeed, 200);

    // Event listener to check the input against the quote
    inputElement.addEventListener("input", checkInput);
}

// Function to check the input against the quote
function checkInput() {
    // Get the current text from the input field
    const inputText = inputElement.value;
    // Get the trimmed quote text
    const quoteText = quote.trim();

    // Check if the typed text matches the quote
    if (inputText === quoteText) {
        // Record the end time
        const endTime = new Date().getTime();
        // Calculate the total time taken in seconds
        const totalTime = (endTime - startTime) / 1000; // in seconds
        // Calculate typing speed in words per minute
        const speed = Math.round((quote.length / totalTime) * 60); // in words per minute

        // Calculate typing accuracy
        const accuracy = Math.round((quote.length / inputText.length) * 100);

        // Display the results
        wpmElement.textContent = speed;
        accuracyElement.textContent = accuracy;
        resultElement.style.display = "block";

        // Disable the input field and enable the start button
        inputElement.disabled = true;
        startButton.disabled = false;

        // Clear the speed interval
        clearInterval(speedInterval);
    }
}

// Function to update the typing speed
function updateSpeed() {
    const currentTime = new Date().getTime();
    const totalTime = (currentTime - startTime) / 1000; // in seconds
    const wordsTyped = inputElement.value.length / 5; // average word length is 5 characters
    const speed = Math.round(wordsTyped / (totalTime / 60)); // words per minute

    // Update the WPM element with the current speed
    wpmElement.textContent = speed;
}

// Event listener for the start button to initiate the test
startButton.addEventListener("click", startTest);

