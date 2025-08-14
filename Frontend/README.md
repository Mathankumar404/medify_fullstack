# Product Management Application

A full-stack web application for managing products built with React, Node.js, Express, and MySQL.

## Features

### Frontend
- ✅ Add new products with name and description
- ✅ View all products in a responsive grid layout
- ✅ Update existing product details
- ✅ Delete products with confirmation
- ✅ Real-time search and filtering
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Toast notifications for user feedback
- ✅ Loading states and error handling

### Backend
- ✅ RESTful API endpoints for all CRUD operations
- ✅ MySQL database integration
- ✅ Proper error handling and HTTP status codes
- ✅ Input validation and sanitization
- ✅ CORS support for cross-origin requests

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL 8.0+
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- MySQL 8.0+

### Database Setup

1. Install and start MySQL
2. Create a new database:
   ```sql
   CREATE DATABASE product_management;
   ```
3. Update database credentials in `server/config/database.js`

### Installation & Running

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development servers:
   ```bash
   npm run dev
   ```

This will start:
- Frontend dev server on http://localhost:3000
- Backend API server on http://localhost:5000

### Environment Variables

Create a `.env` file in the root directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=product_management
PORT=5000
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search?q=query` - Search products

## Project Structure

```
├── Backend/                 # Backend code
│   ├── server.cjs/            # Database configuration
│   ├── package.json/
|   ├── package-lock.json/
├── src/                  # Frontend code
│   ├── components/       # React components
│   ├── hooks/           # Custom hooks
│   ├── services/        # API services
│   └── App.tsx          # Main App component
└── package.json
```

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
