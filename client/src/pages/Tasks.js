import React from "react";
import { useState } from "react";
import '../css/style.css';
import TaskList from '../classes/TaskList';
import { GetTasks, GetReport } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Button, Modal, Row, Col, Container} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

let tasks = new TaskList();

let rep = {};
async function load() {
    let us = jwtDecode(Cookies.get("usr"))
    console.log(us.cookie.user.id);
    let tmpRep = {};
    try{
        let data = await GetReport(us.cookie.user.id)
        tmpRep = data;
        return tmpRep;
    } catch(e) {
        console.log(e);
        return null;
    }
}
const Tasks = () => {
    load().then(response => {
        rep = response;
    })
    console.log(JSON.stringify(rep));

    return(<TasksSearch/>)
}
const TasksSearch = observer(() => {
    const [familiarize, setFamiliarize] = useState(false);
    const [send, setSend] = useState(false);
    const [search, setSearch] = useState("");

    const getListDoc = async () =>{
        let unfiltredTasks = await GetTasks();
        let filtred = [];
        if (familiarize || send) {
            if(familiarize){
                for(let i = 0; i < unfiltredTasks.length; i++){
                    if(unfiltredTasks[i].type === 1) {
                        filtred.push(unfiltredTasks[i]);
                    }
                }
            }
            if(send){
                for(let i = 0; i < unfiltredTasks.length; i++){
                    if(unfiltredTasks[i].type === 2)
                        filtred.push(unfiltredTasks[i]);
                }
            }
        }
        else {
            filtred = unfiltredTasks;
        }
        tasks.list = filtred;
    }

    getListDoc();

    return(
        <>
            <div>
                <h1 className="d-grid gap-2 d-sm-flex justify-content-sm-center">Tasks</h1>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <div><input 
                        type="text"
                        value={search}
                        onChange={ (e)=>{ setSearch(e.target.value)}}
                        placeholder="Поиск имен.."/>
                    </div>
                    <div>
                        <div className="form-check"><label className="form-check-label"><input
                            id="familiarizeID"
                            type="checkbox"
                            name="familiarize"
                            className="form-check-input"
                            onChange={ (e)=>{ setFamiliarize(e.target.checked) } }/><span>Ознакомиться</span></label>
                        </div>
                        <div className="form-check"><label className="form-check-label"><input
                            id="sendID"
                            type="checkbox"
                            name="send"
                            className="form-check-input"
                            onChange={ (e)=>{ setSend(e.target.checked) }}/><span>Переслать</span></label>
                        </div>
                    </div>
                </div>
            </div>      
            <TaskListPlace/>
        </>
    );
});
const Report = observer(() =>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <Button variant="primary" onClick={handleShow}>
                Получить отчет
            </Button>

            <Modal show={show} fullscreen={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Отчет о заданиях</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} md={8}>
                            .col-xs-12 .col-md-8
                            </Col>
                            <Col xs={6} md={4}>
                            .col-xs-6 .col-md-4
                            </Col>
                        </Row>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Распечатать
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});
const TaskListPlace = observer(() => {
    return(
        <>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <div style={{width: '60%', marginTop: '1%'}}>
                    <div className="list-group list-group-flush border-bottom scrollarea">
                        {Array.from({ length: tasks.list.length }).map((_, idx) => (
                            <a id="item" key={tasks.list[idx].ID} href="#" className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{tasks.list[idx].document}</strong>
                                <small>{ tasks.list[idx].type === 1 ? "Прочитать" : "Переслать" }</small>
                                </div>
                                <div className="col-10 mb-1 small">Выдано {tasks.list[idx].startDate}</div>
                                <div className="col-10 mb-1 small">Выполнить до {tasks.list[idx].deadline}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Report/>
            </div>
        </>
    );
});
export default Tasks;