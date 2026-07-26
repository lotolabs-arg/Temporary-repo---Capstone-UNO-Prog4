const express = require("express");

/**
 * Builds the Express router for the Game resource.
 * @param {Object} gameController - Controller returned by createGameController.
 * @returns {import("express").Router} Configured Express router.
 */
function createGameRoutes(gameController) {
    var router = express.Router();

    router.post("/api/games", gameController.handleCreateGame);
    router.get("/api/games/:id", gameController.handleGetGameById);
    router.put("/api/games/:id", gameController.handleUpdateGame);
    router.patch("/api/games/:id", gameController.handlePatchGame);
    router.delete("/api/games/:id", gameController.handleDeleteGame);

    return router;
}

module.exports = {createGameRoutes};