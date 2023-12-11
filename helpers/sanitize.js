const checkEmail = (x) => {
    try {
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        //const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(regex.test(x) == false) throw Error(`Email Check Failed: ${x}`);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const checkMessage = (x) => {
    const reg = /^[^<>&£"}{]{1,500}$/i ;
	if (reg.test(x) == true){
		return true;
	}else {
        console.log("Errore Messaggio: ", x);
		return false;
	}
}

const checkProd = (x) => {
    if(x !== "Visto" && x !== "Assicurazione" && x !== "Visto+Assicurazione"){
        return false;
    }else{
        console.log("Errore Prodotto: ", x);
        return true;
    }
}

const checkDate = (x) => {
    const reg = /^[a-z\d -/]{8,25}$/
	if (reg.test(x) == true){
		return true;
	}else {
        console.log("Errore Data: ", x);
		return false;
	}
}

const checkBirth = (x) => {
    try {
        const now = new Date().getTime();
        const min = new Date(now - (1000 * 60 * 60 * 24 * 365 * 21));
        const max = new Date(now - (1000 * 60 * 60 * 24 * 365 * 80));
        if(x <= min && x > max) return true;
        throw Error();
    } catch (error) {
        console.log("Errore Compleanno: ", x);
        return false;
    }
}

const checkString = (x) => {
    const reg = /^[^<>&£"$\.,;:}{0-9]{2,50}$/i ;
	if(reg.test(x) == true){
		return true;
	}else{
        console.log("Errore Stringa: ", x);
		return false;
	}
}

const checkPassportNumber = (x) => {
    const reg = /^[^<>&£"$\.,;:}{]{2,30}$/i;
	if(reg.test(x) == true){
		return true;
	}else{
        console.log("Errore Passport: ", x);
		return false;
	}
}

const checkPhone = (x) => {
    const reg = /^[0-9 +]{8,20}$/
	if(reg.test(x) == true){
		return true;
	}else{
        console.log("errore telefono: ", x);
		return false;
	}
}

const checkTime = (x) => {
    const reg = /^[0-9:]{4,6}$/
	if(reg.test(x) == true){
		return true;
	}else{
        console.log("Errore Tempo: ", x);
		return false;
	}
}

const checkAddress = (x) => {
    const reg = /^[^<>&£$"}{]{1,200}$/i ;
    if(reg.test(x) == true){
        return true;
    }else{
        console.log("Errore Indirizzo: ", x);
        return false;
    }
}

const checkCountry = (x) => {
    if(x == "null"){
        return false;
    }else{
        console.log("Errore Paese: ", x);
        return true;
    }
}

const whichShipping = (obj) => {
    let type = 'mail';
    obj.forEach(item => {
        if(item.prodType.includes('Visto')){
            type = 'post';
        }
    })
    return type;
}

const checkShipping = (obj, type) => {
    let state = true;
    if(type == 'post'){
        if(obj.name && obj.surname && obj.email && obj.città && obj.indirizzo && obj.cap && obj.provincia && obj.country){
            if( checkString(obj.name) == false ||
                checkString(obj.surname) == false ||
                checkCountry(obj.country) == false ||
                checkString(obj.città) == false ||
                checkEmail(obj.email) == false ||
                checkAddress(obj.indirizzo) == false ||
                checkAddress(obj.cap) == false ||
                checkAddress(obj.provincia) == false
                ){state = false}
        }else{
            console.log("Errore Shipping (POST): ", obj);
            return false;
        }
    }else{
        if(obj.name && obj.surname && obj.email && obj.country){
            if( checkString(obj.name) == false ||
                checkString(obj.surname) == false ||
                checkCountry(obj.country) == false ||
                checkEmail(obj.email) == false
                ){state = false}
        }else{
            console.log("Errore Shipping (mail): ", obj);
            return false;
        }
    }
    
    return state;
};

const checkPassport = nationality => {
    const forbiddenCountries = ['Afghanistan', 'Bangladesh', 'Cameroon', 'Eritrea', 'Ethiopia', 'Ghana', 'Guinea', 'India', 'Iran', 'Iraq', 'Kenia', 'Nepal', 'Nigeria', 'Pakistan', 'Phillipines', 'Sierra Leone', 'Uzbekistan', 'Somalia', 'Sri Lanka', 'Syria', 'Yemen'];
    if(forbiddenCountries.indexOf(nationality) >= 0){
        console.log("Error Passport: ", nationality);
        return nationality;
    }else{
        return 'OK';
    }
}

const checkPax = (pax) => {
    let state = true;
    if(pax.name && pax.surname && pax.birth && pax.nationality && pax.passport){
        if(checkString(pax.name) == false || checkString(pax.surname) == false || checkCountry(pax.nationality) == false || checkAddress(pax.passport) == false || checkDate(pax.birth) == false){
            state = false;
        }
    }else{
        console.log("Error Passenger: ", pax);
        return false;
    }
    return state;
}

exports.checkBirth = checkBirth;
exports.checkTime = checkTime;
exports.checkAddress = checkAddress;
exports.checkEmail = checkEmail;
exports.checkProd = checkProd;
exports.checkString = checkString;
exports.checkDate = checkDate;
exports.checkShipping = checkShipping;
exports.checkPax = checkPax;
exports.checkPassport = checkPassport;
exports.whichShipping = whichShipping;
exports.checkMessage = checkMessage;
exports.checkPhone = checkPhone;
exports.checkPassportNumber = checkPassportNumber;
