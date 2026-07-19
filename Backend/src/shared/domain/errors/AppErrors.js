/**
 * Custom error representing an invalid or missing input value.
 * Maps to HTTP 400 Bad Request at the infrastructure boundary.
 * @extends Error
 */
class ValidationError extends Error {
    /**
     * @param {string} message - Human readable description of the validation failure.
     */
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

/**
 * Custom error representing a resource that could not be found.
 * Maps to HTTP 404 Not Found at the infrastructure boundary.
 * @extends Error
 */
class NotFoundError extends Error {
    /**
     * @param {string} message - Human readable description of what was not found.
     */
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

module.exports = {ValidationError, NotFoundError};