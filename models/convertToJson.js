const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "transaction.js");
const outputFile = path.join(__dirname, "data.json");

// Use require to safely import the transactions array
let transactions;
try {
  transactions = require(inputFile);
} catch (error) {
  console.error("Error reading or parsing the transactions.js file:", error);
  process.exit(1);
}

// Write to JSON file
try {
  fs.writeFileSync(outputFile, JSON.stringify(transactions, null, 2));
  console.log("Conversion complete. JSON file created at:", outputFile);
} catch (error) {
  console.error("Error writing the JSON file:", error);
}
