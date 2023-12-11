const initHow = () => {
    const els = [];
    const steps = document.querySelectorAll('.single-step');
    const dividers = document.querySelectorAll('.single-step-divider');
    for(let i = 0; i < steps.length; i++){
        if(steps[i]) els.push(steps[i]);
        if(dividers[i]) els.push(dividers[i]);
    }
    els.forEach((el, i) => {
        const delay = (i + 1) * 300;
        setTimeout(() => el.classList.add('active'), delay);
    })
}

export default initHow;