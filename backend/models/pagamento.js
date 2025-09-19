"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pagamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Aluno);
      this.belongsTo(models.Funcionario);
      this.belongsTo(models.Propina);
    }
  }
  Pagamento.init(
    {
      parcela: DataTypes.INTEGER,
      metodo: DataTypes.STRING,
      comprovativo: DataTypes.STRING,
      dt_pagamento: DataTypes.DATE,
      alunoId: DataTypes.INTEGER,
      funcionarioId: DataTypes.INTEGER,
      propinaId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pagamento",
    }
  );
  return Pagamento;
};
