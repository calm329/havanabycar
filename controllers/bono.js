const models = require("../models/models.js");
const { generate6DigitString } = require("../helpers/random.js");
const { computeToBePaid, computeFullPrice } = require("../helpers/carPrice.js");

const newBono = async (req, res) => {
  try {
    const bono = {
      size: req.body.size * -1,
      code: `D2C${generate6DigitString()}`,
      isUsed: false,
      dateCreated: new Date().getTime(),
    };
    await models.Bono(bono).save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const useBono = async (req, res) => {
  try {
    const options = { new: true };

    const bonoQuery = {
      isUsed: false,
      code: req.body.code,
    };

    const bonoChanges = { isUsed: true };

    const bono = await models.Bono.findOneAndUpdate(bonoQuery, bonoChanges);

    if (!bono) return res.sendStatus(404);

    const bookingChanges = {
      voucherCode: bono.code,
      "discounts.voucherDiscount": bono.size,
    };

    const booking = await models.CubaGoldCarBooking.findByIdAndUpdate(
      req.body.bookingId,
      bookingChanges,
      options
    );

    const resObj = {
      finPrice: computeToBePaid(
        booking.pricing,
        booking.discounts,
        booking.paymentMethod
      ),
      totPrice: computeFullPrice(
        booking.pricing,
        booking.discounts,
        booking.paymentMethod
      ),
      size: bono.size,
    };

    res.status(200).json(resObj);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { newBono, useBono };
