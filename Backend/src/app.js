const express = require("express");
const {sequelizeInstance} = require("./shared/infrastructure/database/sequelizeConfig");
const {defineGameModel} = require("./game/infrastructure/models/GameModel");
const {SequelizeGameRepository} = require("./game/infrastructure/adapters/repositories/SequelizeGameRepository");
const {createCreateGameUseCase} = require("./game/application/usecases/createGame");
const {createGetGameByIdUseCase} = require("./game/application/usecases/getGameById");
const {createUpdateGameUseCase} = require("./game/application/usecases/updateGame");
const {createPatchGameUseCase} = require("./game/application/usecases/patchGame");
const {createDeleteGameUseCase} = require("./game/application/usecases/deleteGame");
const {createGameController} = require("./game/infrastructure/adapters/controllers/GameController");
const {createGameRoutes} = require("./game/infrastructure/routes/gameRoutes");
const {errorHandlerMiddleware} = require("./shared/infrastructure/middlewares/errorHandler");

/**
 * @typedef {Object} AppBundle
 * @property {import("express").Express} app - Configured Express application.
 * @property {import("sequelize").Sequelize} sequelizeInstance - Sequelize connection instance.
 */

/**
 * Composes the Express application wiring the hexagonal layers together.
 * This is the composition root; it is the only place where infrastructure
 * details are assembled and injected into the application layer.
 * @returns {AppBundle} The created Express application and Sequelize instance.
 */
function createApp() {
    const app = express();
    app.use(express.json());

    const gameModel = defineGameModel(sequelizeInstance);
    const gameRepository = new SequelizeGameRepository(gameModel);

    const useCases = {
        createGameUseCase: createCreateGameUseCase(gameRepository),
        getGameByIdUseCase: createGetGameByIdUseCase(gameRepository),
        updateGameUseCase: createUpdateGameUseCase(gameRepository),
        patchGameUseCase: createPatchGameUseCase(gameRepository),
        deleteGameUseCase: createDeleteGameUseCase(gameRepository)
    };

    const gameController = createGameController(useCases);
    const gameRoutes = createGameRoutes(gameController);

    app.use("/", gameRoutes);
    app.use(errorHandlerMiddleware);

    return {app: app, sequelizeInstance: sequelizeInstance};
}

module.exports = {createApp};