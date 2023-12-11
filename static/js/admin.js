import post from './modules/httpCalls.js';
import addNewSeason from './modules/seasons.js';
import addNewOffice from './modules/offices.js';
import addNewBank from './modules/banks.js';
import addNewRefund from './modules/refunds.js';
import newBono from './modules/bono.js';
import initLogin from './modules/auth.js';
import searchBooking from './modules/searchBooking.js';
import updateBooking from './modules/updateBooking.js';
import makeLink from "./modules/makeLink.js";
import { addNewCar, setVendor, setTransmission, vendor, car_transmission } from './modules/addNewCar.js';
import { cancelBooking, setReason } from './modules/cancelBooking.js';
import confirmBooking from './modules/confirmBooking.js';
import setBookingAsRefunded from './modules/setBookingAsRefunded.js';
import createVoucher from './modules/createVoucher.js';
import rejectCard from './modules/rejectCard.js';
import rejectRefund from './modules/rejectRefund.js';
import { uploadPdf, uploadPayment } from './modules/uploads.js';
import logout from "./modules/logout.js";

window.resetPaymentMethod = (paymentMethod, id) => {
    const vars = { paymentMethod };
    updateBooking(id, vars);
}

window.setHonorability = (id) => {
    const honorability = document.querySelector('#honorabilityCheck').classList.contains('active');
    const vars = { isHonorable: honorability };
    updateBooking(id, vars);
}

window.deletePdf = async (id) => {
    try {
        const url = `/deletePdf/${id}`;
        const res = await post(url, {});
        if (res.status == 200) return window.location.reload();
        throw Error(`Error (${res.status})`);
    } catch (error) {
        console.log(error);
    }
}

window.setBank = async (id) => {
    const url = `/set-bank/${id}`;
    try {

        const vars = {
            prop: ""
        };

        if (window.location.href.includes("/SPAIN")) {
            vars.prop = "isSelectedForSpain";
        } else if (window.location.href.includes("/US")) {
            vars.prop = "isSelectedForUs";
        } else {
            vars.prop = "isSelected";
        }

        const res = await post(url, vars);
        if (res.status == 200) {
            const els = document.querySelectorAll('.single-booking');
            els.forEach(el => el.classList.remove("bank-account-selected"));
            document.getElementById(id).classList.add("bank-account-selected");
        } else if (res.status == 401) {
            return window.location.href = "/admin";
        } else {
            throw Error(`Error (${res.status})`);
        }
    } catch (error) {
        console.log(error);
    }
}

