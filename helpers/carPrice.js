const isHigh = (ms, lowSeasons) => {
    let response = 'High';
    lowSeasons.forEach(slot => {
        if( ms >= new Date(slot.start).getTime() && ms <= new Date(slot.finish).getTime() ){
            response = 'Low';
            //return response;
        }
    });
    
    return response;
}

const timeSpan = (days) => {
    if(days < 15) return 'days6';
    return "days45";
}

const computeDiscounts = (pricing) => {

    const fuel = 60;
    const total = pricing.carTotal + fuel + pricing.lateReturn + pricing.airportPickUp + pricing.returnInDifferentCity + pricing.secondDriver;
    
    const discounts = {
        voucherDiscount: 0,
        bankPay: 0,
        btcPay: Math.round(total / 10) * -1,
        zellePay: Math.round(total / 20) * -1,
        creditCardPay: Math.round(total / 10)
    }
    return discounts;
}

const computeToBePaid = (pricing, discounts, method) => {
    const fuel = 60;
    const total = pricing.carTotal + fuel + pricing.lateReturn + pricing.airportPickUp + pricing.returnInDifferentCity + pricing.secondDriver + discounts.voucherDiscount + discounts[method];
    return total;
};

const computeFullPrice = (pricing, discounts, method) => {
    const fuel = 60;
    const ccPremium = method == "creditCardPay" ? discounts.creditCardPay : 0;
    const total = pricing.carTotal + fuel + pricing.lateReturn + pricing.airportPickUp + pricing.returnInDifferentCity + pricing.secondDriver + ccPremium;
    return total;
}

module.exports = { isHigh, timeSpan, computeDiscounts, computeToBePaid, computeFullPrice };