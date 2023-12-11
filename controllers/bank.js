const models = require('../models/models.js');

const addBank = async (req, res) => {
    try {
        await models.Banco(req.body).save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const setBank = async (req, res) => {
    try {
        const bankQuery = {};
        bankQuery[req.body.prop] = true;
        const resetChanges = {};
        resetChanges[req.body.prop] = false;
        await models.Banco.findOneAndUpdate(bankQuery, resetChanges);
        await models.Banco.findByIdAndUpdate(req.params.id, bankQuery);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { addBank, setBank };