'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Propina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Pagamento)
    }
  }
  Propina.init({
    mensalidade: DataTypes.INTEGER,
    classe: DataTypes.INTEGER,
    periodo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Propina',
  });
  return Propina;
};