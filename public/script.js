// Get references to the HTML elements by their IDs
const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

// Disable the submit button by default when the page loads
submitButton.disabled = true;

// Add an event listener to the text area to check the length of the text
textArea.addEventListener("input", verifyTextLength);

// Add an event listener to the submit button to handle the click event
submitButton.addEventListener("click", submitData);

// Function to verify the length of the text in the text area
function verifyTextLength(e) {
  const textarea = e.target; // Get the text area element that triggered the event

  // Check if the text length is between 200 and 100,000 characters
  if (textarea.value.length >= 200 && textarea.value.length <= 100000) {
    submitButton.disabled = false; // Enable the submit button if the text length is valid
  } else {
    submitButton.disabled = true; // Disable the submit button if the text length is invalid
  }
}

// Function to handle the submission of data
function submitData(e) {
  // Add a loading animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value; // Get the text from the input area

  // Set up the request headers
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // Assuming you have an API key or token, you can add it here
  // myHeaders.append("Authorization", "Bearer " + YOUR_API_KEY);

  // Prepare the request body with the text to summarize
  var raw = JSON.stringify({
    text_to_summarize: text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Use the fetch API to send the text to the backend server
  fetch('/summarize', requestOptions)
    .then(response => response.text()) // Get the summarized text from the response
    .then(summary => {
      summarizedTextArea.value = summary; // Display the summary in the output text area
      submitButton.classList.remove("submit-button--loading"); // Remove the loading animation
    })
    .catch(error => {
      console.log(error.message); // Log any errors
      submitButton.classList.remove("submit-button--loading"); // Remove the loading animation
    });
}
