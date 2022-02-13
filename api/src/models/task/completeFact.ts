import { ITask } from "./iTask";


/**
 * Факт выполнения заданий
 */
class CompleteFact {
    public readonly userID        : number; //!< ID пользователя, выполнившего задание
    public readonly completeDate  : Date;   //!< Дата выполнения задания
    public readonly completedTask : ITask;  //!< Данные выполненого задании 

    constructor (userID : number, date : Date, compTask : ITask) {
        this.userID = userID;
        this.completeDate = date;
        this.completedTask = compTask;
    }
}

export {
    CompleteFact
}
