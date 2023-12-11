const carPrice = require("../helpers/carPrice.js");
const mails = require("../data/mails.js");
const { config } = require("../data/config.js");

const getUrl = (booking) => {
    const url = booking.language == "ENG" ? "/ENG/pay/creditCardPay/" + booking._id : "/pago/creditCardPay/" + booking._id;
    return config.baseUrl+url;
}

const composeCCText = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const price = carPrice.computeToBePaid(booking.pricing, booking.discounts, "creditCardPay");
    const text = `${translation.payWith} ${translation.creditCard} ${price} ${booking.currencySymbol} ${translation.clickBelow}\n\n${getUrl(booking)}\n\n`;
    return text;
}

const composeCCHtml = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const price = carPrice.computeToBePaid(booking.pricing, booking.discounts, "creditCardPay");
    const html = `<p><a href="${getUrl(booking)}">${translation.clickHere}</a> ${translation.payWith} ${translation.creditCard} <b>${price} ${booking.currencySymbol}</b></p>`
    return html;
}

module.exports = { composeCCHtml, composeCCText };