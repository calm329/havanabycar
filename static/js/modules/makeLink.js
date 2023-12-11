import post from "./httpCalls.js";
import copyText from "./copyText.js";

const makeLink = async () => {

    const url = "/new-link";
    const feedbacks = document.querySelector("#newLinkFeedback");
    feedbacks.innerText = "Loading...";
    
    try {

        const causale = document.querySelector("#causale").value.trim();
        const monto = document.querySelector("#monto").value.trim();
        const divisa = document.querySelector("#divisa").value;
        const language = document.querySelector("#language").value;

        if(causale.length < 8) {
            throw Error("Formato Causale Es OR123456")
        }

        if(isNaN(monto)) {
            throw Error("Monto Incorrecto")
        }

        if(divisa === "") {
            throw Error("Especificar la Divisa")
        }

        if(language === "") {
            throw Error("Especificar el Idioma")
        }

        const vars = { causale, monto, divisa, language };
        const res = await post(url, vars);

        if(res.status == 200) {
            const data = await res.json();
            feedbacks.innerHTML = "<b class='small'><span id='copyLinkBTN' class='copyBTN'><i class='fas fa-copy'></i> Copy</span><br><span id='dynamicLink'>"+data.link+"</span></b>";
            document.querySelector("#copyLinkBTN").addEventListener("click", () => copyText());
        } else if (res.status == 401) {
            return window.location.href = "/admin";
        } else {
            throw Error("Error");
        }

    } catch (error) {
        console.log(error);
        feedbacks.innerText = error.message;
    }
}

export default makeLink;