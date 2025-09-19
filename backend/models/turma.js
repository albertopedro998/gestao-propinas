"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Turma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Letivo);
      this.hasMany(models.Aluno);
    }
  }
  Turma.init(
    {
      nome: DataTypes.STRING,
      sala: DataTypes.INTEGER,
      classe: DataTypes.INTEGER,
      periodo: DataTypes.STRING,
      curso: DataTypes.STRING,
      letivoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Turma",
    }
  );
  return Turma;
};
