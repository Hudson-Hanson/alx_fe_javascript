// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById("quoteDisplay").innerText = "No quotes available.";
        return;
    }
    
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let quote = quotes[randomIndex];
    
    document.getElementById("quoteDisplay").innerHTML = `<p>"${quote.text}"</p><p><strong>Category:</strong> ${quote.category}</p>`;
}

// Function to add a new quote
function addQuote() {
    let text = document.getElementById("newQuoteText").value.trim();
    let category = document.getElementById("newQuoteCategory").value.trim();
    
    if (text === "" || category === "") {
        alert("Both fields are required!");
        return;
    }

    quotes.push({ text, category });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuote").addEventListener("click", addQuote);

function addQuote(text, category) {
    if (!text || !category) {
        console.error("Quote text and category are required.");
        return;
    }

    // Add new quote to the quotes array
    quotes.push({ text, category });

    // Update the DOM with the new quote
    displayRandomQuote();
}

const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" }
];

function displayRandomQuote() {
    if (quotes.length === 0) {
        console.error("No quotes available.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    document.getElementById("quoteText").innerText = randomQuote.text;
    document.getElementById("quoteCategory").innerText = randomQuote.category;
}

document.getElementById("newQuoteButton").addEventListener("click", () => {
    displayRandomQuote();
});
