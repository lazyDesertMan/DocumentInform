import { DataTypes, Model, Optional } from "sequelize";
import { RoleData } from "../../models/RoleData";
import { DBContext } from "../DBContext";


/*
 * \brief Определение необязательных параметров для обработки ролей
 * 
 * Параметр id автоматически генерируется СУБД
 */
interface RoleAttributes extends Optional<RoleData, 'id'> { }

/*
 * \brief Хранилище ролей
 */
class RoleRepository extends Model<RoleAttributes> implements RoleData {
    public id!:   number;  //!< ID роли
    public name!: string;  //!< Название роли
}

/*
 * \brief Определение модели таблицы ролей
 */
RoleRepository.init({
    // ID роли
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    // Название роли
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: "role",      //!< Имя таблицы ролей
    sequelize: DBContext,
    timestamps: false
});

export {
    RoleRepository
}