import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";

const Level = sequelize.define('Level', {

    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

}, {
    tableName: 'level',
    timestamps: false,
});

// Association


export default Level;
