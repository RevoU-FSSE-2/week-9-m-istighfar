# Express MySQL API

This application provides a simple backend service to manage users and their respective transactions. The data is stored in a MySQL database and exposes several endpoints to interact with the data.

## Tech Stack

- Javascript
- Node.js
- Express.js
- MySQL as Databse

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
| `/users/:id`            | DELETE | Deletes a specific user by its ID.                                                     | `id`: User ID                                                   |

## Deployment

The project has been successfully deployed using Cyclic and Railway for database. You can access the production version of the website by following this link: [https://shy-red-belt.cyclic.cloud/](https://shy-red-belt.cyclic.cloud/).
