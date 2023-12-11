const searchBooking = () => {
    let query = document.querySelector('#searchField').value;
    if(query == "") query = "ALL";
    const url = "/bookings/" + query;
    window.location.href = url;
}

export default searchBooking;