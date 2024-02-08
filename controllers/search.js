const fs = require("fs");
const path = require("path");
const models = require("../models/models");
const carPrice = require("../helpers/carPrice");
const translate = require("../helpers/translate.js");
const time = require("../helpers/time.js");
const { config } = require("../data/config.js");

const getAll = async (req, res) => {
  try {
    const data = await models.Car.find({});
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  try {
    //Get Car Data
    const car = await models.Car.findOne({ car_slug: req.params.slug });

    //Get Pics of the car
    const myPath = path.join(
      __dirname,
      "../static/carsPics/" + car.car_slug + "/"
    );
    const picsInFolder = fs
      .readdirSync(myPath)
      .filter((item) => item != car.thumbnail_image);
    const pics = [car.thumbnail_image, ...picsInFolder];

    //Get pick up locations and Dropoff Locations
    const pickupLocationsQuery =
      car.vendor == "daiquiri"
        ? { azienda: "daiquiri" }
        : { citta: req.params.city };
    const dropoffLocationsQuery =
      car.vendor == "daiquiri"
        ? { azienda: "daiquiri" }
        : { citta: req.params.dropoffCity };
    const pickupLocations = await models.Location.find(pickupLocationsQuery);
    const dropoffLocations = await models.Location.find(dropoffLocationsQuery);

    //Determine Seasonality
    const lowSeasons = await models.Season.find({});

    //Parse dates
    const { startMS, rentalTime } = time.computeMS({
      startString: req.params.pickupDate,
      finishString: req.params.dropoffDate,
    });
    //Calculate price
    let dailyPrice =
      car.price[req.params.currency][carPrice.isHigh(startMS, lowSeasons)][
        carPrice.timeSpan(rentalTime)
      ] - config.geminiDiscount[req.params.currency];
    let extraPrice = req.params.city.includes("Airport") ? 85 : 60;
    extraPrice =
      req.params.city == req.params.dropoffCity ? extraPrice : extraPrice + 35;
    const totalPrice = dailyPrice * rentalTime + extraPrice;
    const prices = { dailyPrice, totalPrice, extraPrice };

    //Send Response
    const data = { car, pics, pickupLocations, dropoffLocations, prices };

    return res.render("car", translate.text(req, "car", data));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getFleet = async (req, res) => {
  try {
    //Get Car Data
    const car = await models.Car.findOne({ car_slug: req.params.slug });

    //Get Pics of the car
    const myPath = path.join(
      __dirname,
      "../static/carsPics/" + car.car_slug + "/"
    );
    const picsInFolder = fs
      .readdirSync(myPath)
      .filter((item) => item != car.thumbnail_image);
    const pics = [car.thumbnail_image, ...picsInFolder];

    //Calculate price
    const prices = {
      dailyPrice:
        car.price[req.params.currency].Low.days45 -
        config.geminiDiscount[req.params.currency],
    };

    //Send Response
    const data = { car, pics, prices };

    return res.render("fleet", translate.text(req, "car", data));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const available = async (req, res) => {
  try {
    //Instantiate Cars and Prices Arrays
    const carList = [];
    const priceList = [];

    //Loop through vendors list to fetch every car to populate carList array
    const vendorsArray = ["rex", "cubacar", "havanautos", "via", "daiquiri"];

    //Remove Daiquiri outside Habana
    if (req.params.city != "Habana" || req.params.dropoffCity != "Habana")
      vendorsArray.pop();

    //Parse dates
    const { startMS, rentalTime } = time.computeMS({
      startString: req.params.pickupDate,
      finishString: req.params.dropoffDate,
    });

    for (let i = 0; i < vendorsArray.length; i++) {
      const carQuery = {
        isActive: true,
        vendor: vendorsArray[i],
        minimo_giorni: { $lte: rentalTime },
      };
      const myCars = await models.Car.find(carQuery);
      myCars.forEach((car) => carList.push(car));
    }

    //Find all low season intervals. Equals for all.
    const lowSeasons = await models.Season.find({});

    //Loop through cars list to populate prices array
    for (let i = 0; i < carList.length; i++) {
      const dailyPrice =
        carList[i].price[req.params.currency][
          carPrice.isHigh(startMS, lowSeasons)
        ][carPrice.timeSpan(rentalTime)] -
        config.geminiDiscount[req.params.currency];
      let extraPrice = req.params.city.includes("Airport") ? 85 : 60;
      extraPrice =
        req.params.city == req.params.dropoffCity
          ? extraPrice
          : Number(extraPrice) + 35;

      const priceObj = {
        total: dailyPrice * rentalTime + extraPrice,
        extraPrice: extraPrice,
        dailyPrice: dailyPrice,
      };

      priceList.push(priceObj);
    }

    //UNIFY cars and prices OBJS
    let cars = [];
    carList.forEach((car, index) => {
      const unifiedObj = {
        ...car._doc,
        priceInfo: priceList[index],
      };
      cars.push(unifiedObj);
    });

    //Apply sorting
    cars = cars.sort((a, b) => {
      if (a.priceInfo.total > b.priceInfo.total)
        return req.params.sort == "DESC" ? -1 : 1;
      else if (a.priceInfo.total < b.priceInfo.total)
        return req.params.sort == "DESC" ? 1 : -1;
      else return 0;
    });

    //Apply Filter
    if (req.params.filter != "ALL") {
      cars = cars.filter((item) => {
        if (req.params.filter == "MAN") {
          return item.car_transmission == "manual";
        } else {
          return item.car_transmission != "manual";
        }
      });
    }

    //Send response with cars list
    const resObj = { cars };
    res.render("results", translate.text(req, "results", resObj));
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAll, available, getOne, getFleet };
