import Document from "../../../models/document/document";
import IDocumentRepository from "./iDocumentRepository";


class DbgDocumentRepository implements IDocumentRepository {

    private static documents : Document[] = [
        new Document().init(1, "doc 1", "Документ №1", "doc.pdf", new Date(0)),
        new Document().init(2, "doc 2", "Документ №2", "doc2.pdf", new Date(1)),
        new Document().init(3, "doc 3", "Документ №3", "doc3.pdf", new Date(2)),
    ];
    private static currentIdx = DbgDocumentRepository.documents.length + 1;

    public list(): Document[] {
        return [...DbgDocumentRepository.documents];
    }

    find(docsID: number[]): Document[] {
        const docs : Document[] = [];
        for (let curIdx = 0; curIdx < docsID.length; curIdx++) {
            const curDoc = this.findOne(docsID[curIdx]);
            if (curDoc != null) {
                docs.push(curDoc);
            }
        }
        return docs;
    }

    public findOne(docID: number): Document {
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
