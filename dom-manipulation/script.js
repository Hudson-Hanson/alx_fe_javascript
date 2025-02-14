// Quotes array
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.textContent = ""; // Clear previous content

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Create a paragraph element for the quote
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${randomQuote.text}"`;

    // Create a span for the category
    const quoteCategory = document.createElement("span");
    quoteCategory.textContent = ` - ${randomQuote.category}`;
    quoteCategory.style.fontStyle = "italic";

    // Append elements
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to add a new quote
function addQuote() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const newQuoteText = quoteInput.value.trim();
    const newQuoteCategory = categoryInput.value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear input fields
        quoteInput.value = "";
        categoryInput.value = "";
        alert("New quote added successfully!");
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Attach event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
