const isFromSpain = mobileNumber => {

    if (!mobileNumber) return false;

    // Remove white spaces from the input
    const cleanedNumber = mobileNumber.replace(/\s/g, "");

    // Define a regular expression pattern for Spanish mobile numbers with international prefix
    const spanishMobilePattern = /^(\+34|0034)/;

    // Use the test method to check if the cleaned input starts with the pattern
    return spanishMobilePattern.test(cleanedNumber);
}

// A function that takes a phone number as a string and returns a boolean
const isFromUs = phoneNumber => {
    // Remove any non-digit characters from the phone number, except for '+' and '00'
    phoneNumber = phoneNumber.replace(/[^0-9+]/g, "");
    // Check if the phone number has a country code of 1, with or without a '+' or '00' prefix
    if (phoneNumber.startsWith("+1") || phoneNumber.startsWith("001") || phoneNumber.startsWith("1")) {
        // Remove the country code and any remaining non-digit characters
        phoneNumber = phoneNumber.replace(/^(\+|00)?1/, "").replace(/\D/g, "");
        // Check if the phone number has 10 digits
        if (phoneNumber.length === 10) {
            // Check if the phone number has a valid area code
            // Source: [List of North American Numbering Plan area codes]
            let areaCode = phoneNumber.slice(0, 3);
            let validAreaCodes = ["201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "212", "213", "214", "215", "216", "217", "218", "219", "220", "223", "224", "225", "226", "228", "229", "231", "234", "236", "239", "240", "242", "246", "248", "249", "250", "251", "252", "253", "254", "256", "260", "262", "264", "267", "268", "269", "270", "272", "274", "276", "279", "281", "284", "289", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "323", "325", "326", "327", "330", "331", "332", "334", "336", "337", "339", "340", "343", "346", "347", "351", "352", "360", "361", "364", "365", "367", "380", "385", "386", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "412", "413", "414", "415", "416", "417", "418", "419", "423", "424", "425", "430", "431", "432", "434", "435", "437", "438", "440", "441", "442", "443", "445", "447", "448", "450", "458", "463", "469", "470", "473", "475", "478", "479", "480", "484", "501", "502", "503", "504", "505", "506", "507", "508", "509", "510", "512", "513", "514", "515", "516", "517", "518", "519", "520", "530", "531", "534", "539", "540", "541", "548", "551", "559", "561", "562", "563", "564", "567", "570", "571", "573", "574", "575", "579", "580", "581", "582", "585", "586", "587", "601", "602", "603", "604", "605", "606", "607", "608", "609", "610", "612", "613", "614", "615", "616", "617", "618", "619", "620", "623", "626", "628", "629", "630", "631", "636", "639", "640", "641", "646", "647", "649", "650", "651", "657", "658", "659", "660", "661", "662", "664", "667", "669", "670", "671", "672", "678", "680", "681", "682", "684", "689", "701", "702", "703", "704", "705", "706", "707", "708", "709", "712", "713", "714", "715", "716", "717", "718", "719", "720", "721", "724", "725", "726", "727", "730", "731", "732", "734", "737", "740", "743", "747", "754", "757", "758", "760", "762", "763", "765", "767", "769", "770", "772", "773", "774", "775", "778", "779", "780", "781", "782", "784", "785", "786", "787", "801", "802", "803", "804", "805", "806", "807", "808", "809", "810", "812", "813", "814", "815", "816", "817", "818", "819", "820", "825", "828", "829", "830", "831", "832", "833", "838", "839", "840", "843", "845", "847", "848", "849", "850", "854", "856", "857", "858", "859", "860", "862", "863", "864", "865", "867", "868", "869", "870", "872", "873", "876", "878", "879", "901", "902", "903", "904", "905", "906", "907", "908", "909", "910", "912", "913", "914", "915", "916", "917", "918", "919", "920", "925", "928", "929", "930", "931", "934", "936", "937", "938", "939", "940", "941", "947", "949", "951", "952", "954", "956", "959", "970", "971", "972", "973", "978", "979", "980", "984", "985", "986", "989"];
            if (validAreaCodes.includes(areaCode)) {
                return true;
            }
        }
    }
    // Return false if the phone number is not valid
    return false;
}

const makeBankQueryFromPhone = (phone) => {
    if (isFromSpain(phone) == true) {
        return { isSelectedForSpain: true };
    } else if (isFromUs(phone) == true) {
        return { isSelectedForUs: true };
    } else {
        return { isSelected: true };
    }
};

module.exports = { makeBankQueryFromPhone };