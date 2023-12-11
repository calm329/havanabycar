const carPrice = require("../helpers/carPrice.js");
const mails = require("../data/mails.js");
const { config } = require("../data/config.js");

const getUrl = (booking) => {
    const url = booking.language == "ENG" ? "/ENG/pay/zellePay/" + booking._id : "/pago/zellePay/" + booking._id;
    return config.baseUrl+url;
}

const composeZelleText = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const zellePrice = carPrice.computeToBePaid(booking.pricing, booking.discounts, "zellePay");
    const text = `${translation.payWith} Zelle ${zellePrice} ${booking.currencySymbol} ${translation.clickBelow}\n\n${getUrl(booking)}\n\n`;
    return text;
}

const composeZelleHtml = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const zellePrice = carPrice.computeToBePaid(booking.pricing, booking.discounts, "zellePay");
    const html = `<p><a href="${getUrl(booking)}">${translation.clickHere}</a> ${translation.payWith} Zelle <b>${zellePrice} ${booking.currencySymbol}</b></p>`
    return html;
}

module.exports = { composeZelleHtml, composeZelleText };