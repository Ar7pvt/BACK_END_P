import errorHandler from "../middlewares/error.js"
import { Task } from "../models/task.js"

export const NewTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });

        res
            .status(201)
            .json({
                sucess: true,
                message: "Task added sucessfully",
            })
    } catch (error) {
        next(error);
    }
};

export const myTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id });

        res
            .status(200)
            .json({
                sucess: true,
                tasks,
            });
    } catch (error) {
        next(error);
    }
};

export const updateTasks = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        // if (!task) return next(new Error("invalid id"));
        if (!task) return next(new errorHandler("Invalid id", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();

        res
            .status(200)
            .json({
                sucess: true,
                message: "Updated sucessfully",
            });
    } catch (error) {
        next(error);
    }
};

export const deletTasks = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new errorHandler());

        await task.deleteOne();

        res
            .status(200)
            .json({
                sucess: true,
                message: "Deleted Sucessfully",
            });
    } catch (error) {
        next(error);
    }
};