import { closeModal, openModal } from "./modals.js";

const filterParams = {
    sort: "",
    filter: ""
}

const showFilterUi = () => {
    openModal("filterModal");
}

const filterResults = () => {
    const currentUrl = window.location.href.replace(/#/i, '');
    const urlBase = currentUrl.substring(0, currentUrl.length-8);
    const finalUrl = urlBase + filterParams.sort + "/" + filterParams.filter;
    window.location.href = finalUrl;
}

window.selectFilterOption = (val) => {
    filterParams.filter = val;
    const allFilterOptions = document.querySelectorAll('.filter-option i');
    allFilterOptions.forEach(el => el.classList.remove('active'));
    document.getElementById(val).classList.add('active');
}

window.selectSortOption = (val) => {
    filterParams.sort = val;
    const allSortOptions = document.querySelectorAll('.sort-option i');
    allSortOptions.forEach(el => el.classList.remove('active'));
    document.getElementById(val).classList.add('active');
} 

const getCurrentFilterParams = () => {
    const currentUrl = window.location.href;
    const options = ["ALL", "MAN", "AUT", "ASCE", "DESC"];
    options.forEach(item => {
        const termOfComparison = `/${item}`;
        if(currentUrl.includes(termOfComparison)) {
            document.getElementById(item).classList.add('active');
            const property = item.length == 3 ? "filter" : "sort";
            filterParams[property] = item;
        }
    })
}

const initFilter = () => {
    const filterTriggers = document.querySelectorAll('.filter-trigger');
    filterTriggers.forEach(item => {
        item.addEventListener('click', () => showFilterUi())
    })
    const filterActionBtn = document.querySelector('#filter-action');
    if(filterActionBtn) filterActionBtn.addEventListener('click', () => filterResults());

    const filterCloser = document.querySelector('.filter-content .fa-times');
    if(filterCloser) filterCloser.addEventListener('click', () => closeModal("filterModal"));

    getCurrentFilterParams();
}

export default initFilter;