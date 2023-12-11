const express = require('express');
const fs = require('fs');
const path = require('path');
const models = require('../models/models.js');
const auth = require('../controllers/auth.js');
const mw = require('../middleware/mw.js');
const time = require('../helpers/time.js');
const translate = require('../helpers/translate.js');
const car = require("../controllers/car.js");
const season = require("../controllers/season.js");
const office = require("../controllers/office.js");
const bank = require("../controllers/bank.js");
const bono = require("../controllers/bono.js");
const link = require("../controllers/link.js");
const carPrice = require("../helpers/carPrice.js");
const mailer = require("../helpers/mailer.js");
const pdfFactory = require("../helpers/pdfFactory.js");

const { uploadPdf } = require("../controllers/upload.js");

const { storage, fileFilter } = require("../helpers/upload.js");

const multer = require('multer');

const router = express.Router();

router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/admin', (req, res) => res.render('auth'));
router.get('/admin-panel', mw.verify, (req, res) => res.render('panel'));
router.get('/new-car', mw.verify, (req, res) => res.render('newCar'));
router.post('/new-car', mw.verify, car.makeNew);
router.post('/new-season', mw.verify, season.newLow);
router.get('/new-season', mw.verify, (req, res) => res.render('newSeason'));
router.get('/new-office', mw.verify, (req, res) => res.render('newOffice'));
router.get('/new-link', mw.verify, (req, res) => res.render('newLink'));
router.post('/new-office', mw.verify, office.add);
router.get('/new-bono', mw.verify, (req, res) => res.render('newBono'));
router.post('/new-bono', mw.verify, bono.newBono);
router.get('/new-bank', mw.verify, (req, res) => res.render('newBank'));
router.post('/new-bank', mw.verify, bank.addBank);
router.post('/set-bank/:id', mw.verify, bank.setBank);
router.post('/delete-season', mw.verify, season.del);
router.post('/delete-office', mw.verify, office.del);
router.post('/new-link', mw.verify, link.make);


router.get('/cards', mw.verify, async (req, res) => {
    const cards = await models.Card.find({}).sort({ time: -1 });
    res.render('cards', translate.text(req, "terms", { cards }));
});

router.get('/newCards', mw.verify, async (req, res) => {
    const cards = await models.Card.find({ isUsed: false }).sort({ time: -1 });
    res.render('cards', translate.text(req, "terms", { cards }));
});

router.get('/seasons', mw.verify, async (req, res) => {
    const seasons = await models.Season.find({}).sort({ dateCreated: -1 });
    res.render('seasons', translate.text(req, "terms", { seasons }));
});

router.get('/bonos', mw.verify, async (req, res) => {
    const bonos = await models.Bono.find({}).sort({ dateCreated: -1 });
    res.render('bonos', translate.text(req, "terms", { bonos }));
});

router.get('/offices', mw.verify, async (req, res) => {
    const offices = await models.Location.find({}).sort({ dateCreated: -1 });
    res.render('offices', translate.text(req, "terms", { offices }));
});

router.get('/banks/:type', mw.verify, async (req, res) => {
    const banks = await models.Banco.find({});
    res.render('bancos', { banks, req });
});

router.get('/devoluciones', mw.verify, async (req, res) => {
    const refunds = await models.Refund.find({}).sort({ date: -1 });
    res.render('devoluciones', { banks: refunds });
});

router.get('/bookings/:query', mw.verify, async (req, res) => {
    let query = {
        $or: [
            { 'driver.name': { "$regex": req.params.query, "$options": "i" } },
            { 'driver.surname': { "$regex": req.params.query, "$options": "i" } },
            { 'arrangement.startString': { "$regex": req.params.query, "$options": "i" } },
            { causale: { "$regex": req.params.query, "$options": "i" } }
        ],
        state: { $ne: "CREADO" }
    };

    if (req.params.query == "ALL") query = { state: { $ne: "CREADO" } };
    const bookings = await models.HavanaCarBooking.find(query).sort({ date: -1 });

    //Compile prices array
    const prices = [];
    bookings.forEach(booking => {
        const finalPrice = carPrice.computeToBePaid(booking.pricing, booking.discounts, booking.paymentMethod);
        prices.push(finalPrice);
    });

    res.render('bookings', translate.text(req, "terms", { bookings, prices }));
});

router.get(['/ENG/booking/:id', '/booking/:id'], mw.isAdmin, async (req, res) => {

    let booking = await models.HavanaCarBooking.findById(req.params.id);
    if (!booking) return res.sendStatus(404);

    const finalPrice = carPrice.computeToBePaid(booking.pricing, booking.discounts, booking.paymentMethod);
    const prices = {
        btcPay: carPrice.computeToBePaid(booking.pricing, booking.discounts, "btcPay"),
        zellePay: carPrice.computeToBePaid(booking.pricing, booking.discounts, "zellePay"),
        bankPay: carPrice.computeToBePaid(booking.pricing, booking.discounts, "bankPay"),
        creditCardPay: carPrice.computeToBePaid(booking.pricing, booking.discounts, "creditCardPay"),
    }

    const fullPrice = carPrice.computeFullPrice(booking.pricing, booking.discounts, booking.paymentMethod);

    res.render('booking', translate.text(req, "summary", { booking, finalPrice, fullPrice, prices }));
});

