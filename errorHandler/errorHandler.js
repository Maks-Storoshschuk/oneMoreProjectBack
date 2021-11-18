class ErrorHandler extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}

function ErrorBuilder(cod) {
    const {message, code} = cod;
    throw new ErrorHandler(message, code);
}

module.exports = ErrorBuilder;
