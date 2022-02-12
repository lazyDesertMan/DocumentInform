import { ITask, TaskType } from "./iTask";

/**
 * Задание на пересылку документа
 */
class ResendTask implements ITask {
    public readonly ID         : number;    //!< ID задания
    public readonly document   : string;    //!< Название документа
    public readonly documentID : number;    //!< ID документа, связанного с заданием
    public readonly senderID   : number;    //!< ID должности сотрудника, выдавшего задание
    public readonly recipient  : number;    //!< ID должности, с которой должна проводиться пересылка
    public readonly startDate  : Date;      //!< Дата выдачи задания
    public readonly deadline   : Date;      //!< Крайний срок выполнения задания
    public readonly type       : TaskType;  //!< Тип задания

    constructor (id : number, name : string, doc : number, sender : number, recip : number, start : Date, end : Date) {
        this.ID = id;
        this.document = name;
        this.documentID = doc;
        this.senderID = sender;
        this.recipient = recip;
        this.startDate = start;
        this.deadline = end;
        this.type = TaskType.RESEND_TASK_TYPE;
    }
}

export {
    ResendTask
}