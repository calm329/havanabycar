import filterResults from "./filter.js";

const highlightField = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        //ONFOCUS
        input.addEventListener('focus', (e) => {
            const labels = document.querySelectorAll('label');
            labels.forEach(item => {
                if (item.attributes.for.nodeValue == e.target.id) {
                    item.classList.add('active');
                } 
            })
        })
        
        //ONUNFOCUS
        input.addEventListener('blur', (e) => {
            const labels = document.querySelectorAll('label');
            labels.forEach(item => {
                const id = item.attributes.for.nodeValue;
                if(document.getElementById(id).value.length < 1){
                    item.classList.remove('active');
                }
            });

            const icons = document.querySelectorAll('.input-box i');
            icons.forEach(item => {
                const id = item.dataset.field;
                if (document.getElementById(id).value.length > 0) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            })

        })

    })
}

const showSelect = (id) => {
    document.getElementById(id).classList.toggle('hidden');
}

const handleSelect = () => {

    //FILTER FORM
    const resultsFilter = document.querySelector('#filterOptions');
    if(resultsFilter) {
        resultsFilter.addEventListener('click', () => showSelect('filterSelect'));
    }

    //SEARCH FORM
    const pickup = document.querySelector('#pickupCity');
    const dropoffCity = document.querySelector('#dropoffCity');
    if(pickup) pickup.addEventListener('click', () => showSelect('pickupSelect'));
    if(dropoffCity) dropoffCity.addEventListener('click', () => showSelect('dropoffSelect'));
    
    //BOOKING FORM
    const pickupOffice = document.querySelector('#pickupOffice');
    const dropoffOffice = document.querySelector('#dropoffOffice');
    if(pickupOffice) pickupOffice.addEventListener('click', () => showSelect('pickupOfficeSelect'));
    if(dropoffOffice) dropoffOffice.addEventListener('click', () => showSelect('dropoffOfficeSelect'));
    const pickupTime = document.querySelector('#pickupTime');
    const dropoffTime = document.querySelector('#dropoffTime');
    if(pickupTime) pickupTime.addEventListener('click', () => showSelect('pickupTimeSelect'));
    if(dropoffTime) dropoffTime.addEventListener('click', () => showSelect('dropoffTimeSelect'));
    const pickCountry = document.querySelector('#nationality');
    if(pickCountry) pickCountry.addEventListener('click', () => showSelect('nationalitySelect'))
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    if(day) day.addEventListener('click', ()=> showSelect('daySelect'));
    if(month) month.addEventListener('click', ()=> showSelect('monthSelect'));
    if(year) year.addEventListener('click', ()=> showSelect('yearSelect'));

    const expiry = document.querySelector('#expiry');
    if(expiry) expiry.addEventListener("click", () => showSelect("expirySelect"));

    //HANDLE SELECTORS AND SELECTS
    const selects = document.querySelectorAll('.select');
    const selectors = document.querySelectorAll('.selector');
    selectors.forEach(item => item.addEventListener('blur', (e) => {
        setTimeout(() => selects.forEach(item => {
            if(e.target.id == item.dataset.target) {
                item.classList.add('hidden');
            }
        }), 200)
    }))

    //HANDLE OPTIONS
    const options = document.querySelectorAll('.select p');
    options.forEach(item => item.addEventListener('click', (e) => {
        const value = e.target.innerText;
        const target = e.target.parentElement.parentElement.dataset.target;
        document.getElementById(target).value = value;
        document.getElementById(target).focus();
        document.getElementById(target).blur();

        //Special Rule for Filter
        if(target == "filterOptions") filterResults(value);
        
    }))
}

export { highlightField, handleSelect, showSelect};