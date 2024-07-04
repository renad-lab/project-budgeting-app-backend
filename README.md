# Project Budgeting App - Backend

This is the backend for the Project Budgeting App, designed to manage financial transactions for a small coffee bean shop.

## Technologies Used

- **Node.js**: Runtime environment for JavaScript.
- **Express.js**: Web framework for Node.js.
- **Render**: Platform for deploying web applications.

## Getting Started

To get the backend server running locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/renad-lab/project-budgeting-app-backend.git
   cd project-budgeting-app-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the server:**

   ```bash
   npm start
   ```

## API Endpoints

- **GET /transactions**: Get all transactions.
- **POST /transactions**: Add a new transaction.
- **GET /transactions/:id**: Get a transaction by ID.
- **PUT /transactions/:id**: Update a transaction by ID.
- **DELETE /transactions/:id**: Delete a transaction by ID.

## Deployment

The backend is deployed on Render. You can access it at [Render Dashboard](https://project-budgeting-app-backend-3zjg.onrender.com/transactions/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
