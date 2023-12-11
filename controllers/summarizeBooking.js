const models = require("../models/models.js");
const translate = require('../helpers/translate.js');
const carPrice = require('../helpers/carPrice.js');

const summarizeBooking = async (req, res) => {
    try {
        const booking = await models.HavanaCarBooking.findById(req.params.booking);
        if (!booking) return res.sendStatus(404);
        const finalPrice = carPrice.computeToBePaid(booking.pricing, booking.discounts, booking.paymentMethod);
        const fullPrice = carPrice.computeFullPrice(booking.pricing, booking.discounts, booking.paymentMethod);
        const data = { booking, finalPrice, fullPrice };
        res.render("summary", translate.text(req, "summary", data));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { summarizeBooking };