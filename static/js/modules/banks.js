import post from "./httpCalls.js";

const addNewBank = async () => {

    const feedback = document.querySelector("#newBankFeedback");
    feedback.innerText = "";
    const url = "/new-bank";

    try {

        const beneficiary = document.querySelector("#beneficiary").value;
        const bank = document.querySelector("#bank").value;
        const iban = document.querySelector("#iban").value;
        const bic = document.querySelector("#bic").value;
        const routing = document.querySelector("#routing").value;
        const address = document.querySelector("#address").value;

        if (bank == "" || iban == "" || bic == "" || address == "" || beneficiary == "") {
            return feedback.innerText = "Formulario Incompleto";
        }

        feedback.innerHTML = "Loading...";

        const vars = {
            bank, beneficiary, iban, bic, address, routing,
            isSelected: false,
            isSelectedForSpain: false,
            isSelectedForUs: false
        };

        const res = await post(url, vars);

        if (res.status == 200) return feedback.innerText = "Cuenta Bancaria Agregada!"

        if (res.status == 401) return window.location.href = "/admin";

        throw Error(res.status);

    } catch (error) {
        console.log(error);
        feedback.innerText = error.message ? error.message : "Error";
    }
}

export default addNewBank;