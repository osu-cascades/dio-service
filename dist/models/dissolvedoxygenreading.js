'use strict';

module.exports = function (sequelize, DataTypes) {
  var DissolvedOxygenReading = sequelize.define('DissolvedOxygenReading', {
    reading: DataTypes.DOUBLE,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return DissolvedOxygenReading;
};
//# sourceMappingURL=dissolvedoxygenreading.js.map