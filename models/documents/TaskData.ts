/*
 * \brief Данные о задаче на ознакомление
 */
class TaskData {
    public id:          number;   //!< ID задачи
    public sender:      number;   //!< ID пользователя, выдавшего задачу
    public recipient:   number;   //!< ID пользователя, получившего задачу
    public document_id: number;   //!< ID документа, с которым требуется ознакомиться
    public must_read:   boolean;  //!< Должен ли получатель ознакомиться с документом
    public must_resend: boolean;  //!< Должен ли получатель переслать документ подчинённым
    public send_date:   Date;     //!< Дата выдачи задачи
    public deadline:    Date;     //!< Крайний срок ознакомления с документом
}

export {
    TaskData
}