// const express = require("express");
// const { nanoid } = require("nanoid");
// const path = require("path");

// const transactions = express.Router();
// const transactionsArray = require("../models/transaction");
// const {
//   validateTransaction,
// } = require("../validations/transactionValidations");

// // Serve static files from the 'models' directory
// transactions.use(express.static(path.join(__dirname, "../models")));

// // Existing routes for CRUD operations
// transactions.get("/", (req, res) => {
//   res.json(transactionsArray);
// });

// transactions.get("/:id", (req, res) => {
//   const { id } = req.params;
//   if (transactionsArray[id]) {
//     res.status(200).json(transactionsArray[id]);
//   } else {
//     res.status(404).send("Transaction Not Found");
//   }
// });

// // transactions.post("/", validateTransaction, (req, res) => {
// //   transactionsArray.push(req.body);
// //   res.status(201).json(transactionsArray[transactionsArray.length - 1]);
// // });

// transactions.post("/", validateTransaction, (req, res) => {
//   const id = nanoid();
//   const newTransaction = {
//     id: id,
//     ...req.body,
//   };

//   transactionsArray.push(newTransaction);
//   res.status(201).json(newTransaction);
// });

// transactions.put("/:id", validateTransaction, (req, res) => {
//   const { id } = req.params;
//   if (transactionsArray[id]) {
//     transactionsArray[id] = req.body;
//     res.status(200).json(transactionsArray[id]);
//   } else {
//     res.status(404).send("Transaction Not Found");
//   }
// });

// transactions.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   if (transactionsArray[id]) {
//     let deletedTransaction = transactionsArray.splice(id, 1);
//     res.status(200).json(deletedTransaction[0]);
//   } else {
//     res.status(404).send("Transaction Not Found");
//   }
// });

// module.exports = transactions;

const express = require("express");
const { nanoid } = require("nanoid");
const path = require("path");

const transactions = express.Router();
const transactionsArray = require("../models/transaction");
const {
  validateTransaction,
} = require("../validations/transactionValidations");

// Import nanoid and customAlphabet
const { customAlphabet } = require("nanoid");

// Define a custom alphabet including only characters you want (e.g., alphanumeric)
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// Create a nanoid generator with a length of 2 characters
const generateShortId = customAlphabet(alphabet, 2);

// Serve static files from the 'models' directory
transactions.use(express.static(path.join(__dirname, "../models")));

transactions.get("/", (req, res) => {
  res.json(transactionsArray);
});

transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  const transaction = transactionsArray.find((t) => t.id === id);
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

transactions.post("/", validateTransaction, (req, res) => {
  const id = generateShortId(); // Generate a 2-character nanoid
  const newTransaction = {
    id: id,
    ...req.body,
  };

  transactionsArray.push(newTransaction);
  res.status(201).json(newTransaction);
});

transactions.put("/:id", validateTransaction, (req, res) => {
  const { id } = req.params;
  const index = transactionsArray.findIndex((t) => t.id === id);
  if (index !== -1) {
    transactionsArray[index] = { id, ...req.body };
    res.status(200).json(transactionsArray[index]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = transactionsArray.findIndex((t) => t.id === id);
  if (index !== -1) {
    const deletedTransaction = transactionsArray.splice(index, 1);
    res.status(200).json(deletedTransaction[0]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

module.exports = transactions;
