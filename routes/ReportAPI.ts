import express = require('express');
import { TaskDetails } from '../models/TaskDetails';
import { ReadFactRepository } from '../services/repositories/documents/ReadFactRepository';
import { ResendFactRepository } from '../services/repositories/documents/ResendFactRepository';
import { TaskRepository } from '../services/repositories/documents/TaskRepository';
const ReportRouter = express.Router();

/*
 * \brief Получение списка активных заданий пользователя
 */
ReportRouter.get("/api/reports/active_tasks/:user_id", async function (req: express.Request, res: express.Response) {
    try {
        const userID = req.params.user_id;
        let tasks: TaskDetails[] = [];
        let list: TaskRepository[] = await TaskRepository.findAll({
            where: { recipient: userID }
        });
        for (let i: number = 0; i < list.length; i++) {
            let isRead: ReadFactRepository = await ReadFactRepository.findOne({ where: { task_id: list[i].id } });
            let isResend: ResendFactRepository = await ResendFactRepository.findOne({ where: { task_id: list[i].id } });
            if ((isRead === null && list[i].must_read) || (isResend === null && list[i].must_resend)) {
                let curTask: TaskDetails = new TaskDetails();
                await curTask.InitActive(list[i]);
                tasks.push(curTask);
            }
        }
        res.send(tasks);
    } catch (e) {
        console.error(e);
        res.send(false);
    }
});

export default ReportRouter;