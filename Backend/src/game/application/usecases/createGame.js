const {createGame} = require("../../domain/entities/Game");
const {ValidationError} = require("../../../shared/domain/errors/AppErrors");

/**
 * @typedef {Object} CreateGameInput
 * @property {string} name
 * @property {string} description
 * @property {string} genre
 * @property {string} platform
 */

/**
 * Builds the createGame use case bound to a repository port implementation.
 * @param {import("../../domain/ports/GameRepositoryPort").GameRepositoryPort} gameRepository - Repository port.
 * @returns {function(CreateGameInput): Promise<import("../../domain/entities/Game").GameEntity>} Use case function.
 */
function createCreateGameUseCase(gameRepository) {
    /**
     * Creates a new Game.
     * @param {CreateGameInput} inputData - Data required to create a game.
     * @returns {Promise<import("../../domain/entities/Game").GameEntity>} Created Game entity.
     */
    return async function createGameUseCase(inputData) {
        const name = inputData.name;
        const description = inputData.description;
        const genre = inputData.genre;
        const platform = inputData.platform;

        if (name === undefined || name === null || name === "") {
            throw new ValidationError("Field 'name' is required");
        }

        const newGame = createGame(null, name, description, genre, platform);
        const savedGame = await gameRepository.create(newGame);
        return savedGame;
    };
}

module.exports = {createCreateGameUseCase};