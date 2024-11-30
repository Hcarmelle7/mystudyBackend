import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import User from "./User.js";

const Message = sequelize.define('Message', {
    
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'message',
    timestamps: false,
});

Message.belongsTo(User, { foreignKey: 'user_id'});

export default Message;