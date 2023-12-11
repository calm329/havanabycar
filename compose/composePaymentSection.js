const mails = require("../data/mails.js");
const {composeBtcHtml, composeBtcText} = require("./composeBTC.js");
const {composeZelleHtml, composeZelleText} = require("./composeZelle.js");
const {composeCCHtml, composeCCText} = require("./composeCreditCard.js");
const {composeBankHtml, composeBankText} = require("./composeBank.js");

const showMainMethod = (method, mode, booking) => {
    
    let cb;
    
    if(method == "btcPay") {
        cb = mode == "html" ? composeBtcHtml(booking) : composeBtcText(booking);
    } else if(method == "zellePay") {
        cb = mode == "html" ? composeZelleHtml(booking) : composeZelleText(booking);
    } else if(method == "bankPay") {
        cb = mode == "html" ? composeBankHtml(booking) : composeBankText(booking);
    } else if(method == "creditCardPay") {
        cb = mode == "html" ? composeCCHtml(booking) : composeCCText(booking);
    } else {
        cb = mode == "html" ? composeCCHtml(booking) : composeCCText(booking);
    }

    return cb;
}

const showAlternativeMethods = booking => {
    let html = "";
    
    if(booking.paymentMethod != "bankPay") {
        html+= composeBankHtml(booking);
    }
    /*
    if(booking.paymentMethod != "btcPay") {
        html+= composeBtcHtml(booking);
    }
    if(booking.paymentMethod != "zellePay") {
        html+= composeZelleHtml(booking);
    }
    */
    if(booking.paymentMethod != "creditCardPay") {
        html+= composeCCHtml(booking);
    }
    
    return html;
}

const composePaymentHtml = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    const html = `
<p>${translation.whyAlternatives}</p>
${showAlternativeMethods(booking)}`
return html;
}

const composePaymentText = (booking) => {
    const translation = mails.translation.mailText[booking.language];
    let mailText = '\n\n\n';
    mailText += translation.paymentOptions.toUpperCase();
    mailText += '\n\n';
    mailText += translation.selectedMethod + ": " + translation.methods[booking.paymentMethod];
    mailText += '\n\n';
    mailText += showMainMethod(booking.paymentMethod, "text", booking);
    mailText += '\n\n';
    mailText += translation.alternativeMethods.toUpperCase();
    mailText += '\n\n';
    mailText += translation.whyAlternatives;
    mailText += '\n\n';
    /*
    if(booking.paymentMethod != "btcPay") {
        mailText += composeBtcText(booking);
    }
    if(booking.paymentMethod != "zellePay") {
        mailText += composeZelleText(booking);
    }
    */
    if(booking.paymentMethod != "bankPay") {
        mailText += composeBankText(booking);
    }
    if(booking.paymentMethod != "creditCardPay") {
        mailText += composeCCText(booking);
    }
        
}

module.exports = { composePaymentHtml, composePaymentText };