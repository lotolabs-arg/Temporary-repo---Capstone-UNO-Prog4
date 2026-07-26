/**
 * @typedef {Object} GameEntity
 * @property {string|null} id - Unique identifier (UUID) of the game.
 * @property {string} title - Title of the game.
 * @property {string} status - Current status of the game (e.g. "active", "finished").
 * @property {number} maxPlayers - Maximum number of players allowed in the game.
 * @property {string|null} createdAt - ISO timestamp of when the game was created.
 * @property {string|null} updatedAt - ISO timestamp of the last update to the game.
 */

/**
 * Creates an immutable Game entity object.
 * @param {string|null} id - Unique identifier (UUID) of the game.
 * @param {string} title - Title of the game.
 * @param {string} status - Current status of the game.
 * @param {number} maxPlayers - Maximum number of players allowed.
 * @param {string|null} [createdAt] - ISO timestamp of creation.
 * @param {string|null} [updatedAt] - ISO timestamp of the last update.
 * @returns {GameEntity} The created Game entity.
 */
function createGame(id, title, status, maxPlayers, createdAt, updatedAt) {
    return Object.freeze({
        id: id,
        title: title,
        status: status,
        maxPlayers: maxPlayers,
        createdAt: createdAt !== undefined ? createdAt : null,
        updatedAt: updatedAt !== undefined ? updatedAt : null
    });
}

module.exports = {createGame};
