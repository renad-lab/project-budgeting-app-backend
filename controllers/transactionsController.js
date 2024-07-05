const express = require("express");
// const { customAlphabet } = require("nanoid");
const path = require("path");

const transactions = express.Router();
const transactionsArray = require("../models/transaction");
const {
  validateTransaction,
} = require("../validations/transactionValidations");

// Serve static files from the 'models' directory
transactions.use(express.static(path.join(__dirname, "../models")));

// Create a custom nanoid generator for 2-character IDs
// const nanoid = customAlphabet(
//   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//   2
// );

// Existing routes for CRUD operations
transactions.get("/", (req, res) => {
  res.json(transactionsArray);
});

transactions.get("/:index", (req, res) => {
  const { index } = req.params;
  const transaction = transactionsArray.find(
    (transaction) => transaction.id === parseInt(index)
  );
  // const transaction = transactionsArray[parseInt(index)];
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

transactions.post("/", validateTransaction, (req, res) => {
  const id = req.body.id;
  const newTransaction = {
    id: parseInt(id),
    ...req.body,
  };

  transactionsArray.push(newTransaction);
  res.status(201).json(newTransaction);
});

transactions.put("/:index", validateTransaction, (req, res) => {
  const { index } = req.params;
  const idx = parseInt(index);
  const foundTransaction = transactionsArray.findIndex(
    (transaction) => transaction.id === idx
  );
  if (transactionsArray[foundTransaction]) {
    transactionsArray[foundTransaction] = {
      // id: transactionsArray[idx].id, // Preserve the original id
      ...req.body,
    };
    res.status(200).json(transactionsArray[foundTransaction]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

transactions.delete("/:index", (req, res) => {
  const { index } = req.params;
  const idx = parseInt(index);
  const foundTransaction = transactionsArray.findIndex(
    (transaction) => transaction.id === idx
  );
  if (transactionsArray[foundTransaction]) {
    const deletedTransaction = transactionsArray.splice(foundTransaction, 1);
    res.status(200).json(deletedTransaction[0]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

module.exports = transactions;
