// Load quotes from local storage or initialize an array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal.", category: "Success" },
    { text: "Do what you can, with what you have, where you are.", category: "Life" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to populate category dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`; // Reset dropdown

    // Extract unique categories
    const categories = [...new Set(quotes.map(q => q.category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter from local storage
    const lastFilter = localStorage.getItem("selectedCategory");
    if (lastFilter) {
        categoryFilter.value = lastFilter;
    }
}

// Function to display a random quote
function displayRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");

    if (!quoteDisplay || quotes.length === 0) {
        console.error("Error: No quotes available.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><em>- ${randomQuote.category}</em>`;
}

// Function to filter quotes based on category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save selection

    const quoteDisplay = document.getElementById("quoteDisplay");

    // Filter quotes
    const filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    // Update the DOM
    quoteDisplay.innerHTML = filteredQuotes.length > 0
        ? filteredQuotes.map(q => `<p>"${q.text}"</p><em>- ${q.category}</em>`).join("")
        : "<p>No quotes available for this category.</p>";
}

// Function to add a new quote
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });

        saveQuotes(); // Update local storage
        populateCategories(); // Update category filter
        filterQuotes(); // Apply filtering

        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Function to export quotes as JSON
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();

    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            quotes = [...quotes, ...importedQuotes]; // Merge imported quotes
            saveQuotes();
            populateCategories();
            filterQuotes();
            alert("Quotes imported successfully!");
        } catch (error) {
            alert("Error importing file. Ensure it is a valid JSON.");
        }
    };

    fileReader.readAsText(event.target.files[0]);
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
    document.getElementById("addQuoteButton").addEventListener("click", addQuote);
    document.getElementById("exportQuotes").addEventListener("click", exportQuotes);
    document.getElementById("importFile").addEventListener("change", importFromJsonFile);

    populateCategories(); // Populate category dropdown
    filterQuotes(); // Apply stored filter
    displayRandomQuote(); // Show a quote initially
});
