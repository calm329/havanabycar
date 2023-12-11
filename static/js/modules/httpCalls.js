const post = async (url, vars) => {
    try {
        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(vars)
        };
        const res = await fetch(url, options);
        return res;
    } catch (error) {
        console.log(error);
        throw Error("Error");
    }
}

export const postPic = async (url, formdata) => {
    const options = {
        method: 'POST',
        body: formdata,
        cache: "no-cache"
    }
    const res = await fetch(url, options);
    return res;
}

export default post;