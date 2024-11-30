import { DataTypes } from "sequelize";
import sequelize from "../../config/db_config.js";
import User from "./User.js";

const Country = sequelize.define('Country', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    tableName: 'countries',
    timestamps: false,
}
);

Country.belongsToMany(User, { through: 'UserCountry' });
User.belongsToMany(Country, { through: 'UserCountry' });

export default Country;
