import express = require('express');
import UserController from '../controllers/userController';
import * as console from 'console';

const userRouter = express.Router();
const userContrl : UserController = new UserController();

userRouter.get("/workers", (req: express.Request, res: express.Response) => {
    res.send(userContrl.workersList());
});

userRouter.get("/list", (req: express.Request, res: express.Response) => {
    res.send(userContrl.list());
});

export default userRouter;
