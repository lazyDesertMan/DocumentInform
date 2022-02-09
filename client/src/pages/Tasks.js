import React from "react";
import { useState } from "react";
import '../css/style.css';
import DocumentList from '../classes/DocumentList';
import TaskList from '../classes/TaskList';
import {GetDocuments, GetTasks } from "../http/userAPI";
import { observer } from "mobx-react-lite";

let docs = new DocumentList();
let tasks = new TaskList();

// Загрузка документов
async function loadDocs() {
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
// Загрузка заданий
async function loadTasks() {
    let tasks = new TaskList();
    try{
        let data = await GetTasks()
        tasks.list = data;
        return tasks;
    } catch(e) {
        console.log(e);
        return null;
    }
}
// Вряд ли тут так.. response один, а запроса два.. Хотя.. хз.. Чекни
const Tasks = () => {
    /*load().then(response => {
        docs.list = response.list;
    })
    load().then(response => {
        tasks.list = response.list;
    })*/

    return(<TaskListPlace/>)
};
const TaskListPlace = observer(() => {
    const [familiarize, setFamiliarize] = useState(false);
    const [send, setSend] = useState(false);
    let listDocID = {};
    let listDoc = {};
    // Получение нужных ID доков из заданий
    const getListDocID = () =>{
        if(familiarize){
            for(let i = 0; i < tasks.list.length; i++){
                if(tasks.list[i].type === "Ознакомиться")
                    listDocID += tasks.list[i].documentID;  // Присваивание в массив?
            }
        }
        if(send){
            for(let i = 0; i < tasks.list.length; i++){
                if(tasks.list[i].type === "Переслать")
                    listDocID += tasks.list[i].documentID;  // Присваивание в массив?
            }
        }
    }
    // Получение отфилтрованных доков
    const getListDoc = () =>{
        for(let i = 0; i < docs.list.length; i++){
            for(let j = 0; j < listDocID.length; j++){
                if(docs.list[i].id === listDocID[j])
                    listDoc += docs.list[i];                // Присваивание в json?
            }
        }
    }
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
                            onChange={(e)=>setFamiliarize(e.target.checked)}/><span>Ознакомиться</span></label>
                        </div>
                        <div className="form-check"><label className="form-check-label"><input
                            id="sendID"
                            type="checkbox"
                            name="send"
                            className="form-check-input"
                            onChange={(e)=>setSend(e.target.checked)}/><span>Переслать</span></label>
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
                        {/* Это даже не понадобиться скорее всего, раз я в функциях все фильтрую уже, 
                            то тут можно просто вывести документы */}
                    </div>
                </div>
            </div>
        </>
    );
});
export default Tasks;