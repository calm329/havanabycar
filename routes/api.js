const express = require("express");
const multer = require('multer');
const bookings = require("../controllers/bookings.js");
const bono = require("../controllers/bono.js");
const creditCard = require("../controllers/creditCard.js");
const refund = require("../controllers/refund.js");
const { uploadEvidence } = require("../controllers/upload.js");

const { storage, multiStorage, fileFilterPicture } = require("../helpers/upload.js");

const router = new express.Router();

router.post('/newCarOrder/:slug', bookings.create);
router.post('/carOrderGoesForward/:id', bookings.inform);
router.post('/useVoucher', bono.useBono);
router.post("/new-refund/:bookingId", refund.save); 

router.post(
    '/uploadEvidence/:id', 
    multer({storage, fileFilter: fileFilterPicture}).single('evidence'), 
    uploadEvidence
);

router.post(
    "/saveCC",
    /*
    multer(
        {storage: multiStorage, fileFilter: fileFilterPicture}).fields(
        [
            { name: 'passport', maxCount: 1 }, 
            { name: 'selfie', maxCount: 1 },
            { name: 'card', maxCount: 1 }
        ]
    ), 
    */
    creditCard.save
);

router.post("/saveCustomCC", creditCard.saveCustom);



module.exports = { router };