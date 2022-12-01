'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Hospital.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    long: DataTypes.STRING,
    lat: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    description: DataTypes.TEXT,
    alamat: DataTypes.TEXT,
    cover: DataTypes.STRING,
    igd: DataTypes.BOOLEAN,
    ugd: DataTypes.BOOLEAN,
    icu: DataTypes.BOOLEAN,
    vaksin: DataTypes.BOOLEAN,
    rawatInap: DataTypes.BOOLEAN,
    rawatJalan: DataTypes.BOOLEAN,
    lab: DataTypes.BOOLEAN,
    medicalCheckup: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Hospital',
  });
  return Hospital;
};