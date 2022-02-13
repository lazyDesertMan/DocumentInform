import express = require("express");
import GroupController from "../controllers/groupController";
import UserController from "../controllers/userController";
import { UserData } from "../models/userData";

const groupRouter = express.Router();
const groupController : GroupController = new GroupController();
const userController : UserController = new UserController();

groupRouter.get("/position",async (req : express.Request, res : express.Response) => {
    let userData : UserData = await userController.getActiveUser(req);
    if (userData)
        res.send(groupController.getPosition(userData.id));
    else
        res.status(401).end();
});

export default groupRouter;