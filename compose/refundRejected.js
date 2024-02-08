const { startHTML, finishHTML } = require("./htmlComponents.js");

const getRefundRejectedText = (translation, language, booking) => {
  const baseUrl = "https://cubagoldcar.com";
  const link =
    language == "ENG"
      ? baseUrl + "/ENG/booking/" + booking
      : baseUrl + "/booking/" + booking;
  let mailText = translation.mailText[language].intro + ",";
  mailText += "\n\n";
  mailText += translation.mailText[language].refundRejected;
  mailText += "\n\n";
  mailText += link;
  mailText += "\n\n";
  mailText += translation.mailText[language].whatasppNumberRent2Cuba;
  mailText += "\n\n";
  mailText += translation.mailText[language].greetz;
  mailText += "\n\n";
  mailText += "cubagoldcar.com";
  return mailText;
};

const getRefundRejectedHtml = (translation, language, booking) => {
  const baseUrl = "https://cubagoldcar.com";
  const link =
    language == "ENG"
      ? baseUrl + "/ENG/booking/" + booking
      : baseUrl + "/booking/" + booking;
  const mailText = `
${startHTML}
<div style="padding:15px"><p><b>${translation.mailText[language].intro},</b></p>
<p>${translation.mailText[language].refundRejected}</p>
<p><a href="${link}">${link}</a></p>
${finishHTML(
  translation.mailText[language].greetz,
  translation.mailText[language].whatsapp
)}`;
  return mailText;
};

module.exports = { getRefundRejectedHtml, getRefundRejectedText };
