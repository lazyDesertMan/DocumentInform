import express = require('express');
import UserController from '../controllers/userController';
import * as console from 'console';

const authRouter = express.Router();
const userContrl : UserController = new UserController();

authRouter.post("/", (req: express.Request, res: express.Response) => {
    try {
        const login: string = req.body.login;
        const password: string = req.body.password;
        const isAuth = userContrl.login(res, login, password);
        res.send(isAuth);
        return;
    } catch (e) { console.error(e); }
    res.send(false);
});

export default authRouter;
