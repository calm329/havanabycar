const { startHTML, finishHTML, go2PortalBTN } = require("./htmlComponents.js");

const getPaidText = (translation, language, url, action) => {
  let mailText = translation.mailText[language].intro + ",";
  mailText += "\n\n";

  if (action == "downloadVoucher") {
    mailText += translation.mailText[language].voucherAvailable;
  } else {
    mailText += translation.mailText[language].paymentSuccessfull;
  }

  mailText += "\n\n";
  mailText += translation.mailText[language].checkBooking;
  mailText += "\n\n";
  mailText += url;
  mailText += "\n\n";
  mailText += translation.mailText[language][action];
  mailText += "\n\n";
  mailText += translation.mailText[language].greetz;
  mailText += "\n\n";
  mailText += "https://cubagoldcar.com";
  return mailText;
};

const getPaidHTML = (translation, language, url, action) => {
  const mailHtml = `
${startHTML}
<div style="padding:15px">
<p><b>${translation.mailText[language].intro},</b></p>
<p>${
    action == "downloadVoucher"
      ? translation.mailText[language].voucherAvailable
      : translation.mailText[language].paymentSuccessfull
  }</p>
<p>${translation.mailText[language].checkBooking}</p>
${go2PortalBTN(url, language)}
<p>${translation.mailText[language][action]}</p>
</div>
${finishHTML(
  translation.mailText[language].greetz,
  translation.mailText[language].whatsapp
)}`;
  return mailHtml;
};

module.exports = { getPaidHTML, getPaidText };
