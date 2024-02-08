const { startHTML, finishHTML } = require("./htmlComponents.js");

const getCarCancelledEmailText = (translation, settings, reason) => {
  const language = settings.language;
  const baseUrl = "https://https://cubagoldcar.com";
  const url =
    language == "ENG"
      ? baseUrl + "/ENG/booking/" + settings.booking_id
      : baseUrl + "/booking/" + settings.booking_id;
  let mailText = translation.mailText[language].intro + ",";
  mailText += "\n\n";
  mailText +=
    translation.mailText[language].sorry +
    " " +
    translation.mailText[language][reason];
  mailText += "\n\n";
  mailText += translation.mailText[language].refundAction;
  mailText += "\n\n";
  mailText += url;
  mailText += "\n\n";
  mailText += translation.mailText[language].greetz;
  mailText += "\n\n";
  mailText += "https://cubagoldcar.com";
  return mailText;
};

const getCarCancelledEmailHtml = (translation, settings, reason) => {
  const language = settings.language;
  const baseUrl = "https://https://cubagoldcar.com";
  const url =
    language == "ENG"
      ? baseUrl + "/ENG/booking/" + settings.booking_id
      : baseUrl + "/booking/" + settings.booking_id;
  const mailText = `
${startHTML}
<div style="padding:15px"><p><b>${translation.mailText[language].intro},</b></p>
<p>${translation.mailText[language].sorry} ${
    translation.mailText[language][reason]
  }</p>
<p>${translation.mailText[language].refundAction}</p>
<p><a href="${url}">${url}</a></p>
${finishHTML(
  translation.mailText[language].greetz,
  translation.mailText[language].whatsapp
)}`;
  return mailText;
};

module.exports = { getCarCancelledEmailHtml, getCarCancelledEmailText };
