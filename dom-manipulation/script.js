// Quotes array (required by the project)
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    { text: "Do what you can, with what you have, where you are.", category: "Life" }
];

// Function to select a random quote and update the DOM
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");

    if (!quoteDisplay) {
        console.error("Error: Element with ID 'quoteDisplay' not found.");
        return;
    }

    // Select a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Update the DOM with innerHTML (as required)
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><em>- ${randomQuote.category}</em>`;
}

// Function to add a new quote to the array and update the DOM
function createAddQuoteForm() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    if (!quoteInput || !categoryInput) {
        console.error("Error: Input fields not found.");
        return;
    }

    const newQuoteText = quoteInput.value.trim();
    const newQuoteCategory = categoryInput.value.trim();

    if (newQuoteText && newQuoteCategory) {
        // Add new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear input fields
        quoteInput.value = "";
        categoryInput.value = "";

        // Update the DOM immediately
        showRandomQuote();
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Attach event listeners (ensuring proper detection)
document.addEventListener("DOMContentLoaded", () => {
    const showNewQuoteButton = document.getElementById("newQuote");
    const addQuoteButton = document.getElementById("addQuoteButton");

    if (showNewQuoteButton) {
        showNewQuoteButton.addEventListener("click", showRandomQuote);
    } else {
        console.error("Error: Button with ID 'newQuote' not found.");
    }

    if (addQuoteButton) {
        addQuoteButton.addEventListener("click", createAddQuoteForm);
    } else {
        console.error("Error: Button with ID 'addQuoteButton' not found.");
    }

    // Display an initial quote when the page loads
    showRandomQuote();
});
