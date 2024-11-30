import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Teacher from "./Teacher.js";

const Quiz = sequelize.define('Quiz', {

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Nquestions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'quiz',
  timestamps: false,
});

// Association

export default Quiz;
