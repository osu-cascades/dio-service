'use strict';
module.exports = (sequelize, DataTypes) => {
  var Harvest = sequelize.define('Harvest', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Harvest;
};
