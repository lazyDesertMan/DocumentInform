/**
 * Данные должности
 */
class Position {
    id   : number;  //!< ID должности
    name : string;  //!< Название должности

    public init(id : number, name : string) : Position {
        this.id = id;
        this.name = name;
        return this;
    }
}

/**
 * Данные о временном замещении
 */
class Replace {
    position  : Position;   //!< Замещаемая должность
    startDate : Date;       //!< Дата с которой начинается замещение
    endDate   : Date;       //!< Дата завершения замещения

    public init(position : Position, startDate : Date, endDate : Date) : Replace {
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        return this;
    }
}

export { Position, Replace }
