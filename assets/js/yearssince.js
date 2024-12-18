// Calculate the number of years since 2017
const currentYear = new Date().getFullYear();
const yearsSince2017 = currentYear - 2017;

// Function to convert numbers to words (basic example for small numbers)
function numberToWords(num) {
    const words = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", 
        "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", 
        "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"
    ];
    return words[num] || num.toString(); // Fallback to numeral if not in the range
}

// Convert the result into a word
const yearsInWords = numberToWords(yearsSince2017);

// Display the word in the sentence
document.getElementById('years-since').textContent = yearsInWords;