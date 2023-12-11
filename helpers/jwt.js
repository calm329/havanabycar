const jwt  = require('jsonwebtoken');
const  secrets = require('../secrets/secrets.js');

const createToken = id => {
    const payLoad = {id};
    const maxAge = 60 * 60;
    const jwtOptions = {expiresIn: maxAge};
    const token = jwt.sign(payLoad, secrets.jwtSecret, jwtOptions);
    return token;
}

const checkToken = async (token) => {
    const decodedToken = await jwt.verify(token, secrets.jwtSecret);
    return decodedToken;
}

module.exports = { checkToken, createToken };