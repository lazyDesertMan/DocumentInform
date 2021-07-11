/*
 * \brief Данные о пересылке файла
 */
class ResendFactData {
    public task_id: number;          //!< ID задания, в рамках которого пересылается документ
    public resend_task_id: number;   //!< ID нового задания
    public resend_date: Date;        //!< Дата и время пересылки
}

export {
    ResendFactData
}