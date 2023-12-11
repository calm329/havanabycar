import { openModal } from "./modals.js";
import { showError } from "./feedbacks.js";
import translation from "./translations.js";
import getLang from "./language.js"
import { checkinOffsetDays, offsetFinishDateDefault, oneDayTimestamp } from './config.js';
import { whichCurrency } from "./currency.js";

const search = async (e) => {
  try {

    //Get UI elements
    const checkinDateField = document.querySelector("#pickupDate");
    const checkoutDateField = document.querySelector("#dropoffDate");
    const cityPickupField = document.querySelector("#pickupCity");
    const cityDropoffField = document.querySelector("#dropoffCity");

    //Get Values
    const pickupDate = checkinDateField.value;
    const dropoffDate = checkoutDateField.value;
    const pickupCity = cityPickupField.value;
    const dropoffCity = cityDropoffField.value;

    //Make sure values are not empty
    if(pickupDate == "" || dropoffDate == "") return showError(translation[getLang()].datesMissing);
    if(pickupCity == "" || dropoffCity == "") return showError(translation[getLang()].locationsMissing);

    //Make sure that pick up respects offset
    /*
    const now = new Date();
    const nowMidnight = now.setHours(0,0,0,0);
    const nowStart = new Date(nowMidnight).getTime();
    const minPickupDateMS = nowStart + oneDayTimestamp * checkinOffsetDays;
    if(pickupDateMS < minPickupDateMS) return showError(translation[getLang()].minCheckin);

    //Make sure that dropff respects the minimum length of the reservation
    const minDropoffDateMS = Number(pickupDateMS) + oneDayTimestamp * offsetFinishDateDefault;
    if(dropoffDateMS < minDropoffDateMS) return showError(translation[getLang()].minLength);

    //Compute rental duration
    const diffDateTimestamp = dropoffDateMS - pickupDateMS;
    */
   
    //Currency
    const currency = whichCurrency();

    //Save Search Data into localStorage
    const search = {
      startString: pickupDate,
      finishString: dropoffDate,
      city: pickupCity,
      cityOff: dropoffCity,
      currency: currency.currency
    };

    localStorage.setItem('search', JSON.stringify(search));

    //Go to search URL
    const url = translation[getLang()].availableCarsUrl + pickupCity + '/' + dropoffCity + '/' + pickupDate + '/'+ dropoffDate + '/' + currency.currency + "/ASCE/ALL"; //Fetch Request
    window.location.href = url;

  } catch (error) {
    console.log(error);
  }
}

const toggleMobSearch = () => {
  //Show and Hide Search Form
  const el = document.querySelector('.searchContainer');
  el.classList.toggle('active');
  //Show and hide search results
  const res = document.querySelector('.results-container');
  res.classList.toggle('hidden');
  //Hide and Show Triggers
  const triggers = document.querySelectorAll('.mobSearchToggle');
  triggers.forEach(item => item.classList.toggle('hidden'));
  const price = document.querySelector('.site-locator h1');
  if(price) price.classList.toggle('hidden');
}

const searchInit = () => {
  const searchBTN = document.querySelector('#searchBTN');
  if(searchBTN) searchBTN.addEventListener('click', (e) => search(e));
  const mobSearchTrigger = document.querySelector('#mobSearchTrigger');
  if(mobSearchTrigger) mobSearchTrigger.addEventListener('click', () => toggleMobSearch());
  const mobSearchCloserBTN = document.querySelector('#mobSearchCloserBTN');
  if(mobSearchCloserBTN) mobSearchCloserBTN.addEventListener('click', () => toggleMobSearch());
}

export default searchInit;