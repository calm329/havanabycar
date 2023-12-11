import { showError } from "./feedbacks";

const sendEmail = () => {
  const sender = document.querySelector('#contact-email').value;
  const message = document.querySelector('#contact-message').value;

  if (sender == '' || message.length < 1) {
    return showError('contactError', translation[getLang()].mailError);
  }

  const url = '/enquire';
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status == 200) {
        document.querySelector('.contact-form').innerHTML = '<h5 class = "teal-text">' + translation[getLang()].sent + '</h5>';
      } else if (xhr.status == 500) {
        showError('contactError', 'Error!');
        document.querySelector('.progress').classList.add('hide');
      } else {
        const myResponse = JSON.parse(xhr.responseText);
        showError('contactError', myResponse.message);
        document.querySelector('.progress').classList.add('hide');
      }
    }
  };

  xhr.send(JSON.stringify({
    sender,
    message,
    language: getLang(),
    reply: 'booking@havanabycar.co'
  }));
  document.querySelector('.progress').classList.remove('hide');
};

export default sendEmail;