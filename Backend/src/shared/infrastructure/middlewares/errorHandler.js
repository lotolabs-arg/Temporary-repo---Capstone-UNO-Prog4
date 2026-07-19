/**
 * Global Express error handling middleware.
 * Catches any error thrown or forwarded via next() and returns a normalized JSON response.
 * @param {Error & {statusCode?: number}} error - Error thrown in the request pipeline.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function errorHandlerMiddleware(error, req, res, next) {
    const statusCode = error.statusCode !== undefined ? error.statusCode : 500;
    const message = error.message !== undefined ? error.message : "Internal Server Error";

    res.status(statusCode).json({error: message});
}

module.exports = {errorHandlerMiddleware};