"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Endereco);
      this.hasMany(models.Funcionario)
    }
  }
  Usuario.init(
    {
      nome: DataTypes.STRING,
      bi: DataTypes.STRING,
      email: DataTypes.STRING,
      genero: DataTypes.STRING,
      telefone: DataTypes.STRING,
      status: DataTypes.STRING,
      dtNascimento: DataTypes.DATE,
      enderecoId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  return Usuario;
};
