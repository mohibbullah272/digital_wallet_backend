
```markdown
# Digital Wallet Management System

A secure, scalable digital wallet API built with Node.js, Express, and Mongoose. This API provides role-based access control for users, agents, and administrators with features like wallet management, transactions, and commission tracking.

## Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Installation](#installation)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Wallet Operations](#wallet-operations)
  - [Transactions](#transactions)
  - [Agent Operations](#agent-operations)
  - [Admin Operations](#admin-operations)
- [Sample Data](#sample-data)
- [Error Handling](#error-handling)

## Project Overview

The Digital Wallet Api provides a complete backend solution for a digital wallet system with the following core functionalities:

* User registration and authentication
* Role-based access control (user, agent, admin)
* Wallet management with balance tracking
* Transaction processing (deposits, withdrawals, transfers)
* Agent commission system
* Administrative controls for system management

The API follows RESTful principles and uses functional programming patterns for maintainability and scalability.

## Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JWT (JSON Web Tokens) |
| Validation | Zod schema validation |
| Security | CORS, bcrypt for password hashing |
| Development | TypeScript, ESLint |
| Testing | Postman (for API testing) |

## Features

### Core Features
* **User Authentication**: Secure registration and login with JWT tokens
* **Wallet Management**: Create, view, and manage digital wallets
* **Transaction Processing**: Handle deposits, withdrawals, and transfers
* **Role-Based Access**: Different permissions for users, agents, and admins
* **Agent Commission System**: Track and manage agent commissions
* **Administrative Controls**: System configuration and user management

### Security Features
* Password hashing with bcrypt
* JWT-based authentication
* Request validation with Zod schemas
* CORS configuration


## Installation

### Prerequisites
* Node.js (v14 or higher)
* MongoDB (v4.4 or higher)
* npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohibbullah272/digital_wallet_backend
   cd digital-wallet-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DB_PASSWORD=your_password
   DB_USER=user_name
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   ```

4. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

5. **Initialize system parameters (Optional)**
   After starting the application, you need to create system parameters:
   * Register an admin user
   * Log in as admin
   * Make a GET request to `/api/admin/system-parameters` to initialize default parameters



## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "643a1b2c3d4e5f6789abcdef",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "643a1b2c3d4e5f6789abcdef",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Refresh Token
```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### User Management

#### Get User Profile
```http
GET /users/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "643a1b2c3d4e5f6789abcdef",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2023-05-01T00:00:00.000Z",
    "updatedAt": "2023-05-01T00:00:00.000Z"
  }
}
```

#### Update User Profile
```http
PUT /users/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User profile updated successfully",
  "data": {
    "_id": "643a1b2c3d4e5f6789abcdef",
    "name": "John Doe Updated",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "createdAt": "2023-05-01T00:00:00.000Z",
    "updatedAt": "2023-05-01T00:00:00.000Z"
  }
}
```

### Wallet Operations

#### Get User Wallet
```http
GET /wallets/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Wallet retrieved successfully",
  "data": {
    "_id": "643a1b2c3d4e5f6789abcdef0",
    "userId": "643a1b2c3d4e5f6789abcdef",
    "balance": 50,
    "status": "active",
    "createdAt": "2023-05-01T00:00:00.000Z",
    "updatedAt": "2023-05-01T00:00:00.000Z"
  }
}
```

#### Deposit Money
```http
POST /wallets/deposit
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 100,
  "description": "Test deposit"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Money deposited successfully",
  "data": {
    "wallet": {
      "_id": "643a1b2c3d4e5f6789abcdef0",
      "userId": "643a1b2c3d4e5f6789abcdef",
      "balance": 145,
      "status": "active",
      "createdAt": "2023-05-01T00:00:00.000Z",
      "updatedAt": "2023-05-01T00:00:00.000Z"
    },
    "transaction": {
      "_id": "643a1b2c3d4e5f6789abcdef5",
      "type": "deposit",
      "amount": 100,
      "fee": 5,
      "initiatedBy": "643a1b2c3d4e5f6789abcdef",
      "status": "completed",
      "referenceId": "TXN-1682899200000-123",
      "description": "Test deposit",
      "createdAt": "2023-05-01T00:00:00.000Z"
    }
  }
}
```

#### Withdraw Money
```http
POST /wallets/withdraw
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 50,
  "description": "Test withdrawal"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Money withdrawn successfully",
  "data": {
    "wallet": {
      "_id": "643a1b2c3d4e5f6789abcdef0",
      "userId": "643a1b2c3d4e5f6789abcdef",
      "balance": 90,
      "status": "active",
      "createdAt": "2023-05-01T00:00:00.000Z",
      "updatedAt": "2023-05-01T00:00:00.000Z"
    },
    "transaction": {
      "_id": "643a1b2c3d4e5f6789abcdef6",
      "type": "withdrawal",
      "amount": 50,
      "fee": 5,
      "initiatedBy": "643a1b2c3d4e5f6789abcdef",
      "status": "completed",
      "referenceId": "TXN-1682899200001-456",
      "description": "Test withdrawal",
      "createdAt": "2023-05-01T00:00:00.000Z"
    }
  }
}
```

#### Transfer Money
```http
POST /wallets/transfer
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "receiverId": "643a1b2c3d4e5f6789abcdf0",
  "amount": 30,
  "description": "Test transfer"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Money transferred successfully",
  "data": {
    "senderWallet": {
      "_id": "643a1b2c3d4e5f6789abcdef0",
      "userId": "643a1b2c3d4e5f6789abcdef",
      "balance": 55,
      "status": "active",
      "createdAt": "2023-05-01T00:00:00.000Z",
      "updatedAt": "2023-05-01T00:00:00.000Z"
    },
    "receiverWallet": {
      "_id": "643a1b2c3d4e5f6789abcdef1",
      "userId": "643a1b2c3d4e5f6789abcdf0",
      "balance": 80,
      "status": "active",
      "createdAt": "2023-05-01T00:00:00.000Z",
      "updatedAt": "2023-05-01T00:00:00.000Z"
    },
    "transaction": {
      "_id": "643a1b2c3d4e5f6789abcdef7",
      "type": "transfer",
      "amount": 30,
      "fee": 5,
      "senderId": "643a1b2c3d4e5f6789abcdef",
      "receiverId": "643a1b2c3d4e5f6789abcdf0",
      "initiatedBy": "643a1b2c3d4e5f6789abcdef",
      "status": "completed",
      "referenceId": "TXN-1682899200002-789",
      "description": "Test transfer",
      "createdAt": "2023-05-01T00:00:00.000Z"
    }
  }
}
```

### Transactions

#### Get User Transactions
```http
GET /transactions/me?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Transactions retrieved successfully",
  "data": {
    "transactions": [
      {
        "_id": "643a1b2c3d4e5f6789abcdef7",
        "type": "transfer",
        "amount": 30,
        "fee": 5,
        "senderId": "643a1b2c3d4e5f6789abcdef",
        "receiverId": "643a1b2c3d4e5f6789abcdf0",
        "initiatedBy": "643a1b2c3d4e5f6789abcdef",
        "status": "completed",
        "referenceId": "TXN-1682899200002-789",
        "description": "Test transfer",
        "createdAt": "2023-05-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "pages": 1
    }
  }
}
```

#### Get Specific Transaction
```http
GET /transactions/643a1b2c3d4e5f6789abcdef7
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Transaction retrieved successfully",
  "data": {
    "_id": "643a1b2c3d4e5f6789abcdef7",
    "type": "transfer",
    "amount": 30,
    "fee": 5,
    "senderId": "643a1b2c3d4e5f6789abcdef",
    "receiverId": "643a1b2c3d4e5f6789abcdf0",
    "initiatedBy": "643a1b2c3d4e5f6789abcdef",
    "status": "completed",
    "referenceId": "TXN-1682899200002-789",
    "description": "Test transfer",
    "createdAt": "2023-05-01T00:00:00.000Z"
  }
}
```

### Agent Operations

#### Get Agent Profile
```http
GET /agents/profile
```

**Headers:**
```
Authorization: Bearer <agent_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Agent profile retrieved successfully",
  "data": {
    "_id": "643a1b2c3d4e5f6789abcdef3",
    "userId": "643a1b2c3d4e5f6789abcdf0",
    "commissionRate": 2.5,
    "approvalStatus": "approved",
    "createdAt": "2023-05-01T00:00:00.000Z",
    "updatedAt": "2023-05-01T00:00:00.000Z"
  }
}
```

#### Cash-In (Agent adds money to user's wallet)
```http
POST /agents/cash-in
```

**Headers:**
```
Authorization: Bearer <agent_token>
```

**Request Body:**
```json
{
  "userId": "643a1b2c3d4e5f6789abcdef",
  "amount": 100,
  "description": "Test cash-in"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Cash-in successful",
  "data": {
    "userWallet": {
      "_id": "643a1b2c3d4e5f6789abcdef0",
      "userId": "643a1b2c3d4e5f6789abcdef",
      "balance": 155,
      "status": "active",
      "createdAt": "2023-05-01T00:00:00.000Z",
      "updatedAt": "2023-05-01T00:00:00.000Z"
    },
    "transaction": {
      "_id": "643a1b2c3d4e5f6789abcdef8",
      "type": "cash-in",
      "amount": 100,
      "commission": 2.5,
      "receiverId": "643a1b2c3d4e5f6789abcdef",
      "initiatedBy": "643a1b2c3d4e5f6789abcdf0",
      "status": "completed",
      "referenceId": "TXN-1682899200003-101",
      "description": "Test cash-in",
      "createdAt": "2023-05-01T00:00:00.000Z"
    }
  }
}
```

#### Get Agent Commissions
```http
GET /agents/commissions?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer <agent_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Commissions retrieved successfully",
  "data": {
    "transactions": [
      {
        "_id": "643a1b2c3d4e5f6789abcdef8",
        "type": "cash-in",
        "amount": 100,
        "commission": 2.5,
        "receiverId": "643a1b2c3d4e5f6789abcdef",
        "initiatedBy": "643a1b2c3d4e5f6789abcdf0",
        "status": "completed",
        "referenceId": "TXN-1682899200003-101",
        "description": "Test cash-in",
        "createdAt": "2023-05-01T00:00:00.000Z"
      }
    ],
    "totalCommission": 2.5,
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "pages": 1
    }
  }
}
```

### Admin Operations

#### Get All Users
```http
GET /admin/users?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "_id": "643a1b2c3d4e5f6789abcdef",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "01234567890",
        "role": "user",
        "status": "active",
        "createdAt": "2023-05-01T00:00:00.000Z",
        "updatedAt": "2023-05-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "pages": 1
    }
  }
}
```

#### Get All Agents
```http
GET /admin/agents?page=1&limit=10
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Agents retrieved successfully",
  "data": {
    "agents": [
      {
        "_id": "643a1b2c3d4e5f6789abcdef3",
        "userId": {
          "_id": "643a1b2c3d4e5f6789abcdf0",
          "name": "Agent Smith",
          "email": "agent@example.com",
          "phone": "09876543210",
          "status": "active"
        },
        "commissionRate": 2.5,
        "approvalStatus": "approved",
        "createdAt": "2023-05-01T00:00:00.000Z",
        "updatedAt": "2023-05-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "pages": 1
    }
  }
}
```

#### Block User Wallet
```http
PATCH /admin/wallets/block/643a1b2c3d4e5f6789abcdef0
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Wallet blocked successfully",
  "data": {
    "_id": "643a1b2c3d4e5f6789abcdef0",
    "userId": "643a1b2c3d4e5f6789abcdef",
    "balance": 155,
    "status": "blocked",
    "createdAt": "2023-05-01T00:00:00.000Z",
    "updatedAt": "2023-05-01T00:00:00.000Z"
  }
}
```

#### Get System Parameters
```http
GET /admin/system-parameters
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "System parameters retrieved successfully",
  "data": {
    "_id": "643a1b2c3d4e5f6789abcdef4",
    "transactionFee": 5,
    "userDailyLimit": 50000,
    "userMonthlyLimit": 200000,
    "agentDailyLimit": 200000,
    "agentMonthlyLimit": 1000000,
    "minBalance": 10,
    "createdAt": "2023-05-01T00:00:00.000Z",
    "updatedAt": "2023-05-01T00:00:00.000Z"
  }
}
```

#### Update System Parameters
```http
PUT /admin/system-parameters
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "transactionFee": 10,
  "minBalance": 20
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "System parameters updated successfully",
  "data": {
    "_id": "643a1b2c3d4e5f6789abcdef4",
    "transactionFee": 10,
    "userDailyLimit": 50000,
    "userMonthlyLimit": 200000,
    "agentDailyLimit": 200000,
    "agentMonthlyLimit": 1000000,
    "minBalance": 20,
    "createdAt": "2023-05-01T00:00:00.000Z",
    "updatedAt": "2023-05-01T00:00:00.000Z"
  }
}
```

## Sample Data

### Users
```json
{
  "users": [
    {
      "id": "643a1b2c3d4e5f6789abcdef",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active"
    },
    {
      "id": "643a1b2c3d4e5f6789abcdf0",
      "name": "Agent Smith",
      "email": "agent@example.com",
      "role": "agent",
      "status": "active"
    },
    {
      "id": "643a1b2c3d4e5f6789abcdf1",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "status": "active"
    }
  ]
}
```

### Wallets
```json
{
  "wallets": [
    {
      "id": "643a1b2c3d4e5f6789abcdef0",
      "userId": "643a1b2c3d4e5f6789abcdef",
      "balance": 50,
      "status": "active"
    },
    {
      "id": "643a1b2c3d4e5f6789abcdef1",
      "userId": "643a1b2c3d4e5f6789abcdf0",
      "balance": 50,
      "status": "active"
    },
    {
      "id": "643a1b2c3d4e5f6789abcdef2",
      "userId": "643a1b2c3d4e5f6789abcdf1",
      "balance": 50,
      "status": "active"
    }
  ]
}
```

### Agents
```json
{
  "agents": [
    {
      "id": "643a1b2c3d4e5f6789abcdef3",
      "userId": "643a1b2c3d4e5f6789abcdf0",
      "commissionRate": 2.5,
      "approvalStatus": "approved"
    }
  ]
}
```

### System Parameters
```json
{
  "systemParams": {
    "id": "643a1b2c3d4e5f6789abcdef4",
    "transactionFee": 5,
    "userDailyLimit": 50000,
    "userMonthlyLimit": 200000,
    "agentDailyLimit": 200000,
    "agentMonthlyLimit": 1000000,
    "minBalance": 10
  }
}
```



## Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common error codes:
* `400`: Bad Request (validation errors)
* `401`: Unauthorized (authentication issues)
* `403`: Forbidden (authorization issues)
* `404`: Not Found (resource not found)
* `500`: Internal Server Error


```

