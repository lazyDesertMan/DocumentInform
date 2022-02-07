import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

const Registration = () => {
    return(
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 550}} className="p-5">
                <h2 className="m-auto">Регистрация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите имя..." />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите фамилию..." />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите должность..." />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите логин..." />
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите пароль..." />
                    <Button className="mt-3 align-self-center" style={{width: 160}} variant="outline-primary">Зарегистрировать</Button>
                </Form>
            </Card>
        </Container>
    );
};
export default Registration;