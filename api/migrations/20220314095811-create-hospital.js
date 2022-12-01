'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hospitals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING
      },
      long: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      alamat: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      cover: {
        allowNull: false,
        type: Sequelize.STRING
      },
      igd: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      ugd: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      icu: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      vaksin: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      rawatInap: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      rawatJalan: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      lab: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      medicalCheckup: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
    await queryInterface.dropTable('Hospitals');
  }
};