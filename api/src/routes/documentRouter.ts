import express = require('express');
import DocumentController from '../controllers/documentController';
import UserController from '../controllers/userController';
import Document from '../models/document/document';
import { UserData } from '../models/userData';

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

export default documentRouter;
