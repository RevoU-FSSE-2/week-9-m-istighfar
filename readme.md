# Express MySQL API

This project provides a RESTful API built using Express.js and MySQL for managing users and their transactions.

## Features

- Fetch details of all users.
- Retrieve a specific user's details, including a summary of their balance and expenses.
- Manage transactions for users: create, update, and delete transactions.

## Prerequisites

- Node.js installed
- MySQL server running

## Creating Database Table

- Users Table

![users](users.png)

- Transactions Table

![trans](trans.png)

## API Endpoints

| Endpoint                | Method | Description                                                                            |
| ----------------------- | ------ | -------------------------------------------------------------------------------------- |
| `/users`                | GET    | Retrieves a list of all users.                                                         |
| `/users/:id`            | GET    | Retrieves details of a specific user by ID, including their balance and total expense. |
| `/transaction`          | GET    | Retrieves a list of all transactions.                                                  |
| `/transaction/user/:id` | GET    | Retrieves all transactions for a specific user by their ID.                            |
| `/transaction/:id`      | GET    | Retrieves details of a specific transaction by its ID.                                 |
| `/transaction`          | POST   | Adds a new transaction.                                                                |
| `/transaction/:id`      | PUT    | Updates a specific transaction by its ID.                                              |
| `/transaction/:id`      | DELETE | Deletes a specific transaction by its ID.                                              |
