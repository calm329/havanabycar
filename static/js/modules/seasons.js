import post from "./httpCalls.js"

const addNewSeason = async () => {
    const feedbacks = document.querySelector('#newSeasonFeedback')
    const url = "/new-season";
    try {
        
        const start = document.querySelector('#start').value;
        const finish = document.querySelector('#finish').value;

        if(start == "" || finish == "") throw Error("Formulario Incompleto");

        const vars = {
            start, finish,
            vendor: "ALL",
            only_havana: false,
        }

        const res = await post(url, vars);
        if(res.status == 200) return feedbacks.innerText = "Temporada Agregada con Exito!";
        throw Error(`Error ${res.status}`);
    } catch (error) {
        console.log(error);
        feedbacks.innerText = error.message ? error.message : "Error";
    }
}

export default addNewSeason;