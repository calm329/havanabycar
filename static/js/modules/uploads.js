import { showError } from "./feedbacks.js";
import { postPic } from "./httpCalls.js";
import { closeModal, openModal } from "./modals.js";

const uploadPdf = async () => {

    const feedback = document.querySelector('#pdfFeedback');
    const bookingId = document.querySelector('#bookingID').innerText.trim();
    const url = `/uploadPdf/${bookingId}`;

    try {

        const pdf = document.querySelector('#pdf').files[0];
        if(!pdf) throw Error("Cargar PDF");
        let formdata = new FormData();
        formdata.append('pdf', pdf);

        feedback.innerText = "Loading...";

        const res = await postPic(url, formdata);

        if(res.status == 200){
            return window.location.reload();
        } else if (res.status == 400) {
            throw Error("El Archivo No Es un PDF");
        } else if (res.status == 401){
            return window.location.href="/admin";
        } else {
            throw Error(`Error (${res.status})`);
        }

    } catch (error) {
        console.log(error);
        const errorMSG = error.message ? error.message : "Error";
        feedback.innerText = errorMSG;
    }
}

const uploadPayment = async () => {

    const feedback = document.querySelector('.evidenceFeedback');
    const bookingId = document.querySelector('#bookingID').innerText.trim();
    const url = `/uploadEvidence/${bookingId}`;

    try {

        const evidence = document.querySelector('#evidence').files[0];
        if(!evidence) throw Error("Upload Photo");

        const fileSize = evidence.size; // File size in bytes

        // Convert file size to MB
        const fileSizeInMB = fileSize / (1024 * 1024);

        if(fileSizeInMB > 5) {
            const errorMSG = window.location.href.includes("/ENG/") ? "Image Too Large (MAX 5MB)" : "Imagen Demasiado Grande (MAX 5MB)";
            throw Error(errorMSG);
        }

        let formdata = new FormData();
        formdata.append('evidence', evidence);

        //Show Loader
        openModal("loader");

        const res = await postPic(url, formdata);

        if(res.status == 200){
            const destination = window.location.href.includes("/ENG/") ? "/ENG/pay-success/" + bookingId : "/pago-exito/" + bookingId;
            return window.location.replace(destination);
        } else if (res.status == 400) {
            const errorMSG = window.location.href.includes("/ENG/") ? "Wrong File Type (only JPG, JPEG, PNG, GIF and PDF)" : "Archivo No Soportado (solo JPG, JPEG, PNG, GIF and PDF)";
            throw Error(errorMSG);
        } else {
            throw Error(`Error (${res.status})`);
        }

    } catch (error) {
        console.log("CATCH ERROR: ",error);
        closeModal("loader");
        const errorMSG = error.message ? error.message : "Error";
        feedback.innerText = errorMSG;
    }
}

export {uploadPdf, uploadPayment} ;