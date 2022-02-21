import React from "react";
import addDoc from "../assets/png/add_document.png";
import addUser from "../assets/png/add_user.png";
import { Button, Modal} from "react-bootstrap";

const Options = () => {
    return(
        <>
            <h1 className="d-flex justify-content-center align-items-center">Опции</h1>
            <div className="container px-4 py-5" id="featured-3">
                <h2 className="pb-2 border-bottom">Добавление</h2>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="feature col">
                        <div>
                        <img src={addDoc}  width='15%'></img>
                        </div>
                        <h2>Добавить документ</h2>
                        <p>Вы можете загрузить как один документ, нажав на кнопку "Выберите файл", так и несколько - переместих их в загрузочную область</p>
                        <Button variant="primary" href={"http://localhost:3000/Add/" + 1}>
                            Открыть
                        </Button>
                    </div>
                    <div class="feature col">
                        <div>
                        <img src={addUser}  width='15%'></img>
                        </div>
                        <h2>Добавить работников</h2>
                        <p>Вы можете загрузить как один документ, нажав на кнопку "Добавить", так и несколько - переместих их в загрузочную область</p>
                        <Button variant="primary" href={"http://localhost:3000/Add/" + 2}>
                            Открыть
                        </Button>
                    </div>
                    <div class="feature col">
                        <div>
                        <img src={addUser}  width='15%'></img>
                        </div>
                        <h2>Добавить задание</h2>
                        <p>Вы можете загрузить как один документ, нажав на кнопку "Добавить", так и несколько - переместих их в загрузочную область</p>
                        <Button variant="primary" href={"http://localhost:3000/Add/" + 3}>
                            Открыть
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Options;