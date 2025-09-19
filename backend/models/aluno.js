"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Pagamento);
      this.belongsTo(models.Usuario);
      this.belongsTo(models.Turma);
    }
  }
  Aluno.init(
    {
      num_matricula: DataTypes.INTEGER,
      turmaId: DataTypes.INTEGER,
      usuarioId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Aluno",
    }
  );
  return Aluno;
};
