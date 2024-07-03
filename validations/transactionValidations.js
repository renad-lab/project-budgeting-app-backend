const validateTransaction = (req, res, next) => {
  const { amount, date, category, type, description } = req.body;

  // Convert amount to number type
  const parsedAmount = parseFloat(amount); // Parse as float to handle decimals

  // Check if any required fields are missing
  if (!parsedAmount || !date || !category || !type || !description) {
    return res.status(400).json({
      error:
        "All fields (amount, date, category, type, description) are required.",
    });
  }

  // Check if amount is not a valid number or is negative
  if (isNaN(parsedAmount)) {
    return res.status(400).json({ error: "Amount must be a valid number." });
  }

  // Check if date is a valid date string
  if (isNaN(Date.parse(date))) {
    return res.status(400).json({ error: "Date must be a valid date string." });
  }

  // Check if type is either 'income' or 'expense'
  if (!["income", "expense"].includes(type)) {
    return res
      .status(400)
      .json({ error: "Type must be either 'income' or 'expense'." });
  }

  // Check if description length is within limit
  if (description.length > 100) {
    return res
      .status(400)
      .json({ error: "Description must be 100 characters or less." });
  }

  // If all validations pass, proceed to the next middleware
  next();
};

module.exports = { validateTransaction };
