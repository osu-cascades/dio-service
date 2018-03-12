'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .addColumn('Readings', 'type', {type: Sequelize.INTEGER});
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Readings', 'type');
    }
};