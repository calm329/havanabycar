import post from "./httpCalls.js";

let reason = '';

const cancelBooking = async () => {
    const feedback = document.querySelector('#cancelFeedback');
    try {
        if(reason == '') return false;
        const id = document.querySelector('#id').innerText.trim();
        const url = `/booking-edit/${id}`;
        const vars = {
            cancelReason: reason.replace(/ /g, '').toLowerCase(), 
            state: "CANCELADO"
        };
        feedback.innerText= "Loading...";
        const res = await post(url, vars);
        if(res.status == 200) {
            return feedback.innerText= "Reserva Cancelada";
        } else if (res.status == 401) {
            return wondow.location.href = "/admin";
        } else if (res.status == 404) {
            throw Error("La Reserva No Existe");
        } else {
            throw Error(`Error (${res.status})`);
        }
    } catch (error) {
        console.log(error);
        feedback.innerText = error.message ? error.message : "Error";
    }
}

const setReason = (e) => {
    const reasons = document.querySelectorAll('.reason-pill');
    reasons.forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');
    reason = e.target.innerText;
    console.log(reason);
}

export { setReason, cancelBooking };