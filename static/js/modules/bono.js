import post from "./httpCalls.js";

const newBono = async () => {
    const feedback = document.querySelector('#newBonoFeedback');
    const url = "/new-bono";
    try {
        const size = document.querySelector('#size').value;
        if(size == "") return false;
        if(isNaN(size) || size < 1) throw Error("Insertar Valor del Coupon"); 
        feedback.innerText = "Loading...";
        const vars = { size };
        const res = await post(url, vars);
        if(res.status == 200) {
            feedback.innerText = "Coupon Creado";
            return document.querySelector('form').reset();
        } else if (res.status == 401) {
            return window.location.href = "/admin";
        } else {
            throw Error(`Error (${res.status})`);
        }
    } catch (error) {
        console.log(error);
        const errorMSG = error.message ? error.message : "Error";
        feedback.innerText = errorMSG;
    }
}

export default newBono;