const {DataTypes} = require("sequelize");

/**
 * Defines the Sequelize model that maps the "games" table.
 * @param {import("sequelize").Sequelize} sequelizeInstance - Sequelize connection instance.
 * @returns {import("sequelize").ModelStatic} The Game Sequelize model.
 */
function defineGameModel(sequelizeInstance) {
    var GameModel = sequelizeInstance.define(
        "Game",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: true
            },
            platform: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            tableName: "games",
            timestamps: false
        }
    );

    return GameModel;
}

module.exports = {defineGameModel};