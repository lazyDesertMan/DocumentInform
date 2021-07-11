import { DataTypes, Model, Optional } from "sequelize";
import { GroupData } from "../../models/GroupData";
import { DBContext } from "../DBContext";
import { UserRepository } from "./UserRepository";


/*
 * \brief Определение необязательных параметров для обработки групп
 * 
 * Параметр id автоматически генерируется СУБД
 */
interface GroupAttributes extends Optional<GroupData, 'id'> { }

/*
 * \brief Хранилище групп
 */
class GroupRepository extends Model<GroupAttributes> implements GroupData {
    public id!:     number;  //!< ID группы
    public name!:   string;  //!< Название группы
    public leader!: number;  //!< ID лидера группы
}

/*
 * \brief Определение модели таблицы групп
 */
GroupRepository.init({
    // ID группы
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // Название группы
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    // ID лидера группы
    leader: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true         // TODO: Может ли один человек руководить несколькими группами?
    },
}, {
    tableName: "group",      //!< Имя таблицы Group
    sequelize: DBContext,
    timestamps: false
});

GroupRepository.belongsTo(UserRepository, { targetKey: "id", foreignKey: "leader" });
UserRepository.hasOne(GroupRepository, { sourceKey: "id", foreignKey: "leader" });

export {
    GroupRepository
}