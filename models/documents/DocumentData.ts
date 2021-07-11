/*
 * \brief Данные о документе
 */
class DocumentData {
    public id:             number;  //!< ID документа
    public name:           string;  //!< Название документа (официальное)
    public file_path:      string;  //!< Имя файла (с расширением)
    public effective_date: Date;    //!< Дата вступления документа в силу
}

export {
    DocumentData
}