const { trafficLines } = require("./trafficLines.js");

const startHTML = `
<html>
<head>
<style>
/* Define the Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
</style>
</head>
<body style="font-family: 'Poppins', sans-serif; background-color: black;">
<div style="height: 30px; background-color: black;"></div>
<div style="width: 95%; max-width: 600px; margin: 20px auto; padding: 20px 0px; background-color: white; color: black; border-right: 5px solid black; border-left: 5px solid black; overflow-x: hidden; border-radius: 20px;">
<div>
<p>
<img style="max-width: 200px; display: block; margin: auto; margin-bottom: 20px" src="https://cubagoldcar.com/static/media/logo.png">
</p>
${trafficLines}
</div>`;

const finishHTML = (greetz, whatsapp) => {
  return `
<div style="padding:15px; padding-top: 0px">
<p>${whatsapp}</p>
<p>${greetz}
<br>
<b style="color: blue">CUBA<span style="color:red">GOLD</span>CAR</b>
<br></p>
</div>
</div>
<div style="height: 30px; background-color: black;"></div>
</body>
<html>`;
};

const mainPaymentLink = (language, booking) => {
  const baseUrl =
    language == "ENG"
      ? "https://cubagoldcar.com/ENG/pay/"
      : "https://cubagoldcar.com/pago/";
  const url = baseUrl + booking.paymentMethod + "/" + booking._id;
  return url;
};

const paymentBTN = (language, booking, translation, superTotal) => {
  const url = mainPaymentLink(language, booking);
  const html = `
<p style="text-align: center; margin: 20px auto;">
<a href="${url}" style="background-color: blue; cursor: pointer; text-decoration: none; color: white; font-weight: bold; display: inline-block; padding: 5px 15px; border-radius: 10px; text-align: center">
${translation.mailText[language].payNow} ${
    translation.mailText[language].methods[booking.paymentMethod]
  }
<br>
<b style="font-size: 25px;">${superTotal} ${booking.currencySymbol}</b>
</a>
</p>
${
  booking.paymentMethod == "bankPay"
    ? "<p><b style='color:red'>" +
      translation.mailText[language].important +
      ":</b> " +
      translation.mailText[language].cubaWarning +
      " <b style='color: red'>'" +
      booking.causale +
      "'</b></p>"
    : ""
}
`;
  return html;
};

const reactivateBTN = (url, language) => {
  const btnText =
    language == "ENG" ? "REACTIVATE BOOKING" : "REACTIVAR RESERVA";
  const html = `
<p style="text-align: center; margin: 20px auto;">
<a href="${url}" style="background-color: blue; cursor: pointer; text-decoration: none; color: white; font-weight: bold; display: inline-block; padding: 10px 25px; border-radius: 10px; text-align: center">
${btnText}
</a></p>`;
  return html;
};

const go2PortalBTN = (url, language) => {
  const btnText = language == "ENG" ? "CHECK BOOKING" : "VER RESERVA";
  const html = `
<p style="text-align: center; margin: 20px auto;">
<a href="${url}" style="background-color: blue; cursor: pointer; text-decoration: none; color: white; font-weight: bold; display: inline-block; padding: 10px 25px; border-radius: 10px; text-align: center">
${btnText}
</a></p>`;
  return html;
};

module.exports = {
  finishHTML,
  mainPaymentLink,
  startHTML,
  paymentBTN,
  reactivateBTN,
  go2PortalBTN,
};
