/**
 * Port defining the contract that any Game persistence adapter must implement.
 * The domain and application layers depend only on this abstraction.
 * @interface GameRepositoryPort
 */
class GameRepositoryPort {
    /**
     * Persists a new Game entity.
     * @param {import("../entities/Game").GameEntity} game - Game entity to create.
     * @returns {Promise<import("../entities/Game").GameEntity>} Created Game entity with generated id.
     */
    async create(game) {
        throw new Error("Method not implemented");
    }

    /**
     * Finds a Game entity by id.
     * @param {number|string} id - Identifier of the game.
     * @returns {Promise<import("../entities/Game").GameEntity|null>} Found Game entity or null.
     */
    async findById(id) {
        throw new Error("Method not implemented");
    }

    /**
     * Replaces all fields of an existing Game entity.
     * @param {number|string} id - Identifier of the game.
     * @param {import("../entities/Game").GameEntity} game - New values for the game.
     * @returns {Promise<import("../entities/Game").GameEntity|null>} Updated Game entity or null.
     */
    async update(id, game) {
        throw new Error("Method not implemented");
    }

    /**
     * Updates only the provided fields of an existing Game entity.
     * @param {number|string} id - Identifier of the game.
     * @param {Object} partialData - Partial fields to update.
     * @returns {Promise<import("../entities/Game").GameEntity|null>} Updated Game entity or null.
     */
    async patch(id, partialData) {
        throw new Error("Method not implemented");
    }

    /**
     * Deletes a Game entity by id.
     * @param {number|string} id - Identifier of the game.
     * @returns {Promise<boolean>} True if deleted, false if not found.
     */
    async delete(id) {
        throw new Error("Method not implemented");
    }
}

module.exports = {GameRepositoryPort};