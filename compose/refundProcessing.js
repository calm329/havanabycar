const { startHTML, finishHTML } = require("./htmlComponents.js");

const getRefundNextStepsHtml = (translation, language, url, refund) => {
    const mailText = `
${startHTML}
<div style="padding:15px"><p><b>${translation.mailText[language].intro},</b></p>
<p>${translation.mailText[language].bankDataSent}</p>
<p><b>${translation.mailText[language].bank}:</b> ${refund.bank}</p>
<p><b>${translation.mailText[language].bankBeneficiary}:</b> ${refund.beneficiary}</p>
<p><b>IBAN:</b> ${refund.iban}</p>
<p><b>BIC/SWIFT:</b> ${refund.bic}</p>
<p><b>${translation.mailText[language].address}:</b> ${refund.address}</p>
<p><b>${translation.mailText[language].bankAmount}:</b> ${refund.amount}</p>
<p>${translation.mailText[language].checkPortalRefund}</p>
<p><a href="${url}">${url}</a></p>
${finishHTML(translation.mailText[language].greetz, translation.mailText[language].whatsapp)}`;
    return mailText;
}

const getRefundNextStepsText = (translation, language, url, refund) => {
    let mailText = translation.mailText[language].intro + ',';
    mailText += '\n\n';
    mailText += translation.mailText[language].bankDataSent;
    mailText += '\n\n';
    mailText += translation.mailText[language].bank + " " + refund.bank;
    mailText += '\n\n';
    mailText += translation.mailText[language].bankBeneficiary + " " + refund.beneficiary;
    mailText += '\n\n';
    mailText += "IBAN: " + refund.iban;
    mailText += '\n\n';
    mailText += "BIC/SWIFT: " + refund.bic;
    mailText += '\n\n';
    mailText += translation.mailText[language].address + " " + refund.address;
    mailText += '\n\n';
    mailText += translation.mailText[language].bankAmount + " " + refund.amount;
    mailText += '\n\n';
    mailText += translation.mailText[language].checkPortalRefund;
    mailText += '\n\n';
    mailText += url;
    mailText += '\n\n';
    mailText += translation.mailText[language].greetz;
    mailText += '\n\n';
    mailText += 'havanabycar.co';
    return mailText;
}

module.exports = { getRefundNextStepsHtml, getRefundNextStepsText };