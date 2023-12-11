import { showError } from "./feedbacks.js";
import post from "./httpCalls.js";
import { openModal } from "./modals.js";

const confirmBooking = async () => {
    try {
        openModal("loader");
        const id = document.querySelector('#bookingId').innerText;
        const url = `/carOrderGoesForward/${id}`;
        const res = await post(url, {});
        if(res.status == 200) {
            const destination = window.location.href.includes("/ENG/") ? "/ENG/success" : "/exito";
            return window.location.href = destination;
        } else {
            throw Error(`Error (${res.status})`);
        }
    } catch (error) {
        console.log(error);
        const errorMSG = error.message ? error.message : "Error";
        showError(errorMSG);
    }
};

const summaryInit = () => {
    const bookingTrigger = document.querySelector('#bookingTrigger');
    bookingTrigger.addEventListener('click', () => confirmBooking());
}

export default summaryInit;