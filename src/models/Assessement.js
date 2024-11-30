import sequelize from "../../config/db_config.js";
import Cour from "./Cour.js";
import Student from "./Student.js";
import { DataTypes } from "sequelize";

const Assessement = sequelize.define('Assessement', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cour,
            key: 'id'
        }
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Student,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default Assessement;

