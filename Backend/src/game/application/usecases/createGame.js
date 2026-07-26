const {createGame} = require("../../domain/entities/Game");
const {ValidationError} = require("../../../shared/domain/errors/AppErrors");

/**
 * @typedef {Object} CreateGameInput
 * @property {string} title
 * @property {string} [status]
 * @property {number} maxPlayers
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
        const title = inputData.title;
        const status = inputData.status !== undefined ? inputData.status : "active";
        const maxPlayers = inputData.maxPlayers;

        if (title === undefined || title === null || title === "") {
            throw new ValidationError("Field 'title' is required");
        }

        if (maxPlayers === undefined || maxPlayers === null || Number.isInteger(maxPlayers) === false) {
            throw new ValidationError("Field 'maxPlayers' is required and must be an integer");
        }

        const newGame = createGame(null, title, status, maxPlayers);
        const savedGame = await gameRepository.create(newGame);
        return savedGame;
    };
}

module.exports = {createCreateGameUseCase};