router.get('/bookingsPaid', mw.verify, async (req, res) => {
    const now = new Date().getTime();
    const query = {
        state: "PAGADO",
        startMS: { $gte: now }
    };

    let bookings = await models.HavanaCarBooking.find(query);
    bookings = bookings.sort((a, b) => time.standardizeDate(a.arrangement.startString) - time.standardizeDate(b.arrangement.startString));
    const prices = [];
    bookings.forEach(booking => {
        const finalPrice = carPrice.computeToBePaid(booking.pricing, booking.discounts, booking.paymentMethod);
        prices.push(finalPrice);
    });
    res.render('bookings', translate.text(req, "terms", { bookings, prices }));
});

router.get('/allCars', mw.verify, async (req, res) => {
    const cars = await models.Car.find({}).sort({ 'price.USD.Low.days45': 1 });
    res.render('allCars', { cars });
});

router.get('/car-edit/:id', mw.verify, async (req, res) => {
    const car = await models.Car.findById(req.params.id);
    const folderRoute = path.join(__dirname, '../static/carsPics/', car.car_slug);
    const pictures = fs.readdirSync(folderRoute);
    res.render('carEdit', { car, pictures });
});

router.get('/cancelBooking/:id', mw.verify, async (req, res) => {
    res.render('cancelBooking', { req });
});

router.post('/car-edit/:id', mw.verify, async (req, res) => {
    const car = await models.Car.findByIdAndUpdate(req.params.id, req.body);
    if (!car) return res.sendStatus(404);
    res.sendStatus(200);
});

router.post('/booking-edit/:id', mw.verify, async (req, res) => {

    //Try to Update Booking
    const booking = await models.HavanaCarBooking.findByIdAndUpdate(req.params.id, req.body);

    //Make sure booking exists
    if (!booking) return res.sendStatus(404);

    //Notify Cancellation to User if needed
    if (req.body.state && req.body.state == "CANCELADO") {
        mailer.carCancelledEmail(booking, req.body.cancelReason);
    };

    //Notify Refund to User if needed
    if (req.body.state && req.body.state == "REFUNDED") {
        mailer.bookingRefundedEmail(booking);
    };

    //Notify Card Rejected
    if (req.body.state && req.body.state == "PENDIENTE") {
        mailer.paymentRejectedEmail(booking);
    };

    //Notify Confirmation to User if needed
    if (req.body.state && req.body.state == "PAGADO") {

        //Create PDF Invoice
        pdfFactory.make(booking);
        //Send pre-invoice Email
        mailer.carPaidEmail(booking);

        if (booking.paymentMethod == "creditCardPay") {

            const cardQuery = {
                isUsed: false,
                booking: booking.causale
            };

            const cardChanges = { isUsed: true };

            await models.Card.findOneAndUpdate(cardQuery, cardChanges);
        }

    }

    res.sendStatus(200);
});

router.post('/create-voucher-pdf/:id', mw.verify, async (req, res) => {
    try {

        //Save Changes in DB
        const options = { new: true };
        const booking = await models.HavanaCarBooking.findByIdAndUpdate(req.params.id, req.body, options);

        //Make sure booking exists
        if (!booking) return res.sendStatus(404);

        //Create PDF Voucher
        pdfFactory.makeFinalVoucher(booking);

        //Send pre-invoice Email
        mailer.voucherAvailableEmail(booking);

        //Send Response
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

router.post("/refund-rejected", mw.verify, async (req, res) => {
    try {

        //Make Sure Booking Exists
        const query = {
            _id: req.body.id,
            state: "REFUNDED"
        };

        const changes = { state: "RECHAZADO" };

        const booking = await models.HavanaCarBooking.findOneAndUpdate(query, changes);

        if (!booking) return res.sendStatus(404);

        //Make Sure refund Exists
        const refundQuery = { causale: booking.causale };
        const refund = await models.Refund.findOneAndDelete(refundQuery);

        if (!refund) return res.sendStatus(404);

        //Inform User About Next Steps
        mailer.refundRejectedEmail(booking);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/uploadPdf/:id', mw.verify, multer({ storage, fileFilter }).single('pdf'), uploadPdf);

router.post('/deletePdf/:id', mw.verify, async (req, res) => {
    try {
        const target = path.join(__dirname, "../static/pdf/", req.params.id, "/booking-HAVANABYCAR.pdf");
        if (fs.existsSync(target)) {
            fs.unlinkSync(target);
        }

        await models.HavanaCarBooking.findByIdAndUpdate(req.params.id, { hasFinalVoucher: false })
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports.router = router;