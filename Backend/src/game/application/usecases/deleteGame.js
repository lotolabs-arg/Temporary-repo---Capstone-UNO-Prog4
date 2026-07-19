const {NotFoundError} = require("../../../shared/domain/errors/AppErrors");

/**
 * Builds the deleteGame use case bound to a repository port implementation.
 * @param {import("../../domain/ports/GameRepositoryPort").GameRepositoryPort} gameRepository - Repository port.
 * @returns {function(number|string): Promise<void>} Use case function.
 */
function createDeleteGameUseCase(gameRepository) {
    /**
     * Deletes an existing Game.
     * @param {number|string} id - Identifier of the game.
     * @returns {Promise<void>} Resolves when the game has been deleted.
     */
    return async function deleteGameUseCase(id) {
        const wasDeleted = await gameRepository.delete(id);
        if (wasDeleted === false) {
            throw new NotFoundError("Game not found");
        }
    };
}

module.exports = {createDeleteGameUseCase};