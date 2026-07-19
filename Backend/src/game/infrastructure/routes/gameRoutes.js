const express = require("express");

/**
 * Builds the Express router for the Game resource.
 * @param {Object} gameController - Controller returned by createGameController.
 * @returns {import("express").Router} Configured Express router.
 */
function createGameRoutes(gameController) {
    var router = express.Router();

    router.post("/game", gameController.handleCreateGame);
    router.get("/game/:id", gameController.handleGetGameById);
    router.put("/game/:id", gameController.handleUpdateGame);
    router.patch("/game/:id", gameController.handlePatchGame);
    router.delete("/game/:id", gameController.handleDeleteGame);

    return router;
}

module.exports = {createGameRoutes};