const {NotFoundError} = require("../../../shared/domain/errors/AppErrors");

/**
 * Builds the getGameById use case bound to a repository port implementation.
 * @param {import("../../domain/ports/GameRepositoryPort").GameRepositoryPort} gameRepository - Repository port.
 * @returns {function(number|string): Promise<import("../../domain/entities/Game").GameEntity>} Use case function.
 */
function createGetGameByIdUseCase(gameRepository) {
    /**
     * Retrieves a Game by its id.
     * @param {number|string} id - Identifier of the game.
     * @returns {Promise<import("../../domain/entities/Game").GameEntity>} Found Game entity.
     */
    return async function getGameByIdUseCase(id) {
        const foundGame = await gameRepository.findById(id);
        if (foundGame === null) {
            throw new NotFoundError("Game not found");
        }
        return foundGame;
    };
}

module.exports = {createGetGameByIdUseCase};