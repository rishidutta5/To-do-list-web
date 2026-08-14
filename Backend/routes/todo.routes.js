const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { updateTodo, createTodo, viewTodo, removeTodo } = require("../controller/todo.controller");
const { model, default: mongoose } = require("mongoose");
const router = require("./user.routes");

const todoRouter = express.Router();

//view todo
todoRouter.get("/", auth, viewTodo);

//create Todo
todoRouter.post("/", auth, createTodo);

//update Todo
todoRouter.put("/:id", auth, updateTodo);

//remove Todo
todoRouter.delete("/:id", auth, removeTodo);

module.exports = todoRouter;