import Document from "../../../models/document/document";
import ITaskRepository from "../task/iTaskRepository";

interface IDocumentRepository {
    setTaskRepository(taskRepo : ITaskRepository) : void;
    list(userID : number) : Document[];
    findByID(docID : number) : Document;
    add(doc : Document) : number;
}

export default IDocumentRepository;