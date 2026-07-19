const {GameRepositoryPort} = require("../../../domain/ports/GameRepositoryPort");
const {createGame} = require("../../../domain/entities/Game");

/**
 * Sequelize/PostgreSQL adapter implementing the GameRepositoryPort.
 * This is the only layer aware of the database technology in use.
 * @extends GameRepositoryPort
 */
class SequelizeGameRepository extends GameRepositoryPort {
    /**
     * @param {import("sequelize").ModelStatic} gameModel - Sequelize Game model.
     */
    constructor(gameModel) {
        super();
        this.gameModel = gameModel;
    }

    /**
     * @param {import("../../../domain/entities/Game").GameEntity} game
     * @returns {Promise<import("../../../domain/entities/Game").GameEntity>}
     */
    async create(game) {
        const createdRecord = await this.gameModel.create({
            name: game.name,
            description: game.description,
            genre: game.genre,
            platform: game.platform
        });

        return createGame(
            createdRecord.id,
            createdRecord.name,
            createdRecord.description,
            createdRecord.genre,
            createdRecord.platform
        );
    }

    /**
     * @param {number|string} id
     * @returns {Promise<import("../../../domain/entities/Game").GameEntity|null>}
     */
    async findById(id) {
        const foundRecord = await this.gameModel.findByPk(id);
        if (foundRecord === null) {
            return null;
        }

        return createGame(
            foundRecord.id,
            foundRecord.name,
            foundRecord.description,
            foundRecord.genre,
            foundRecord.platform
        );
    }

    /**
     * @param {number|string} id
     * @param {import("../../../domain/entities/Game").GameEntity} game
     * @returns {Promise<import("../../../domain/entities/Game").GameEntity|null>}
     */
    async update(id, game) {
        const foundRecord = await this.gameModel.findByPk(id);
        if (foundRecord === null) {
            return null;
        }

        foundRecord.name = game.name;
        foundRecord.description = game.description;
        foundRecord.genre = game.genre;
        foundRecord.platform = game.platform;
        await foundRecord.save();

        return createGame(
            foundRecord.id,
            foundRecord.name,
            foundRecord.description,
            foundRecord.genre,
            foundRecord.platform
        );
    }

    /**
     * @param {number|string} id
     * @param {Object} partialData
     * @returns {Promise<import("../../../domain/entities/Game").GameEntity|null>}
     */
    async patch(id, partialData) {
        const foundRecord = await this.gameModel.findByPk(id);
        if (foundRecord === null) {
            return null;
        }

        if (partialData.name !== undefined) {
            foundRecord.name = partialData.name;
        }
        if (partialData.description !== undefined) {
            foundRecord.description = partialData.description;
        }
        if (partialData.genre !== undefined) {
            foundRecord.genre = partialData.genre;
        }
        if (partialData.platform !== undefined) {
            foundRecord.platform = partialData.platform;
        }
        await foundRecord.save();

        return createGame(
            foundRecord.id,
            foundRecord.name,
            foundRecord.description,
            foundRecord.genre,
            foundRecord.platform
        );
    }

    /**
     * @param {number|string} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        const foundRecord = await this.gameModel.findByPk(id);
        if (foundRecord === null) {
            return false;
        }

        await foundRecord.destroy();
        return true;
    }
}

module.exports = {SequelizeGameRepository};