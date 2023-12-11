const carPrice = require("../helpers/carPrice.js");
const { makeDeadLine } = require("./composeDeaLine.js");
const { composePaymentHtml, composePaymentText } = require("../compose/composePaymentSection.js")
const { config } = require("../data/config.js");
const { startHTML, finishHTML, paymentBTN } = require("./htmlComponents.js");

const getUrl = (booking) => {
    const url = booking.language == "ENG" ? "/ENG/booking/" + booking._id : "/booking/" + booking._id;
    return config.baseUrl + url;
}

const getBookingSavedEmailHtml = async (translation, settings, booking = false) => {
    const language = settings.language;

    if (booking == false) return;

    const driver = booking.driver;
    const arrangement = booking.arrangement;
    const bookedCar = booking.bookedCar;
    const pricing = booking.pricing;
    const superTotal = carPrice.computeToBePaid(pricing, booking.discounts, booking.paymentMethod);
    const monitorLink = getUrl(booking);
    const paymentOptions = composePaymentHtml(booking);

    const mailHtml = `

${startHTML}

<div style="padding:15px">
<p><b>${translation.mailText[language].intro},</b></p>
<p>${translation.mailText[language].bookingRecieved}</p>
<p>${translation.mailText[language].voucherInstructions + ' <b style="color: red">' + makeDeadLine(booking.date, language) + '</b>'}</p>

${paymentBTN(language, booking, translation, superTotal)}

<p>${translation.mailText[language].asSoonAs}</p>
<p>${translation.mailText[language].howMonitor}</p>
<p><a href="${monitorLink}">${monitorLink}</a></p>
</div>

<div style="border: 1px solid black; border-radius: 20px; width: 95%; margin: auto; background-color: whitesmoke; box-shadow: 0px 0px 5px black;">

<h3 style="display: inline-block; background-color: red; color: white; padding: 5px 15px; border-radius: 10px; margin-left: 15px;"><b>
${translation.mailText[language].datiDelTitolare.toUpperCase()}
</b></h3>

<p style="padding:0px 15px;"><b>${translation.mailText[language].nome}:</b> ${driver.name} ${driver.surname}</p>
<p style="padding:0px 15px;"><b>${translation.mailText[language].telefono}:</b> ${driver.phone}</p>
<p style="padding:0px 15px;"><b>${translation.mailText[language].email}:</b> ${driver.email}</p>
<p style="padding:0px 15px;"><b>${translation.mailText[language].birthdate}:</b> ${driver.birth}</p>
<p style="padding:0px 15px;"><b>${translation.mailText[language].nazionalita}:</b> ${driver.country}</p>
<p style="padding:0px 15px;"><b>${translation.mailText[language].passaporto}:</b> ${driver.passport}</p>

</div>

<div style="border: 1px solid black; border-radius: 20px; width: 95%; margin: auto; margin-top: 20px; background-color: whitesmoke;">

<h3 style="display: inline-block; background-color: red; color: white; padding: 5px 15px; border-radius: 10px; margin-left: 15px;"><b>
${translation.mailText[language].datiPrenotazione.toUpperCase()}
</b></h3>


<p><b style="color: red; padding: 5px; display: inline-block; border-bottom: 2px solid red;">
${translation.mailText[language].veicolo.toUpperCase()}
</b></p>

<p style="padding:0px 15px;"><b>${translation.mailText[language].modelloAuto}:</b> ${bookedCar.carModel}</p>
<p style="padding:0px 15px;"><b>${translation.mailText[language].categoria}:</b> ${bookedCar.carType}</p>
<p style="padding:0px 15px;"><b>${translation.mailText[language].compagnia}:</b> ${bookedCar.vendor}</p>

<p><b style="color: red; padding: 5px; display: inline-block; border-bottom: 2px solid red;">
${translation.mailText[language].ritiro.toUpperCase()}
</b></p>

<p style="padding:0px 15px;">${arrangement.pickOffice} - <b>${arrangement.city}</b></p>
<p style="padding:0px 15px;">${arrangement.startString} - <b>H${arrangement.pickupTime}</b></p>

<p><b style="color: red; padding: 5px; display: inline-block; border-bottom: 2px solid red;">
${translation.mailText[language].consegna.toUpperCase()}
</b></p>

<p style="padding:0px 15px;">${arrangement.dropoffOffice} - <b>${arrangement.dropoffCity}</b></p>
<p style="padding:0px 15px;">${arrangement.finishString} - <b>H${arrangement.dropoffTime}</b></p>

<h2 style="color: black;font-size: 25px; padding:0px 15px;"><b>${translation.mailText[language].totaleDaPagare}: ${superTotal} ${booking.currencySymbol}</b></h2>

<p><b style="color: red; padding: 5px; display: inline-block; border-bottom: 2px solid red;">
${translation.mailText[language].paidAlready.toUpperCase()}
</b></p>

<p style="padding:0px 15px;"><b>${translation.mailText[language].rentalOnlyPrice} ${pricing.carTotal} ${booking.currency}</b></p>
${booking.pricing.lateReturn > 0 ? '<p><b>' + translation.mailText[language].extraDayPenalty + ': ' + booking.pricing.lateReturn + ' ' + booking.currency + '</b></p>' : ''}
<p style="padding:0px 15px;"><b>${translation.mailText[language].paidInsurance}</b></p>
<p style="padding:0px 15px;"><b>${translation.mailText[language].paidFuel(booking.currency)}</b></p>
${booking.pricing.airportPickUp > 0 ? '<p style="padding:0px 15px;"><b>' + translation.mailText[language].paidAirport(booking.currency) + '</b></p>' : ''}
${booking.pricing.returnInDifferentCity > 0 ? '<p style="padding:0px 15px;"><b>' + translation.mailText[language].paidDropOff(booking.currency) + '</b></p>' : ''}
${booking.pricing.secondDriver > 0 ? '<p style="padding:0px 15px;"><b>' + translation.mailText[language].paidSecondDriver(booking.currency) + '</b></p>' : ''}
${booking.paymentMethod == "creditCardPay" ? '<p style="padding:0px 15px;"><b>' + translation.mailText[language].ccPremium + ': ' + booking.discounts.creditCardPay + ' ' + booking.currency + '</b></p>' : ''}
${booking.voucherCode != "" ? '<p style="padding:0px 15px;"><b style="color: lightgreen">' + translation.mailText[language].bonoDiscount + ': ' + booking.discounts.voucherDiscount + ' ' + booking.currency + '</b></p>' : ''}
<p style="padding:0px 15px;"><b style="color: red;">${translation.mailText[language].noDepo}</b></p>

</div>

<div style="padding:15px">
${paymentOptions}
</div>

${finishHTML(translation.mailText[language].greetz, translation.mailText[language].whatsapp)}`;

    return mailHtml;

};

