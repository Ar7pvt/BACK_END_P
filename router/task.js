import express from "express";
import { NewTask, deletTasks, myTasks, updateTasks } from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, NewTask);
router.get("/myTasks", isAuthenticated, myTasks);

router.route("/:id").put(isAuthenticated, updateTasks).delete(isAuthenticated, deletTasks)

export default router;