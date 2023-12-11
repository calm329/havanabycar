import getLang from './language.js';
import { openModal } from './modals.js';

const extraDay = pickTime => {
    let html = translation[getLang()].extraDayOne + " " + pickTime + " " + translation[getLang()].extraDayTwo;
    document.querySelector('#extraDayHint').innerHTML = html;
    openModal('extraDayModal');
};

const getOpeningHours = text => {
    let hours = text.split('(');
    let hours2 = String(hours[1].split(')'));
    const hoursArray = hours2.split('-');
    const start = hoursArray[0];
    const finish = hoursArray[1];
    return {
      start: start,
      finish: finish
    };
  };

  let ms = 0;
  let lang = "";

  const renderTimeLeft = () => {
    
    const oneDay = 1000 * 60 * 60 * 24;
    const oneHour = 1000 * 60 * 60;
    const oneMinute = 1000 * 60;
    
    const days = Math.floor(ms / oneDay);
    const daysReminder = ms % oneDay;
    const hours = Math.floor(daysReminder / oneHour);
    const hoursReminder = daysReminder % oneHour;
    const minutes = Math.floor(hoursReminder / oneMinute);
    const minutesReminder = hoursReminder % oneMinute;
    const seconds = Math.floor(minutesReminder / 1000);
    const timeLeftString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    document.querySelector("#count-down").innerText = timeLeftString;
  };

  const countdown = () => {
    renderTimeLeft();
    ms = ms - 1000;
  }

  const countdownInit = (msLeft) => {
    lang = getLang()
    ms = msLeft;
    setInterval(() => countdown(), 1000);
  }

export { extraDay, getOpeningHours, countdownInit };