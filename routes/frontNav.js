const express = require("express");
const path = require("path");
const translate = require ('../helpers/translate.js');
const { config } = require('../data/config.js');
const { available, getOne, getFleet } = require("../controllers/search.js");
const { summarizeBooking } = require("../controllers/summarizeBooking.js");
const { getAllCars } = require("../middleware/mw.js");
const { reactivate } = require("../controllers/bookings.js");
const { pay, payWithCustomLink } = require("../controllers/pay.js");

const models = require("../models/models.js");

const router = new express.Router();

router.get(["/", "/ENG/"], getAllCars, async (req, res) => {
    res.render("index", translate.text(req, 'home'))
});

router.get(["/quienes-somos", "/ENG/about-us"], getAllCars, async (req, res) => {
    res.render("about", translate.text(req, 'about', {config}));
});

router.get(["/como-funciona", "/ENG/how-it-works"], getAllCars, async (req, res) => {
    res.render("how", translate.text(req, 'how', {config}));
});

router.get(["/mapa", "/ENG/map"], getAllCars, async (req, res) => {
    let carsClasses = [];
    const allCategories = new Set();
    const allActiveCars = await models.Car.find({isActive: true});
    allActiveCars.forEach(car => {
        const catSplit =  car.car_type.split(" ");
        const cat = catSplit[1] + " " + catSplit[2];
        allCategories.add(cat);
    });
    const cats = Array.from(allCategories);
    console.log(cats);

    for (let i = 0; i < cats.length; i++) {
        const obj = {
            name: cats[i],
        }
        obj.cars = allActiveCars.filter(car => car.car_type.includes(cats[i]));
        console.log(obj.cars.length);
        carsClasses.push(obj);
    }
    carsClasses = carsClasses.sort((a,b) => {
        return a.name > b.name ? 1 : -1;
    })
    res.render("map", translate.text(req, 'map', {config, carsClasses}));
});

router.get(
    [
        "/flota/:slug/:currency", 
        "/ENG/fleet/:slug/:currency"
    ], 
    getAllCars, 
    getFleet
);

router.get(
    [
        '/carros-disponibles/:city/:dropoffCity/:pickupDate/:dropoffDate/:currency/:sort/:filter',
        '/ENG/available-cars/:city/:dropoffCity/:pickupDate/:dropoffDate/:currency/:sort/:filter',
    ],
    getAllCars,
    available
);

router.get(
    [
        '/carro/:slug/:city/:dropoffCity/:pickupDate/:dropoffDate/:currency',
        '/ENG/car/:slug/:city/:dropoffCity/:pickupDate/:dropoffDate/:currency',
    ],
    getAllCars,
    getOne
);

router.get(
    [
        '/resumen/:booking/:currency',
        '/ENG/summary/:booking/:currency',
    ],
    getAllCars,
    summarizeBooking
)

router.get(
    [
        '/exito',
        '/ENG/success',
    ],
    getAllCars,
    (req, res) => res.render("success", translate.text(req, "success"))
)

router.get(
    [
        '/pago-exito/:id',
        '/ENG/pay-success/:id',
    ],
    getAllCars,
    (req, res) => res.render("paySuccess", translate.text(req, "paySuccess"))
)

router.get(
    [
        '/pago-fallido',
        '/ENG/payment-failed',
    ],
    getAllCars,
    (req, res) => res.render("cardRejected", translate.text(req, "cardRejected"))
)


router.get(["/ENG/new-refund/:bookingId", "/nueva-devolucion/:bookingId"], async (req, res) => {
    res.render('newRefund', translate.text(req, "refund"));
});

router.get(["/ENG/refund-success/:id", "/rembolso-exito/:id"], (req, res) => {
    res.render('successRefund', translate.text(req, "refundSuccess"));
})

router.get(
    [
        '/pago/:method/:id',
        '/ENG/pay/:method/:id',
    ],
    getAllCars,
    pay
)

router.get(["/paycc/:causale/:method", "/ENG/paycc/:causale/:method"], getAllCars, payWithCustomLink);

router.get(
    [
        '/terminos-y-condiciones',
        '/ENG/terms-and-conditions',
    ],
    getAllCars,
    (req, res) => res.render('terms', translate.text(req, 'terms'))
)

router.get(
    [
        '/devoluciones-rules',
        '/ENG/refunds',
    ],
    getAllCars,
    (req, res) => res.render('refunds', translate.text(req, 'terms'))
)

router.get(
    [
        '/privacidad',
        '/ENG/privacy',
    ],
    getAllCars,
    (req, res) => res.render('privacy', translate.text(req, 'terms'))
)

router.get([
        '/reactivate/:id',
        '/ENG/reactivate/:id'
    ], 
    getAllCars,
    reactivate
)

router.get("/robots.txt", (req, res) => res.sendFile(path.join(__dirname, '../', 'robots.txt')));
router.get("/favicon.ico", (req, res) => res.sendFile(path.join(__dirname, '../', 'favicon.ico')));

module.exports = { router };
