const whichPolaroid = (op) => {
    
    let selected;
    
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach((item, index) => {
        if(item.classList.contains('top')) selected = index;
        if(item.classList.contains('first')) selected = index;
    })

    let next = selected + op;

    if(next < 0) next = polaroids.length - 1;
    if(next == polaroids.length) next = 0;
    
    return next;

};

const showNext = index => {
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids[index].classList.add('first');
    setTimeout(() => {
        polaroids.forEach((item, i) => {
            item.classList.remove('top');
            i != index ? item.classList.remove('first') : false;
        });
    }, 500)
    
}

const addPolaroid = () => {
    const nextPolaroid = whichPolaroid(1);
    showNext(nextPolaroid);
};

const restPolaroid = () => {
    const nextPolaroid = whichPolaroid(-1);
    showNext(nextPolaroid);
};

const initPolaroid = () => {
    const polaroidPlus = document.querySelector('#polaroidPlus');
    const polaroidMinus = document.querySelector('#polaroidMinus');
    polaroidPlus.addEventListener('click', () => addPolaroid());
    polaroidMinus.addEventListener('click', () => restPolaroid());
}

export default initPolaroid;