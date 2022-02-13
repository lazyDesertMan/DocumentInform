import { CompleteFact } from "../../../models/task/completeFact";
import { ITask } from "../../../models/task/iTask";

interface ITaskRepository {
    list(userID : number) : ITask[];
    activeList(userID : number) : ITask[];
    completeList(userID : number) : CompleteFact[];
    findByID(id : number) : ITask;
    add(tsk : ITask) : number;
    remove(id : number) : boolean;
    setCompleted(taskID : number, userID : number) : void;
    allowedDocs(userID : number) : number[];
}

export default ITaskRepository;
