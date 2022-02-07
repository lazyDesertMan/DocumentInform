class Document {
    public id:             number;  //!< ID документа
    public name:           string;  //!< Название документа (официальное)
    public description:    string;  //!< Краткое описание документа
    public filePath:       string;  //!< Имя файла (с расширением)
    public effectiveDate:  Date;    //!< Дата вступления документа в силу
}

export default Document;