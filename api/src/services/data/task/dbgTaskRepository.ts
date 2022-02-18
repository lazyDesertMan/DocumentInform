import { CompleteFact } from "../../../models/task/completeFact";
import { ReadTask } from "../../../models/task/readTask";
import { ITask, TaskType } from "../../../models/task/iTask";
import ITaskRepository from "./iTaskRepository";
import { ResendTask } from "../../../models/task/resendTask";

class DbgTaskRepository implements ITaskRepository {
    private static activeTasks : ITask[] = [
        new ReadTask(1, "doc 1", 1, 2, 1, new Date(Date.now() - 100000), new Date(Date.now() + 100000)),
        new ReadTask(2, "doc 2", 2, 2, 1, new Date(Date.now() - 100000), new Date(Date.now() - 10)),
        new ResendTask(3, "doc 2", 2, 2, 2, new Date(Date.now() - 100000), new Date(Date.now()))
    ];
    private static completedTasks : CompleteFact[] = [
        new CompleteFact(1, new Date(100), new ReadTask(3, "doc 2", 2, 2, 1, new Date(0), new Date(1000))),
        new CompleteFact(2, new Date(100), new ReadTask(4, "doc 2", 2, 3, 2, new Date(0), new Date(1000)))
    ];
    private static currentIdx : number = DbgTaskRepository.activeTasks.length + DbgTaskRepository.completedTasks.length + 1;

    public findByID(id: number): ITask {
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].ID == id)
                return DbgTaskRepository.activeTasks[idx];
        for (let idx : number = 0; idx < DbgTaskRepository.completedTasks.length; idx++)
            if (DbgTaskRepository.completedTasks[idx].completedTask.ID == id)
                return DbgTaskRepository.completedTasks[idx].completedTask;
        return null;
    }

    public add(tsk: ITask): number {
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

    public userActiveTasks(userID: number): ITask[] {
        const tasks : ITask[] = [];
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].type == TaskType.READ_TASK_TYPE
                && (DbgTaskRepository.activeTasks[idx] as ReadTask).recipient == userID)
                tasks.push(DbgTaskRepository.activeTasks[idx]);
        return tasks;
    }

    public userCompleteTasks(userID: number): CompleteFact[] {
        const tasks : CompleteFact[] = [];
        for (let idx : number = 0; idx < DbgTaskRepository.completedTasks.length; idx++)
            if (DbgTaskRepository.completedTasks[idx].completedTask.type == TaskType.READ_TASK_TYPE
                && (DbgTaskRepository.completedTasks[idx].completedTask as ReadTask).recipient == userID)
                tasks.push(DbgTaskRepository.completedTasks[idx]);
        return tasks;
    }

    positionActiveTasks(posID: number): ITask[] {
        const tasks : ITask[] = [];
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].type == TaskType.RESEND_TASK_TYPE
                && (DbgTaskRepository.activeTasks[idx] as ResendTask).recipient == posID)
                tasks.push(DbgTaskRepository.activeTasks[idx]);
        return tasks;
    }

    positionCompleteTasks(posID: number): CompleteFact[] {
        const tasks : CompleteFact[] = [];
        for (let idx : number = 0; idx < DbgTaskRepository.completedTasks.length; idx++)
            if (DbgTaskRepository.completedTasks[idx].completedTask.type == TaskType.RESEND_TASK_TYPE
                && (DbgTaskRepository.completedTasks[idx].completedTask as ResendTask).recipient == posID)
                tasks.push(DbgTaskRepository.completedTasks[idx]);
        return tasks;
    }
    
    public setCompleted(taskID: number, userID : number): void {
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].ID == taskID) {
                DbgTaskRepository.completedTasks.push(
                    new CompleteFact(userID, new Date(), DbgTaskRepository.activeTasks.splice(idx)[0])
                );
                return;
            }
    }

    allowedDocs(userID: number): number[] {
        const docs : Set<number> = new Set<number>();
        for (let idx : number = 0; idx < DbgTaskRepository.activeTasks.length; idx++)
            if (DbgTaskRepository.activeTasks[idx].type == TaskType.READ_TASK_TYPE
                && (DbgTaskRepository.activeTasks[idx] as ReadTask).recipient == userID)
            docs.add(DbgTaskRepository.activeTasks[idx].documentID);
        for (let idx : number = 0; idx < DbgTaskRepository.completedTasks.length; idx++)
            if (DbgTaskRepository.completedTasks[idx].completedTask.type == TaskType.READ_TASK_TYPE
                && (DbgTaskRepository.completedTasks[idx].completedTask as ReadTask).recipient == userID)
            docs.add(DbgTaskRepository.completedTasks[idx].completedTask.documentID);
        return Array.from(docs);
    }
}

export default DbgTaskRepository;
