const fs = require("fs");
const path = require("path");
const models = require("../models/models.js");
const sanitize = require("../helpers/sanitize");
const carPrice = require("../helpers/carPrice");
const mailer = require("../helpers/mailer.js");
const random = require("../helpers/random.js");
const time = require("../helpers/time.js");
const translate = require("../helpers/translate.js");
const { makeBankQueryFromPhone } = require("../helpers/location.js");
const { config } = require("../data/config.js");

const create = async (req, res) => {
  try {
    //Find Car
    const carQuery = { car_slug: req.params.slug, isActive: true };
    const car = await models.Car.findOne(carQuery);
    if (!car) return res.sendStatus(404);

    const bookedCar = {
      vendor: car.vendor,
      carModel: car.car_title,
      carType: car.car_type,
    };

    //Check input fields
    if (
      sanitize.checkString(req.body.driver.name) == false ||
      sanitize.checkString(req.body.driver.surname) == false ||
      sanitize.checkString(req.body.driver.country) == false ||
      sanitize.checkPassportNumber(req.body.driver.passport) == false
    ) {
      return res.status(200).json({ error: "wrongDriver" });
    }

    if (sanitize.checkEmail(req.body.driver.email) == false) {
      return res.status(200).json({ error: "wrongEmail" });
    }

    if (sanitize.checkPhone(req.body.driver.phone) == false) {
      return res.status(200).json({ error: "wrongPhone" });
    }

    //check Birthday
    const dateParsed = time.standardizeDate(req.body.driver.birth);
    if (
      req.body.driver.birth.split(" ")[0] != String(dateParsed.getDate()) ||
      sanitize.checkBirth(dateParsed) == false
    ) {
      return res.status(200).json({ error: "wrongAge" });
    }

    //Make sure that car return is AFTER car pickup
    const { startMS, finishMS, rentalTime } = time.computeMS(
      req.body.arrangement
    );
    if (startMS > finishMS) {
      return res.status(200).json({ error: "dateSbagliate" });
    }
    req.body.arrangement.rentalTime = rentalTime;

    //Season Control
    const date = new Date().getTime();
    const expiry = date + 1000 * 60 * 60 * 96;
    const reminderTrigger = date + 1000 * 60 * 60 * 24;

    const lowSeasons = await models.Season.find({});

    //Price Object
    const fuel = 60;
    const dailyPrice =
      car.price[req.body.currency][carPrice.isHigh(startMS, lowSeasons)][
        carPrice.timeSpan(rentalTime)
      ] - config.geminiDiscount;
    const carTotal = dailyPrice * rentalTime;
    const lateReturn = req.body.lateReturn == true ? Number(dailyPrice) : 0;
    const airportPickUp = req.body.arrangement.city.includes("Airport")
      ? 25
      : 0;
    const returnInDifferentCity =
      req.body.arrangement.city != req.body.arrangement.dropoffCity ? 35 : 0;
    const secondDriver = req.body.secondDriver == true ? 35 : 0;
    const vipAssistant = req.body.vipAssistant == true ? 80 : 0;

    const pricing = {
      dailyPrice,
      carTotal,
      lateReturn,
      airportPickUp,
      fuel,
      returnInDifferentCity,
      secondDriver,
      vipAssistant,
    };

    const discounts = carPrice.computeDiscounts(pricing);

    //Compile new booking Obj
    const booking = {
      bookedCar,
      pricing,
      expiry,
      startMS,
      date,
      discounts,
      reminderTrigger,
      language: req.body.language,
      state: "CREADO",
      cancelReason: "",
      isHonorable: false,
      hasFinalVoucher: false,
      evidence: "",
      isAlerted: false,
      voucherCode: "",
      paymentMethod: req.body.paymentMethod,
      causale: `CC${random.generate6DigitString()}`,
      driver: req.body.driver,
      arrangement: req.body.arrangement,
      currency: req.body.currency,
      currencySymbol: req.body.currency === "EUR" ? "€" : "$",
      wasCardRejected: false,
    };

    //Save Booking and Send Rsponse
    const carBooking = await models.CubaGoldCarBooking(booking).save();
    const url =
      req.body.language == "ES"
        ? `/resumen/${carBooking._id}/${carBooking.currency}/`
        : `/ENG/summary/${carBooking._id}/${carBooking.currency}/`;
    res.status(200).json({ error: "", url });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

//Send email to customer after reviewing booking summary
const inform = async (req, res) => {
  try {
    const booking = await models.CubaGoldCarBooking.findById(req.params.id);

    if (!booking) return res.sendStatus(404);

    const folder = path.join(__dirname, "../static/pdf/", req.params.id);
    const folderPay = path.join(
      __dirname,
      "../static/payments/",
      req.params.id
    );
    const folderCCs = path.join(__dirname, "../static/CCS/", req.params.id);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
      fs.mkdirSync(folderPay);
      fs.mkdirSync(folderCCs);
    }

    let bankQuery = makeBankQueryFromPhone(booking.driver.phone);

    const account = await models.Banco.findOne(bankQuery);

    const changes = {
      state: "PENDIENTE",
      bankAccount: account,
    };

    const paid = await models.CubaGoldCarBooking.findByIdAndUpdate(
      req.params.id,
      changes
    );
    mailer.carConfirmedEmail(paid);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const reactivate = async (req, res) => {
  try {
    const booking = await models.CubaGoldCarBooking.findById(req.params.id);

    if (!booking) {
      return res.render("expired", translate.text(req, "expired"));
    }

    const options = { new: true };
    const now = new Date().getTime();
    const expiry = now + 1000 * 60 * 60 * 72000;

    let bankQuery = makeBankQueryFromPhone(booking.driver.phone);

    const account = await models.Banco.findOne(bankQuery);

    const update = {
      expiry,
      date: now,
      state: "PENDING",
      bankAccount: account,
    };

    const updatedBooking = await models.CubaGoldCarBooking.findByIdAndUpdate(
      req.params.id,
      update,
      options
    );
    mailer.carConfirmedEmail(updatedBooking);
    res.render("reactivate", translate.text(req, "reactivate"));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { create, inform, reactivate };
