let isOpen = false;
let myInterval = null;
let time = 10;

const toggleMenu = () => {
  const menuMobLinks = document.querySelector('.mobMenuLinks');
  isOpen = !isOpen;
  if(isOpen == true) {
    myInterval = setInterval(() => {
      time--;
      menuMobLinks.style.bottom = `${time * 10}vh`;
      if(time == 0) {
        const menuBTNs = document.querySelectorAll('.menuBTN');
        menuBTNs.forEach(btn => btn.classList.toggle('hidden'));
        return clearInterval(myInterval);
      }
    }, 20);

  } else {

    myInterval = setInterval(() => {
      time++;
      menuMobLinks.style.bottom = `${time * 10}vh`;
      if(time == 10) {
        const carsList = document.querySelector('.mobMenuLinks .carslist');
        const carsLink = document.querySelector('#carsLinkMob');
        if(carsList.classList.contains('active')) {
          carsList.classList.remove('active');
          carsLink.classList.remove('accent');
          highlight();
        }

        const menuBTNs = document.querySelectorAll('.menuBTN');
        menuBTNs.forEach(btn => btn.classList.toggle('hidden'));
        
        return clearInterval(myInterval);
      }
    }, 20);

  }
}

const highlight = () => {
  const currentUrl = window.location.href;
    if(currentUrl.includes('quienes-somos') || currentUrl.includes('about-us')){
      const links = document.querySelectorAll('.aboutLink');
      links.forEach(item => item.classList.add('accent'));
    } else if (currentUrl.includes('works') || currentUrl.includes('funciona')) {
      const links = document.querySelectorAll('.howLink');
      links.forEach(item => item.classList.add('accent'));
    } else if (
      currentUrl.includes('fleet') || 
      currentUrl.includes('flota') ||
      currentUrl.includes('carros-disponible') ||
      currentUrl.includes('available-cars') ||  
      currentUrl.includes('/car/') ||  
      currentUrl.includes('/carro/')
    ) {
      const links = document.querySelectorAll('.fleetLink');
      links.forEach(item => item.classList.add('accent'));
    }else if (currentUrl.includes('promoWave')) {
      const links = document.querySelectorAll('.promoLink');
      links.forEach(item => item.classList.add('accent'));
    } else {
      const links = document.querySelectorAll('.homeLink');
      links.forEach(item => item.classList.add('accent'));
    }
}


const handleMenu = () => {

    //OPEN MENU
    const mobLinkOffers = document.querySelector('.offersLinkMob');
    const menuBTNs = document.querySelectorAll('.menuBTN');
    menuBTNs.forEach(btn => btn.addEventListener('click', () => toggleMenu()));
    if(mobLinkOffers) mobLinkOffers.addEventListener('click', () => toggleMenu());

    //Hightligh link of current page
    highlight();

    //Toggle carlist in desktop
    const carMenu = document.querySelector('#carMenuLink');
    const carListMob = document.querySelector('#carsLinkMob');
    const carslist = document.querySelectorAll('.carslist');
    
    const toggleCarsList = () => {
      const mobLinks = document.querySelectorAll('.mobMenuLinks a');
      carslist.forEach(item => item.classList.toggle('active'));
      const squareList = document.querySelectorAll('.fa-caret-square-down');
      squareList.forEach(item => item.classList.toggle('active'));
      carListMob.classList.toggle('accent');
      mobLinks.forEach(item => {
        if(item.id != "carsLinkMob") {
          item.classList.remove('accent')
        }
      });
      if(!carListMob.classList.contains('accent')) highlight();
    }

    carMenu.addEventListener('click', () => toggleCarsList());
    carslist.forEach(item => item.addEventListener('mouseleave', () => toggleCarsList()));
    carListMob.addEventListener('click', () => toggleCarsList());
  }

  export { handleMenu, toggleMenu };