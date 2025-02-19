const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API for simulation

// Load quotes from local storage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to fetch quotes from a simulated server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch server data");

        const serverQuotes = await response.json();

        // Simulated transformation of fetched quotes
        const formattedQuotes = serverQuotes.slice(0, 5).map(q => ({
            text: q.title,
            category: "General"
        }));

        resolveConflicts(formattedQuotes);
    } catch (error) {
        console.error("Error fetching from server:", error);
    }
}

// Function to sync local quotes with the server
async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuote)
        });

        if (!response.ok) throw new Error("Failed to post quote to server");

        console.log("Quote successfully posted to server:", await response.json());
    } catch (error) {
        console.error("Error posting quote:", error);
    }
}

// Function to add a new quote
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
        const newQuote = { text: newQuoteText, category: newQuoteCategory };

        // Add new quote to the array and local storage
        quotes.push(newQuote);
        saveQuotes();

        // Post the new quote to the server
        postQuoteToServer(newQuote);

        // Clear input fields
        quoteInput.value = "";
        categoryInput.value = "";

        // Update UI
        displayRandomQuote();
    } else {
        alert("Please enter both quote text and category.");
    }
}

// Function to notify user about sync updates
function notifyUser(message) {
    const notification = document.createElement("div");
    notification.innerText = message;
    notification.style.position = "fixed";
    notification.style.bottom = "10px";
    notification.style.right = "10px";
    notification.style.padding = "10px";
    notification.style.backgroundColor = "green";
    notification.style.color = "white";
    notification.style.borderRadius = "5px";
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Auto-sync with the server every 30 seconds
setInterval(fetchQuotesFromServer, 30000);

// Fetch quotes when the page loads
document.addEventListener("DOMContentLoaded", fetchQuotesFromServer);
