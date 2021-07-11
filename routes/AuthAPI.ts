import express = require('express');
import AuthService from '../services/AuthService';
import * as console from 'console';

const AuthRouter = express.Router();

/*
 * Обработка POST-запроса к api/auth. Авторизация пользователя в системе
 */
AuthRouter.post("/api/auth", async function (req : express.Request, res : express.Response) {
    try {
        let login: string = req.body.login;
        let password: string = req.body.password;
        let auth = new AuthService();
        let data = await auth.Login(login, password);
        if (data !== null) {
            res.cookie("usr", data);
            res.send(true);
        }
        else {
            res.send(false);
        }
        return;
    } catch (e) { console.error(e); }
    res.send(false);
});

export default AuthRouter;