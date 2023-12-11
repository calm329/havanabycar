import post from "./httpCalls.js";

const updateBooking = async (id, vars) => {
    try {
        const url = `/booking-edit/${id}`;
        const res = await post(url, vars);
        if(res.status == 200) {
            window.scrollTo(0,0);
            return window.location.reload();
        } else if (res.status == 401) {
            return window.location.href = "/admin";
        } else if (res.status == 404) {
            throw Error(`El Booking No Existe`);
        }else {
            throw Error(`Error ${res.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

export default updateBooking;