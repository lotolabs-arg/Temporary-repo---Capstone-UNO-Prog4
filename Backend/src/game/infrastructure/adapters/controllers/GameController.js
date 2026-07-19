const {ValidationError} = require("../../../../shared/domain/errors/AppErrors");

/**
 * @typedef {Object} GameUseCases
 * @property {Function} createGameUseCase
 * @property {Function} getGameByIdUseCase
 * @property {Function} updateGameUseCase
 * @property {Function} patchGameUseCase
 * @property {Function} deleteGameUseCase
 */

/**
 * Parses and validates a route parameter as an integer identifier.
 * @param {string} rawId - Raw identifier extracted from the request path.
 * @returns {number} Parsed integer identifier.
 */
function parseGameId(rawId) {
    const parsedId = parseInt(rawId, 10);
    if (Number.isNaN(parsedId)) {
        throw new ValidationError("Field 'id' must be a valid integer");
    }
    return parsedId;
}

/**
 * Builds the Express controller for the Game resource.
 * Translates HTTP requests into use case calls and use case results into HTTP responses.
 * @param {GameUseCases} useCases - Use cases required by the controller.
 * @returns {Object} Object containing Express request handlers.
 */
function createGameController(useCases) {
    const createGameUseCase = useCases.createGameUseCase;
    const getGameByIdUseCase = useCases.getGameByIdUseCase;
    const updateGameUseCase = useCases.updateGameUseCase;
    const patchGameUseCase = useCases.patchGameUseCase;
    const deleteGameUseCase = useCases.deleteGameUseCase;

    /**
     * Handles POST /game.
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    async function handleCreateGame(req, res, next) {
        try {
            const result = await createGameUseCase(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles GET /game/:id.
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    async function handleGetGameById(req, res, next) {
        try {
            const gameId = parseGameId(req.params.id);
            const result = await getGameByIdUseCase(gameId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles PUT /game/:id.
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    async function handleUpdateGame(req, res, next) {
        try {
            const gameId = parseGameId(req.params.id);
            const result = await updateGameUseCase(gameId, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles PATCH /game/:id.
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    async function handlePatchGame(req, res, next) {
        try {
            const gameId = parseGameId(req.params.id);
            const result = await patchGameUseCase(gameId, req.body);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles DELETE /game/:id.
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    async function handleDeleteGame(req, res, next) {
        try {
            const gameId = parseGameId(req.params.id);
            await deleteGameUseCase(gameId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    return {
        handleCreateGame: handleCreateGame,
        handleGetGameById: handleGetGameById,
        handleUpdateGame: handleUpdateGame,
        handlePatchGame: handlePatchGame,
        handleDeleteGame: handleDeleteGame
    };
}

module.exports = {createGameController};