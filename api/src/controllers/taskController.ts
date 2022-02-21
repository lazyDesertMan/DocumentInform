import { CompleteFact } from "../models/task/completeFact";
import { ITask } from "../models/task/iTask";
import { UserData } from "../models/userData";
import ITaskRepository from "../services/data/task/iTaskRepository";
import DbgTaskRepository from "../services/data/task/dbgTaskRepository";
import IDocumentRepository from "../services/data/document/iDocumentRepository";
import DbgDocumentRepository from "../services/data/document/dbgDocumentRepository";
import IPositionRepository from "../services/data/position/iPositionRepository";
import DbgPositionRepository from "../services/data/position/dbgPositionRepository";

/**
 * Контроллер заданий
 */
class TaskController {
    readonly taskRepository : ITaskRepository;
    readonly documentRepository : IDocumentRepository;
    readonly positionRepository : IPositionRepository

    constructor () {
        this.taskRepository = new DbgTaskRepository();
        this.documentRepository = new DbgDocumentRepository();
        this.positionRepository = new DbgPositionRepository();
    }

    /**
     * Получение списка активных заданий пользователя
     * @param user Пользователь, для которого ведётся формирование списка активных заданий
     * @returns Список активных заданий
     */
    public activeTaskList (user : UserData): ITask[] {
        const position = this.positionRepository.getUserPosition(user.id);
        const replaces = this.positionRepository.getUserReplaces(user.id);
        let tasks = this.taskRepository.userActiveTasks(user.id);
        tasks = tasks.concat(this.taskRepository.positionActiveTasks(position.id));
        for (let idx = 0; idx < replaces.length; idx++)
            tasks = tasks.concat(this.taskRepository.positionActiveTasks(replaces[idx].position.id));
        return tasks;
    }

    /**
     * Получение списка завершённых заданий пользователя
     * @param user Пользователь, для которого ведётся формирование списка завершённых заданий
     * @returns Список завершённых заданий
     */
    public completedTaskList (user : UserData) : CompleteFact[] {
        const position = this.positionRepository.getUserPosition(user.id);
        const replaces = this.positionRepository.getUserReplaces(user.id);
        let tasks = this.taskRepository.userCompleteTasks(user.id);
        tasks = tasks.concat(this.taskRepository.positionCompleteTasks(position.id));
        for (let idx = 0; idx < replaces.length; idx++)
            tasks = tasks.concat(this.taskRepository.positionCompleteTasks(replaces[idx].position.id));
        return tasks;
    }

    public addTask (tsk : ITask) : number {
        const doc = this.documentRepository.findOne(tsk.documentID);
        if (!doc)
            throw("Документ не существует")
        tsk.document = doc.name;
        return this.taskRepository.add(tsk);
    }

    public comleteTask(user : UserData, taskID : number) {
        this.taskRepository.setCompleted(taskID, user.id);
    }
}

export default TaskController;
