import express = require('express');
import UserController from '../controllers/userController';
import * as console from 'console';

const authRouter = express.Router();
const userContrl : UserController = new UserController();

authRouter.post("/", async (req: express.Request, res: express.Response) => {
    try {
        let login: string = req.body.login;
        let password: string = req.body.password;
        let isAuth = await userContrl.login(res, login, password);
        res.send(isAuth);
        return;
    } catch (e) { console.error(e); }
    res.send(false);
});

export default authRouter;