import express = require('express');
import DocumentController from '../controllers/documentController';
import UserController from '../controllers/userController';
import Document from '../models/document/document';
import { Roles, UserData } from '../models/userData';

import * as fs from 'fs';
import roleCheckMiddleware from '../middlewares/roleCheckMiddleware';

const documentRouter = express.Router();
const documentController : DocumentController = new DocumentController();
const userController : UserController = new UserController();

documentRouter.get("/allowed", (req: express.Request, res: express.Response) => {
    const user : UserData = userController.getActiveUser(req);
    const docs: Document[] = documentController.userDocs(user);
    res.send(JSON.stringify(docs, null, 2));
});

documentRouter.post("/add", (req: express.Request, res: express.Response) => {
    const doc : Document = new Document();
    doc.name = String(req.body.name);
    doc.description = String(req.body.description);
    doc.filePath = String(req.body.filePath);
    doc.effectiveDate = new Date(req.body.effectiveDate);
    res.send(documentController.add(doc).toString());
});

documentRouter.post("/load", roleCheckMiddleware([Roles.ROLE_LEADER]), (req: express.Request, res: express.Response) => {
    if (!fs.existsSync(require.main.path + "/files")) {
        fs.mkdirSync(require.main.path + "/files");
    }
    const outStream = fs.createWriteStream(require.main.path + "/files/test.pdf", { flags: "a" });
    req.on("close", () => outStream.close());
    req.pipe(outStream);
    res.sendStatus(200);
});

// TODO: Исправить адреса. Возможно стоит применять просто URL.
//       Точно можно будет решить, когда будет готова загрузка файла на сервер
documentRouter.get("/read", (req: express.Request, res: express.Response) => {
    const user : UserData = userController.getActiveUser(req);
    const allowedDocs = documentController.userDocs(user);
    const docID = Number(req.query.docID);
    let fileIdx : number = 0;
    while (fileIdx < allowedDocs.length && allowedDocs[fileIdx].id != docID)
        fileIdx++;
    if (fileIdx != allowedDocs.length) {
        const path = require.main.path + "/files/" + allowedDocs[fileIdx].filePath;
        fs.readFile(path, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
        });
    }
    else
        res.send("");
});

documentRouter.get("/list", roleCheckMiddleware([Roles.ROLE_DIRECTOR]), (req: express.Request, res: express.Response) => {
    res.send(documentController.list());
});

export default documentRouter;
