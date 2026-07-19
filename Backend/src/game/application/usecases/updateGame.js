const {createGame} = require("../../domain/entities/Game");
const {NotFoundError} = require("../../../shared/domain/errors/AppErrors");

/**
 * @typedef {Object} UpdateGameInput
 * @property {string} name
 * @property {string} description
 * @property {string} genre
 * @property {string} platform
 */

/**
 * Builds the updateGame use case bound to a repository port implementation.
 * @param {import("../../domain/ports/GameRepositoryPort").GameRepositoryPort} gameRepository - Repository port.
 * @returns {function(number|string, UpdateGameInput): Promise<import("../../domain/entities/Game").GameEntity>} Use case function.
 */
function createUpdateGameUseCase(gameRepository) {
    /**
     * Fully replaces an existing Game.
     * @param {number|string} id - Identifier of the game.
     * @param {UpdateGameInput} inputData - New values for the game.
     * @returns {Promise<import("../../domain/entities/Game").GameEntity>} Updated Game entity.
     */
    return async function updateGameUseCase(id, inputData) {
        const replacementGame = createGame(
            id,
            inputData.name,
            inputData.description,
            inputData.genre,
            inputData.platform
        );

        const updatedGame = await gameRepository.update(id, replacementGame);
        if (updatedGame === null) {
            throw new NotFoundError("Game not found");
        }
        return updatedGame;
    };
}

module.exports = {createUpdateGameUseCase};