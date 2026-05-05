# 🏦 Hub Bank Backend API

A robust, secure, and fully functional RESTful API built for a modern fintech application. This project handles user authentication, KYC validation, account generation, and secure financial transactions.

## 🚀 Features
* **User Authentication:** Secure signup and login using hashed passwords (bcrypt) and JWT tokens.
* **KYC Integration:** Fallback mechanism for BVN/NIN validation using a mock NIBSS service.
* **Account Generation:** Automatically generates unique 10-digit account numbers for new users.
* **Transaction Engine:** Supports both internal (Hub Bank to Hub Bank) and external (cross-bank) money transfers.
* **Database Security:** Hosted on MongoDB Atlas with Mongoose schema validation.

## 💻 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Security:** JSON Web Tokens (JWT), Bcrypt.js

## 📡 Core API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new customer |
| `POST` | `/api/auth/login` | Authenticate and get JWT |
| `POST` | `/api/transaction/send` | Transfer funds (Requires Auth) |

## 👨‍💻 Developer
Built as a capstone backend project focusing on routing, middleware, and database security.
# hub-bank-backend
