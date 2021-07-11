import { DataTypes, Model, Optional } from "sequelize";
import { GroupHerarchyData } from "../../models/GroupHerarchyData";
import { DBContext } from "../DBContext";


/*
 * \brief Хранилище ролей
 */
class GroupHerarchyRepository implements GroupHerarchyData {
    static init(arg0: {
        // ID группы
        group: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
        // ID родительской группы
        mother_group: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
    }, arg1: {
        tableName: string; //!< Имя таблицы GroupHerarchy
        sequelize: import("sequelize").Sequelize; timestamps: boolean;
    }) {
        throw new Error("Method not implemented.");
    }
    public group!: number;  //!< ID группы
    public mother_group!: number;  //!< ID родительской группы
}

/*
 * \brief Определение модели таблицы иерхархии групп
 */
GroupHerarchyRepository.init({
    // ID группы
    group: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    // ID родительской группы
    mother_group: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    tableName: "group_herarchy",      //!< Имя таблицы GroupHerarchy
    sequelize: DBContext,
    timestamps: false
});

export {
    GroupHerarchyRepository
}