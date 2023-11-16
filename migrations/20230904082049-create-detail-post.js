'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailPosts', {
      BTD_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      DataSubmitted: {
        allowNull: true,
        type: Sequelize.DATE
      },
      EndDate: {
        allowNull: true,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('DetailPosts');
  }
};