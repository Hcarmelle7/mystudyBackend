import sequelize from "../../config/db_config.js";
import User from "./User.js";
import Country from "./Country.js";
import { DataTypes } from "sequelize";

const UserCountry = sequelize.define('UserCountry', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'id',
        },
    },
},
    {
        tableName: 'userCountries',
        timestamps: false,
    }
);

export default UserCountry;