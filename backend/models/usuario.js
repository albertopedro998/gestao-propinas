"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
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
      this.hasMany(models.Funcionario);
    }

    checkpassword(pass) {
      return bcrypt.compare(pass, this.password);
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
      password: DataTypes.STRING,
      pass: DataTypes.VIRTUAL,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  /* Usuario.addHook("beforeSave", async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.pass, 8);
    }
  }); */

  return Usuario;
};
