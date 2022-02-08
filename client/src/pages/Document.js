import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { Button, Form, Stack } from "react-bootstrap";
import {documents } from "../http/userAPI";
import Doc from '../classes/Doc';

async function getDoc() {
    let docs = new Doc();
    try{
        let data = await documents()
        docs.setDoc(data);
        return docs;
    } catch(e) {
        console.log(e);
        return null;
    }
}

const Document = () => {
    //const navigate = useNavigate();
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();
    let docs = null;
    getDoc().then(response => {
        console.log("Loaded"); 
        docs = response.list;
    })
    return(
        <>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <h1>Файлы</h1>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Stack direction="horizontal" gap={3} style={{width: '60%', marginTop: '1%'}}>
                    <Form.Control className="me-auto" placeholder="Найти документ..." />
                    <Button variant="secondary">Поиск</Button>
                    <div className="vr" />
                    <Button variant="outline-danger">Очистить</Button>
                </Stack>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Form style={{width: '60%', marginTop: '1%'}}>
                    <div className="list-group list-group-flush border-bottom scrollarea">
                        {Array.from({ length: docs.list.length }).map((_, idx) => (
                            <a href="#" className="list-group-item list-group-item-action py-3 lh-tight">
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
};
export default Document;