const carPrice = require("../helpers/carPrice.js");
const mails = require("../data/mails.js");
const { config } = require("../data/config.js");

const getUrl = (booking) => {
    const url = booking.language == "ENG" ? "/ENG/pay/bankPay/" + booking._id : "/pago/bankPay/" + booking._id;
    return config.baseUrl+url;
}

const composeBankText = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const price = carPrice.computeToBePaid(booking.pricing, booking.discounts, "bankPay");
    const text = `${translation.payWith} ${translation.bankTransfer} ${price} ${booking.currencySymbol} ${translation.clickBelow}\n\n${getUrl(booking)}\n\n`;
    return text;
}

const composeBankHtml = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const price = carPrice.computeToBePaid(booking.pricing, booking.discounts, "bankPay");
    const html = `<p><a href="${getUrl(booking)}">${translation.clickHere}</a> ${translation.payWith} ${translation.bankTransfer} <b>${price} ${booking.currencySymbol}</b></p>`
    return html;
}

module.exports = { composeBankHtml, composeBankText };