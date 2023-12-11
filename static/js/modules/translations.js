import { checkinOffsetDays, offsetFinishDateDefault } from './config.js';

const translation = {
    ES: {
        datesMissing: "Especificar Fechas",
        locationsMissing: "Especificar Lugares",
        minCheckin: "Fecha de Recogida: no antes de " + checkinOffsetDays + " dias",
        minLength: "Duracion Minima de la reserva: " + offsetFinishDateDefault + " dias",
        wrongDates: "Fechas Incorrectas",
        availableCarsUrl: "/carros-disponibles/",
        emptyFieldsError: "El Formulario No Es Completo",
        wrongDriver: "Datos del Conductor Incorrectos",
        wrongEmail: "Correo Incorrecto",
        wrongPhone: "Telefono Incorrecto",
        wrongAge: "Edad del Conductor: desde 21 hasta 80 años",
        dateSbagliate: "Fechas Incorrectas",
        wrongVoucher: "Codigo Incorrecto",
        holderError: "Titular de la Tarjeta Incorrecto",
        cardNumberError: "Numero de Tarjeta Incorrecto",
        cvvError: "Codigo CVV incorrecto. Revise el lado posterior de la Tarjeta",
        expiryError: "Fecha de Caducidad Incorrecta",
        missingDocs: "Cargar Todos Los Documentos Requiridos",
        uploadGuide: "Cargar solo JPEG, JPG, PNG",
        uploadMaxSize: "Tamaño Maximo del Archivo: 5MB",
        ccPaymentFailed: "Transaccion Fallida. Revise su Correo"
    },
    ENG: {
        datesMissing: "Dates Missing",
        locationsMissing: "Locations Missing",
        minCheckin: "Minimum Pickup Date: in " + checkinOffsetDays + " days",
        minLength: "Minimum Rental Duration: " + offsetFinishDateDefault + " days",
        wrongDates: "Wrong Dates",
        availableCarsUrl: "/ENG/available-cars/",
        emptyFieldsError: "Form is Not Complete",
        wrongDriver: "Driver Data Incorrect",
        wrongEmail: "Email Incorrect",
        wrongPhone: "Phone Incorrect",
        wrongAge: "Driver's Age: from 21 to 80 years old",
        dateSbagliate: "Wrong Dates",
        wrongVoucher: "Wrong Code",
        holderError: "Card Holder Incorrect",
        cardNumberError: "Card Number Incorrect",
        cvvError: "CVV Incorrect. Please Check the Back of Your Card",
        expiryError: "Expiry Date Incorrect",
        missingDocs: "Please Upload All Required Files",
        uploadGuide: "Upload Only JPG, JPEG and PNG",
        uploadMaxSize: "Max File Size: 5MB",
        ccPaymentFailed: "Transaction Failed. Check Your Email"
    }
}

export default translation;