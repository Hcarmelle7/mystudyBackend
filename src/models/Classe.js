import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Teacher from "./Teacher.js";
import School from "./School.js";
import Level from "./Level.js";

const Classe = sequelize.define('Classe', {

    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Nstudents: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    levelId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Level,
            key: "id"
        }
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Teacher,
            key: "id",
        },
    },
    schoolId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: School,
            key: "id",
        },
    },
    
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
    },
}, {
    tableName: 'classe',
    timestamps: false,
});


Classe.belongsTo(Teacher, { foreignKey: 'teacherId' });
Classe.belongsTo(School, { foreignKey: 'schoolId' });
Classe.belongsTo(Level, { foreignKey: 'levelId' });


export default Classe;