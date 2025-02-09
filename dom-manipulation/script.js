// Retrieve existing quotes from localStorage or use default quotes 
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
    { text: "Act as if what you do makes a difference. It does.", category: "Inspiration" }
];

// Function to display a random quote on the page
function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteText").innerText = "No quotes available.";
        document.getElementById("quoteCategory").innerText = "";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Ensure elements exist before updating
    const quoteTextElement = document.getElementById("quoteText");
    const quoteCategoryElement = document.getElementById("quoteCategory");

    if (quoteTextElement && quoteCategoryElement) {
        quoteTextElement.innerText = `"${randomQuote.text}"`;
        quoteCategoryElement.innerText = `Category: ${randomQuote.category}`;
    } else {
        console.error("Required DOM elements not found.");
    }
}

// Function to add a new quote and update the DOM and localStorage
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    // Add new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Save updated quotes to localStorage
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Update the UI with the new quote and categories
    displayRandomQuote();
    populateCategories();
}

// Function to filter quotes based on category
function filterQuotesByCategory(category) {
    let filteredQuotes;

    if (category.toLowerCase() === "all") {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(quote => quote.category.toLowerCase() === category.toLowerCase());
    }

    if (filteredQuotes.length === 0) {
        document.getElementById("quoteText").innerText = "No quotes found in this category.";
        document.getElementById("quoteCategory").innerText = "";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];

    // Update the DOM
    document.getElementById("quoteText").innerText = `"${randomQuote.text}"`;
    document.getElementById("quoteCategory").innerText = `Category: ${randomQuote.category}`;
}

// Function to dynamically populate categories in the dropdown
function populateCategories() {
    const categorySelect = document.getElementById("categorySelect");
    if (!categorySelect) return;

    categorySelect.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown

    const uniqueCategories = [...new Set(quotes.map(q => q.category))];

    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
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
        addQuoteButton.addEventListener("click", addQuote);
    } else {
        console.error("Button with id 'addQuoteButton' not found.");
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", function () {
            const selectedCategory = categorySelect.value;
            filterQuotesByCategory(selectedCategory);
        });
    }

    // Load a random quote and update category dropdown on page load
    displayRandomQuote();
    populateCategories();
};
