import post from "./httpCalls.js"

const addNewOffice = async (vendor) => {

    const feedbacks = document.querySelector('#newOfficeFeedback')
    const url = "/new-office";

    try {

        feedbacks.innerText = "Loading...";
        const ufficio = document.querySelector('#ufficio').value;
        const citta = document.querySelector('#citta').value;

        if(ufficio == "" || citta == "") throw Error("Formulario Incompleto");

        if(vendor == "") {
            vendor = "ALL";
        }

        const vars = {
            ufficio, citta, 
            azienda: vendor,
            min_hour: '00:00',
	        max_hour: '24:00',
	        indirizzo: '',
            onlyHavana: false,
            telefono: '',
            sundayClosed: false,
            saturdayHalf: false
        }

        const res = await post(url, vars);

        if(res.status == 200) {
            feedbacks.innerText = "Oficina Agregada";
            return document.querySelector('form').reset();
        } 

        throw Error(`Error (${res.status})`);

    } catch (error) {
        console.log(error);
        feedbacks.innerText = error.message ? error.message : "Error";
    }
}

export default addNewOffice;