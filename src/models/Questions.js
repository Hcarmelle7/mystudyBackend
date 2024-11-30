import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Teacher from "./Teacher.js";

const Question = sequelize.define('Question', {
  
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('multiple', 'bool', 'input'),
    allowNull: false,
  },
  level: {
    type: DataTypes.ENUM('easy', 'medium', 'hard', 'xtrem'),
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'question',
  timestamps: false,
});

// Association
Question.belongsTo(Teacher, { foreignKey: 'teacherId'});
export default Question;
