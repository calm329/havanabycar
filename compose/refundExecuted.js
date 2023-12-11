const { startHTML, finishHTML } = require("./htmlComponents.js");

const refundHtml = (translation, language) => {
    const mailText = `
${startHTML}
<div style="padding:15px"><p><b>${translation.mailText[language].intro},</b></p>
<p>${translation.mailText[language].refundExecuted}</p>
${finishHTML(translation.mailText[language].greetz, translation.mailText[language].whatsapp)}`;
    return mailText;
}

const refundText = (translation, language) => {
    let mailText = translation.mailText[language].intro + ',';
    mailText += '\n\n';
    mailText += translation.mailText[language].refundExecuted;
    mailText += '\n\n';
    mailText += translation.mailText[language].greetz;
    mailText += '\n\n';
    mailText += 'havanabycar.co';
    return mailText;
}

module.exports = { refundHtml, refundText };