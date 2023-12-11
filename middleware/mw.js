const jwt = require('../helpers/jwt.js');
const models = require('../models/models.js');
const config = require('../data/config.js');
const translate = require("../helpers/translate.js");

const verify = async (req, res, next) => {
    try {
        if (!req.cookies.auth) throw Error();
        const token = await jwt.checkToken(req.cookies.auth);
        if (token.id != "Gemini") throw Error();
        return next();
    } catch (error) {
        if (req.method === "POST") return res.sendStatus(401);
        if (req.method === "GET") return res.redirect('/admin');
    }
}

const isAdmin = async (req, res, next) => {
    req.isAdmin = req.cookies.auth ? true : false;
    next();
}

const getAllCars = async (req, res, next) => {
    const allCarsQuery = { isActive: true };
    const cars = await models.Car.find(allCarsQuery);
    req.cars = cars;
    if (config.config.isDown == true) {
        return res.render("down", translate.text(req, 'down'));
    };
    return next();
}

module.exports = { verify, getAllCars, isAdmin };