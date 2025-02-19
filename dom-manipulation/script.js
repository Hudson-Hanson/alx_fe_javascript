// Load quotes from local storage if available
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    { text: "Do what you can, with what you have, where you are.", category: "Life" }
];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

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

    // Create elements dynamically
    quoteDisplay.innerHTML = ""; // Clear previous content
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${randomQuote.text}"`;

    const quoteCategory = document.createElement("em");
    quoteCategory.textContent = `- ${randomQuote.category}`;

    // Append elements to the quote display
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);

    // Store last viewed quote in session storage
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Function to restore last viewed quote from session storage
function restoreLastQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
    if (lastQuote) {
        const quoteDisplay = document.getElementById("quoteDisplay");
        quoteDisplay.innerHTML = `<p>"${lastQuote.text}"</p><em>- ${lastQuote.category}</em>`;
    }
}

// Function to add a new quote to the array and update local storage
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

        // Save to local storage
        saveQuotes();

        // Clear input fields
        quoteInput.value = "";
        categoryInput.value = "";

        // Update the DOM immediately
        showRandomQuote();
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Function to export quotes as a JSON file
function exportToJsonFile() {
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quotes.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert("Quotes imported successfully!");
                showRandomQuote();
            } else {
                alert("Invalid JSON format. Make sure it's an array of quotes.");
            }
        } catch (error) {
            alert("Error reading JSON file.");
            console.error(error);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
    const showNewQuoteButton = document.getElementById("newQuote");
    const addQuoteButton = document.getElementById("addQuoteButton");
    const exportButton = document.getElementById("exportQuotes");
    const importFileInput = document.getElementById("importFile");

    if (showNewQuoteButton) showNewQuoteButton.addEventListener("click", showRandomQuote);
    if (addQuoteButton) addQuoteButton.addEventListener("click", createAddQuoteForm);
    if (exportButton) exportButton.addEventListener("click", exportToJsonFile);
    if (importFileInput) importFileInput.addEventListener("change", importFromJsonFile);

    // Load last viewed quote from session storage (if available)
    restoreLastQuote();

    // Display an initial quote when the page loads
    showRandomQuote();
});
