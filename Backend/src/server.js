const {createApp} = require("./app");

const PORT = process.env.PORT !== undefined ? process.env.PORT : 3000;

/**
 * Bootstraps the database connection and starts the HTTP server.
 * @returns {Promise<void>} Resolves once the server has started listening.
 */
async function startServer() {
    const appBundle = createApp();
    const app = appBundle.app;
    const sequelizeInstance = appBundle.sequelizeInstance;

    try {
        await sequelizeInstance.authenticate();
        await sequelizeInstance.sync();
        app.listen(PORT, function () {
            console.log("Server running on port " + PORT);
        });
    } catch (error) {
        console.log("Unable to start server: " + error.message);
    }
}

startServer();