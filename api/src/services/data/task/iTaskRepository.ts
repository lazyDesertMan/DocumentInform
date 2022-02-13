import { CompleteFact } from "../../../models/task/completeFact";
import { ITask } from "../../../models/task/iTask";

interface ITaskRepository {
    findByID(id : number) : ITask;
    add(tsk : ITask) : number;
    remove(id : number) : boolean;

    userActiveTasks(userID : number) : ITask[];
    userCompleteTasks(userID : number) : CompleteFact[];
    positionActiveTasks(posID : number) : ITask[];
    positionCompleteTasks(posID : number) : CompleteFact[];
    
    setCompleted(taskID : number, userID : number) : void;
    allowedDocs(userID : number) : number[];
}

export default ITaskRepository;
