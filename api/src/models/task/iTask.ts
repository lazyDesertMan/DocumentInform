/**
 * Тип задания
 */
enum TaskType {
    READ_TASK_TYPE = 1,
    RESEND_TASK_TYPE = 2
}

/**
 * Интерфейс для всех типов заданий
 */
interface ITask {
    ID         : number;    //!< ID задания
    document   : string     //!< Название документа
    documentID : number;    //!< ID документа, связанного с заданием
    senderID   : number;    //!< ID должности сотрудника, выдавшего задание
    startDate  : Date;      //!< Дата выдачи задания
    deadline   : Date;      //!< Крайний срок выполнения задания
    type       : TaskType;  //!< Тип задания
}
export {
    ITask,
    TaskType
}