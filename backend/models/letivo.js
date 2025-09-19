'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Letivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Turma)
    }
  }
  Letivo.init({
    dtInicio: DataTypes.DATE,
    dtFim: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Letivo',
  });
  return Letivo;
};