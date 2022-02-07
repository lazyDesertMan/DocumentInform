import { CompleteFact } from "../../../models/task/completeFact";
import { Task } from "../../../models/task/task";

interface ITaskRepository {
    list(userID : number) : Task[];
    activeList(userID : number) : Task[];
    completeList(userID : number) : CompleteFact[];
    findByID(id : number) : Task;
    add(tsk : Task) : number;
    remove(id : number) : boolean;
    setCompleted(id : number) : void;
}

export default ITaskRepository;