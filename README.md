# Multi-Store Stock Movement

A full-stack web application for managing product stock across multiple stores. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Roles
- **Admin**: Can create products, stores, adjust stock, and transfer stock between stores.
- **Shopper**: Can browse products and view available stock at each store (read-only).

## Prerequisites
- Node.js (v18+)
- MongoDB (running locally or via MongoDB Atlas)
- npm 

## Setup and Run Instructions

### 1. Database Setup
Ensure MongoDB is running on your machine on port 27017, or obtain a MongoDB Atlas URI. 
The backend will automatically create necessary collections upon first start.

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and configure your settings:
   ```bash
   cp .env.example .env
   ```
   *Make sure to provide your MongoDB URI and a secure JWT Secret.*
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:3000` (or your configured port).

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser (usually `http://localhost:5173`).

## Environment Variables

**Backend (`Backend/.env`)**
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/multistore
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
```

**Frontend (`Frontend/.env`)**
```env
VITE_API_URL=http://localhost:3000/api
```

## Running Tests
*Note: Ensure you have `jest` installed and configured as per your testing setup.*
To run the automated tests for core stock and transfer logic:
```bash
cd Backend
npm test
```

## Assumptions and Trade-offs
- The application assumes all users must be registered and authenticated (JWT) to view stock.
- Error handling is standardized to return a JSON object with `{ "success": false, "message": "..." }`.
- Pagination and advanced filtering (beyond the low-stock threshold) are kept minimal to prioritize the core stock operations.
