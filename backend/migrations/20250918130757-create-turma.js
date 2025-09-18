'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turmas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sala: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      classe: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      periodo: {
        type: Sequelize.ENUM('M','T','N'),
        allowNull: false,
      },
      curso: {
        type: Sequelize.STRING
      },
      letivoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {key: 'id', model: 'letivos'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('Turmas');
  }
};