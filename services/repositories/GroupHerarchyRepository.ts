import { DataTypes, Model, Optional } from "sequelize";
import { GroupHerarchyData } from "../../models/GroupHerarchyData";
import { DBContext } from "../DBContext";


/*
 * \brief ��������� �����
 */
class GroupHerarchyRepository implements GroupHerarchyData {
    static init(arg0: {
        // ID ������
        group: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
        // ID ������������ ������
        mother_group: { type: DataTypes.BigIntDataTypeConstructor; allowNull: boolean; };
    }, arg1: {
        tableName: string; //!< ��� ������� GroupHerarchy
        sequelize: import("sequelize").Sequelize; timestamps: boolean;
    }) {
        throw new Error("Method not implemented.");
    }
    public group!: number;  //!< ID ������
    public mother_group!: number;  //!< ID ������������ ������
}

/*
 * \brief ����������� ������ ������� ��������� �����
 */
GroupHerarchyRepository.init({
    // ID ������
    group: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    // ID ������������ ������
    mother_group: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    tableName: "group_herarchy",      //!< ��� ������� GroupHerarchy
    sequelize: DBContext,
    timestamps: false
});

export {
    GroupHerarchyRepository
}