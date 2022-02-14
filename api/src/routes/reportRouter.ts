import express = require("express");
import ReporpController from "../controllers/reportController";
import UserController from "../controllers/userController";

const reportRouter = express.Router();

let reportController : ReporpController = new ReporpController();
let userController : UserController = new UserController();

reportRouter.get("/taskReport", async (req : express.Request, res : express.Response) => {
    let userID = Number(req.query.userID);
    if (userID) {
        let user = userController.findUserByID(userID);
        if (user)
            res.send(reportController.getTaskReport(user));
        else
            res.send();
    }
    else
        res.send();
})

export default reportRouter;