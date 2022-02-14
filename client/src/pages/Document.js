import React from "react";
//import { useNavigate } from "react-router-dom";
import { Button, Form, Stack } from "react-bootstrap";
import {GetDocuments } from "../http/userAPI";
import DocumentList from '../classes/DocumentList';
import { observer } from "mobx-react-lite";

let docs = new DocumentList();

async function load() {
    let docs = new DocumentList();
    try{
        let data = await GetDocuments()
        docs.list = data;
        return docs;
    } catch(e) {
        console.log(e);
        return null;
    }
}

const Document = () => {
    load().then(response => {
        docs.list = response.list;
    })

    return(<DocumentListPlace/>)
};

const DocumentListPlace = observer(() => {
    return(
        <>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <h1>Файлы</h1>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Stack direction="horizontal" gap={3} style={{width: '60%', marginTop: '1%'}}>
                    <Form.Control 
                        id="myInput" 
                        className="me-auto" 
                        placeholder="Найти документ..."/>
                    <Button variant="secondary">Поиск</Button>
                    <div className="vr" />
                    <Button variant="outline-danger">Очистить</Button>
                </Stack>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Form style={{width: '60%', marginTop: '1%'}}>
                    <div className="list-group list-group-flush border-bottom scrollarea">
                        {Array.from({ length: docs.list.length }).map((_, idx) => (
                            <a id="item" key={docs.list[idx].id} href={"http://localhost:3000/pdf/" + docs.list[idx].id} className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{docs.list[idx].name}</strong>
                                <small>{docs.list[idx].effectiveDate}</small>
                                </div>
                                <div className="col-10 mb-1 small">{docs.list[idx].description}</div>
                            </a>
                        ))}
                    </div>
                </Form>
            </div>
        </>
    );
});
export default Document;