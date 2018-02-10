'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.renameTable('DissolvedOxygenReadings', 'Readings');
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.renameTable('Readings', 'DissolvedOxygenReadings');
    }
};