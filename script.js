const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" }
];

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const statusElement = document.getElementById("status");
const newQuoteButton = document.getElementById("new-quote");
const shareButton = document.getElementById("share-quote");

let currentIndex = -1;

function getRandomIndex() {
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === currentIndex && quotes.length > 1);
  return index;
}

function showQuote() {
  currentIndex = getRandomIndex();
  const quote = quotes[currentIndex];
  quoteElement.textContent = "“" + quote.text + "”";
  authorElement.textContent = "— " + quote.author;
  statusElement.textContent = "";
}

function getFormattedQuote() {
  return quoteElement.textContent + " " + authorElement.textContent;
}

function showStatus(message) {
  statusElement.textContent = message;
}

async function shareQuote() {
  const text = getFormattedQuote();

  if (navigator.share) {
    try {
      await navigator.share({ title: "Random Quote", text: text });
    } catch (error) {
      if (error.name !== "AbortError") {
        showStatus("Could not share the quote.");
      }
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showStatus("Quote copied to clipboard!");
  } catch (error) {
    showStatus("Could not copy the quote.");
  }
}

newQuoteButton.addEventListener("click", showQuote);
shareButton.addEventListener("click", shareQuote);

showQuote();
