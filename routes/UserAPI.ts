import express = require('express');
import * as fs from 'fs';
const UserRouter = express.Router();
import Auth from '../middlewares/AuthMW';

/*
 * \brief Получение файла с указанным именем и расширением
 */
UserRouter.get("/api/file/:name", Auth("worker"), async function (req: express.Request, res: express.Response) {
    try {
        const name = req.params.name;
        var data = fs.readFileSync("./public/documents/" + name);
        res.send(data);
    } catch (e) {
        console.error(e);
        res.send(false);
    }
});

export default UserRouter;
