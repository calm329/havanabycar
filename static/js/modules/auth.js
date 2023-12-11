import post from "./httpCalls.js";

const sendLogin = async () => {
    const user = document.querySelector('#username');
    const pw = document.querySelector('#password');
    const feedback = document.querySelector('#feedback');
    feedback.innerText = "Loading...";
    const vars = {user: user.value, pw: pw.value};
    const url = '/login';

    try {
        
        const res = await post(url, vars);
        
        if(res.status == 200) {
            return window.location.href = '/admin-panel';
        }else if(res.status == 401){
            return feedback.innerText = 'Username y/o Password Incorrectos';
        }else {
            return feedback.innerText = 'Error: ' + res.status;
        }

    } catch (error) {
        console.log(error);
        feedback.innerText = 'Error';
    }
    
}

const initLogin = () => {
    const loginTrigger = document.querySelector('#loginTrigger');
    if(loginTrigger){
        loginTrigger.addEventListener('click', () => sendLogin());
    } 
}

export default initLogin;