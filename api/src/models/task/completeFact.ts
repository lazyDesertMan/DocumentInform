import { Task } from "./task";


/**
 * Факт выполнения заданий
 */
class CompleteFact {
    public readonly completeDate  : Date;  //!< Дата выполнения задания
    public readonly completedTask : Task;  //!< Данные выполненого задании

    constructor (date : Date, compTask : Task) {
        this.completeDate = date;
        this.completedTask = compTask;
    }
}

export {
    CompleteFact
}