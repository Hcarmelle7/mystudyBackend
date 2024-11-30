import { DataTypes } from "sequelize";
import sequelize from "../../config/db_config.js";
import ChapterContent from "./ChapterContent.js";
import Cour from "./Cour.js";
import Teacher from "./Teacher.js";

const CourTeacher = sequelize.define('CourTeacher', {

    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cour,
            key: 'id'
        }
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Teacher,
            key: 'id'
        }
    },
    chapterContentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ChapterContent,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
{
    tableName: 'courTeacher',
    timestamps: false,
});


CourTeacher.belongsTo(ChapterContent, { foreignKey: 'chapterContentId' });

export default CourTeacher;

