'use strict';

module.exports = function(sequelize, DataTypes) {
  let DissolvedOxygenReading = sequelize.define('DissolvedOxygenReading', {
    reading: DataTypes.DOUBLE,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return DissolvedOxygenReading;
};