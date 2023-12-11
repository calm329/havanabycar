import post from './httpCalls.js';

let vendor;
let car_transmission;

const setVendor = (e) => {
    const vendors = document.querySelectorAll('.vendor-pill');
    vendors.forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');
    vendor = e.target.innerText;
};

const setTransmission = (e) => {
    const transmissions = document.querySelectorAll('.transmission-pill');
    transmissions.forEach(item => item.classList.remove('active'));
    e.target.classList.add('active');
    car_transmission = e.target.innerText;
};

const addNewCar = async (vendor, car_transmission) => {

    //Get feedback el in DOM and print Loader
    const feedback = document.querySelector('#newCarFeedback');
    feedback.innerText = "Loading...";

    try {

        //Get user's inputs
        const car_title = document.querySelector('#car_title').value;
        const car_type = document.querySelector('#car_type').value;
        const car_doors =  document.querySelector('#car_doors').value;
        const car_passengers =  document.querySelector('#car_passengers').value;
        const car_assicurazione = document.querySelector('#car_assicurazione').value;
        const minimo_giorni = document.querySelector('#minimo_giorni').value;
        const checkin_offset_days = document.querySelector('#checkin_offset_days').value;

        //Check user's inputs
        if(!vendor) return feedback.innerText = "Seleccionar Vendor";
        if(!car_transmission) return feedback.innerText = "Seleccionar Transmision";

        if(
            car_title == "" || 
            car_type == "" ||
            car_doors == "" ||
            car_passengers == "" ||
            car_assicurazione == "" ||
            minimo_giorni == "" ||
            checkin_offset_days == ""
        ) return feedback.innerText = "Formulario Incompleto";

        //Send data to the server
        const url = "/new-car";
        const vars = {
            vendor, car_type, car_title,
            car_assicurazione,
            car_transmission,
            car_doors,
            car_passengers,
            minimo_giorni,
            checkin_offset_days,
            gptDesc: "",
            gptDescEng: "",
            car_conditioner: true,
            car_deposito: 0,
            rivenditore: vendor + ".png",
            assicurazione_inclusa: true,
            only_havana: false,
            isBestPrice: false,
	        isActive: false,
            thumbnail_image: "",
            car_slug: car_title.replace(/ /g, '-').toLowerCase()
        };

        const res = await post(url, vars);

        if(res.status == 200) {
            document.querySelector('form').reset();
            return feedback.innerText = "Carro Agregado con Exito!"
        } else if(res.status == 401) {
            return window.location.href = "/admin";
        } else {
            return feedback.innerText = `Error (${res.status})`;
        }

    } catch (error) {
        console.log(error);
        feedback.innerText = "Error";
    }
}

export { addNewCar, setTransmission, setVendor, vendor, car_transmission } ;