window.setAsCover = async (id, img, index) => {

    const vars = { thumbnail_image: img };
    const url = `/car-edit/${id}`;
    try {
        const res = await post(url, vars);
        if (res.status == 200) {
            const allCtr = document.querySelectorAll('p.pics');
            allCtr.forEach(item => item.classList.remove('selected'));
            const newCtrSelected = document.querySelector(`.${index}`);
            newCtrSelected.classList.add('selected');
        } else if (res.status == 401) {
            return window.location.href = "/admin";
        } else if (res.status == 404) {
            throw Error(`El Carro No Existe`);
        } else {
            throw Error(`Error ${res.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

window.carSwitch = async (nextState, id, car) => {
    const switches = document.querySelectorAll(`.${car}`);
    const vars = { isActive: nextState };
    const url = `/car-edit/${id}`;
    try {
        const res = await post(url, vars);
        if (res.status == 200) {
            return switches.forEach(item => item.classList.toggle('hidden'));
        } else if (res.status == 401) {
            return window.location.href = "/admin";
        } else if (res.status == 404) {
            throw Error(`El Carro No Existe`);
        } else {
            throw Error(`Error ${res.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

window.updateCar = async (props, id, feedback) => {
    document.getElementById(feedback).innerText = "Loading...";
    const url = `/car-edit/${id}`;
    const vars = {};
    props.forEach(prop => {
        const value = document.getElementById(prop).value;
        vars[prop] = value;
    })

    try {
        const res = await post(url, vars);
        if (res.status == 200) {
            return document.getElementById(feedback).innerText = "Success!";
        } else if (res.status == 401) {
            return window.location.href = "/admin";
        } else if (res.status == 404) {
            throw Error(`El Carro No Existe`);
        } else {
            throw Error(`Error ${res.status}`);
        }
    } catch (error) {
        console.log(error);
        document.getElementById(feedback).innerText = error.message ? error.message : "Error";
    }
}

window.deleteRecord = async (id, url) => {
    try {
        const vars = { id };
        const res = await post(url, vars);
        if (res.status == 200) {
            return document.getElementById(id).classList.toggle('hidden');
        } else {
            throw Error(`Error ${res.status}`);
        }

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const logoutBTN = document.querySelector('.logout-btn');
    if (logoutBTN) {
        logoutBTN.addEventListener("click", () => logout());
    }

    if (window.location.href.includes('admin')) {
        initLogin();
    } else if (window.location.href.includes('/cancelBooking/')) {
        const cancelTrigger = document.querySelector('#cancelTrigger');
        cancelTrigger.addEventListener('click', () => cancelBooking());
        const reasons = document.querySelectorAll('.reason-pill');
        reasons.forEach(item => item.addEventListener('click', (e) => setReason(e)));
    } else if (window.location.href.includes('bookingsPaid') || window.location.href.includes('/newCards')) {
        document.querySelector('#paid').style.color = "red";
    } else if (window.location.href.includes('/banks')) {
        if (window.location.href.includes('/ALL')) {
            document.querySelector('#all').style.color = "red";
        }
        if (window.location.href.includes('/SPAIN')) {
            document.querySelector('#spain').style.color = "red";
        }
        if (window.location.href.includes('/US')) {
            document.querySelector('#us').style.color = "red";
        }
    } else if (window.location.href.includes('bookings') || window.location.href.includes('/cards')) {
        document.querySelector('#todas').style.color = "red";
        const searchTrigger = document.querySelector("#searchTrigger");
        if (searchTrigger) searchTrigger.addEventListener("click", () => searchBooking());
    } else if (window.location.href.includes('/booking/')) {
        const honorability = document.querySelector('#honorability');
        const confirmationTrigger = document.querySelector('#confirmationTrigger');
        const refundedTrigger = document.querySelector('#refundedTrigger');
        const pdf = document.querySelector('#pdf');
        const evidence = document.querySelector('#evidence');
        const voucherCreationBTN = document.querySelector("#createAutoPDF");
        const rejectCardBTN = document.querySelector("#rejectCardBTN");
        const rejectRefundBTN = document.querySelector("#refundRejected");

        if (honorability) {
            honorability.addEventListener('click', () => {
                const honorabilityCheck = document.querySelector('#honorabilityCheck');
                honorabilityCheck.classList.toggle('active');
            })
        }

        if (rejectRefundBTN) {
            rejectRefundBTN.addEventListener('click', () => rejectRefund());
        }

        if (confirmationTrigger) {
            confirmationTrigger.addEventListener('click', () => confirmBooking());
        }
        if (refundedTrigger) {
            refundedTrigger.addEventListener('click', () => setBookingAsRefunded());
        }
        if (pdf) {
            pdf.addEventListener('change', () => uploadPdf());
        }
        if (voucherCreationBTN) {
            voucherCreationBTN.addEventListener('click', () => createVoucher());
        }
        if (evidence) {
            evidence.addEventListener('change', () => uploadPayment());
        }
        if (rejectCardBTN) {
            rejectCardBTN.addEventListener("click", () => rejectCard());
        }
    } else if (window.location.href.includes('/new-bono')) {
        const newBonoTrigger = document.querySelector('#newBonoTrigger');
        newBonoTrigger.addEventListener('click', () => newBono());
    } else if (window.location.href.includes('/new-car')) {
        const newCarTrigger = document.querySelector('#newCarTrigger');
        newCarTrigger.addEventListener('click', () => addNewCar(vendor, car_transmission));
        const vendors = document.querySelectorAll('.vendor-pill');
        vendors.forEach(item => item.addEventListener('click', (e) => setVendor(e)));
        const transmissions = document.querySelectorAll('.transmission-pill');
        transmissions.forEach(item => item.addEventListener('click', (e) => setTransmission(e)))
    } else if (window.location.href.includes('/new-season')) {
        const newSeasonTrigger = document.querySelector('#newSeasonTrigger');
        newSeasonTrigger.addEventListener('click', () => addNewSeason());
    } else if (window.location.href.includes('/new-bank')) {
        const newBankTrigger = document.querySelector('#newBankTrigger');
        newBankTrigger.addEventListener('click', () => addNewBank());
    } else if (window.location.href.includes('/new-refund') || window.location.href.includes('/nueva-devolucion')) {
        const newRefundTrigger = document.querySelector('#newRefundTrigger');
        newRefundTrigger.addEventListener('click', () => addNewRefund());
    } else if (window.location.href.includes('/new-office')) {
        const newOfficeTrigger = document.querySelector('#newOfficeTrigger');
        newOfficeTrigger.addEventListener('click', () => addNewOffice(vendor));
        const vendors = document.querySelectorAll('.vendor-pill');
        vendors.forEach(item => item.addEventListener('click', (e) => setVendor(e)));
    } else if (window.location.href.includes('/new-link')) {
        const newLinkTrigger = document.querySelector('#newLinkTrigger');
        newLinkTrigger.addEventListener('click', () => makeLink());
    } else {
        return;
    }
})