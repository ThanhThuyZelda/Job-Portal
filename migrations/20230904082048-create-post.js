'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      headline: {
        type: Sequelize.TEXT
      },
      salary: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      require: {
        type: Sequelize.TEXT
      },
      des: {
        type: Sequelize.TEXT
      },
      benefit: {
        type: Sequelize.TEXT
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING
      },
      workform: {
        type: Sequelize.TEXT
      },
      skillID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      empID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      compID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      DeadlineSubmission: {
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};