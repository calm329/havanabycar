const nodemailer = require("nodemailer");
const { translation } = require("../data/mails.js");
const secret = require("../secrets/secrets.js");
const {
  getBookingSavedEmailText,
  getBookingSavedEmailHtml,
} = require("../compose/bookingRecieved.js");
const {
  getReminderHTML,
  getReminderText,
} = require("../compose/bookingReminder.js");
const { getExpiryHTML, getExpiryText } = require("../compose/bookingExpiry.js");
const {
  getCarCancelledEmailHtml,
  getCarCancelledEmailText,
} = require("../compose/bookingCancelled.js");
const { getPaidHTML, getPaidText } = require("../compose/bookingPaid.js");
const {
  getRefundNextStepsHtml,
  getRefundNextStepsText,
} = require("../compose/refundProcessing.js");
const { refundHtml, refundText } = require("../compose/refundExecuted.js");
const {
  getRejectedHtml,
  getRejectedText,
} = require("../compose/cardRejected.js");
const {
  getRefundRejectedHtml,
  getRefundRejectedText,
} = require("../compose/refundRejected.js");

//Set up Mail functionality
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //Without this line of code mail doesn't work

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  auth: {
    user: secret.email.user,
    pass: secret.email.password,
  },
});

const carCancelledEmail = async (booking, reason) => {
  try {
    const language = booking.language;

    let emailSettings = {
      language: language,
      booking_id: booking._id,
    };

    //Compose email
    const subject =
      translation.mailText[language].cancellationSubject +
      " (ID: " +
      booking.causale +
      ")";
    const mailText = getCarCancelledEmailText(
      translation,
      emailSettings,
      reason
    );
    const mailHtml = getCarCancelledEmailHtml(
      translation,
      emailSettings,
      reason
    );

    //Set mail options
    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject,
      text: mailText,
      html: mailHtml,
    };

    //Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      console.log("Cancellation Email Sent To: ", booking.driver.email);
    });
  } catch (error) {
    console.log("Error @ Send Cancellation Email");
    console.log(error);
  }
};

const carConfirmedEmail = async (booking) => {
  const language = booking.language;

  let emailSettings = {
    language: language,
    booking_id: booking._id,
  };

  //Compose email

  const subject =
    translation.mailText[language].bookingSubjectCar +
    " (ID: " +
    booking.causale +
    ")";
  const mailText = await getBookingSavedEmailText(
    translation,
    emailSettings,
    booking
  );
  const mailHtml = await getBookingSavedEmailHtml(
    translation,
    emailSettings,
    booking
  );

  //Set mail options
  const mailOptions = {
    from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
    to: booking.driver.email,
    bcc: "booking@cubagoldcar.com",
    subject: subject,
    text: mailText,
    html: mailHtml,
  };

  //Send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    console.log("Confirmation Email Sent To: ", booking.driver.email);
  });
};

