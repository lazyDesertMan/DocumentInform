import React from "react";
//import { useNavigate } from "react-router-dom";
import { Button, Form, Stack } from "react-bootstrap";
import {documents } from "../http/userAPI";
import Doc from '../classes/Doc';

const Document = () => {
    //const navigate = useNavigate();
    let docs = new Doc();
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();
    const getDoc = async () => {
        try{
            docs.setDoc(documents()); 
        }catch(e){console.log(e)}
    }
    getDoc();
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
                    <div class="list-group list-group-flush border-bottom scrollarea">
                        {Array.from({ length: docs.getDoc().length }).map((_, idx) => (
                            <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
                                <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">{docs.getDoc().name}</strong>
                                <small>{docs.getDoc().effectiveDate}</small>
                                </div>
                                <div class="col-10 mb-1 small">{docs.getDoc().description}</div>
                            </a>
                        ))}
                    </div>
                </Form>
            </div>
        </>
    );
};
export default Document;