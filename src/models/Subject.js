import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Teacher from "./Teacher.js";

const Subject = sequelize.define('Subject', {

    title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
 description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'subject',
  timestamps: false,
});

// Association

export default Subject;
