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

| Endpoint                | Method | Description                                                                            | Parameters                                                      |
| ----------------------- | ------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `/users`                | GET    | Retrieves a list of all users.                                                         | None                                                            |
| `/users/:id`            | GET    | Retrieves details of a specific user by ID, including their balance and total expense. | `id`: User ID                                                   |
| `/transaction`          | GET    | Retrieves a list of all transactions.                                                  | None                                                            |
| `/transaction/user/:id` | GET    | Retrieves all transactions for a specific user by their ID.                            | `id`: User ID                                                   |
| `/transaction/:id`      | GET    | Retrieves details of a specific transaction by its ID.                                 | `id`: Transaction ID                                            |
| `/transaction`          | POST   | Adds a new transaction.                                                                | `user_id`: User ID, `type`: Transaction Type, `amount`: Amount  |
| `/transaction/:id`      | PUT    | Updates a specific transaction by its ID.                                              | `id`: Transaction ID + Body Params: `user_id`, `type`, `amount` |
| `/transaction/:id`      | DELETE | Deletes a specific transaction by its ID.                                              | `id`: Transaction ID                                            |
