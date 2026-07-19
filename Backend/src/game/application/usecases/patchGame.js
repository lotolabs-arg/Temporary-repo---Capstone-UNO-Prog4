const {NotFoundError} = require("../../../shared/domain/errors/AppErrors");

/**
 * @typedef {Object} PatchGameInput
 * @property {string} [name]
 * @property {string} [description]
 * @property {string} [genre]
 * @property {string} [platform]
 */

/**
 * Builds the patchGame use case bound to a repository port implementation.
 * @param {import("../../domain/ports/GameRepositoryPort").GameRepositoryPort} gameRepository - Repository port.
 * @returns {function(number|string, PatchGameInput): Promise<import("../../domain/entities/Game").GameEntity>} Use case function.
 */
function createPatchGameUseCase(gameRepository) {
    /**
     * Partially updates an existing Game.
     * @param {number|string} id - Identifier of the game.
     * @param {PatchGameInput} partialData - Fields to update.
     * @returns {Promise<import("../../domain/entities/Game").GameEntity>} Updated Game entity.
     */
    return async function patchGameUseCase(id, partialData) {
        const patchedGame = await gameRepository.patch(id, partialData);
        if (patchedGame === null) {
            throw new NotFoundError("Game not found");
        }
        return patchedGame;
    };
}

module.exports = {createPatchGameUseCase};