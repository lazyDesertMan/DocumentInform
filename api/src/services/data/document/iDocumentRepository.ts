import Document from "../../../models/document/document";

interface IDocumentRepository {
    list() : Document[];
    find(docsID : number[]) : Document[];
    findOne(docID : number) : Document;
    add(doc : Document) : number;
}

export default IDocumentRepository;
