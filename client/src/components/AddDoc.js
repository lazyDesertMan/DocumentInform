import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { AddDocument, SetFile } from "../http/userAPI";
import download from "../assets/png/download.png";
import { useNavigate } from "react-router-dom";
import { OPTIONS_ROUTE } from "../utils/consts";

// для передачи на сервер
const formData = new FormData();
let files = new Array();

const AddDoc = () => {

    const navigate = useNavigate();
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [info, setInfo] = useState(" ");
    const [drag, setDrag] = useState(false);
    const [startDate, setStartDate] = useState('');

    const DragStartHandler = (e)=>{
        e.preventDefault()
        setDrag(true);
    }
    const DragLeaveHandler = (e)=>{
        e.preventDefault()
        setDrag(false);
    }
    const onDropHandler = (e) =>{
        e.preventDefault();
        files = [...e.dataTransfer.files]
        /*for(let i = 0; i < files.length; i++){
            formData.append('file', files[i]);
            name += files[i].name + " ";
        }*/
        formData.append('file', files[0]);
        setInfo(files[0].name + " " + files[0].size/1000 + "KB");
        setDrag(false);
    }


    const loadFile = (e) => {
        e.preventDefault();
        files = [...e.target.files];
        formData.append('file', files[0]);
        setInfo(files[0].name + " " + files[0].size/1000 + "KB");
    }
    const ButtonAdd = async () =>{
        if (files && files[0]) {
            const docID = await AddDocument(fileName, description, startDate);
            console.log(docID);
            await SetFile(docID, files[0]);
            navigate(OPTIONS_ROUTE);
        }
    }
    return(
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 550}} className="p-5">
                <h2 className="m-auto">Новый документ</h2>
                <Form className="d-flex flex-column">
                    <Form.Control 
                        className="mt-3"
                        placeholder="Название"
                        onChange={e => setFileName(e.target.value)} />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Описание"
                        onChange={e => setDescription(e.target.value)} />
                    <input 
                        type="date" 
                        className="mt-3" 
                        placeholder="Дата вступления в силу"
                        onChange={e=>setStartDate(e.target.value)}></input>
                    <div style={{marginTop: '3%'}} className="d-flex justify-content-center align-items-center">
                                    <div className="frame">
                                        {drag
                                            ? <div className="drop-area-after"
                                                onDragStart={e => DragStartHandler(e)}
                                                onDragLeave={e => DragLeaveHandler(e)}
                                                onDragOver={e => DragStartHandler(e)}
                                                onDrop={e => onDropHandler(e)}
                                                >Отпустите файл</div>
                                            : <div className="drop-area-before"
                                                onDragStart={e => DragStartHandler(e)}
                                                onDragLeave={e => DragLeaveHandler(e)}
                                                onDragOver={e => DragStartHandler(e)}
                                                >Область загрузки</div>}
                                    </div>
                                    <div className="input__wrapper">
                                        <input name="file" type="file" name="file" id="input__file" className="input input__file" onChange={e => loadFile(e)}/>
                                        <label htmlFor="input__file" className="input__file-button">
                                            <span className="input__file-icon-wrapper"><img className="input__file-icon" src={download} alt="Выбрать файл" width="25"/></span>
                                            <span className="input__file-button-text">Выберите файл</span>
                                        </label>
                                    </div>
                                </div>
                    <Form.Control 
                        className="mt-3"
                        placeholder={info} 
                        disabled={true}/>
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
export default AddDoc;