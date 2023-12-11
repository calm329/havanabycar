const generate6DigitString = () => {
    return Math.random().toString().slice(-6);
}

const pickBeneficiary = () => {
    /*
    const beneficiaries = ["CARIBE TRAVEL SL", "TRAVEL EASY SL", "CARIBE EASY SL"];
    const index = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    return beneficiaries[index];
    */
   return "ADV TRAVEL SERVICE LLC";
}

const tweekIban = (iban) => {
    if(iban.length < 11) return iban;
    if(iban.includes("00")){
        return iban.replace(/00/, "000");
    } else {
        return iban.substring(0, 10) + 'I' + iban.substring(10 + 1);
    }
}

module.exports = { generate6DigitString, pickBeneficiary, tweekIban };
  