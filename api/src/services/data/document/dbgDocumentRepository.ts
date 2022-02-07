import Document from "../../../models/document/document";
import ITaskRepository from "../task/iTaskRepository";
import IDocumentRepository from "./iDocumentRepository";


class DbgDocumentRepository implements IDocumentRepository {
    private static taskRepository : ITaskRepository;
    private static documents : Document[] = [];
    private static currentIdx = 0;

    private contains(docList : Document[], docID : number) : boolean {
        for (let idx = 0; idx < docList.length; idx++)
            if (docList[idx].id === docID)
                return true;
        return false;
    }

    public setTaskRepository(taskRepo: ITaskRepository): void {
        DbgDocumentRepository.taskRepository = taskRepo;
    }

    public list(userID: number): Document[] {
        let documents : Document[] = [];
        let tasks = DbgDocumentRepository.taskRepository.list(userID);
        for (let taskIdx = 0; taskIdx < tasks.length; taskIdx++) {
            if (!this.contains(documents, tasks[taskIdx].documentID)) {
                let doc = this.findByID(tasks[taskIdx].documentID);
                if (doc != null)
                    documents.push(doc);
            }
        }
        return documents;
    }

    public findByID(docID: number): Document {
        for (let idx = 0; idx < DbgDocumentRepository.documents.length; idx++)
            if (DbgDocumentRepository.documents[idx].id === docID)
                return DbgDocumentRepository.documents[idx];
        return null;
    }

    add(doc: Document): number {
        DbgDocumentRepository.currentIdx++;
        doc.id = DbgDocumentRepository.currentIdx;
        DbgDocumentRepository.documents.push(doc);
        return DbgDocumentRepository.currentIdx;
    }
}

export default DbgDocumentRepository;