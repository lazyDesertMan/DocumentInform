import { DataTypes, Model, Optional } from "sequelize";
import { UserGroupData } from "../../models/UserGroupData";
import { DBContext } from "../DBContext";

// FIX
import { UserRepository } from "./UserRepository";


/*
 * \brief Хранилище связки пользователей с группой и должностью
 */
class UserGroupRepository implements UserGroupData {
    static init(arg0: {
        // ID пользователя
        user_id: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
        // ID группы
        group_id: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
        // ID должности
        position_id: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
    }, arg1: {
        tableName: string; //!< Имя таблицы-связки UserGroup
        sequelize: import("sequelize").Sequelize; timestamps: boolean;
    }) {
        throw new Error("Method not implemented.");
    }
    public user_id!: number;  //!< ID пользователя
    public group_id!: number;  //!< ID группы
    public position_id!: number;  //!< ID должности
}

/*
 * \brief Определение модели таблицы-связки пользователь-группа-должность
 */
UserGroupRepository.init({
    // ID пользователя
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    // ID группы
    group_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    // ID должности
    position_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
}, {
    tableName: "user_group",      //!< Имя таблицы-связки UserGroup
    sequelize: DBContext,
    timestamps: false
});

export {
    UserGroupRepository
}