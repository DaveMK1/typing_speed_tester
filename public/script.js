// Define the quote that the user needs to type
const quote = "I took to my heels when the brown dog began to bark.";

// Counting the total number of words in the quote
// necessary for speed calculation
const quoteWordSize =  quote.trim().split(/\s+/).filter(word => word.length > 0).length

// Get the necessary elements from the DOM
const quoteElement = document.getElementById("text-to-type");
const inputElement = document.getElementById("user-input");
const startButton = document.getElementById("startButton");
const resultElement = document.getElementById("results");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");

let startTime;

function checkSpeed() {
    // Get the current text from the input field
    const inputText = inputElement.value;
    // Get the trimmed quote text
    const quoteText = quote.trim();

    console.log("inputText = ", inputText)
    console.log("quoteText = ", quoteText)

    // -----------------------------------
    // Record the end time
    const endTime = Date.now();
    // Calculate the total time taken in seconds
    const totalTime = (endTime - startTime) / 1000; // in seconds

    console.log("start time = ", startTime)
    console.log("end time = ", endTime)
    console.log("total time = ", totalTime)


    // Calculate typing speed in words per minute
    console.log("word lenght = ", quoteWordSize)
    const speed = Math.round((quoteWordSize / totalTime) * 60); // in words per minute
 
    // determine the number of corerct characters typed by comparing and matching the characters 
    // at the same index of both quote and input strings
    const correctChars = inputText.split('').filter((char, idx) => char === quoteText[idx]).length;
   
    // Calculate typing accuracy
    const accuracy = Math.round((correctChars / inputText.length) * 100);

    // Display the results
    wpmElement.textContent = speed;
    accuracyElement.textContent = accuracy;
    resultElement.style.display = "block";

    //--------------------------------------------

    // Check if the typed text matches the quote
    if (inputText.length === quoteText.length) {
    

        // Disable the input field and enable the start button
        inputElement.disabled = true;
        startButton.disabled = false;

        // clean up
        inputElement.removeEventListener("input", checkSpeed);
    }
}


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
    startTime = Date.now();

    // Event listener to check the input against the quote
    inputElement.addEventListener("input", checkSpeed);
}

// Event listener for the start button to initiate the test
startButton.addEventListener("click", startTest);

// Prevent user from using backspace, so we can accurate calculate accuracy
inputElement.addEventListener("keydown", function(event) {
    console.log("key pressed is ", event.key)
    if (event.key === 'Backspace') {
      event.preventDefault();
    }
  });
