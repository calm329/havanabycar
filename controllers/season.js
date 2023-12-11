const models = require('../models/models');

const list =  async(req, res) => {
    try{
        const data = await models.Season.find({}).sort({dateCreated: -1});
        res.status(200).json({data});
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

const newLow = async(req, res) => {
    try{
        req.body.dateCreated = new Date().getTime();
        //Save Season
        const season = await models.Season(req.body).save();
        if(!season) return res.statusStatus(404);
        res.status(200).json(season);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
};

const del = async (req, res) => {
    try{
        //Save Car
        const season = await models.Season.findByIdAndDelete(req.body.id);
        if(!season) return res.sendStatus(404);
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { list , newLow, del }
