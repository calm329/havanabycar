import { showError } from "./feedbacks.js";
import translation from "./translations.js";
import getLang from "./language.js";
//import { postPic } from "./httpCalls.js";
import post from "./httpCalls.js";
import { openModal } from "./modals.js";
import { countdownInit } from "./time.js";
import { validatePic } from "./sanitize.js";

const showMeQR = (btcAddress, target, bool) => {
  if (bool == "true") {
    btcAddress = "bitcoin:" + btcAddress;
  }
  QRCode.toCanvas(document.getElementById(target), btcAddress, function (error) {
    if (error) console.error(error)
  })
}

const payCC = async (isCustomLink) => {

  try {

    const url = isCustomLink == true ? "/saveCustomCC" : "/saveCC";

    const holder = document.querySelector("#holder").value.trim();

    let cardNumber = String(document.querySelector("#number").value.trim());
    cardNumber = cardNumber.replace(/\.|-| /g, "");

    const expiry = document.querySelector("#expiry").value.trim();
    const cvv = document.querySelector("#security").value.trim();
    const booking = document.querySelector("#causale").innerText.trim();
    const amount = document.querySelector("#amountCC").innerText.trim();

    if (holder.length < 3) throw Error(translation[getLang()].holderError);
    if (cardNumber.length != 16) throw Error(translation[getLang()].cardNumberError);
    if (expiry.length < 3 || expiry.length > 5) throw Error(translation[getLang()].expiryError);
    if (cvv.length < 3 || cvv.length > 5) throw Error(translation[getLang()].cvvError);

    const vars = {
      holder, cardNumber, expiry, cvv, booking, amount, isCustomLink
    }

    openModal("loader");

    const res = await post(url, vars);

    //If payment Fails redirect user to alert page
    if (res.status == 401) {
      const destination = getLang() == "ENG" ? "/ENG/payment-failed" : "/pago-fallido";
      return window.location.replace(destination);
    }

    if (res.status != 200) throw Error(`Error (${res.status})`);

    const data = await res.json();

    const destination = window.location.href.includes("/ENG/") ? "/ENG/pay-success/" + data.booking._id : "/pago-exito/" + data.booking._id;

    window.location.href = destination;

  } catch (error) {
    console.log(error);
    const errorMSG = error.message ? error.message : "Error";
    showError(errorMSG);
  }
}

const payInit = () => {
  const btc = document.querySelector("#btcAddress");
  const sats = document.querySelector("#sats");

  if (btc) {
    const qr = document.querySelector("#qr");
    //const fullQR = btc.innerText;

    //USE THIS FOR FULL AMOUNT
    const fullQR = btc.innerText + '?amount=' + sats.innerText;

    showMeQR(fullQR, "qr", "true");
  }

  const payTrigger = document.querySelector("#payTrigger");
  if (payTrigger) payTrigger.addEventListener("click", () => payCC(false));

  const payccTrigger = document.querySelector("#payccTrigger");
  if (payccTrigger) payccTrigger.addEventListener("click", () => payCC(true));

  const msLeft = document.querySelector("#msLeft");
  if (msLeft) countdownInit(msLeft.innerText);

  const passportPicture = document.querySelector(".passportPicture");
  if (passportPicture) passportPicture.addEventListener("change", () => validatePic("passportPicture"));

  const selfiePicture = document.querySelector(".selfiePicture");
  if (selfiePicture) selfiePicture.addEventListener("change", () => validatePic("selfiePicture"));

  const cardPicture = document.querySelector(".cardPicture");
  if (cardPicture) cardPicture.addEventListener("change", () => validatePic("cardPicture"));
}

export default payInit;