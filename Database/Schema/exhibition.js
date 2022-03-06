"use strict";
const { Model } = require("sequelize");
const { STATUS } = require("../../Configs/constants");

module.exports = (sequelize, DataTypes) => {
  class exhibitions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  exhibitions.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT(20).UNSIGNED,
      },
      title: {
        type: DataTypes.STRING(100),
        comment: "exhibition title.",
      },
      image: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATEONLY,
      },
      end_date: {
        type: DataTypes.DATEONLY,
      },
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: STATUS.ACTIVE,
        comment: "0 => Inactive, 1 => Active, 2 => Deleted",
      },
    },
    {
      sequelize,
      modelName: "exhibitions",
    }
  );
  return exhibitions;
};
