const initAbout = () => {
    window.addEventListener('scroll', () => {
        const els = document.querySelectorAll('.single-contact');
        els.forEach((el, i) => {
            const delay = (i + 1) * 300;
            setTimeout(() => el.classList.add('active'), delay);
        })
    })
}

export default initAbout;