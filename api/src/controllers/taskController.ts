import { CompleteFact } from "../models/task/completeFact";
import { Task } from "../models/task/task";
import { UserData } from "../models/userData";
import ITaskRepository from "../services/data/task/iTaskRepository";
import DbgTaskRepository from "../services/data/task/dbgTaskRepository";

/**
 * Контроллер заданий
 */
class TaskController {
    readonly taskRepository : ITaskRepository;

    constructor () {
        this.taskRepository = new DbgTaskRepository();
    }

    /**
     * Получение списка активных заданий пользователя
     * @param user Пользователь, для которого ведётся формирование списка активных заданий
     * @returns Список активных заданий
     */
    public activeTaskList (user : UserData): Task[] {
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

    public addTask (tsk : Task) : number {
        return this.taskRepository.add(tsk);
    }
}

export default TaskController;