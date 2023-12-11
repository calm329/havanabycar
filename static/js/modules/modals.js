let loaderInterval = null;

const animateLoader = () => {
  //Get Els
  const parent = document.querySelector('.traffic-lines');
  const el = document.querySelector('#line-container');

  //Get positionFigures
  const parentPosition = parent.getBoundingClientRect(parent);
  const elPosition = el.getBoundingClientRect(parent);
  
  if(elPosition.top < parentPosition.bottom) {
    const currentElPosition = el.style.top.replace(/px/i, '');
    const newPosition = `${Number(currentElPosition) + 20}px`;
    return el.style.top = newPosition;
  } else {
    const newPosition = '-400px';
    el.style.top = newPosition;
  }

}
const openModal = id => {
    const elem = document.getElementById(id);
    elem.classList.add('active');
    if(id == "loader") loaderInterval = setInterval(() => animateLoader(), 60);
};
  
const closeModal = id => {
  const elem = document.getElementById(id);
  elem.classList.remove('active');
  if(id == "loader") clearInterval(loaderInterval);
};

  export { openModal, closeModal };