const sendReminder = async (booking) => {
  try {
    const language = booking.language;

    const subject =
      language == "ENG"
        ? "REMINDER: Only 24 Hours Left"
        : "RECORDATORIO: Quedan solo 24 Horas";
    const mailText = await getReminderText(translation, language, booking);
    const mailHtml = await getReminderHTML(translation, language, booking);

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject + " (ID " + booking.causale + ")",
      text: mailText,
      html: mailHtml,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("Reminder Email Sent To: ", booking.driver.email);
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const informExpiration = async (booking) => {
  try {
    const language = booking.language;

    const subject = language == "ENG" ? "BOOKING EXPIRED: " : "RESERVA VENCIDA";
    const mailText = await getExpiryText(translation, language, booking);
    const mailHtml = await getExpiryHTML(translation, language, booking);

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject + " (ID " + booking.causale + ")",
      text: mailText,
      html: mailHtml,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("Expiry Email Sent To: ", booking.driver.email);
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const voucherAvailableEmail = async (booking) => {
  try {
    const language = booking.language;
    const subject =
      language == "ENG" ? "VOUCHER AVAILABE: " : "VOUCHER DISPONIBLE";
    const url =
      language == "ENG"
        ? "https://cubagoldcar.com/ENG/booking/" + booking._id
        : "https://cubagoldcar.com/booking/" + booking._id;
    const mailText = await getPaidText(
      translation,
      language,
      url,
      "downloadVoucher"
    );
    const mailHtml = await getPaidHTML(
      translation,
      language,
      url,
      "downloadVoucher"
    );

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject + " (ID " + booking.causale + ")",
      text: mailText,
      html: mailHtml,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("VOucher Available Email Sent To: ", booking.driver.email);
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const bookingRefundedEmail = async (booking) => {
  try {
    const language = booking.language;
    const subject = language == "ENG" ? "BOOKING REFUNDED" : "PAGO REEMBOLSADO";
    const mailText = await refundText(translation, language);
    const mailHtml = await refundHtml(translation, language);
    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject + " (ID " + booking.causale + ")",
      text: mailText,
      html: mailHtml,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("Booking Refunded Email Sent To: ", booking.driver.email);
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const refundNextStepsEmail = async (booking, refund) => {
  try {
    const language = booking.language;
    const subject =
      language == "ENG" ? "REFUND - Next Steps " : "Reembolso - Proximos Pasos";
    const url =
      language == "ENG"
        ? "https://cubagoldcar.com/ENG/booking/" + booking._id
        : "https://cubagoldcar.com/booking/" + booking._id;
    const mailText = await getRefundNextStepsText(
      translation,
      language,
      url,
      refund
    );
    const mailHtml = await getRefundNextStepsHtml(
      translation,
      language,
      url,
      refund
    );

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject + " (ID " + booking.causale + ")",
      text: mailText,
      html: mailHtml,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("Car Paid Email Sent To: ", booking.driver.email);
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const carPaidEmail = async (booking) => {
  try {
    const language = booking.language;
    const subject =
      language == "ENG" ? "BOOKING CONFIRMED: " : "RESERVA CONFIRMADA";
    const url =
      language == "ENG"
        ? "https://cubagoldcar.com/ENG/booking/" + booking._id
        : "https://cubagoldcar.com/booking/" + booking._id;
    const mailText = await getPaidText(
      translation,
      language,
      url,
      "downloadInvoice"
    );
    const mailHtml = await getPaidHTML(
      translation,
      language,
      url,
      "downloadInvoice"
    );

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject + " (ID " + booking.causale + ")",
      text: mailText,
      html: mailHtml,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("Car Paid Email Sent To: ", booking.driver.email);
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const informNewCC = async (cc) => {
  try {
    const mailText =
      "Un usuario acaba de insertar los datos de su tarjeta para la reserva " +
      cc.booking +
      "\n\nEntrar al panel de control del admin para procesar la reserva:\n\nhttps://cubagoldcar.com/admin";

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: "booking@cubagoldcar.com",
      subject: "Nueva Tarjeta (ID " + cc.booking + ")",
      text: mailText,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("New CC Email Sent To: booking@cubagoldcar.com");
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const informNewRefundData = async (causale) => {
  try {
    const mailText =
      "Un usuario acaba de enviar los detalles bancarios para el reembolso de la reserva " +
      causale +
      "\n\nEntrar al panel de control del admin para procesar la reserva:\n\nhttps://cubagoldcar.com/admin";

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: "booking@cubagoldcar.com",
      subject: "Reembolso: Datos Bancarios Enviados (ID " + causale + ")",
      text: mailText,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("New Refund Data Email Sent To: booking@cubagoldcar.com");
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const informNewEvidence = async (causale) => {
  try {
    const mailText =
      "Un usuario acaba de cargar evidencia de pago para la reserva " +
      causale +
      "\n\nEntrar al panel de control del admin para procesar la reserva:\n\nhttps://cubagoldcar.com/admin";

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: "booking@cubagoldcar.com",
      subject: "Nueva Evidencia de Pago (ID " + causale + ")",
      text: mailText,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log(
        "New Payment Evidence Email Sent To: booking@cubagoldcar.com"
      );
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const paymentRejectedEmail = async (booking) => {
  try {
    const language = booking.language;
    const subject =
      language == "ENG"
        ? "CARD PAYMENT REJECTED"
        : "PAGO POR TARJETA RECHAZADO";
    const mailText = await getRejectedText(translation, language, booking);
    const mailHtml = await getRejectedHtml(translation, language, booking);

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject + " (ID " + booking.causale + ")",
      text: mailText,
      html: mailHtml,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log(
        "Card Payment Rejected Email Sent To: ",
        booking.driver.email
      );
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const refundRejectedEmail = async (booking) => {
  try {
    const language = booking.language;
    const subject =
      language == "ENG" ? "REFUND PAYMENT REJECTED" : "REEMBOLSO RECHAZADO";
    const mailText = await getRefundRejectedText(
      translation,
      language,
      booking._id
    );
    const mailHtml = await getRefundRejectedHtml(
      translation,
      language,
      booking._id
    );

    const mailOptions = {
      from: '"CUBAGOLDCAR" <booking@cubagoldcar.com>',
      to: booking.driver.email,
      bcc: "booking@cubagoldcar.com",
      subject: subject + " (ID " + booking.causale + ")",
      text: mailText,
      html: mailHtml,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log(err);
      console.log("refund Rejected Email Sent To: ", booking.driver.email);
      return true;
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.refundRejectedEmail = refundRejectedEmail;
exports.carPaidEmail = carPaidEmail;
exports.carConfirmedEmail = carConfirmedEmail;
exports.carCancelledEmail = carCancelledEmail;
exports.sendReminder = sendReminder;
exports.informExpiration = informExpiration;
exports.voucherAvailableEmail = voucherAvailableEmail;
exports.informNewCC = informNewCC;
exports.informNewEvidence = informNewEvidence;
exports.informNewRefundData = informNewRefundData;
exports.refundNextStepsEmail = refundNextStepsEmail;
exports.bookingRefundedEmail = bookingRefundedEmail;
exports.paymentRejectedEmail = paymentRejectedEmail;
