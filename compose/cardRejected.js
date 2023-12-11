const { makeDeadLine } = require("./composeDeaLine.js");
const { mainPaymentLink, paymentBTN, startHTML, finishHTML } = require("./htmlComponents.js");
const carPrice = require("../helpers/carPrice.js");

const getRejectedText = (translation, language, booking) => {
    const link = mainPaymentLink(language, { _id: booking._id, paymentMethod: "bankPay" });
    let mailText = translation.mailText[language].intro + ',';
    mailText += '\n\n';
    mailText += translation.mailText[language].cardRejected;
    mailText += '\n\n';
    mailText += translation.mailText[language].voucherInstructions + " " + makeDeadLine(booking.date, language);
    mailText += '\n\n';
    mailText += link;
    mailText += '\n\n';
    mailText += translation.mailText[language].saveFive;
    mailText += '\n\n';
    mailText += translation.mailText[language].whatasppNumberRent2Cuba;
    mailText += '\n\n';
    mailText += translation.mailText[language].greetz;
    mailText += '\n\n';
    mailText += 'https://havanabycar.co';
    return mailText;
}

const getRejectedHtml = (translation, language, booking) => {
    const superTotal = carPrice.computeToBePaid(booking.pricing, booking.discounts, "bankPay");
    const mailText = `
${startHTML}
<div style="padding:15px"><p><b>${translation.mailText[language].intro},</b></p>
<p>${translation.mailText[language].cardRejected}</p>
<p>${translation.mailText[language].voucherInstructions} <b style="color: red">${makeDeadLine(booking.date, language)}</b></p>
${paymentBTN(language, { _id: booking._id, paymentMethod: "bankPay", currencySymbol: booking.currencySymbol, causale: booking.causale }, translation, superTotal)}
<p>${translation.mailText[language].saveFive}</p>
${finishHTML(translation.mailText[language].greetz, translation.mailText[language].whatsapp)}`;
    return mailText;
}

module.exports = { getRejectedHtml, getRejectedText };