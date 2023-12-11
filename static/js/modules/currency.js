const setCurrency = (currency) => {

    let url = window.location.href;

    //Set new Currency Obj
    const currencyObj = {
        currency: currency,
        symbol: currency === "EUR" ? "€" : "$"
    };
    localStorage.setItem("currency", JSON.stringify(currencyObj));

    //Stop Execution if watching resumen
    if(url.includes("/summary/") || url.includes("/resumen/")) return false;

    if(url.includes("/fleet/") || url.includes("/flota/")) {
        if(url.includes("/USD")) url = url.replace(/USD/g, currency);
        if(url.includes("/EUR")) url = url.replace(/EUR/g, currency);
        return window.location.href = url;
    }

    //Reload Page if no currency param in URL
    if(!url.includes("USD") && !url.includes("EUR")) return window.location.reload();

    //Rewrite URL and navigate to it
    if(url.includes("/USD/")) url = url.replace(/USD/g, currency);
    if(url.includes("/EUR/")) url = url.replace(/EUR/g, currency);
    window.location.href = url;
};

const whichCurrency = () => {

    const currency = localStorage.getItem("currency");

    if(currency) return JSON.parse(currency);

    const currencyObj = {
        currency: "EUR",
        symbol: "€"
    };

    localStorage.setItem("currency", JSON.stringify(currencyObj));

    return currencyObj;
};

const useCurrency = (currency) => {
    const symbols = document.querySelectorAll(".currencySymbol");
    const currencies = document.querySelectorAll(".currencyString");
    symbols.forEach(item => item.innerText = currency.symbol);
    currencies.forEach(item => item.innerText = currency.currency);
}

const initCurrency = () => {
    
    const currency = whichCurrency();
    useCurrency(currency);

    //init currency switch controls
    const eurOptions = document.querySelectorAll('.eurOption');
    const usdOptions = document.querySelectorAll('.usdOption');
    eurOptions.forEach(item => {
        if(currency.currency == "EUR") item.classList.add("selected");
        item.addEventListener('click', () => setCurrency("EUR"))
    });
    usdOptions.forEach(item => {
        item.addEventListener('click', () => setCurrency("USD"));
        if(currency.currency == "USD") item.classList.add("selected");
    });

    const carsListLinks = document.querySelectorAll('.carslist a');
    carsListLinks.forEach(item => {
        let link = item.href + "/" + currency.currency;
        item.href = link;
    })
    const carsListMapLinks = document.querySelectorAll('.map-car-class a');
    carsListMapLinks.forEach(item => {
        let link = item.href + "/" + currency.currency;
        item.href = link;
    })

    const manualMinPrice = document.querySelector("#manualMinPrice");
    const automaticMinPrice = document.querySelector("#automaticMinPrice");

    if(manualMinPrice && automaticMinPrice) {
        manualMinPrice.innerText = currency.currency == "EUR" ? 53 : 60;
        automaticMinPrice.innerText = currency.currency == "EUR" ? 58 : 66;
    }

}

export { initCurrency, whichCurrency, setCurrency };