import post from "./httpCalls.js";
import getLang from "./language.js";

const addNewRefund = async () => {

    try {

        const feedback = document.querySelector("#newBankFeedback");
        feedback.innerText = "";

        const splitUrl = window.location.href.split("/");
        const lastSplit = splitUrl.length - 1;
        const bookingId = splitUrl[lastSplit];

        const url = "/new-refund/" + bookingId;

        const beneficiary = document.querySelector("#beneficiary").value;
        const bank = document.querySelector("#bank").value;
        const iban = document.querySelector("#iban").value;
        const bic = document.querySelector("#bic").value;
        const address = document.querySelector("#address").value;

        if(bank == "" || iban == "" || bic == "" || address == "" || beneficiary == "") {
            const errorMSG = getLang() == "ENG" ? "Form Incomplete" : "Formulario Incompleto";
            throw Error(errorMSG);
        }

        feedback.innerHTML = "Loading...";

        const vars = { bank, beneficiary, iban, bic, address };
        
        const res = await post(url, vars);

        if(res.status != 200) throw Error("Error");

        const successUrl = getLang() == "ENG" ? '/ENG/refund-success/' + bookingId : '/rembolso-exito/' + bookingId;

        return window.location.href = successUrl;

    } catch (error) {
        console.log(error);
        feedback.innerText = error.message ? error.message : "Error";
    }
}

export default addNewRefund;