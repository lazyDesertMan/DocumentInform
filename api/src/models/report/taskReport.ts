import { ITask } from "../task/iTask";

/**
 * Перечисление возможных состояний задания
 */
enum TaskStatus {
    TSTAT_COMPLETE           = 1,   //!< Задание выполнено
    TSTAT_ACTIVE             = 2,   //!< Задание не выполнено, но сроки выполнения не нарушены
    TSTAT_DEADLINE_VIOLATION = 3    //!< Задание не выполнено и нарушены сроки выполнения задания
}

/**
 * Строка отчёта о заданиях
 */
class ReportLine {
    public readonly task   : ITask;
    public readonly status : TaskStatus;

    constructor(task : ITask, status : TaskStatus) {
        this.task = task;
        this.status = status;
    }
}

/**
 * Отчёт о заданиях сотрудника
 */
class TaskReport {
    public readonly date         : Date;          //!< Дата формирования отчёта
    public readonly userName     : string;        //!< ФИО пользователя
    public readonly userPosition : string;        //!< Должность пользователя
    public readonly tasks        : ReportLine[];  //!< Состояния заданий

    constructor(userName : string, userPosition : string) {
        this.date = new Date();
        this.userName = userName;
        this.userPosition = userPosition;
        this.tasks = [];
    }

    public add(task : ITask, status : TaskStatus) : void {
        this.tasks.push(new ReportLine(task, status));
    }
}

export {
    TaskStatus,
    ReportLine,
    TaskReport
}