import express = require('express');
import TaskController from '../controllers/taskController';
import UserController from '../controllers/userController';
import * as console from 'console';
import { UserData } from '../models/userData';
import { Task, TaskType } from '../models/task/task';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
import { Roles } from '../models/userData';
import { CompleteFact } from '../models/task/completeFact';
import { ReadTask } from '../models/task/readTask';
import { ResendTask } from '../models/task/resendTask';

const taskRouter = express.Router();
const userContrl : UserController = new UserController();
const taskContrl : TaskController = new TaskController();

taskRouter.get("/active", roleCheckMiddleware([Roles.ROLE_WORKER, Roles.ROLE_LEADER]), async (req : express.Request, res : express.Response) => {
    try {
        let user : UserData = await userContrl.getActiveUser(req);
        let tasks: Task[] = await taskContrl.activeTaskList(user);
        res.send(JSON.stringify(tasks, null, 2));
    } catch (e) {
        console.error(e);
        res.send("");
    }
});

taskRouter.get("/complete", roleCheckMiddleware([Roles.ROLE_WORKER, Roles.ROLE_LEADER]), async (req : express.Request, res : express.Response) => {
    try {
        let user : UserData = await userContrl.getActiveUser(req);
        let tasks: CompleteFact[] = await taskContrl.completeTaskList(user);
        res.send(JSON.stringify(tasks, null, 2));
    } catch (e) {
        console.error(e);
        res.send();
    }
});

taskRouter.post("/add", roleCheckMiddleware([Roles.ROLE_LEADER, Roles.ROLE_DIRECTOR]), async (req : express.Request, res : express.Response) => {
    try {
        let user : UserData = await userContrl.getActiveUser(req);
        let tsk : Task;
        let type : TaskType = Number(req.body.type);
        if (type === TaskType.READ_TASK_TYPE)
            tsk = new ReadTask(0, Number(req.body.document), Number(user.id), Number(req.body.recipient), new Date(req.body.start), new Date(req.body.end));
        else if (type === TaskType.RESEND_TASK_TYPE)
            tsk = new ResendTask(0, Number(req.body.document), Number(user.id), Number(req.body.recipient), new Date(req.body.start), new Date(req.body.end));
        else
            throw new Error("Неизвестный тип задания: " + type);
        tsk.type = type;
        let tskID = taskContrl.addTask(tsk);
        res.send(tskID.toString());
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send("Не удалось добавить задание");
    }
});

export default taskRouter;