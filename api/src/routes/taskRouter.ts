import express = require('express');
import TaskController from '../controllers/taskController';
import UserController from '../controllers/userController';
import * as console from 'console';
import { UserData } from '../models/userData';
import { ITask, TaskType } from '../models/task/iTask';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';
import { Roles } from '../models/userData';
import { CompleteFact } from '../models/task/completeFact';
import { ReadTask } from '../models/task/readTask';
import { ResendTask } from '../models/task/resendTask';

const taskRouter = express.Router();
const userContrl : UserController = new UserController();
const taskContrl : TaskController = new TaskController();

taskRouter.get("/active", roleCheckMiddleware([Roles.ROLE_WORKER, Roles.ROLE_LEADER]), (req : express.Request, res : express.Response) => {
    try {
        const user : UserData = userContrl.getActiveUser(req);
        const tasks: ITask[] = taskContrl.activeTaskList(user);
        res.send(JSON.stringify(tasks, null, 2));
    } catch (e) {
        console.error(e);
        res.send("");
    }
});

taskRouter.get("/completed", roleCheckMiddleware([Roles.ROLE_WORKER, Roles.ROLE_LEADER]), (req : express.Request, res : express.Response) => {
    try {
        const user : UserData = userContrl.getActiveUser(req);
        const tasks: CompleteFact[] = taskContrl.completedTaskList(user);
        res.send(JSON.stringify(tasks, null, 2));
    } catch (e) {
        console.error(e);
        res.send();
    }
});

taskRouter.post("/add", roleCheckMiddleware([Roles.ROLE_LEADER, Roles.ROLE_DIRECTOR]), (req : express.Request, res : express.Response) => {
    try {
        const user : UserData = userContrl.getActiveUser(req);
        const type : TaskType = Number(req.body.type);
        let tsk : ITask;
        if (type === TaskType.READ_TASK_TYPE)
            tsk = new ReadTask(0, "", Number(req.body.document), Number(user.id), Number(req.body.recipient), new Date(req.body.start), new Date(req.body.end));
        else if (type === TaskType.RESEND_TASK_TYPE)
            tsk = new ResendTask(0, "", Number(req.body.document), Number(user.id), Number(req.body.recipient), new Date(req.body.start), new Date(req.body.end));
        else
            throw new Error("Неизвестный тип задания: " + type);
        tsk.type = type;
        const tskID = taskContrl.addTask(tsk);
        res.send(tskID.toString());
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send("Не удалось добавить задание");
    }
});

taskRouter.post("/complete", roleCheckMiddleware([Roles.ROLE_WORKER, Roles.ROLE_LEADER]), (req : express.Request, res : express.Response) => {
    try {
        const user : UserData = userContrl.getActiveUser(req);
        const taskID : number = Number(req.body.taskID);
        taskContrl.comleteTask(user, taskID);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.sendStatus(403);
    }
});

export default taskRouter;
