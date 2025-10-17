// Default array of quote objects used if localStorage is empty
const defaultQuotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Strive not to be a success, but rather to be of value.", category: "Motivation" },
    { text: "The mind is everything. What you think you become.", category: "Wisdom" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "The best way to predict the future is to create it.", category: "Action" }
];

// The main mutable array that holds all quotes (defaults to empty until loaded)
let quotes = [];

// --- Web Storage Functions (Task 1) ---

/**
 * Loads quotes from localStorage, or uses default quotes if storage is empty.
 */
function loadQuotes() {
    try {
        const storedQuotes = localStorage.getItem('quotes');
        if (storedQuotes) {
            // Parse the stored JSON string back into a JavaScript object
            quotes = JSON.parse(storedQuotes);
        } else {
            // If nothing is stored, use the default quotes
            quotes = defaultQuotes;
            saveQuotes(); // Optionally save defaults immediately
        }
    } catch (e) {
        console.error("Error loading quotes from localStorage:", e);
        quotes = defaultQuotes; // Fallback to defaults on error
    }
}

/**
 * Saves the current quotes array to localStorage.
 */
function saveQuotes() {
    try {
        // Stringify the JavaScript object into a JSON string before storing
        localStorage.setItem('quotes', JSON.stringify(quotes));
    } catch (e) {
        console.error("Error saving quotes to localStorage:", e);
    }
}

// --- DOM Manipulation Functions (Task 0) ---

/**
 * Updates the DOM to display a random quote from the 'quotes' array.
 */
function showRandomQuote() {
    const display = document.getElementById('quoteDisplay');
    
    // Check if quotes array is empty
    if (quotes.length === 0) {
        display.innerHTML = `
            <p class="text-xl text-red-500">No quotes available. Please add some!</p>
        `;
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Advanced DOM Manipulation: Clear and create structured elements
    display.innerHTML = ''; // Clear previous content

    // Create the quote text element
    const quoteText = document.createElement('p');
    quoteText.className = 'text-3xl sm:text-4xl font-serif italic mb-4 text-gray-800 leading-snug';
    quoteText.textContent = `“${quote.text}”`;

    // Create the category/author element
    const quoteCategory = document.createElement('p');
    quoteCategory.className = 'text-lg font-medium text-indigo-600 mt-4 border-l-4 border-indigo-400 pl-4';
    quoteCategory.textContent = `— Category: ${quote.category}`;

    // Append the new elements to the display container
    display.appendChild(quoteText);
    display.appendChild(quoteCategory);
}

/**
 * Handles user input from the form, validates it, adds the new quote to the 'quotes' array,
 * saves the updated array to localStorage, and provides feedback to the user.
 */
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const feedback = document.getElementById('feedbackMessage');

    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text && category) {
        // Add new quote to the array
        quotes.push({ text, category });
        
        // Save updated array to storage (Task 1)
        saveQuotes();

        // Clear inputs
        newQuoteText.value = '';
        newQuoteCategory.value = '';

        // Show success feedback
        feedback.textContent = 'Quote added successfully and saved!';
        feedback.classList.remove('opacity-0', 'text-red-500');
        feedback.classList.add('text-green-500');
        
        // Show the newly added quote
        showRandomQuote();

        // Hide feedback after a delay
        setTimeout(() => feedback.classList.add('opacity-0'), 2000);

    } else {
        // Show error feedback
        feedback.textContent = 'Please fill both quote text and category.';
        feedback.classList.remove('opacity-0', 'text-green-500');
        feedback.classList.add('text-red-500');
        
        // Hide feedback after a delay
        setTimeout(() => feedback.classList.add('opacity-0'), 3000);
    }
}

/**
 * Main initialization function
 */
function initializeApp() {
    // Load quotes from storage first (Task 1)
    loadQuotes();

    // 1. Initial quote display
    showRandomQuote();
    
    // 2. Attach event listener to the "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    
    // 3. Attach event listener to the "Add Quote" button
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// Initialize the application when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
