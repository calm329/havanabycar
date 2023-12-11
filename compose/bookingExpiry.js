const { startHTML, finishHTML, reactivateBTN } = require("./htmlComponents.js");

const getExpiryHTML = (translation, language, booking) => {
    const url = language == "ENG" ?
        "https://https://havanabycar.co/ENG/reactivate/" + booking._id :
        "https://https://havanabycar.co/reactivate/" + booking._id;

    const mailHtml = `
${startHTML}
<div style="padding:15px">
<p><b>${translation.mailText[language].intro},</b></p>
<p>${translation.mailText[language].noMoreTime + ' ' + booking.bookedCar.carModel}</p>
<p>${translation.mailText[language].reactivate}</p>
${reactivateBTN(url, language)}
</div>
${finishHTML(translation.mailText[language].greetz, translation.mailText[language].whatsapp)}`;
    return mailHtml;
}

const getExpiryText = (translation, language, booking) => {

    const url = language == "ENG" ?
        "https://https://havanabycar.co/ENG/reactivate/" + booking._id :
        "https://https://havanabycar.co/reactivar/" + booking._id;

    let mailText = translation.mailText[language].intro + ',';
    mailText += '\n\n';
    mailText += translation.mailText[language].noMoreTime + booking.bookedCar.carModel;
    mailText += '\n\n';
    mailText += translation.mailText[language].reactivate;
    mailText += '\n\n';
    mailText += url;
    mailText += '\n\n';
    mailText += translation.mailText[language].greetz;
    mailText += '\n\n';
    mailText += 'https://havanabycar.co';
    return mailText;
}

module.exports = { getExpiryHTML, getExpiryText };