import { observer } from "mobx-react-lite";
import React , {useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import DocumentList from "../classes/DocumentList";
import UserList from "../classes/UserList";
import { GetListUsers, GetListDocuments, GetListPosition, SetTask } from "../http/userAPI";
import { OPTIONS_ROUTE } from "../utils/consts";

let users = new UserList();

let position = new UserList();

let docs = new DocumentList();

async function loadUsers() {
    try{
        let data = await GetListUsers()
        users.list = data;
        return users;
    } catch(e) {
        console.log(e);
        return null;
    }
}
async function loadPosition() {
    try{
        let data = await GetListPosition()
        position.list = data;
        return position;
    } catch(e) {
        console.log(e);
        return null;
    }
}
async function loadDocs() {
    try{
        let data = await GetListDocuments()
        docs.list = data;
        return docs;
    } catch(e) {
        console.log(e);
        return null;
    }
}

const AddTask = () => {
    loadUsers().then(response => {
        users.list = response.list;
    })
    loadPosition().then(response => {
        position.list = response.list;
    })
    loadDocs().then(response => {
        docs.list = response.list;
    })

    return(<AddTaskCard/>)
};
const AddTaskCard = observer(() => {
    const navigate = useNavigate();
    const [idUser, setUser] = useState('');
    const [idDoc, setDoc] = useState('');
    const [idPos, setPos] = useState('');
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [deadline, setDeadline] = useState('');
    const setTypeTask=(value)=>{
        if(value == "Ознакомиться")
            setType(1);
        else if (value == "Переслать")
            setType(2);
        else
            setType('')
    }
    const setDocID=(idx)=>{
        if(idx != -1)
            setDoc(docs.list[idx].id);
        else
            setDoc('')
    }
    const setPosID=(idx)=>{
        if(idx != -1)
            setPos(position.list[idx].id);
        else
            setPos('')
    }
    const setUserID=(idx)=>{
        if(idx != -1)
        {
            setUser(users.list[idx].id);
        }
            
        else
            setUser('')
    }
    const ButtonAdd = async () =>{
        if(type === 1){
            await SetTask(type, idDoc, idUser, startDate, deadline);
        }   
        else if(type === 2){
           await SetTask(type, idDoc, idPos, startDate, deadline);
        }
        navigate(OPTIONS_ROUTE);
    }
    return(
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 550}} className="p-5">
                <h2 className="m-auto">Новое задание</h2>
                <Form className="d-flex flex-column">
                    <select 
                        name="docs" 
                        placeholder="Выберите тип задания" 
                        onChange={e=>setTypeTask(e.target.value)}
                        className="mt-3">
                        <option key="" value="">Выберите тип задания</option>
                        <option key="Ознакомиться" value="Ознакомиться" >Ознакомиться</option>
                        <option key="Переслать" value="Переслать" >Переслать</option>
                    </select>
                    <select 
                        name="docs" 
                        placeholder="Выберите документ" 
                        onChange={e=>setDocID(e.target.value)}
                        className="mt-3">
                        <option key="" value={-1}>Выберите документ</option>
                        {Array.from({ length: docs.list.length }).map((_, idx) => (
                            <option key={idx} value={idx}>{docs.list[idx].name}</option>
                        ))}	
                    </select>
                    {type == 1?
                        <select 
                            name="users" 
                            placeholder="Выберите получателя" 
                            onChange={e=>setUserID(e.target.value)}
                            className="mt-3">
                            <option key=""value={-1}>Выберите получателя</option>
                            {Array.from({ length: users.list.length }).map((_, idx) => (
                                <option key={idx} value={idx}>{users.list[idx].name}</option>
                            ))}	
                        </select>
                    :type == 2?
                        <select 
                            name="positions" 
                            placeholder="Выберите роль" 
                            onChange={e=>setPosID(e.target.value)}
                            className="mt-3">
                            <option key=""value={-1}>Выберите роль</option>
                            {Array.from({ length: position.list.length }).map((_, idx) => (
                                <option key={idx} value={idx}>{position.list[idx].name}</option>
                            ))}	
                        </select>
                    :<></>
                    }
                    <input 
                        type="date" 
                        className="mt-3" 
                        placeholder="Дата начала"
                        onChange={e=>setStartDate(e.target.value)}></input>
                    <input 
                        type="date" 
                        className="mt-3" 
                        placeholder="Дата завершения"
                        onChange={e=>setDeadline(e.target.value)}></input>
                    <Button 
                        className="mt-3 align-self-center" 
                        style={{width: 160}} 
                        variant="outline-primary"
                        onClick={ButtonAdd}
                        >Внести</Button>
                </Form>
            </Card>
        </Container>
    );
});
export default AddTask;