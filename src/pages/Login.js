import { observer } from "mobx-react-lite";
import React, {useState, useContext} from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { ERROR_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import { authorization } from "../http/userAPI";

const Login = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const signIn = async () =>{
        try{
            let data = authorization(login, password)
            if(data === false){
                navigate(HOME_ROUTE);
            }else if(data === true){
                user.setUser(data);
                user.setIsAuth(true);
                navigate(PROFILE_ROUTE);
            }else{
                navigate(ERROR_ROUTE);
            }
        }catch(e){console.log(e)}
    }
    return(
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 550}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш логин..." 
                        value={login}
                        onChange={e => setLogin(e.target.value)}/>
                    <Form.Control 
                        className="mt-3"
                        placeholder="Введите ваш пароль..." 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"/>
                    <Button 
                        className="mt-3 align-self-center" 
                        style={{width: 100}} 
                        variant="outline-primary"
                        onClick={signIn}>
                            Войти
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});
export default Login;