const models = require("../models/models.js");
const { mainPaymentLink } = require("../compose/htmlComponents.js");

const make = async (req, res) => {
  try {
    const baseUrl =
      req.body.language == "ENG"
        ? "https://cubagoldcar.com/ENG"
        : "https://cubagoldcar.com";

    const query = { causale: req.body.causale };
    const changes = {
      //"discounts.creditCardPay": req.body.monto,
      paymentMethod: "creditCardPay",
    };

    await models.CubaGoldCarBooking.findOneAndUpdate(query, changes);

    const now = new Date().getTime();
    const newLink = {
      ...req.body,
      date: now,
    };

    const linkInDb = await models.Link.findOne({ causale: req.body.causale });

    if (linkInDb) {
      await models.Link.findByIdAndUpdate(linkInDb._id, newLink);
    } else {
      await models.Link(newLink).save();
    }

    const link = `${baseUrl}/paycc/${req.body.causale}/creditCardPay`;

    res.status(200).json({ link });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { make };
