const { STATUS } = require('../../Configs/constants');
var jwt = require('jsonwebtoken');
// Models
const userModel = new (require('./../../Models/User'))();

class Authenticator {
    constructor() {
		this.authenticate = this.authenticate.bind(this);
        this.optionalAuth = this.optionalAuth.bind(this);
		this.setUserType = this.setUserType.bind(this);
    }

    async authenticate(req, res, next) {
        let authToken = req.headers.authorization;
        if (!authToken) {
            res.handler.validationError(undefined, STATUS_MESSAGES.TOKEN.INVALID);
            return false
        }

        const userToken = await userModel.getUserTokenInfo(authToken);

        if (!userToken) {
            res.handler.unauthorized();
            return;
        }

        req.userInfo = userToken.user['dataValues'];
        this.setUserType(req)
        next();
    }

    async optionalAuth(req, res, next) {
        let authToken = req.headers.authorization;
        if (!authToken) {
            this.setUserType(req)
            return next()
        }

        const [userToken, customerToken] = await Promise.all([
            userModel.getUserTokenInfo(authToken),
        ]);


        req.userInfo = userToken ? userToken.user['dataValues'] : null;
        this.setUserType(req);
        next();
    }

    setUserType(req) {
        req.isAdmin = (req.userInfo) ? true : false;
        req.allowedStatus = (req.isAdmin) ? [STATUS.ACTIVE, STATUS.INACTIVE] : [STATUS.ACTIVE];
    }

}

module.exports = Authenticator;