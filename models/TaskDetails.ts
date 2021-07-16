import { DocumentRepository } from "../services/repositories/documents/DocumentRepository";
import { ReadFactRepository } from "../services/repositories/documents/ReadFactRepository";
import { ResendFactRepository } from "../services/repositories/documents/ResendFactRepository";
import { TaskRepository } from "../services/repositories/documents/TaskRepository";
import { UserRepository } from "../services/repositories/UserRepository";

/*
 * \brief Детальная информация о задании
 */
class TaskDetails {
    public id:         number;   //!< ID задания
    public document:   string;   //!< Имя документа
    public sender:     string;   //<! ФИО отправителя
    public startDate:  Date;     //!< Дата выдачи задания
    public deadline:   Date;     //!< Крайний срок выполнения задания
    public mustRead:   boolean;  //!< Требуется ли прочесть документ
    public mustResend: boolean;  //!< Требуется ли переслать документ

    /*
     * \brief Поиск детальной информации по заданию и сохранение в текущий экземпляр
     */
    public async Init(task: TaskRepository) {
        this.id = task.id;
        this.document = (await DocumentRepository.findOne({ where: { id: task.document_id } })).name;
        this.sender = (await UserRepository.findOne({ where: { id: task.sender } })).name;
        this.startDate = task.send_date;
        this.deadline = task.deadline;
        let isRead: ReadFactRepository = await ReadFactRepository.findOne({ where: { task_id: task.id } });
        let isResend: ResendFactRepository = await ResendFactRepository.findOne({ where: { task_id: task.id } });
        this.mustRead = !isRead && task.must_read;
        this.mustResend = !isResend && task.must_resend;
        return this;
    }
}

export {
    TaskDetails
}