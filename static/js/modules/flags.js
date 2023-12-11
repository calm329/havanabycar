const handleFlags = () => {
    const classTarget = window.location.href.includes('/ENG/') ?  ".esFlag" : ".engFlag" ;
    const flags = document.querySelectorAll(classTarget);
    flags.forEach(flag => flag.classList.remove('hidden'));
}

export default handleFlags;