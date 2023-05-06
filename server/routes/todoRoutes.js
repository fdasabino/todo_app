const express = require("express");
const router = express.Router();

const { createTodo, getTodos, updateTodo, deleteTodo } = require("../controllers/todoControllers");

// * get all todos
router.get("/todos/:user", getTodos);

// * create a todo
router.post("/todos", createTodo);

// * update a todo
router.put("/todos/:id", updateTodo);

// * delete a todo
router.delete("/todos/:id", deleteTodo);

module.exports = router;
