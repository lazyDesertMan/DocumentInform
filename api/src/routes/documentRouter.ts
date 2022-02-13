import express = require('express');
import DocumentController from '../controllers/documentController';
import UserController from '../controllers/userController';
import Document from '../models/document/document';
import { UserData } from '../models/userData';

import * as fs from 'fs';
import { dirname } from 'path';

const documentRouter = express.Router();
const documentController : DocumentController = new DocumentController();
const userController : UserController = new UserController();

documentRouter.get("/allowed", async (req: express.Request, res: express.Response) => {
    let user : UserData = await userController.getActiveUser(req);
    let docs: Document[] = await documentController.userDocs(user);
    res.send(JSON.stringify(docs, null, 2));
});

documentRouter.post("/add", async (req: express.Request, res: express.Response) => {
    let doc : Document = new Document();
    doc.name = String(req.body.name);
    doc.description = String(req.body.description);
    doc.filePath = String(req.body.filePath);
    doc.effectiveDate = new Date(req.body.effectiveDate);
    res.send(documentController.add(doc).toString());
});

// TODO: Исправить адреса. Возможно стоит применять просто URL.
//       Точно можно будет решить, когда будет готова загрузка файла на сервер
documentRouter.get("/read",async (req: express.Request, res: express.Response) => {
    let user : UserData = await userController.getActiveUser(req);
    let allowedDocs = await documentController.userDocs(user);
    let docID = Number(req.query.docID);
    let fileIdx : number = 0;
    while (fileIdx < allowedDocs.length && allowedDocs[fileIdx].id != docID)
        fileIdx++;
    if (fileIdx != allowedDocs.length) {
        let path = require.main.path + "/files/" + allowedDocs[fileIdx].filePath;
        fs.readFile(path, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
        });
    }
    else
        res.send("");
})

export default documentRouter;
