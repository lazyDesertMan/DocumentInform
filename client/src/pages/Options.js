import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { SetFiles } from "../http/userAPI";

async function load(fData) {
    try{
        await SetFiles(fData)
    } catch(e) {
        console.log(e);
    }
}

let files;

const Options = (e) => {
    const [drag, setDrag] = useState(false);
    const [img, setImg] = useState(null);

    const DragStartHandler = (e)=>{
        e.preventDefault()
        setDrag(true);
    }
    const DragLeaveHandler = (e)=>{
        e.preventDefault()
        setDrag(false);
    }
    const onDropHandler = (e) =>{
        files = [...e.dataTransfer.files]
        console.log(files);
        const formData = new FormData();
        for(let i = 0; i < files.length; i++){
            formData.append('file', files[i]);
        }
        load(formData);
        setDrag(false);
    }
    
    const sendFiles = async () => {
        console.log(files[0]);
        const request = new Request('http://localhost:1337/api/document/load', {
            mode: 'cors',
            method: "POST",
            credentials: "include",
            body: files[0]
        });
        try {
            await fetch(request);
        } catch(e) {
            console.log(e);
        }
    }

    return(
        <>
            <h1 className="d-flex justify-content-center align-items-center">Опции</h1>
            <div className="d-flex justify-content-center align-items-center">
                {drag
                    ? <div className="drop-area"
                        onDragStart={e => DragStartHandler(e)}
                        onDragLeave={e => DragLeaveHandler(e)}
                        onDragOver={e => DragStartHandler(e)}
                        onDrop={e => onDropHandler(e)}
                        >Отпустите файл для загрузки</div>
                    : <div
                        onDragStart={e => DragStartHandler(e)}
                        onDragLeave={e => DragLeaveHandler(e)}
                        onDragOver={e => DragStartHandler(e)}
                        >Перетащите файл в область для загрузки</div>}
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <input type={"file"} onChange={e => setImg(e.target.files[0])}></input>
                <Button onClick={sendFiles}>Загрузить</Button>
            </div>
        </>
    );
};
export default Options;