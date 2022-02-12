import { ITask } from "./iTask";


/**
 * Факт выполнения заданий
 */
class CompleteFact {
    public readonly completeDate  : Date;  //!< Дата выполнения задания
    public readonly completedTask : ITask;  //!< Данные выполненого задании

    constructor (date : Date, compTask : ITask) {
        this.completeDate = date;
        this.completedTask = compTask;
    }
}

export {
    CompleteFact
}
