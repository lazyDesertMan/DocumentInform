import React from "react";
import { useState } from "react";
import '../css/style.css';
import TaskList from '../classes/TaskList';
import { GetTasks, GetReport } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Button, Modal, Container} from "react-bootstrap";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import ReportList from "../classes/ReportList";

let tasks = new TaskList();

let rep = new ReportList();

async function load() {
    let us = jwtDecode(Cookies.get("usr"))
    let repTMP = new ReportList();
    try{
        let data = await GetReport(us.cookie.user.id)
        repTMP.list = data;
        return repTMP;
    } catch(e) {
        console.log(e);
        return null;
    }
}
const Tasks = () =>{
    load().then(response => {
        rep.list = response.list;
    })
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
    if(rep.list === null){
        return <div></div>
    }
    else{ 
        return(
        <>
            <Button variant="primary" onClick={handleShow}>
                Получить отчет
            </Button>
            <Modal show={show} fullscreen={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Отчет о заданиях [{rep.list.userName}]</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container >
                        <div className="table-responsive">
                            <table style={{fontSize:'14px'}} className="table table-striped table-sm">
                                <thead>
                                    <tr key={"thead"}>
                                        <th scope="col">#</th>
                                        <th scope="col">Документ</th>
                                        <th scope="col">Дата выдачи</th>
                                        <th scope="col">Предельный срок</th>
                                        <th scope="col">Тип задания</th>
                                        <th scope="col">Статус задания</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.from({ length: rep.list.tasks.length }).map((_, idx) => (
                                    <tr key={"tbody" + idx}>
                                    <td>{idx + 1}</td>
                                    <td>Очень длинное название документа - проверка - проверка</td>
                                    <td>{new Date(Date.parse(rep.list.tasks[idx].task.startDate)).toLocaleString()}</td>
                                    <td>{new Date(Date.parse(rep.list.tasks[idx].task.deadline)).toLocaleString()}</td>
                                    <td>{rep.list.tasks[idx].task.type === 1 ? "Прочитать" : "Переслать" }</td>
                                    <td>{rep.list.tasks[idx].status === 1 ? "Выполнено" 
                                        :rep.list.tasks[idx].status === 2 ? "Не выполненно (без нарушений)" 
                                        : "Не выполненно (с нарушением)"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
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
    );}
});
const TaskListPlace = observer(() => {
    return(
        <>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <div style={{width: '60%', marginTop: '1%'}}>
                    <div className="list-group list-group-flush border-bottom scrollarea">
                        {Array.from({ length: tasks.list.length }).map((_, idx) => (
                            tasks.list[idx].type === 1 ? 
                                <a id="item" key={tasks.list[idx].ID} href={"http://localhost:3000/pdf/" + tasks.list[idx].documentID
                                + "/" + tasks.list[idx].ID} className="list-group-item list-group-item-action py-3 lh-tight">
                                    <div className="d-flex w-100 align-items-center justify-content-between">
                                        <strong className="mb-1">{tasks.list[idx].document}</strong>
                                        <small>Прочитать</small>
                                    </div>
                                    <div className="col-10 mb-1 small">Выдано {tasks.list[idx].startDate}</div>
                                    <div className="col-10 mb-1 small">Выполнить до {tasks.list[idx].deadline}</div>
                                </a>
                            :
                            <a id="item" key={tasks.list[idx].ID} href={"#"} className="list-group-item list-group-item-action py-3 lh-tight">
                                <div>
                                    <div className="d-flex w-100 align-items-center justify-content-between">
                                        <strong className="mb-1">{tasks.list[idx].document}</strong>
                                        <small>Переслать</small>
                                    </div>
                                    <div className="col-10 mb-1 small">Выдано {tasks.list[idx].startDate}</div>
                                    <div className="col-10 mb-1 small">Выполнить до {tasks.list[idx].deadline}</div>
                                </div>
                                <div className="col-10 mb-1 small">Выдано {new Date(Date.parse(tasks.list[idx].startDate)).toLocaleString()}</div>
                                <div className="col-10 mb-1 small">Выполнить до {new Date(Date.parse(tasks.list[idx].deadline)).toLocaleString()}</div>
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