const models = require("../models/models.js");
const carPrice = require("../helpers/carPrice.js");
const random = require("../helpers/random.js");
const mailer = require("../helpers/mailer.js");

const save = async (req, res) => {

    try {

        //Make Sure Booking Exists
        const query = {
            _id: req.params.bookingId,
            $or: [{ state: "CANCELADO" }, { state: "RECHAZADO" }]
        };

        const changes = { state: "REFUNDING" };

        const booking = await models.HavanaCarBooking.findOneAndUpdate(query, changes);

        if (!booking) return res.sendStatus(404);

        const finalPrice = carPrice.computeToBePaid(booking.pricing, booking.discounts, booking.paymentMethod);
        const now = new Date().getTime();

        //Save New Refund
        const obj = {
            ...req.body,
            bookingId: req.params.bookingId,
            causale: booking.causale,
            amount: finalPrice + " " + booking.currencySymbol,
            date: now,
            isWrong: booking.state == "CANCELADO"
        };

        //Change IBAN if it's first attempt
        const iban = booking.state == "CANCELADO" ? random.tweekIban(req.body.iban) : req.body.iban;
        obj.iban = iban;

        console.log(obj);

        const newRefund = await models.Refund(obj).save();

        //Inform Admin
        mailer.informNewRefundData(booking.causale);

        //Inform User About Next Steps
        mailer.refundNextStepsEmail(booking, newRefund);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

module.exports = { save };