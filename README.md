# Digital-Backend-Banking.
This project is a backend implementation of a digital banking system built as part of a backend engineering assignment. The system simulates core banking operations including customer onboarding, account management, and fund transfers by integrating with the NibssByPhoenix API.

# 🏦 Andres Microfinance Bank – Backend System

##Overview

This project is a backend implementation of a digital banking system built as part of a backend engineering assignment. The system simulates core banking operations including customer onboarding, account management, and fund transfers by integrating with the NibssByPhoenix API.

---

##Features

### 1. Customer Onboarding

* Users register using **BVN or NIN**
* Integration with NibssByPhoenix API for identity verification
* Only verified users are onboarded
* Automatically creates a bank account after successful verification

---

### 2. Account Management

* Each user is assigned **one unique account**
* Accounts are pre-funded with **₦15,000**
* Users can:

  * Check account balance
  * View account details

---

### 3. Fund Transfers

####Intra-Bank Transfer

* Transfers between accounts within Andres Microfinance Bank
* Processed internally without external API calls

####Inter-Bank Transfer

* Transfers to other banks
* Processed via NibssByPhoenix API

---

### 4. Transaction Management

* Every transfer is recorded as a transaction
* Each transaction includes:

  * Unique reference ID
  * Status (pending, success, failed)
  * Transfer type (intra-bank or inter-bank)

---

### 5. Transaction Status Tracking

* Transactions can be queried using reference ID
* Status can be synced with NibssByPhoenix API

---

### 6. Authentication & Security

* JWT-based authentication
* Protected routes for all sensitive operations
* Users can only access their own data

---

##System Architecture

###Structure

/project
├── controllers/ → Business logic
├── models/ → Database schemas
├── routes/ → API endpoints
├── services/ → External API (NibssByPhoenix)
├── middleware/ → Authentication
├── app.js → App configuration
└── server.js → Server startup

---

###Flow

1. User registers with BVN/NIN
2. Backend calls NibssByPhoenix API for verification
3. User is created after successful verification
4. Account is generated and pre-funded
5. User logs in and receives JWT
6. User performs operations (transfer, balance check, etc.)

---

##API Endpoints

###Auth

* POST /api/register
* POST /api/login

###Account

* GET /api/accounts
* GET /api/account/balance/:accountNumber
* GET /api/account/name-enquiry/:accountNumber

###Transactions

* POST /api/transfer
* GET /api/transaction/:ref
* GET /api/transaction/sync/:ref

---

##Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Axios (External API calls)
* JWT Authentication

---

##Testing

* Use Postman to test all endpoints
* Include Authorization header for protected routes:

Authorization: Bearer <token>

---

##Notes

* All BVN/NIN used are test values (no real data)
* External API integration handled via service layer
* Designed with scalability and separation of concerns

---

##Author

Andres Microfinance Bank Backend System
