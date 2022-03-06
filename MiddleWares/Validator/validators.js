const { validationResult } = require('express-validator')

const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.handler.validationError(undefined, errors.array()[0]['msg']);
    };
};

module.exports = {
    validate
}