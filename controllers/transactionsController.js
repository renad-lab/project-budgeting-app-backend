const express = require("express");
const transactions = express.Router();
const transactionsArray = require("../models/transaction");
const {
  validateTransaction,
} = require("../validations/transactionValidations");

// Existing routes for CRUD operations
transactions.get("/", (req, res) => {
  res.json(transactionsArray);
});

transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  if (transactionsArray[id]) {
    res.status(200).json(transactionsArray[id]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

transactions.post("/", validateTransaction, (req, res) => {
  transactionsArray.push(req.body);
  res.status(201).json(transactionsArray[transactionsArray.length - 1]);
});

transactions.put("/:id", validateTransaction, (req, res) => {
  const { id } = req.params;
  if (transactionsArray[id]) {
    transactionsArray[id] = req.body;
    res.status(200).json(transactionsArray[id]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (transactionsArray[id]) {
    let deletedTransaction = transactionsArray.splice(id, 1);
    res.status(200).json(deletedTransaction[0]);
  } else {
    res.status(404).send("Transaction Not Found");
  }
});

// // New route to fetch monthly sales data for chart
// transactions.get("/monthly-sales", (req, res) => {
//   try {
//     // Example: Aggregate monthly sales data
//     const monthlySalesData = {};

//     transactionsArray.forEach((transaction) => {
//       const month = transaction.date.substring(0, 7); // Extract YYYY-MM from date
//       if (!monthlySalesData[month]) {
//         monthlySalesData[month] = 0;
//       }
//       if (transaction.type === "sale") {
//         monthlySalesData[month] += transaction.amount;
//       }
//     });

//     // Prepare data for chart format
//     const chartData = {
//       labels: Object.keys(monthlySalesData),
//       datasets: [
//         {
//           label: "Monthly Sales",
//           data: Object.values(monthlySalesData),
//           backgroundColor: "rgba(75, 192, 192, 0.2)",
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 1,
//         },
//       ],
//     };

//     res.json(chartData);
//   } catch (error) {
//     console.error("Error fetching monthly sales data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = transactions;
