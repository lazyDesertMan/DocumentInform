import { DataTypes, Model } from "sequelize";
import { UserGroupData } from "../../../models/groups/UserGroupData";
import { DBContext } from "../../DBContext";
import { GroupRepository } from "./GroupRepository";
import { PositionRepository } from "./PositionRepository";
import { UserRepository } from "../UserRepository";


/*
 * \brief Хранилище связки пользователей с группой и должностью
 */
class UserGroupRepository extends Model<UserGroupData> {
    public user_id!:     number;  //!< ID пользователя
    public group_id!:    number;  //!< ID группы
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
    tableName: "user_group",      //!< Имя таблицы-связки работника и группы
    sequelize: DBContext,
    timestamps: false
});

UserGroupRepository.belongsTo(UserRepository, { targetKey: "id", foreignKey: "user_id" });
UserRepository.hasOne(UserGroupRepository, { sourceKey: "id", foreignKey: "user_id" });

UserGroupRepository.belongsTo(GroupRepository, { targetKey: "id", foreignKey: "group_id" });
GroupRepository.hasOne(UserGroupRepository, { sourceKey: "id", foreignKey: "group_id" });

UserGroupRepository.belongsTo(PositionRepository, { targetKey: "id", foreignKey: "position_id" });
PositionRepository.hasOne(UserGroupRepository, { sourceKey: "id", foreignKey: "position_id" });

export {
    UserGroupRepository
}