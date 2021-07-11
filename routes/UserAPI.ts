import express = require('express');
import * as fs from 'fs';
const UserRouter = express.Router();

/*
 * \brief Получение файла с указанным именем и расширением
 */
UserRouter.get("/api/file/:name", async function (req: express.Request, res: express.Response) {
    try {
        const name = req.params.name;
        let data = fs.readFileSync("./public/documents/" + name);
        res.send(data);
    } catch (e) {
        console.error(e);
        res.send(false);
    }
});

/*
 * \brief Получение ID файла с указанным именем и расширением
 */
UserRouter.get("/api/file_id/:name", async function (req: express.Request, res: express.Response) {
    res.send(null);
});

/*
 * \brief Запись факта ознакомления с документом
 */
UserRouter.get("/api/file_read/:id", async function (req: express.Request, res: express.Response) {
    res.send(false);
});

export default UserRouter;
