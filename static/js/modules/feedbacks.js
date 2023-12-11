import { closeModal } from "./modals.js";

const showError = msg => {
    const alert = document.querySelector('.warning');
    const alertMsg = document.querySelector('.warning span');
    closeModal("loader");
    alert.classList.add('visible');
    alertMsg.innerText = msg;
    setTimeout(()=> {
        alertMsg.innerText = '';
        alert.classList.remove('visible')
    }, 4000)
}

    
const showSuccess = msg => {
    const success = document.querySelector('.success');
    const successMsg = document.querySelector('.success span');
    closeModal("loader");
    success.classList.add('visible');
    successMsg.innerText = msg;
    setTimeout(()=> {
        successMsg.innerText = '';
        success.classList.remove('visible')
    }, 4000)
}

export { showError, showSuccess };