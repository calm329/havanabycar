const { makeDeadLine } = require("./composeDeaLine.js");
const { composePaymentText, composePaymentHtml } = require("./composePaymentSection.js");
const { startHTML, finishHTML, paymentBTN } = require("./htmlComponents.js");
const carPrice = require("../helpers/carPrice.js");

const getReminderText = (translation, language, booking) => {

    const paymentOptions = composePaymentText(booking);
    let mailText = translation.mailText[language].intro + ',';
    mailText += '\n\n';
    mailText += translation.mailText[language].stillOnTime + booking.bookedCar.carModel;
    mailText += '\n\n';
    mailText += translation.mailText[language].aboutToExire;
    mailText += '\n\n';
    mailText += translation.mailText[language].voucherInstructions + makeDeadLine(booking.date, language);
    mailText += '\n\n';
    mailText += paymentOptions;
    mailText += '\n\n';
    mailText += translation.mailText[language].greetz;
    mailText += '\n\n';
    mailText += 'https://havanabycar.co';
    return mailText;
}

const getReminderHTML = (translation, language, booking) => {

    const paymentOptions = composePaymentHtml(booking);
    const superTotal = carPrice.computeToBePaid(booking.pricing, booking.discounts, booking.paymentMethod);

    const mailHtml = `
${startHTML}
<div style="padding:15px">
<p><b>${translation.mailText[language].intro},</b></p>
<p>${translation.mailText[language].stillOnTime + ' ' + booking.bookedCar.carModel}</p>
<p>${translation.mailText[language].aboutToExire}</p>
<p>${translation.mailText[language].voucherInstructions + ' <b style="color: red;">' + makeDeadLine(booking.date, language)}</b></p>
${paymentBTN(language, booking, translation, superTotal)}
${paymentOptions}
</div>
${finishHTML(translation.mailText[language].greetz, translation.mailText[language].whatsapp)}`;
    return mailHtml;
}

module.exports = { getReminderHTML, getReminderText };