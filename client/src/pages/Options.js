import React from "react";
import { useState } from "react";
import { SetFiles } from "../http/userAPI";
import addDoc from "../assets/png/add_document.png";
import addUser from "../assets/png/add_user.png";
import download from "../assets/png/download.png";
import { Button, Modal} from "react-bootstrap";

async function load(fData) {
    try{
        await SetFiles(fData)
    } catch(e) {
        console.log(e);
    }
}
const Options = () => {
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
        e.preventDefault();
        let files = [...e.dataTransfer.files]
        console.log(files);
        const formData = new FormData();
        for(let i = 0; i < files.length; i++){
            formData.append('file', files[i]);
        }
        load(formData);
        setDrag(false);
    }

    const sendFiles = () => {
        console.log(img);
    }

    const [showDoc, setShowDoc] = useState(false);
    const handleCloseDoc = () => setShowDoc(false);
    const handleShowDoc = () => setShowDoc(true);

    const [showUser, setShowUser] = useState(false);
    const handleCloseUser = () => setShowUser(false);
    const handleShowUser = () => setShowUser(true);

    const [showTask, setShowTask] = useState(false);
    const handleCloseTask = () => setShowTask(false);
    const handleShowTask = () => setShowTask(true);
    return(
        <>
            <h1 className="d-flex justify-content-center align-items-center">Опции</h1>
            <div class="container px-4 py-5" id="featured-3">
                <h2 class="pb-2 border-bottom">Добавление</h2>
                <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div class="feature col">
                        <div>
                        <img src={addDoc}  width='15%'></img>
                        </div>
                        <h2>Добавить документ</h2>
                        <p>Вы можете загрузить как один документ, нажав на кнопку "Выберите файл", так и несколько - переместих их в загрузочную область</p>
                        <Button variant="primary" onClick={handleShowDoc}>
                            Открыть
                        </Button>

                        <Modal show={showDoc} onHide={handleCloseDoc} animation={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Загрузить документ</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="d-flex justify-content-center align-items-center">
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
                                        <input name="file" type="file" name="file" id="input__file" className="input input__file" multiple onChange={e => setImg(e.target.files[0])}/>
                                        <label for="input__file" class="input__file-button">
                                            <span className="input__file-icon-wrapper"><img className="input__file-icon" src={download} alt="Выбрать файл" width="25"/></span>
                                            <span className="input__file-button-text">Выберите файл</span>
                                        </label>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDoc}>
                                Закрыть
                            </Button>
                            <Button variant="primary" onClick={sendFiles}>
                                Загрузить
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div class="feature col">
                        <div>
                        <img src={addUser}  width='15%'></img>
                        </div>
                        <h2>Добавить работников</h2>
                        <p>Вы можете загрузить как один документ, нажав на кнопку "Добавить", так и несколько - переместих их в загрузочную область</p>
                        <Button variant="primary" onClick={handleShowUser}>
                            Открыть
                        </Button>

                        <Modal show={showUser} onHide={handleCloseUser} animation={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Добавление работников</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={sendFiles}>
                                Добавить
                            </Button>
                            <Button variant="primary" onClick={handleCloseUser}>
                                Закрыть
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div class="feature col">
                        <div>
                        <img src={addUser}  width='15%'></img>
                        </div>
                        <h2>Добавить задание</h2>
                        <p>Вы можете загрузить как один документ, нажав на кнопку "Добавить", так и несколько - переместих их в загрузочную область</p>
                        <Button variant="primary" onClick={handleShowTask}>
                            Открыть
                        </Button>

                        <Modal show={showTask} onHide={handleCloseTask} animation={false}>
                            <Modal.Header closeButton>
                            <Modal.Title>Добавление заданий</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={sendFiles}>
                                Добавить
                            </Button>
                            <Button variant="primary" onClick={handleCloseTask}>
                                Закрыть
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Options;