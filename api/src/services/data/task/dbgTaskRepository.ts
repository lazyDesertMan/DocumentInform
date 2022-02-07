import { CompleteFact } from "../../../models/task/completeFact";
import { ReadTask } from "../../../models/task/readTask";
import { Task, TaskType } from "../../../models/task/task";
import ITaskRepository from "./iTaskRepository";


class DbgTaskRepository implements ITaskRepository {
    private static activeTasks : Task[] = [];
    private static completedTasks : CompleteFact[] = [];
    private static currentIdx : number = 0;

    public list(userID: number): Task[] {
        let tasks : Task[] = [];
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].type == TaskType.READ_TASK_TYPE
                && (DbgTaskRepository.activeTasks[idx] as ReadTask).recipient == userID)
                tasks.push(DbgTaskRepository.activeTasks[idx]);
        for (let idx : number = 0; idx < DbgTaskRepository.completedTasks.length; idx++)
            if (DbgTaskRepository.completedTasks[idx].completedTask.type == TaskType.READ_TASK_TYPE
                && (DbgTaskRepository.completedTasks[idx].completedTask as ReadTask).recipient == userID)
                tasks.push(DbgTaskRepository.completedTasks[idx].completedTask);
        return tasks;
    }

    public activeList(userID: number): Task[] {
        let tasks : Task[] = [];
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].type == TaskType.READ_TASK_TYPE
                && (DbgTaskRepository.activeTasks[idx] as ReadTask).recipient == userID)
                tasks.push(DbgTaskRepository.activeTasks[idx]);
        return tasks;
    }

    public completeList(userID: number): CompleteFact[] {
        let tasks : CompleteFact[] = [];
        for (let idx : number = 0; idx < DbgTaskRepository.completedTasks.length; idx++)
            if (DbgTaskRepository.completedTasks[idx].completedTask.type == TaskType.READ_TASK_TYPE
                && (DbgTaskRepository.completedTasks[idx].completedTask as ReadTask).recipient == userID)
                tasks.push(DbgTaskRepository.completedTasks[idx]);
        return tasks;
    }
    
    public findByID(id: number): Task {
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].ID == id)
                return DbgTaskRepository.activeTasks[idx];
        for (let idx : number = 0; idx < DbgTaskRepository.completedTasks.length; idx++)
            if (DbgTaskRepository.completedTasks[idx].completedTask.ID == id)
                return DbgTaskRepository.completedTasks[idx].completedTask;
        return null;
    }

    public add(tsk: Task): number {
        tsk.ID = DbgTaskRepository.currentIdx++;
        DbgTaskRepository.activeTasks.push(tsk);
        return DbgTaskRepository.currentIdx;
    }

    public remove(id: number): boolean {
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].ID == id) {
                DbgTaskRepository.activeTasks.splice(idx);
                return true;
            }
        for (let idx : number = 0; idx < DbgTaskRepository.completedTasks.length; idx++)
            if (DbgTaskRepository.completedTasks[idx].completedTask.ID == id) {
                DbgTaskRepository.completedTasks.splice(idx);
                return true;
            }
        return false;
    }
    
    public setCompleted(id: number): void {
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].ID == id) {
                DbgTaskRepository.completedTasks.push(new CompleteFact(new Date(), DbgTaskRepository.activeTasks.splice(idx)[0]));
                return;
            }
    }
}

export default DbgTaskRepository;