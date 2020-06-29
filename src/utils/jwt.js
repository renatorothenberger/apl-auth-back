const jwt = require('jsonwebtoken');
const authConfig = require('./auth.json');

exports.generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}