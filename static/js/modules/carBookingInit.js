import post from "./httpCalls.js";
import translation from "./translations.js";
import { showError } from "./feedbacks.js";
import { closeModal, openModal } from "./modals.js";
import getLang from "./language.js";

let startPrice = 0;

let newBooking = {
    paymentMethod: "bankPay",
    lateReturn: false,
    secondDriver: false,
};

const compileBookingObj = () => {

    try {
        //Get User Inputs
        const pickupOffice = document.querySelector('#pickupOffice').value;
        const dropoffOffice = document.querySelector('#dropoffOffice').value;
        const pickupTime = document.querySelector('#pickupTime').value;
        const dropoffTime = document.querySelector('#dropoffTime').value;
        const name = document.querySelector('#name').value;
        const surname = document.querySelector('#surname').value;
        const email = document.querySelector('#mail').value;
        const phone = document.querySelector('#phone').value;
        const passport = document.querySelector('#passport').value;
        const country = document.querySelector('#nationality').value;
        const day = document.querySelector('#day').value;
        const month = document.querySelector('#month').value;
        const year = document.querySelector('#year').value;

        //Make sure no input is empty
        const formFields = [
            pickupOffice, dropoffOffice, pickupTime, dropoffTime,
            name, surname, email, phone, passport, country, day, month, year
        ];

        formFields.forEach(item => {
            if(!item || item == "") throw Error(translation[getLang()].emptyFieldsError);
        });

        //Driver Data
        const driver = {
            country,
            email,
            birth: `${day} ${month} ${year}`,
            name,
            surname,
            phone,
            passport
        };

        //Arrangements
        const search = JSON.parse(localStorage.getItem('search'));

        const arrangement = {
            startString: search.startString,
            finishString: search.finishString,
            city: search.city,
            dropoffCity: search.cityOff,
            pickOffice: pickupOffice,
            dropoffOffice: dropoffOffice,
            pickupTime: pickupTime,
            dropoffTime: dropoffTime,
        }

        newBooking.language = getLang();
        newBooking.driver = driver;
        newBooking.arrangement = arrangement;

        //Handle Currency
        const currency = localStorage.getItem("currency");
        newBooking.currency = JSON.parse(currency).currency;

        if(isLate(pickupTime, dropoffTime)) {
            document.querySelector('#returnDeadLine').innerText = pickupTime;
            return openModal("extraDayModal");
        }

        book();

    }catch(error) {
        console.log(error);
        const errorMSG = error.message ? error.message : "Error";
        showError(errorMSG);
    }

}

const addExtraDay = () => {
    newBooking.lateReturn = true;
    closeModal('extraDayModal');
    book();
}

const book = async () => {

    //Get Car to be booked to build URL
    const slug = document.querySelector('#carSlug').innerText;
    const url = `/newCarOrder/${slug}`;

    try {

        openModal("loader");
        const res = await post(url, newBooking);
        
        if(res.status == 200) {
            const data = await res.json();
            if(data.error && data.error != "") {
                const errorMSG = translation[getLang()][data.error];
                throw Error(errorMSG);
            }
            window.location.href=data.url;
        } else {
            throw Error(`Error (${res.status})`);
        }
        
    } catch (error) {
        console.log(error);
        const errorMSG = error.message ? error.message : "Error";
        showError(errorMSG);
    }
}

const isLate = (start, finish) => {
    const newDate = new Date("1 Jan 2023");
    const pickup = newDate.setHours(start.split(':')[0], start.split(':')[1], 0);
    const dropoff = newDate.setHours(finish.split(':')[0], finish.split(':')[1], 0);
    return dropoff > pickup;
}

const calculate = () => {
    const finalPrices = document.querySelectorAll('.finPrice');
    let updatedPrice = newBooking.secondDriver == true ? startPrice + 35 : startPrice;
    if(newBooking.paymentMethod == 'btcPay') updatedPrice = Math.round((updatedPrice / 100) * 90);
    if(newBooking.paymentMethod == 'zellePay') updatedPrice = Math.round((updatedPrice / 100) * 95);
    if(newBooking.paymentMethod == 'creditCardPay') updatedPrice = Math.round((updatedPrice / 100) * 110);
    finalPrices.forEach(item=> item.innerText = updatedPrice);
}

window.selectPayment = (method) => {
    newBooking.paymentMethod = method;
    const methods = document.querySelectorAll(".option-pay i");
    methods.forEach(item => item.classList.remove('active'));
    document.getElementById(method).classList.add('active');
    calculate();
}

const handleSecondDriver = () => {
    const driver2Check = document.querySelector('.option-driver i');
    newBooking.secondDriver = !newBooking.secondDriver;
    driver2Check.classList.toggle('active');
    calculate();
}

const carBookingInit = () => {
    const driver2 = document.querySelector('.option-driver');
    driver2.addEventListener('click', () => handleSecondDriver());
    const bookingTrigger = document.querySelector('#bookingTrigger');
    bookingTrigger.addEventListener('click', () => compileBookingObj());
    startPrice = Number(document.querySelector('.finPrice').innerText);
    const closeModalIcon = document.querySelector('.extraDay-content .fa-times');
    closeModalIcon.addEventListener('click', () => closeModal('extraDayModal'));
    const extraDayAction =  document.querySelector('#extraday-action');
    extraDayAction.addEventListener('click', () => addExtraDay());
}

export default carBookingInit;