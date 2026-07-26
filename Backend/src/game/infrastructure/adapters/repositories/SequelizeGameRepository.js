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
            title: game.title,
            status: game.status,
            maxPlayers: game.maxPlayers
        });

        return this.#toEntity(createdRecord);
    }

    /**
     * @param {string} id
     * @returns {Promise<import("../../../domain/entities/Game").GameEntity|null>}
     */
    async findById(id) {
        const foundRecord = await this.gameModel.findByPk(id);
        if (foundRecord === null) {
            return null;
        }

        return this.#toEntity(foundRecord);
    }

    /**
     * @param {string} id
     * @param {import("../../../domain/entities/Game").GameEntity} game
     * @returns {Promise<import("../../../domain/entities/Game").GameEntity|null>}
     */
    async update(id, game) {
        const foundRecord = await this.gameModel.findByPk(id);
        if (foundRecord === null) {
            return null;
        }

        foundRecord.title = game.title;
        foundRecord.status = game.status;
        foundRecord.maxPlayers = game.maxPlayers;
        await foundRecord.save();

        return this.#toEntity(foundRecord);
    }

    /**
     * @param {string} id
     * @param {Object} partialData
     * @returns {Promise<import("../../../domain/entities/Game").GameEntity|null>}
     */
    async patch(id, partialData) {
        const foundRecord = await this.gameModel.findByPk(id);
        if (foundRecord === null) {
            return null;
        }

        if (partialData.title !== undefined) {
            foundRecord.title = partialData.title;
        }
        if (partialData.status !== undefined) {
            foundRecord.status = partialData.status;
        }
        if (partialData.maxPlayers !== undefined) {
            foundRecord.maxPlayers = partialData.maxPlayers;
        }
        await foundRecord.save();

        return this.#toEntity(foundRecord);
    }

    /**
     * @param {string} id
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

    /**
     * Maps a Sequelize Game record into a domain GameEntity.
     * @param {Object} record - Sequelize model instance.
     * @returns {import("../../../domain/entities/Game").GameEntity}
     */
    #toEntity(record) {
        return createGame(
            record.id,
            record.title,
            record.status,
            record.maxPlayers,
            record.createdAt,
            record.updatedAt
        );
    }
}

module.exports = {SequelizeGameRepository};
