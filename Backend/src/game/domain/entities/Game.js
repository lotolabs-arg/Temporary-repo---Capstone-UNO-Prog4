/**
 * @typedef {Object} GameEntity
 * @property {number|null} id - Unique identifier of the game.
 * @property {string} name - Name of the game.
 * @property {string} description - Description of the game.
 * @property {string} genre - Genre of the game.
 * @property {string} platform - Platform of the game.
 */

/**
 * Creates an immutable Game entity object.
 * @param {number|null} id - Unique identifier of the game.
 * @param {string} name - Name of the game.
 * @param {string} description - Description of the game.
 * @param {string} genre - Genre of the game.
 * @param {string} platform - Platform of the game.
 * @returns {GameEntity} The created Game entity.
 */
function createGame(id, name, description, genre, platform) {
    return Object.freeze({
        id: id,
        name: name,
        description: description,
        genre: genre,
        platform: platform
    });
}

module.exports = {createGame};