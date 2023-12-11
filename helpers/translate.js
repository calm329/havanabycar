const content = require('../data/content');

const text = (req, section, data) => {
    const lang = req.path.includes("/ENG/") ? "ENG" : "ES"; 
    const contents = content.text[lang][section];
    const footer = content.text[lang].footer;
    const nav = content.text[lang].nav;
    const cars = req.cars;
    const search = content.text[lang].search;
    
    const obj = { 
        contents, footer, nav, 
        lang, cars, req, search
    };
    
    //ADD data property to object if necessary
    if(data) obj.data = data;
    
    return obj;
}

module.exports = { text };