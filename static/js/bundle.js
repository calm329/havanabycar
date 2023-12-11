import { handleMenu } from "./modules/menu.js";
import { highlightField, handleSelect } from "./modules/formsUI.js";
import initCalendar from "./modules/calendar.js";
import { appear } from "./modules/animate.js";
import handleFlags from "./modules/flags.js";
import searchInit from "./modules/search.js";
import initFilter from "./modules/filter.js";
import initPolaroid from "./modules/polaroid.js";
import carBookingInit from "./modules/carBookingInit.js";
import summaryInit from "./modules/summaryInit.js";
import initAbout from "./modules/about.js";
import initHow from "./modules/how.js";
import voucherInit from "./modules/voucher.js";
import payInit from "./modules/pay.js";
import makeSuccessBookingLink from "./modules/success.js";
import { initCurrency } from "./modules/currency.js"

window.addEventListener('DOMContentLoaded', () => {

  const currentRoute = window.location.href;
  
  if (currentRoute.includes('about') || currentRoute.includes('quienes')){
    initAbout();
  } else if (currentRoute.includes('how-it') || currentRoute.includes('como-funciona')) {
    initHow();
  } else if (currentRoute.includes('carros-disponibles') || currentRoute.includes('available-cars')) {
    console.log('results');
  } else if (currentRoute.includes('/carro/') || currentRoute.includes('/car/')) {
    initPolaroid();
    carBookingInit();
  } else if(currentRoute.includes('/flota/') || currentRoute.includes('/fleet/')) {
    initPolaroid();
  }else if(currentRoute.includes('/resumen/') || currentRoute.includes('/summary/')) {
    summaryInit();
    voucherInit();
  }else if(currentRoute.includes('/pago/') || currentRoute.includes('/pay/') || currentRoute.includes('/paycc/')) {
    payInit();
  } else if (
    currentRoute.includes('/pago-exito/') || 
    currentRoute.includes('/pay-success/') ||
    currentRoute.includes('/refund-success/') ||
    currentRoute.includes('/rembolso-exito/')
  ) {
    makeSuccessBookingLink();
  }else {
    appear('#promo', '.promo', 800);
    appear('#prices', '.price', 800);
  }
  handleMenu();
  highlightField();
  handleSelect();
  initCalendar();
  handleFlags();
  searchInit();
  initFilter();
  initCurrency();
});
