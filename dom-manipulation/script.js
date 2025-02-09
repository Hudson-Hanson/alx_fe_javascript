// Retrieve existing quotes from localStorage or use default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
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

// Function to add a new quote and update the DOM and localStorage
function addQuote(text, category) {
    if (!text || !category) {
        console.error("Both quote text and category are required.");
        return;
    }

    // Add new quote to the array
    quotes.push({ text, category });

    // Save updated quotes to localStorage
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Update the DOM with the new quote
    displayRandomQuote();
}

// Function to filter quotes based on category
function filterQuotesByCategory(category) {
    const filteredQuotes = quotes.filter(quote => quote.category.toLowerCase() === category.toLowerCase());

    if (filteredQuotes.length === 0) {
        console.error("No quotes found in this category.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    // Update the DOM
    document.getElementById("quoteText").innerText = randomQuote.text;
    document.getElementById("quoteCategory").innerText = randomQuote.category;
}

// Event listener for "Show New Quote" button
window.onload = function() {
    const newQuoteButton = document.getElementById("newQuoteButton");
    const addQuoteButton = document.getElementById("addQuoteButton");
    const categorySelect = document.getElementById("categorySelect");

    if (newQuoteButton) {
        newQuoteButton.addEventListener("click", displayRandomQuote);
    } else {
        console.error("Button with id 'newQuoteButton' not found.");
    }

    if (addQuoteButton) {
        addQuoteButton.addEventListener("click", function () {
            const newQuoteText = document.getElementById("newQuoteText").value;
            const newQuoteCategory = document.getElementById("newQuoteCategory").value;
            addQuote(newQuoteText, newQuoteCategory);
        });
    } else {
        console.error("Button with id 'addQuoteButton' not found.");
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", function () {
            const selectedCategory = categorySelect.value;
            filterQuotesByCategory(selectedCategory);
        });
    }
};
