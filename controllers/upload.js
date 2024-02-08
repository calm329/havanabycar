const fs = require("fs");
const path = require("path");
const models = require("../models/models.js");
const mailer = require("../helpers/mailer.js");

const uploadPdf = async (req, res) => {
  try {
    if (req.isPdf == false) return res.sendStatus(400);

    const dir = path.join(__dirname, "../static/pdf/", req.params.id);

    const file = dir + "/booking-havanabycar.pdf";

    //Copy Temp to final destination
    const tempFile = path.join(__dirname, "../temp/", req.file.originalname);
    fs.copyFileSync(tempFile, file);
    //Remove Temp
    fs.rmSync(tempFile);

    //Update Booking
    const changes = { hasFinalVoucher: true };
    const updateBooking = await models.CubaGoldCarBooking.findByIdAndUpdate(
      req.params.id,
      changes
    );

    //Inform customer about voucher upload
    mailer.voucherAvailableEmail(updateBooking);

    //Send response
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const uploadEvidence = async (req, res) => {
  try {
    if (req.isPic == false) return res.sendStatus(400);

    const dir = path.join(__dirname, "../static/payments/", req.params.id);

    const timeStamp = new Date().getTime();
    const newName = timeStamp + req.file.originalname;
    const file = dir + "/" + newName;

    //Copy Temp to final destination
    const tempFile = path.join(__dirname, "../temp/", req.file.originalname);
    fs.copyFileSync(tempFile, file);
    //Remove Temp
    fs.rmSync(tempFile);

    //Update Booking
    const evidenceUrl = "/static/payments/" + req.params.id + "/" + newName;
    const changes = { state: "PROCESANDO", evidence: evidenceUrl };
    const updateBooking = await models.CubaGoldCarBooking.findByIdAndUpdate(
      req.params.id,
      changes
    );

    //Inform customer about voucher upload
    mailer.informNewEvidence(updateBooking.causale);

    //Send response
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = { uploadPdf, uploadEvidence };
