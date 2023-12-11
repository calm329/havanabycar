import post from "./httpCalls.js";
import translation from "./translations.js";
import { closeModal, openModal } from "./modals.js";
import getLang from "./language.js";
import { showError } from "./feedbacks.js";

const useVoucher = async () => {

  const bookingId = document.querySelector('#bookingId').innerText.trim();
  const code = document.querySelector('#code').value.trim();
  if(code == "") return false;
  const url = "/useVoucher";
  const vars = { code, bookingId };

  try {
    openModal("loader");
    const res = await post(url, vars);
    if(res.status == 200) {
      const data = await res.json();
      document.querySelector('#crossedPrice').classList.remove('hidden');
      document.querySelector('#voucherOff').classList.remove('hidden');
      document.querySelector('#voucherAmount').innerText = data.size;
      const finPrices = document.querySelectorAll('.finPrice');
      finPrices.forEach(item => item.innerText = data.finPrice);
      closeModal("loader");
    } else if (res.status == 404) {
      throw Error(translation[getLang()].wrongVoucher);
    } else {
      throw Error(`Error (${res.status})`);
    }
  } catch (error) {
    console.log(error);
    const errorMSG = error.message ? error.message : "Error";
    showError(errorMSG);
  }
}

const voucherInit = () => {
  const voucherTrigger = document.querySelector('#voucherTrigger');
  voucherTrigger.addEventListener('click', () => useVoucher());
}

export default voucherInit;