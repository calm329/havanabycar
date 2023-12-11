const makeDeadLine = (d, lang) => {
    const dias = {
        ES: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
        ENG: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    };
    const preposition = lang == "ENG" ? "at" : "a las"
    const pasado = Number(d) + (1000 * 60 * 60 * 48);
    const pasadoString = new Date(pasado);
    const day = pasadoString.getDay();
    const month = pasadoString.getMonth();
    const date = pasadoString.getDate();
    const hour = pasadoString.getHours();
    const deadLine = `${dias[lang][day]} ${date}/${month+1} ${preposition} ${hour}h (GMT).`;
    return deadLine;
}

module.exports = { makeDeadLine };