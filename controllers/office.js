const models = require('../models/models.js');

const edit = async (req, res) => {
    const data = await models.Location.findById(req.params.id);
    if(!data) return res.status(404).send('Quest\' Ufficio Non Esiste');
    res.render('admin/editOffice', {data});
}

const list = async (req, res) => {
    const data = await models.Location.find({});
    res.status(200).json({data});
}

const add = async (req, res) => {
    try{
        await models.Location(req.body).save();
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

const del = async (req, res) => {
    try{
        const office = await models.Location.findByIdAndDelete(req.body.id);
        if(!office) return res.sendStatus(404);
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}

const pushChanges = async (req, res) => {

    try{

        const changes = {
            onlyHavana: req.body.onlyHavana,
            saturdayHalf: req.body.saturdayHalf, 
            sundayClosed: req.body.sundayClosed, 
            citta: req.body.citta, 
            azienda: req.body.azienda, 
            min_hour: req.body.min_hour, 
            max_hour: req.body.max_hour, 
            ufficio: req.body.ufficio, 
            indirizzo: req.body.ufficio, 
            telefono: req.body.telefono
        };

        const office = await models.Location.findByIdAndUpdate(req.body.id, changes);
        if(!office) return res.sendStatus(404);
        res.sendStatus(200);

    }catch(error){
        console.log(error);
        return res.status(500).send();
    }
}

module.exports = { edit, list, add, del, pushChanges };