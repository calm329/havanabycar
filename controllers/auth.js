const secrets = require('../secrets/secrets.js');
const jwt = require('../helpers/jwt.js');

const login = async (req, res) => {
    //Make sure credentials match
    if (req.body.user != secrets.auth.user || req.body.pw != secrets.auth.pw) {
        return res.sendStatus(401);
    }
    //Create jwt and put it in a cookie
    const token = jwt.createToken(secrets.auth.user);
    res.cookie('auth', token, { maxAge: 60 * 60 * 1000, httpOnly: true, secure: true });
    //Send response
    return res.sendStatus(200);
}

const logout = async (req, res) => {
    res.clearCookie('auth');
    res.sendStatus(200);
}

module.exports = { logout, login };