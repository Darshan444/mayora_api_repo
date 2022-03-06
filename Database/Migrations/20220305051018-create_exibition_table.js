"use strict";

const { STATUS } = require("../../Configs/constants");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("exhibitions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED,
      },
      title: {
        type: Sequelize.STRING(100),
        comment: "exhibition title.",
      },
      image: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATEONLY,
      },
      end_date: {
        type: Sequelize.DATEONLY,
      },
      status: {
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.ACTIVE,
        comment: "0 => Inactive, 1 => Active, 2 => Deleted",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("exhibitions");
  },
};
