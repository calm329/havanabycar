const fetch = require("node-fetch");

const btcXrate = async (currency) => {
    try {
        
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}`;
        
        const request = await fetch(url);
        
        if(request.status != 200) throw Error(`Error ${request.status}`)

        let ticker = await request.json();

        ticker = ticker.filter(coin => coin.id === 'bitcoin')

        return ticker[0].current_price;

    } catch (error) {
        console.log(error)
    }
}

module.exports = { btcXrate };