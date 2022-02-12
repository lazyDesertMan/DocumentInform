import Document from "../models/document/document";
import { UserData } from "../models/userData";
import DbgDocumentRepository from "../services/data/document/dbgDocumentRepository";
import IDocumentRepository from "../services/data/document/iDocumentRepository";
import DbgTaskRepository from "../services/data/task/dbgTaskRepository";
import ITaskRepository from "../services/data/task/iTaskRepository";

class DocumentController {
    readonly documentRepository : IDocumentRepository;
    readonly taskRepository : ITaskRepository;

    constructor () {
        this.documentRepository = new DbgDocumentRepository();
        this.taskRepository = new DbgTaskRepository();
    }

    public list() : Document[] {
        return this.documentRepository.list();
    }

    public userDocs(user : UserData) {
        let docs = this.taskRepository.allowedDocs(user.id);
        return this.documentRepository.find(docs);
    }

    public add(doc : Document) : number {
        return this.documentRepository.add(doc);
    }
}

export default DocumentController;
