import post from "./httpCalls.js";

const rejectRefund = async () => {
    try {
        const id = document.querySelector('#bookingID').innerText.trim();
        const url = "/refund-rejected";
        const vars = { id };
        //feedback.innerText = "Loading...";
        const res = await post(url, vars);
        if(res.status == 200) {
            window.scrollTo(0,0);
            return window.location.reload();
        } else if(res.status == 404) {
            throw Error("El Reembolso No Existe");
        }else if (res.status == 401) {
            return window.location.replace("/admin");
        } else {
            throw Error(`Error (${res.status})`);
        }
    } catch (error) {
        console.log(error);
    } 
}

export default rejectRefund;