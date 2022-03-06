"use strict";
const { Model } = require("sequelize");
const encrypt = new (require("./../../Configs/encrypt"))();
const { USER_TYPES } = require("../../Configs/constants");

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.user_tokens, {
        foreignKey: "user_id",
        onDelete: "cascade",
      });
    }
  }

  users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20).UNSIGNED,
      },
      first_name: {
        type: DataTypes.STRING(255),
        comment: "First name of user",
      },
      last_name: {
        type: DataTypes.STRING(255),
        comment: "Last name of user",
      },
      username: {
        type: DataTypes.STRING(255),
        comment: "Username of user",
      },
      email: {
        type: DataTypes.STRING(100),
        set(val) {
          this.setDataValue("email", val.toLowerCase());
        },
      },
      password: {
        type: DataTypes.STRING(255),
        comment: "Password of user",
        defaultValue: "",
        set(val) {
          this.setDataValue("password", encrypt.encryptEntity(val));
        },
      },
      mobile: {
        type: DataTypes.STRING(50),
        comment: "Mobile number of user",
        defaultValue: "",
      },
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: STATUS.INACTIVE,
        comment: "0 => Inactive, 1 => Active, 2 => Deleted",
      },
      full_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.first_name ? this.first_name : ""} ${
            this.last_name ? this.last_name : ""
          }`;
        },
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
