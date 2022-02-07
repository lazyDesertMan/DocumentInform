import React, { useContext } from "react";
import { Container, Nav, Navbar, Button, Offcanvas } from "react-bootstrap";
import { Context } from "..";
import { COMPLETED_ROUTE, DOCUMENT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TASKS_ROUTE } from "../utils/consts";
import '../css/style.css';
import { useNavigate } from "react-router-dom";


const NavBar = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    return(
        <>
            {user.isAdmin ?
                <Navbar bg="light" expand={false}>
                    <Container fluid>
                        <Navbar.Brand href={HOME_ROUTE} className="home">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(REGISTRATION_ROUTE)}
                                    >
                                        Регистрация
                                    </Button>
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(TASKS_ROUTE)}
                                    >
                                        Задачи
                                    </Button>
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(COMPLETED_ROUTE)}
                                    >
                                        Выполненное
                                    </Button>
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(DOCUMENT_ROUTE)}
                                    >
                                        Файлы
                                    </Button>
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(REGISTRATION_ROUTE)}
                                    >
                                        Выход
                                    </Button>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            :user.isAuth ?
                <Navbar bg="light" expand={false}>
                    <Container fluid>
                        <Navbar.Brand href={HOME_ROUTE} className="home">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(TASKS_ROUTE)}
                                    >
                                        Задачи
                                    </Button>
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(COMPLETED_ROUTE)}
                                    >
                                        Выполненное
                                    </Button>
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(DOCUMENT_ROUTE)}
                                    >
                                        Файлы
                                    </Button>
                                    <Button 
                                        variant={"outline-dark"} 
                                        className="mt-2"
                                        onClick={() => navigate(REGISTRATION_ROUTE)}
                                    >
                                        Выход
                                    </Button>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            :
                <Navbar bg="light" expand={false}>
                    <Container>
                        <Navbar.Brand href={HOME_ROUTE} className="home2">Home</Navbar.Brand>
                        <Nav style={{color: 'white'}}>
                            <Button 
                                variant={"outline-dark"}
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Авторизация
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            }
        </>   
    );
};
export default NavBar;