const getBookingSavedEmailText = async (translation, settings, booking = false) => {

    const language = settings.language;
    let mailText;
    const monitorLink = getUrl(booking);
    const superTotal = carPrice.computeToBePaid(booking.pricing, booking.discounts, booking.paymentMethod);
    const paymentOptions = composePaymentText(booking);
    mailText = translation.mailText[language].intro + ',';
    mailText += '\n\n';
    mailText += translation.mailText[language].bookingRecieved;
    mailText += '\n\n';
    mailText += translation.mailText[language].voucherInstructions + makeDeadLine(booking.date, language);
    mailText += '\n\n';
    mailText += translation.mailText[language].asSoonAs;
    mailText += '\n\n';
    mailText += translation.mailText[language].howMonitor;
    mailText += '\n\n';
    mailText += monitorLink;
    mailText += '\n\n';
    mailText += paymentOptions;
    mailText += '\n\n';
    mailText += translation.mailText[language].whatsapp;

    if (booking !== false) {
        const driver = booking.driver;

        mailText += '\n\n\n';
        mailText += translation.mailText[language].datiDelTitolare.toUpperCase();
        mailText += '\n\n';
        mailText += translation.mailText[language].nome + ': ' + driver.name;
        mailText += '\n\n';
        mailText += translation.mailText[language].cognome + ': ' + driver.surname;
        mailText += '\n\n';
        mailText += translation.mailText[language].telefono + ': ' + driver.phone;
        mailText += '\n\n';
        mailText += translation.mailText[language].email + ': ' + driver.email;
        mailText += '\n\n';
        mailText += translation.mailText[language].birthdate + ': ' + driver.birth;
        mailText += '\n\n';
        mailText += translation.mailText[language].nazionalita + ': ' + driver.country;
        mailText += '\n\n';
        mailText += translation.mailText[language].passaporto + ': ' + driver.passport;

        const arrangement = booking.arrangement;
        mailText += '\n\n\n';
        mailText += '---------------------';
        mailText += '\n\n\n';
        mailText += translation.mailText[language].datiPrenotazione.toUpperCase();
        mailText += '\n\n';
        mailText += translation.mailText[language].ritiro.toUpperCase();
        mailText += '\n\n';
        mailText += translation.mailText[language].luogo + ': ' + arrangement.city;
        mailText += '\n\n';
        mailText += translation.mailText[language].ufficio + ': ' + arrangement.pickOffice;
        mailText += '\n\n';
        mailText += translation.mailText[language].data + ': ' + arrangement.startString;
        mailText += '\n\n';
        mailText += translation.mailText[language].ora + ': ' + arrangement.pickupTime;

        mailText += '\n\n\n';
        mailText += translation.mailText[language].consegna.toUpperCase();
        mailText += '\n\n';
        mailText += translation.mailText[language].luogo + ': ' + arrangement.dropoffCity;
        mailText += '\n\n';
        mailText += translation.mailText[language].ufficio + ': ' + arrangement.dropoffOffice;
        mailText += '\n\n';
        mailText += translation.mailText[language].data + ': ' + arrangement.finishString;
        mailText += '\n\n';
        mailText += translation.mailText[language].ora + ': ' + arrangement.dropoffTime;

        const bookedCar = booking.bookedCar;

        mailText += '\n\n\n';
        mailText += '---------------------';
        mailText += '\n\n\n';
        mailText += translation.mailText[language].veicolo.toUpperCase();
        mailText += '\n\n';
        mailText += translation.mailText[language].modelloAuto + ': ' + bookedCar.carModel;
        mailText += '\n\n';
        mailText += translation.mailText[language].categoria + ': ' + bookedCar.carType;
        mailText += '\n\n';
        mailText += translation.mailText[language].compagnia + ': ' + bookedCar.vendor;

        mailText += '\n\n\n';
        mailText += '---------------------';
        mailText += '\n\n';
        mailText += translation.mailText[language].totaleDaPagare + ': ' + superTotal + " " + booking.currencySymbol;

    }

    mailText += '\n\n\n';
    mailText += translation.mailText[language].paidAlready.toUpperCase();
    mailText += '\n\n';
    mailText += translation.mailText[language].rentalOnlyPrice + " " + booking.pricing.carTotal + " " + booking.currency;
    mailText += '\n\n';
    if (booking.pricing.lateReturn > 0) {
        mailText += translation.mailText[language].extraDayPenalty + ": " + booking.pricing.lateReturn + " " + booking.currency;
        mailText += '\n\n';
    }
    mailText += translation.mailText[language].paidInsurance;
    mailText += '\n\n';
    mailText += translation.mailText[language].paidFuel(booking.currency);

    if (booking.pricing.airportPickUp > 0) {
        mailText += '\n\n';
        mailText += translation.mailText[language].paidAirport(booking.currency);
    }

    if (booking.pricing.returnInDifferentCity > 0) {
        mailText += '\n\n';
        mailText += translation.mailText[language].paidDropOff(booking.currency);
    }

    if (booking.pricing.secondDriver > 0) {
        mailText += '\n\n';
        mailText += translation.mailText[language].paidSecondDriver(booking.currency);
    }

    if (booking.paymentMethod == "creditCardPay") {
        mailText += '\n\n';
        mailText += translation.mailText[language].ccPremium + booking.discounts.creditCardPay + " " + booking.currency;
    }

    if (booking.voucherCode != "") {
        mailText += '\n\n';
        mailText += translation.mailText[language].bonoDiscount + booking.discounts.voucherDiscount + " " + booking.currency;
    }

    mailText += '\n\n\n';
    mailText += translation.mailText[language].noDepo;
    mailText += '\n\n\n';
    mailText += translation.mailText[language].greetz;
    mailText += '\n\n';
    mailText += 'https://havanabycar.co';

    return mailText;

}

module.exports = { getBookingSavedEmailHtml, getBookingSavedEmailText }