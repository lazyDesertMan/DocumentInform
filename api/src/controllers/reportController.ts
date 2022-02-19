import { TaskReport, TaskStatus } from "../models/report/taskReport";
import { UserData } from "../models/userData";
import DbgPositionRepository from "../services/data/position/dbgPositionRepository";
import IPositionRepository from "../services/data/position/iPositionRepository";
import DbgTaskRepository from "../services/data/task/dbgTaskRepository";
import ITaskRepository from "../services/data/task/iTaskRepository";

export default class ReporpController {
    protected positionRepository : IPositionRepository;
    protected taskRepository : ITaskRepository;
    
    constructor() {
        this.positionRepository = new DbgPositionRepository();
        this.taskRepository = new DbgTaskRepository();
    }
    
    public getTaskReport(user : UserData) : TaskReport {
        const position = this.positionRepository.getUserPosition(user.id);
        const report = new TaskReport(user.name, position ? position.name : "");
        let activeTasks = this.taskRepository.userActiveTasks(user.id)
        let completedTask = this.taskRepository.userCompleteTasks(user.id);
        if (position) {
            activeTasks = activeTasks.concat(this.taskRepository.positionActiveTasks(position.id));
            completedTask = completedTask.concat(this.taskRepository.positionCompleteTasks(position.id));
        }
        for (let idx = 0; idx < activeTasks.length; idx++) {
            const status = (activeTasks[idx].deadline < report.date) ?
                TaskStatus.TSTAT_DEADLINE_VIOLATION : TaskStatus.TSTAT_ACTIVE 
            report.add(activeTasks[idx], status);
        }
        for (let idx = 0; idx < completedTask.length; idx++)
            report.add(completedTask[idx].completedTask, TaskStatus.TSTAT_COMPLETE);
        return report;
    }
}