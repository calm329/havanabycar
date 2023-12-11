const getLang = () => {
    const url = window.location.href;
  
    if (url.includes('/ENG')) {
      return 'ENG';
    } else {
      return 'ES';
    }
  };

  export default getLang;