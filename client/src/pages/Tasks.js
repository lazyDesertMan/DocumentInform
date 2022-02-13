import React from "react";
import { useState } from "react";
import '../css/style.css';
import TaskList from '../classes/TaskList';
import { GetTasks } from "../http/userAPI";
import { observer } from "mobx-react-lite";

let tasks = new TaskList();

const Tasks = () => {
    const [familiarize, setFamiliarize] = useState(false);
    const [send, setSend] = useState(false);

    const getListDoc = async () =>{
        let taskList = await GetTasks();
        let filtred = [];
        if (familiarize || send) {
            console.log("fam:" + familiarize);
            console.log("send:" + send);
            if(familiarize){
                for(let i = 0; i < tasks.list.length; i++){
                    if(tasks.list[i].type === 1) {
                        filtred.push(taskList[i]);
                    }
                }
                console.log(filtred.length);
            }
            if(send){
                for(let i = 0; i < tasks.list.length; i++){
                    if(tasks.list[i].type === 2)
                        filtred.push(taskList[i]);
                }
                console.log(filtred.length);
            }
        }
        if((familiarize && send) || (!familiarize && !send)) {
            filtred = taskList;
        }
        tasks.list = filtred;
        console.log("IN FUNC: " + JSON.stringify(tasks) + " ---- " + JSON.stringify(filtred));
    }

    getListDoc();

    return(
        <>
            <div>
                <h1 className="d-grid gap-2 d-sm-flex justify-content-sm-center">Tasks</h1>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <div><input 
                        type="text"
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
                        {familiarize && send ?
                            <p>Оба чекбокса сработали</p>
                        : familiarize && !send ?
                            <p>Ознакомиться</p>
                        : send && !familiarize ?
                            <p>Переслать</p>
                        :
                            <p>Ни то, ни другое</p>
                        }
                        {
                        // TODO: Это даже не понадобиться скорее всего, раз я
                         // в функциях все фильтрую уже, то тут можно просто вывести документы
                        }
                    </div>
                </div>
            </div>      
            <TaskListPlace/>
        </>
    );
};
const TaskListPlace = observer(() => {
    return(
        <>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <div style={{width: '60%', marginTop: '1%'}}>
                    <div className="list-group list-group-flush border-bottom scrollarea">
                        {Array.from({ length: tasks.list.length }).map((_, idx) => (
                            <a id="item" key={tasks.list[idx].ID} href="#" className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">{tasks.list[idx].name}</strong>
                                <small>{ tasks.list[idx].type === 1 ? "Прочитать" : "Переслать" }</small>
                                </div>
                                <div className="col-10 mb-1 small">Выдано {tasks.list[idx].startDate}</div>
                                <div className="col-10 mb-1 small">Выполнить до {tasks.list[idx].deadline}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
});
export default Tasks;