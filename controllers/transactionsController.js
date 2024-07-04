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
const { customAlphabet } = require("nanoid");
const path = require("path");

const transactions = express.Router();
const transactionsArray = require("../models/transaction");
const {
  validateTransaction,
} = require("../validations/transactionValidations");

// Serve static files from the 'models' directory
transactions.use(express.static(path.join(__dirname, "../models")));

// Create a custom nanoid generator for 2-character IDs
const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  2
);

// Existing routes for CRUD operations
transactions.get("/", (req, res) => {
  res.json(transactionsArray);
});

transactions.get("/:index", (req, res) => {
  const { index } = req.params;
  const transaction = transactionsArray[parseInt(index)];
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

transactions.post("/", validateTransaction, (req, res) => {
  const id = nanoid();
  const newTransaction = {
    id: id,
    ...req.body,
  };

  transactionsArray.push(newTransaction);
  res.status(201).json(newTransaction);
});

transactions.put("/:index", validateTransaction, (req, res) => {
  const { index } = req.params;
  const idx = parseInt(index);
  if (transactionsArray[idx]) {
    transactionsArray[idx] = {
      id: transactionsArray[idx].id, // Preserve the original id
      ...req.body,
    };
    res.status(200).json(transactionsArray[idx]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

transactions.delete("/:index", (req, res) => {
  const { index } = req.params;
  const idx = parseInt(index);
  if (transactionsArray[idx]) {
    const deletedTransaction = transactionsArray.splice(idx, 1);
    res.status(200).json(deletedTransaction[0]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

module.exports = transactions;
