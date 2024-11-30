import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db_config.js";
import School from "./School.js";

const Admin = sequelize.define('Admin', {
    
}, {
    tableName: 'admin',
    timestamps: false,
});

Admin.belongsTo(School, { foreignKey: 'school_id'});

export default Admin;