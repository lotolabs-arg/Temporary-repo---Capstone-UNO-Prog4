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
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "active"
            },
            maxPlayers: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "games",
            timestamps: true
        }
    );

    return GameModel;
}

module.exports = {defineGameModel};
