import { CompleteFact } from "../models/task/completeFact";
import { ITask } from "../models/task/iTask";
import { UserData } from "../models/userData";
import ITaskRepository from "../services/data/task/iTaskRepository";
import DbgTaskRepository from "../services/data/task/dbgTaskRepository";
import IDocumentRepository from "../services/data/document/iDocumentRepository";
import DbgDocumentRepository from "../services/data/document/dbgDocumentRepository";

/**
 * Контроллер заданий
 */
class TaskController {
    readonly taskRepository : ITaskRepository;
    readonly documentRepository : IDocumentRepository;

    constructor () {
        this.taskRepository = new DbgTaskRepository();
        this.documentRepository = new DbgDocumentRepository();
    }

    /**
     * Получение списка активных заданий пользователя
     * @param user Пользователь, для которого ведётся формирование списка активных заданий
     * @returns Список активных заданий
     */
    public activeTaskList (user : UserData): ITask[] {
        return this.taskRepository.activeList(user.id);
    }

    /**
     * Получение списка завершённых заданий пользователя
     * @param user Пользователь, для которого ведётся формирование списка завершённых заданий
     * @returns Список завершённых заданий
     */
    public completeTaskList (user : UserData) : CompleteFact[] {
        return this.taskRepository.completeList(user.id);
    }

    public addTask (tsk : ITask) : number {
        let doc = this.documentRepository.findOne(tsk.documentID);
        if (!doc)
            throw("Документ не существует")
        tsk.document = doc.name;
        return this.taskRepository.add(tsk);
    }
}

export default TaskController;
