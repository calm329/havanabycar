import getLang from "./language.js";

const makeSuccessBookingLink = () => {
    const linkPortal = document.querySelector("#linkPortal");
    const bookingID = document.querySelector("#bookingID").innerText;;
    const baseURL = getLang() == "ENG" ? "/ENG/booking/" : "/booking/";
    const link = baseURL + bookingID;
    linkPortal.href = link; 
}

export default makeSuccessBookingLink;