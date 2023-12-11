import { showError } from './feedbacks.js';
import getLang from './language.js';
import translation from './translations.js';

const check_phone = x => {
    const reg = /^\+[1-9]\d{1,14}$/g;
    if (reg.test(x) != true) return false;
    return true;
};

const checkBday = date => {
  const ago21 = new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 21;

  if (date > ago21 && document.querySelector('#bookCarBTN').classList.contains('disabled')) {
    showError('errorModal', translation[getLang()].wrongAge);
    document.querySelector('#bookCarBTN').classList.add('disabled');
    return;
  } else {
    if (document.querySelector('#bookCarBTN').classList.contains('disabled')) {
      document.querySelector('#bookCarBTN').classList.remove('disabled');
      return;
    }
  }
};

const validatePic = (className) => {

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

  let isValid = true;
  
  const check = document.querySelector(`.${className} .fa-check-circle`);
  const upload = document.querySelector(`.${className} .fa-upload`);
  const label = document.querySelector(`.${className} label`);
  const field = document.querySelector(`#${className}`);

  const file = field.files[0];
  const fileSizeInMB = file.size / (1024 * 1024);
  console.log("Mime Type", file.type);
  console.log("File Size", fileSizeInMB);

  if( allowedMimeTypes.indexOf(file.type) < 0){
    isValid = false;
    showError(translation[getLang()].uploadGuide);
  }

  if(fileSizeInMB > 5){
    isValid = false;
    showError(translation[getLang()].uploadMaxSize);
  }

  if(isValid == true) {
    check.classList.remove("hidden");
    upload.classList.add("hidden");
    label.classList.add("picSelected");
  } else {
    check.classList.add("hidden");
    upload.classList.remove("hidden");
    label.classList.remove("picSelected");
  }
  
  return isValid;
  
}
  

export { check_phone, checkBday, validatePic };