//ATLAS
const connection = "mongodb+srv://gemini_boss:n0wayback@cluster0.ezft9vd.mongodb.net/gemini?retryWrites=true"

const secret = "clhjnyc74867nc763";
const encryptionSecret = 'SUPER-NOVA-2023-FUCK-US-ZZZZZZZZ';

const email = {
    user: 'info@havanabycar.co',
    password: 'Saimon80!'
}
/*
const email = {
    user: 'info@drive2cuba.com',
    password: 'Saimon80!'
}
*/
const auth = {
    user: "Gemini",
    pw: "gemini-2023"
}


const jwtSecret = "3208zxcaaaap40ttdvnd34ujfdkfk84";

const aggressiveMultiplier = 0.6;

const adjustUp = (price, vendor) => {
    //return price;
    if(vendor.toLowerCase() != "via") return price;
    const viaPrice = Math.round((price / 100) * 114);
    return viaPrice;
}

module.exports = { encryptionSecret, jwtSecret, auth, email, secret, connection, aggressiveMultiplier, adjustUp };
