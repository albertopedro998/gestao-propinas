'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Propinas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mensalidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      classe: {
        type: Sequelize.ENUM('1','2','3','4','5','6','7','8','9'),
        allowNull: false
      },
      periodo: {
        type: Sequelize.ENUM('M','T','N'),
        allowNull: false
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
    await queryInterface.dropTable('Propinas');
  }
};