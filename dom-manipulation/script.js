// Quotes array (initial sample)
const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    { text: "Do what you can, with what you have, where you are.", category: "Life" }
];

// Function to display a random quote
function displayRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");

    if (!quoteDisplay) {
        console.error("Error: Element with ID 'quoteDisplay' not found.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    if (!quoteInput || !categoryInput) {
        console.error("Error: Input fields not found.");
        return;
    }

    const newQuoteText = quoteInput.value.trim();
    const newQuoteCategory = categoryInput.value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear input fields
        quoteInput.value = "";
        categoryInput.value = "";

        // Immediately update the displayed quote
        displayRandomQuote();
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Attach event listeners after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const showNewQuoteButton = document.getElementById("newQuote");
    const addQuoteButton = document.getElementById("addQuoteButton");

    if (showNewQuoteButton) {
        showNewQuoteButton.addEventListener("click", displayRandomQuote);
    } else {
        console.error("Error: Button with ID 'newQuote' not found.");
    }

    if (addQuoteButton) {
        addQuoteButton.addEventListener("click", addQuote);
    } else {
        console.error("Error: Button with ID 'addQuoteButton' not found.");
    }

    // Display an initial quote on page load
    displayRandomQuote();
});
