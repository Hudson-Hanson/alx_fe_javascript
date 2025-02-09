// Quotes array with initial quotes
const quotes = [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
    { text: "Act as if what you do makes a difference. It does.", category: "Inspiration" }
];

// Function to display a random quote on the page
function displayRandomQuote() {
    if (quotes.length === 0) {
        console.error("No quotes available.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Ensure elements exist before updating
    const quoteTextElement = document.getElementById("quoteText");
    const quoteCategoryElement = document.getElementById("quoteCategory");

    if (quoteTextElement && quoteCategoryElement) {
        quoteTextElement.innerText = randomQuote.text;
        quoteCategoryElement.innerText = randomQuote.category;
    } else {
        console.error("Required DOM elements not found.");
    }
}

// Function to add a new quote and update the DOM
function addQuote(text, category) {
    if (!text || !category) {
        console.error("Both quote text and category are required.");
        return;
    }

    // Add new quote to the array
    quotes.push({ text, category });

    // Update the DOM with the new quote
    displayRandomQuote();
}

// Event listener to show a new random quote when button is clicked
window.onload = function() {
    const newQuoteButton = document.getElementById("newQuoteButton");
    
    if (newQuoteButton) {
        newQuoteButton.addEventListener("click", displayRandomQuote);
    } else {
        console.error("Button with id 'newQuoteButton' not found.");
    }
};
