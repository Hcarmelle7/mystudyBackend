import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Teacher from "./Teacher.js";
import Subject from "./Subject.js";

const SubjectTeacher = sequelize.define('SubjectTeacher', {

  SubjectId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Subject,
      key: "id",
    },
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Teacher,
      key: "id",
    },
  },
  
}, {
  tableName: 'subjectTeacher',
  timestamps: false,
});

// Association
SubjectTeacher.belongsTo(Subject, {foreignKey: 'sujectId'});
SubjectTeacher.belongsTo(Teacher, {foreignKey: 'teacherId'});


export default SubjectTeacher;
