"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pagamentos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parcela: {
        type: Sequelize.INTEGER,
      },
      metodo: {
        type: Sequelize.ENUM('A mão', 'Bancário'),
        allowNull: false,
      },
      comprovativo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dt_pagamento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      alunoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { key: "id", model: "alunos" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      funcionarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { key: "id", model: "funcionarios" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      propinaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { key: "id", model: "propinas" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("pendente", "atendido"),
        allowNull: false,
        defaultValue: "pendente",
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
    await queryInterface.dropTable("Pagamentos");
  },
};
