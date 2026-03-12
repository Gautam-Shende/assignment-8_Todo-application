import express from "express";
import {
  getTodoItems,
  AddTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/TodoController.js";

const router = express.Router();

// router.post("/api/todos/", getTodoItems);
router.get("/api/todos/", getTodoItems);
router.post("/api/todos/", AddTodo);

router.get("/api/todos/:id", getTodoById);
router.put("/api/todos/:id",  updateTodo);
router.delete("/api/todos/:id", deleteTodo);

// export const router;
export default router;
