import { checkBday } from "./sanitize.js";
import getLang from "./language.js";
import {checkinOffsetDays, offsetFinishDateDefault} from './config.js';

//Global VARs
let month;
let year;
let currentDate;
let inputField;

const dateLocalization = {
  ES: {
    cancel: '',
    clear: '',
    done: '',
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    weekdaysAbbrev: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  },
  ENG: {
    cancel: '',
    clear: '',
    done: '',
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysAbbrev: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
    months: ['January', 'February', 'March', 'April', 'May', 'Jun', 'Jul', 'August', 'September', 'October', 'November', 'December']
  }
};

const closeCalendar = () => {
  const calendarModal = document.querySelector('#calendar-modal');
  calendarModal.classList.remove('active');
  document.querySelector('.calendar-days-of-week').innerHTML = '';
  document.querySelector('.calendar-dates').innerHTML = '';
  document.querySelector('.calendar-header').innerHTML = '';
  document.querySelector('.calendar-container').classList.remove('active');
  inputField.focus();
  inputField.blur();
}

const updateDates = (e, target) => {
  const selectedValue = e.target.innerText;
  const dateString = `${selectedValue} ${dateLocalization[getLang()].months[month]} ${year}`;
  inputField.value = dateString;
  const intDateString = `${selectedValue} ${dateLocalization['ENG'].months[month]} ${year}`
  const selectedDate = new Date(intDateString);
  
  if(target == "pickupDate") {
    localStorage.setItem('start', selectedDate);
    const newFinish = new Date(selectedDate).addDays(offsetFinishDateDefault);
    localStorage.setItem('minFinish', newFinish);
    const oldFinish = new Date(localStorage.getItem('finish'));
    if(newFinish.getTime() > oldFinish.getTime()) {
      localStorage.setItem('finish', newFinish);
      const dropoffDate = document.querySelector('#dropoffDate')
      dropoffDate.value = `${newFinish.getDate()} ${dateLocalization[getLang()].months[newFinish.getMonth()]} ${newFinish.getFullYear()}`;
      dropoffDate.focus();
      dropoffDate.blur();
    }
  } else {
    localStorage.setItem('finish', selectedDate);
  }

  closeCalendar();
  
}

const checkDateClickability = (date, minDate) => {
  const dateString = `${date} ${dateLocalization['ENG'].months[month]} ${year}`;
  const dateChecked = new Date(dateString).getTime();
  const minDateTs = minDate.getTime();
  return dateChecked >= minDateTs? true : false;
}

const updateCalendar = (target) => {
  let minDate = target == "pickupDate" ? new Date(localStorage.getItem('minStart')) : new Date(localStorage.getItem('minFinish'));
  const datesContainer = document.querySelector('.calendar-dates');
  datesContainer.innerHTML = "";
  document.querySelector('.month').innerText = dateLocalization[getLang()].months[month];
  document.querySelector('.year').innerText = year;
  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Get the number of days in the month
  const numDaysInMonth = new Date(year, month + 1, 0).getDate();

   // Create the date cells
   let date = 1;
   for (let i = 0; i < 6; i++) {
     const weekRow = document.createElement("div");
     weekRow.classList.add("calendar-week-row");
     for (let j = 0; j < 7; j++) {
       const dateCell = document.createElement("span");
       dateCell.classList.add("calendar-date-cell");
       if (i == 0 && j < firstDayOfMonth) {
         // Show empty cell for days before the first day of the month
         dateCell.innerText = "";
         dateCell.classList.add("calendar-date-cell-empty");
       } else if (date > numDaysInMonth) {
         // Show empty cell for days after the last day of the month
         dateCell.innerText = "";
         dateCell.classList.add("calendar-date-cell-empty");
       } else {

        dateCell.innerText = date;

        if (date === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
          // Highlight the current date
          dateCell.classList.add("calendar-date-cell-current");
        }

        if(checkDateClickability(date, minDate) == true) {
          dateCell.addEventListener("click", (e) => updateDates(e, target));
        } else {
          dateCell.classList.add("calendar-date-unclickable");
        }
        
        date++;
      }

      weekRow.appendChild(dateCell);
    }
    datesContainer.appendChild(weekRow);
  }

}

const decreaseMonth = (target) => {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  updateCalendar(target);
}

const increaseMonth = (target) => {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  updateCalendar(target);
}

const renderCalendar = (target) => {

  inputField = document.getElementById(target);
  currentDate = target == "pickupDate" ? new Date(localStorage.getItem("start")) : new Date(localStorage.getItem("finish"));
  year = currentDate.getFullYear();
  month = currentDate.getMonth();

  // Init Calendar Header
  const headerContent = `
  <div class="previous hand"><<</div>
  <div>
      <span class="month"></span>
      <span width="20px"> </span>
      <span class="year"></span>
  </div>
  <div class="next hand">>></div>`

  document.querySelector(".calendar-header").innerHTML = headerContent;
  const prevMonthBTN = document.querySelector('.previous');
  prevMonthBTN.addEventListener('click', () => decreaseMonth(target));
  const nextMonthBTN = document.querySelector('.next');
  nextMonthBTN.addEventListener('click', () => increaseMonth(target));

  // Create the days of the week labels
  //const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dateLocalization[getLang()].weekdaysShort.forEach(dayOfWeek => {
    const dayOfWeekLabel = document.createElement("span");
    dayOfWeekLabel.innerText = dayOfWeek;
    document.querySelector('.calendar-days-of-week').appendChild(dayOfWeekLabel);
  });  

  // Update the calendar with the current date
  updateCalendar(target);
}

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return new Date(date.setHours(0, 0, 0, 0));
};

const initCalendar = () => {

  const minDateDefault = new Date().addDays(checkinOffsetDays);  
  const finishDateDefault = new Date(minDateDefault).addDays(offsetFinishDateDefault);

  //Store default start and finish date in local storage
  localStorage.setItem('start', minDateDefault);
  localStorage.setItem('minStart', minDateDefault);
  localStorage.setItem('finish', finishDateDefault);
  localStorage.setItem('minFinish', finishDateDefault);

  //Get DOM elements
  const calendarModal = document.querySelector('#calendar-modal');
  const calendar = document.querySelector('.calendar-container');
  const pickers = document.querySelectorAll('.picker');
  
  //Open Calendar
  pickers.forEach(item => item.addEventListener('click', e => {
    calendarModal.classList.toggle('active');
    calendar.classList.toggle('active');
    renderCalendar(e.target.id);
  }))

  //Close Calendar
  calendarModal.addEventListener('click', (e) => {
    closeCalendar();
  })

  //Avoid Propagation when calendar is clicked
  document.querySelector('.calendar-container').addEventListener('click', (e) => e.stopPropagation());

}

export default initCalendar;