
class PlutusError extends Error {
    constructor(errorType, message,endpoint) {
        super(message);
        this.name = "PlutusError";
        this.errorType = errorType;
        this.failure = `${endpoint}_failure`;
    }
}

class PlutusBadJsonBodyError extends PlutusError{
    constructor(endpoint){
        super(
            "request_body_missing_keys",
            "Request body was missing required keys.",
            endpoint
        );
    }
}

class PlutusUserNotFoundDbError extends PlutusError {
    constructor(endpoint){
        super(
            "user_not_found",
            "No user with this email exists in the database.",
            endpoint
        );
        this.name = "PlutusUserNotFoundDbError";
    }
}

class PlutusPasswordMismatchDbError extends PlutusError {
    constructor(endpoint){
        super(
            "password_mismatch",
            "The provided password does not match the password in the db.",
            endpoint
        );
        this.name = "PlutusPasswordMismatchDbError";
    }
}

class PlutusMissingRequestParamsError extends PlutusError {
    constructor(endpoint){
        super(
            "missing_request_params",
            "The HTTP request has missing parameters.",
            endpoint
        );
        this.name = "PlutusMissingRequestParamsError";
    }
}

class PlutusPriceBoundError extends PlutusError {
    constructor(endpoint){
        super(
            "invalid_price_bounds",
            "The price bounds for this request are invalid. Make sure that the lower bound is less than or equal to the upper bound.",
            endpoint
        );
        this.name = "PlutusPriceBoundError";
    }
}
module.exports = { 
    PlutusUserNotFoundDbError,
    PlutusPasswordMismatchDbError,
    PlutusBadJsonRequestError: PlutusBadJsonBodyError,
    PlutusMissingRequestParamsError,
    PlutusPriceBoundError
};