const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

const getTodos = async (req, res) => {
  const { user } = req.params;

  try {
    await pool.query("SELECT * FROM todos WHERE user_email = $1", [user], (err, result) => {
      if (err) {
        console.log(err);
        throw new Error(err + " in get all todos");
      }
      res.json(result.rows);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error + " in get all todos");
  }
};

const createTodo = async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(req.body);
  const id = uuidv4();

  try {
    pool.query(
      "INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)",
      [id, user_email, title, progress, date],
      (err, result) => {
        if (err) {
          console.log(err);
          throw new Error(err + " in create a todo");
        }
        res.json(result.rows);
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error + " in create a todo");
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;

  try {
    await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;",
      [user_email, title, progress, date, id],
      (err, result) => {
        if (err) {
          console.log(err);
          throw new Error(err + " in update a todo");
        }
        res.json(result.rows);
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error + " in update a todo");
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todos WHERE id = $1;", [id], (err, result) => {
      if (err) {
        console.log(err);
        throw new Error(err + " in delete a todo");
      }
      res.json(result.rows);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error + " in delete a todo");
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
