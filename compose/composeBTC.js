const carPrice = require("../helpers/carPrice.js");
const mails = require("../data/mails.js");
const { config } = require("../data/config.js");

const getUrl = (booking) => {
    const url = booking.language == "ENG" ? "/ENG/pay/btcPay/" + booking._id : "/pago/btcPay/" + booking._id;
    return config.baseUrl+url;
}

const composeBtcText = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const price = carPrice.computeToBePaid(booking.pricing, booking.discounts, "btcPay");
    const text = `${translation.payWith} Bitcoin ${price} ${booking.currencySymbol} ${translation.clickBelow}\n\n${getUrl(booking)}\n\n`;
    return text;
}

const composeBtcHtml = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const price = carPrice.computeToBePaid(booking.pricing, booking.discounts, "btcPay");
    const html = `<p><a href="${getUrl(booking)}">${translation.clickHere}</a> ${translation.payWith} Bitcoin <b>${price} ${booking.currencySymbol}</b></p>`
    return html;
}

module.exports = { composeBtcText, composeBtcHtml };