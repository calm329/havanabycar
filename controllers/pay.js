const models = require("../models/models.js");
const { config } = require("../data/config.js");
const carPrice = require("../helpers/carPrice.js");
const translate = require("../helpers/translate.js");
const { btcXrate } = require("../helpers/btcXrate.js");

const pay = async (req, res) => {

    try {

        //Get Booking Data
        const booking = await models.HavanaCarBooking.findById(req.params.id);

        //Make sure it exists and that deadline for payment hasn't passed
        if (!booking) {
            return res.render("expired", translate.text(req, "expired"));
        }

        const now = new Date().getTime();
        const deadline = booking.date + (1000 * 60 * 60 * 48);

        if (deadline < now) {
            return res.render("expired", translate.text(req, "expired"));
        }

        if (booking.wasCardRejected && req.params.method == "creditCardPay") {
            const redirectUrl = req.path.includes("/ENG/") ? "/ENG/payment-failed" : "/pago-fallido";
            return res.redirect(redirectUrl);
        }

        //Compute pricing for different payment methods
        const pricing = {
            btcPay: carPrice.computeToBePaid(booking.pricing, booking.discounts, "btcPay"),
            zellePay: carPrice.computeToBePaid(booking.pricing, booking.discounts, "zellePay"),
            bankPay: carPrice.computeToBePaid(booking.pricing, booking.discounts, "bankPay"),
            creditCardPay: carPrice.computeToBePaid(booking.pricing, booking.discounts, "creditCardPay")
        };

        //Get BTC exchange Rate from coin gecko
        const xrate = await btcXrate(booking.currency);
        const priceInBtc = (pricing.btcPay / xrate).toFixed(8);

        const msLeft = (booking.date + (1000 * 60 * 60 * 48)) - Date.now();

        //Populate Object
        const btc = {
            address: config.btcAddress,
            amount: priceInBtc,
            email: config.email,
            zelleEmail: config.zelleEmail,
            zellePhone: config.zellePhone,
            paymentProcessor: config.paymentProcessor,
            link: config.paymentProcessorLink + pricing.creditCardPay
        };

        //Send Response
        res.render("pay", translate.text(req, "pay", { btc, booking, pricing, msLeft }));

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const payWithCustomLink = async (req, res) => {

    try {

        const query = { causale: req.params.causale };
        const link = await models.Link.findOne(query);
        console.log("LINK: ", link);

        if (!link) {
            return res.render("expired", translate.text(req, "expired"));
        }

        const now = new Date().getTime();
        const deadline = link.date + (1000 * 60 * 60 * 48);

        if (deadline < now) {
            return res.render("expired", translate.text(req, "expired"));
        }

        console.log("Passed Preliminary Checks");

        const btc = {};
        const booking = {
            paymentMethod: "creditCardPay",
            language: link.language,
            causale: link.causale,
            currencySymbol: link.divisa == "EUR" ? "€" : "$"
        };

        console.log("Booking", booking);
        const pricing = { creditCardPay: link.monto };
        const msLeft = (link.date + (1000 * 60 * 60 * 48)) - Date.now();

        res.render("pay", translate.text(req, "pay", { btc, booking, pricing, msLeft }));

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { pay, payWithCustomLink };