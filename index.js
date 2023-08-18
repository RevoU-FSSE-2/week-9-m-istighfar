const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const commonResponse = function (data, error) {
  if (error) {
    return {
      success: false,
      error: error,
    };
  }
  return {
    success: true,
    data: data,
  };
};

const mysqlCon = mysql.createConnection({
  host: "containers-us-west-137.railway.app",
  port: "7771",
  user: "root",
  password: "1ZyciMOL2UsHkn0SIis5M",
  database: "railway",
});

mysqlCon.connect((err) => {
  if (err) throw err;

  console.log("mysql successfully connected");
});

app.use(bodyParser.json());

app.get("/users", (request, response) => {
  const query = `SELECT
                        *
                 FROM
                        users`;

  mysqlCon.query(query, (err, result, fields) => {
    if (err) {
      console.error(err);
      response.status(500).json(commonResponse(null, "server error"));
      response.end();
      return;
    }

    response.status(200).json(commonResponse(result, null));
    response.end();
  });
});

app.get("/users/:id", (request, response) => {
  const id = request.params.id;
  const query = `SELECT
                    users.id,
                    users.name,
                    users.address,
                SUM(
                    CASE
                        WHEN transactions.type = 'income' THEN transactions.amount
                        ELSE 0
                    END
                ) - SUM(
                    CASE
                        WHEN transactions.type = 'expense' THEN transactions.amount
                        ELSE 0
                    END
                ) as balance,
                SUM(
                    CASE
                        WHEN transactions.type = 'expense' THEN transactions.amount
                        ELSE 0
                    END
                ) as expense
                FROM
                    users
                LEFT JOIN transactions ON users.id = transactions.user_id
                WHERE
                    users.id = ?
                GROUP BY
                    users.id;`;

  mysqlCon.query(query, id, (err, result, fields) => {
    if (err) {
      console.error(err);
      response.status(500).json(commonResponse(null, "server error"));
      response.end();
      return;
    }

    if (result.length === 0) {
      response.status(404).json(commonResponse(null, "User tidak ditemukan"));
      response.end();
      return;
    }

    response.status(200).json(result[0]);
    response.end();
  });
});

app.get("/transaction", (request, response) => {
  const query = `SELECT * FROM transactions`;

  mysqlCon.query(query, (err, result, fields) => {
    if (err) {
      console.error(err);
      response.status(500).json(commonResponse(null, "server error"));
      response.end();
      return;
    }

    response.status(200).json(commonResponse(result, null));
    response.end();
  });
});

app.get("/transaction/user/:id", (request, response) => {
  const id = request.params.id;
  const query = `SELECT * FROM transactions WHERE user_id = ?`;

  mysqlCon.query(query, [id], (err, result, fields) => {
    if (err) {
      console.error(err);
      response.status(500).json(commonResponse(null, "server error"));
      response.end();
      return;
    }

    if (result.length === 0) {
      response
        .status(404)
        .json(commonResponse(null, "Tidak ada transaksi pada id ini"));
      response.end();
      return;
    }

    response.status(200).json(commonResponse(result, null));
    response.end();
  });
});

app.get("/transaction/:id", (request, response) => {
  const id = request.params.id;
  const query = `SELECT * FROM transactions WHERE id = ?`;

  mysqlCon.query(query, [id], (err, result, fields) => {
    if (err) {
      console.error(err);
      response.status(500).json(commonResponse(null, "server error"));
      response.end();
      return;
    }

    if (result.length === 0) {
      response
        .status(404)
        .json(commonResponse(null, "transaction tidak ditemukan"));
      response.end();
      return;
    }

    response.status(200).json(commonResponse(result[0], null));
    response.end();
  });
});

app.post("/transaction", (request, response) => {
  const body = request.body;

  const query = `INSERT INTO
                    transactions (user_id, type, amount)
                VALUES
                    (?, ?, ?)`;

  mysqlCon.query(
    query,
    [body.user_id, body.type, body.amount],
    (err, result, fields) => {
      if (err) {
        response.status(500).json(commonResponse(null, "server error"));
        response.end();
        return;
      }
      response.status(200).json({ id: result.insertId });
      response.end();
    }
  );
});

app.put("/transaction/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const query = `UPDATE
                    transactions
                SET
                    user_id = ?,
                    type = ?,
                    amount = ?
                WHERE
                    id = ?`;

  mysqlCon.query(
    query,
    [body.user_id, body.type, body.amount, id],
    (err, result, fields) => {
      if (err) {
        response.status(500).json(commonResponse(null, "server error"));
        response.end();
        return;
      }

      if (result.affectedRows === 0) {
        response
          .status(404)
          .json(commonResponse(null, "Transaksi tidak ditemukan"));
        response.end();
        return;
      }

      response.status(200).json({ id: id });
      response.end();
    }
  );
});

app.delete("/transaction/:id", (request, response) => {
  const id = request.params.id;
  const query = `DELETE FROM
                    transactions
                WHERE
                    id = ?`;

  mysqlCon.query(query, id, (err, result, fields) => {
    if (err) {
      response.status(500).json(commonResponse(null, "server error"));
      response.end();
      return;
    }

    if (result.affectedRows === 0) {
      response
        .status(404)
        .json(commonResponse(null, "Transaksi tidak ditemukan"));
      return;
    }
    response.status(200).json({ id: id });
    response.end();
  });
});

app.listen(3000, () => {
  console.log("running in 3000");
});
