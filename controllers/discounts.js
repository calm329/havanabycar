const models = require("../models/models.js");

const applyVoucher = async (req, res) => {
    try{
        const dataUpdate = {superTotal: req.body.superTotal, voucherCode: req.body.voucherCode};
        const booking = await models.GeminiUsCarBooking.findOneAndUpdate({_id: req.body.id}, dataUpdate);
        res.status(200).json(booking);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

const voucher = async (req, res) => {
    try{
        
        const voucher = await models.Discount.findOne({code: req.body.voucher, type: 'Car'});

        if(!voucher) return res.sendStatus(404);

        let discountedCar = 0;

        if(voucher.currency == 'usd') {
            discountedCar = Number(req.body.carPrice) - voucher.size;
        } else {
            const multiplier = 100 - voucher.size;
            discountedCar = (Number(req.body.carPrice) / 100) * multiplier;
        }

        res.status(200).json({discountedCar});

    }catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = { voucher, applyVoucher };