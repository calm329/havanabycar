const appear = (trigger, selector, interval) => {

    window.addEventListener('scroll', function() {
        const triggerEl = document.querySelector(trigger);
        if(!triggerEl) return false;
        const position = triggerEl.getBoundingClientRect();
        
        if(position.top > window.innerHeight) return false;

        const els = document.querySelectorAll(selector);

        els.forEach((item, index) => {
            const time = index * interval;
            setInterval(() => item.classList.add('active'), time);
        })
    })
    
}

export { appear };