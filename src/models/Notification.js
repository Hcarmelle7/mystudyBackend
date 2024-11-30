import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import User from "./User.js";

const Notification = sequelize.define('Notification', {
   
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    road: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    sendTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'notification',
    timestamps: false,
});

// Association
Notification.belongsTo(User, { foreignKey: 'user_id'});

export default Notification;