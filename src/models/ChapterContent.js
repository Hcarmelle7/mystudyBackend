import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import Teacher from "./Teacher.js";

const ChapterContent = sequelize.define('ChapterContent', {

  type: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ContentValue: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'chapterContent',
  timestamps: false,
});

// Association

export default ChapterContent;
