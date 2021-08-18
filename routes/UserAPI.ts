import express = require('express');
import * as fs from 'fs';
import { ReadFactRepository } from '../services/repositories/documents/ReadFactRepository';
import { TaskRepository } from '../services/repositories/documents/TaskRepository';
import { ResendFactRepository } from '../services/repositories/documents/ResendFactRepository';
import { TaskDetails } from '../models/TaskDetails';
import RoleCheckMW from '../middlewares/RoleCheckMW';
import { DocumentRepository } from '../services/repositories/documents/DocumentRepository';
import { UserData } from '../models/UserData';
import { getUser } from '../middlewares/RoleCheckMW';
const UserRouter = express.Router();

/*
 * \brief Получение файла с указанным именем и расширением
 */
UserRouter.get("/api/file/:name", async function (req: express.Request, res: express.Response) {
    try {
        const name = req.params.name;
        var tempFile = "./public/documents/" + name;
        fs.readFile(tempFile, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
        });
    } catch (e) {
        console.error(e);
        res.send(false);
    }
});

/*
 * \brief Получение пути до файла по ID
 */
UserRouter.get("/api/file_path/:id", async function (req: express.Request, res: express.Response) {
    try {
        let id = req.params.id;
        let docID = (await TaskRepository.findOne({ where: { id: id } })).document_id;
        let path = (await DocumentRepository.findOne({ where: { id: docID } })).file_path;
        res.send(path);
    } catch (e) {
        console.error(e);
        res.send(false);
    }
});

/*
 * \brief Запись факта ознакомления с документом
 */
UserRouter.get("/api/file_read/:id", async function (req: express.Request, res: express.Response) {
    try {
        let id : number = Number(req.params.id);
        ReadFactRepository.create({ task_id: id, read_date: new Date() });
        res.send(true);
    } catch (e) {
        console.error(e);
        res.send(false);
    }
});

/*
 * \brief Получение списка документов, с которыми необходимо ознакомиться
 */
UserRouter.get("/api/must_read/", RoleCheckMW('worker'), async function (req: express.Request, res: express.Response) {
    try {
        let tasks: TaskDetails[] = [];
        let user: UserData = getUser(req);
        let list: TaskRepository[] = await TaskRepository.findAll({
            where: { recipient: user.id }
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


/*
 * \brief Получение списка документов, с которыми пользователь ознакомился ранее
 */
UserRouter.get("/api/archive/", RoleCheckMW('worker'), async function (req: express.Request, res: express.Response) {
    try {
        let tasks: TaskDetails[] = [];
        let user: UserData = getUser(req);
        let list: TaskRepository[] = await TaskRepository.findAll({
            where: { recipient: user.id }
        });
        for (let i: number = 0; i < list.length; i++) {
            let isRead: ReadFactRepository = await ReadFactRepository.findOne({ where: { task_id: list[i].id } });
            let isResend: ResendFactRepository = await ResendFactRepository.findOne({ where: { task_id: list[i].id } });
            if (isRead || isResend) {
                let curTask: TaskDetails = new TaskDetails();
                await curTask.InitArchive(list[i]);
                tasks.push(curTask);
            }
        }
        res.send(tasks);
    } catch (e) {
        console.error(e);
        res.send(false);
    }
});

export default UserRouter;
