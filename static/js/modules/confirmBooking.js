import post from "./httpCalls.js";

const confirmBooking = async () => {
    const feedback = document.querySelector("#confirmationFeedback");
    try {
        const id = document.querySelector('#bookingID').innerText.trim();
        const url = `/booking-edit/${id}`;
        const vars = {
            state: "PAGADO"
        };
        feedback.innerText = "Loading...";
        const res = await post(url, vars);
        if(res.status == 200) {
            window.scrollTo(0,0);
            return window.location.reload();
        } else if(res.status == 400) {
            throw Error("Agregar PDF");
        }else if (res.status == 401) {
            return window.location.replace("/admin");
        } else {
            throw Error(`Error (${res.status})`);
        }
    } catch (error) {
        console.log(error);
        const errorMSG = error.message ? error.message : "Error";
        feedback.innerText = errorMSG;
    } 
}

export default confirmBooking;