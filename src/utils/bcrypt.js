const bcrypt = require('bcrypt');

const saltRounds = 10
exports.salt = bcrypt.genSaltSync(saltRounds);
