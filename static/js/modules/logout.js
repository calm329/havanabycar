import post from "./httpCalls.js";

const logout = async () => {
    try {
        const url = "/logout";
        const vars = {};
        const res = await post(url, vars);
        if(res.status != 200) {
            throw Error(`Error (${res.status})`);
        }
        window.location.href = "/admin";
    } catch (error) {
        console.log(error);
    }
}

export default logout;