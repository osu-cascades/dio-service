'use strict';

module.exports = function(sequelize, DataTypes) {
  let Readings = sequelize.define('Readings', {
    reading: DataTypes.DOUBLE,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Readings;
};