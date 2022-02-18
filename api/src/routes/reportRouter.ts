import express = require("express");
import ReporpController from "../controllers/reportController";
import UserController from "../controllers/userController";

const reportRouter = express.Router();

const reportController : ReporpController = new ReporpController();
const userController : UserController = new UserController();

reportRouter.get("/taskReport", (req : express.Request, res : express.Response) => {
    const userID = Number(req.query.userID);
    if (userID) {
        const user = userController.findUserByID(userID);
        if (user)
            res.send(reportController.getTaskReport(user));
        else
            res.send();
    }
    else
        res.send();
})

export default reportRouter;