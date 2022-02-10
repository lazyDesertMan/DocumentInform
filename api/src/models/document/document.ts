class Document {
    public id:             number;  //!< ID документа
    public name:           string;  //!< Название документа (официальное)
    public description:    string;  //!< Краткое описание документа
    public filePath:       string;  //!< Имя файла (с расширением)
    public effectiveDate:  Date;    //!< Дата вступления документа в силу

    public init(id : number, name : string, description : string, filePath : string, effectiveDate : Date) : Document {
        this.id = id;
        this.name = name;
        this.description = description;
        this.filePath = filePath;
        this.effectiveDate = effectiveDate;
        return this;
    }
}

export default Document;