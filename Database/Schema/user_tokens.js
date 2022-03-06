'use strict';
const { Model } = require('sequelize');

const { DEVICE_TYPES } = require("../../Configs/constants");

module.exports = (sequelize, DataTypes) => {
    class user_tokens extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user_tokens.belongsTo(models.users, {
                foreignKey: "user_id",
                onDelete: 'cascade'
            });
        }
    };

    user_tokens.init({
        id: {
            allowNull       : false,
            autoIncrement   : true,
            primaryKey      : true,
            type            : DataTypes.BIGINT(20).UNSIGNED
        },
        access_token        : {
            type            : DataTypes.STRING(100),
            comment         : "Access token"
        },
        build_version       : {
            type            : DataTypes.STRING(10),
            comment         : "Build version of user's application"
        },
        device_type         : {
            type            : DataTypes.ENUM,
            values          : Object.values(DEVICE_TYPES)
        },
        device_token        : {
            type            : DataTypes.STRING(255),
            comment         : "Device token of user application"
        },
        ip                  : {
            type            : DataTypes.STRING(50)
        },
        user_id             : {
            type            : DataTypes.BIGINT(20).UNSIGNED
        },
    }, {
        sequelize,
        modelName: 'user_tokens',
    });
    return user_tokens;
};