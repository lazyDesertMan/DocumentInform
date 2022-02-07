import Document from "../models/document/document";
import { UserData } from "../models/userData";
import DbgDocumentRepository from "../services/data/document/dbgDocumentRepository";
import IDocumentRepository from "../services/data/document/iDocumentRepository";
import DbgTaskRepository from "../services/data/task/dbgTaskRepository";

class DocumentController {
    readonly documentRepository : IDocumentRepository;

    constructor () {
        this.documentRepository = new DbgDocumentRepository();
        this.documentRepository.setTaskRepository(new DbgTaskRepository());
    }

    public list(user : UserData) : Document[] {
        return this.documentRepository.list(user.id);
    }

    public add(doc : Document) : number {
        return this.documentRepository.add(doc);
    }
}

export default DocumentController;