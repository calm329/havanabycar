const fs = require('fs');
const models = require('../models/models.js');

const highlight = async (req, res) => {
    try{
        const car = await models.Car.findOneAndUpdate({car_slug: req.body.folder}, {thumbnail_image: req.body.pic});
        if(!car) return res.sendStatus(404);
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

const del = async (req, res) => {
    try{
        const path = './static/carsPics/'+req.body.folder+'/'+req.body.pic;
        fs.unlinkSync(path);
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { highlight, del };