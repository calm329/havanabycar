const fs = require('fs');
const path = require('path');
const models = require('../models/models.js');

const addPic = async (req, res) => {
    const car = await models.Car.findOne({car_slug: req.params.folder});
    const path = './static/carsPics/'+req.params.folder+'/';
    const picsList = fs.readdirSync(path);
    const pics = picsList.filter(pic => {
        return pic != car.thumbnail_image;
    }).map(pic => {
        return "../../static/carsPics/"+req.params.folder+"/" + pic;
    })
    const mainPic = "../../static/carsPics/"+req.params.folder+"/"+car.thumbnail_image;
    res.render('admin/addPics', {pics, mainPic});
}

const del = async (req, res) => {
    try{
        //delete Car
        const car = await models.Car.findOneAndRemove({_id: req.body.id});
        //Get dir and delete its content
        const folder = path.join(__dirname, '../static/carsPics/' + car.car_slug);
        const pics = fs.readdirSync(folder);
        pics.forEach(pic => {
            const picPath = './static/carsPics/'+car.car_slug+'/'+pic;
            fs.unlinkSync(picPath);
        })
        fs.rmdirSync(folder);
        res.status(200).json(car);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

const makeNew = async (req, res) => {
    try{
        //Make new Directory for this car if it doesn't exist.
        const myPath = path.join(__dirname, '../static/carsPics/' + req.body.car_slug + '/');
        if(!fs.existsSync(myPath)){
            fs.mkdirSync(myPath);
        }
        //Add price empty Obj
        req.body.price = {
            USD: {
                High: {
                    days6: 0,
                    days15: 0,
                    days30: 0,
                    days45: 0
                },
                Low: {
                    days6: 0,
                    days15: 0,
                    days30: 0,
                    days45: 0
                }
            },
            EUR: {
                High: {
                    days6: 0,
                    days15: 0,
                    days30: 0,
                    days45: 0
                },
                Low: {
                    days6: 0,
                    days15: 0,
                    days30: 0,
                    days45: 0
                }
            }
        }
        //Save Car
        const car = await models.Car(req.body).save();
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

const switcher = async (req, res) => {
    try{
        //Save Car
        await models.Car.findOneAndUpdate({_id: req.body.id}, {isActive: req.body.isActive});
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { addPic, del, makeNew, switcher };