import { Task, TaskType } from "./task";

/**
 * Задание на чтение документа
 */
class ReadTask implements Task {
    public readonly ID         : number;    //!< ID задания
    public readonly documentID : number;    //!< ID документа, связанного с заданием
    public readonly senderID   : number;    //!< ID должности сотрудника, выдавшего задание
    public readonly recipient  : number;    //!< ID сотрудника, который должен ознакомиться с документом
    public readonly startDate  : Date;      //!< Дата выдачи задания
    public readonly deadline   : Date;      //!< Крайний срок выполнения задания
    public readonly type       : TaskType;  //!< Тип задания

    constructor (id : number, doc : number, sender : number, recip : number, start : Date, end : Date) {
        this.ID = id;
        this.documentID = doc;
        this.senderID = sender;
        this.recipient = recip;
        this.startDate = start;
        this.deadline = end;
        this.type = TaskType.READ_TASK_TYPE;
    }
}

export {
    ReadTask
}