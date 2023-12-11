const months = [
    { es: "Enero", eng: "January" },
    { es: "Febrero", eng: "February" },
    { es: "Marzo", eng: "March" },
    { es: "Abril", eng: "April" },
    { es: "Mayo", eng: "May" },
    { es: "Junio", eng: "June" },
    { es: "Julio", eng: "July" },
    { es: "Agosto", eng: "August" },
    { es: "Septiembre", eng: "September" },
    { es: "Octubre", eng: "October" },
    { es: "Noviembre", eng: "November" },
    { es: "Diciembre", eng: "December" }
];

const standardizeDate = d => {
    let cleanD = d;
    months.forEach(month => {
        if(d.includes(month.es)){
            cleanD = d.replace(month.es, month.eng);
        }
    });
    return new Date(cleanD);
}

const computeMS = (obj) => {
    const {startString, finishString} = obj;
    const startMS = standardizeDate(startString).getTime();
    const finishMS = standardizeDate(finishString).getTime();
    const diffMS = finishMS - startMS;
    const rentalTime = Math.round(diffMS / (3600 * 1000 * 24));
    return { startMS, finishMS, rentalTime };
}

module.exports = { standardizeDate, computeMS };