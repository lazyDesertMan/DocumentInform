import React , {useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import DocumentList from "../classes/DocumentList";
import UserList from "../classes/UserList";
import { GetListUsers, GetListDocuments } from "../http/userAPI";
import { OPTIONS_ROUTE } from "../utils/consts";

let users = new UserList();

let docs = new DocumentList();

async function loadUsers() {
    let users = new UserList();
    try{
        let data = await GetListUsers()
        users.list = data;
        return users;
    } catch(e) {
        console.log(e);
        return null;
    }
}
async function loadDocs() {
    let docs = new DocumentList();
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
    loadDocs().then(response => {
        docs.list = response.list;
    })
    console.log(users)
    console.log(docs)

    return(<AddTaskCard/>)
};
const AddTaskCard = () => {
    const navigate = useNavigate();
    const [idUser, setUser] = useState('');
    const [idDoc, setDoc] = useState('');
    const ButtonAdd = () =>{
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
                    <Form.Control 
                        className="mt-3"
                        placeholder="Тип задания" />
                    <select name="docs" placeholder="Выберите документ" onChange={e=>setDoc(docs[e.target.value].id)}>
                        <option key="" value=""></option>
                        {Array.from({ length: docs.length }).map((_, idx) => (
                            <option key={idx} value={idx}>docs[idx].name</option>
                        ))}	
                    </select>
                    <select name="users" placeholder="Выберите получателя" onChange={e=>setUser(users[e.target.value].id)}>
                        <option key="" value=""></option>
                        {Array.from({ length: users.length }).map((_, idx) => (
                            <option key={idx} value={idx}>users[idx].name</option>
                        ))}	
                    </select>
                    <Form.Control 
                        className="mt-3"
                        placeholder="Дата начала" />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Дата завершения"/>
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
};
export default AddTask;