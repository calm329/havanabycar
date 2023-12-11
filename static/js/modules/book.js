const save = () => {
    //Check Driver's Data
    const countryList = document.querySelector('#country');
    const country = countryList.options[countryList.selectedIndex].value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const birth = document.querySelector('#nascita').value;
    const name = document.querySelector('#nome').value;
    const surname = document.querySelector('#cognome').value;
    const passport = document.querySelector('#passport').value;
    const driver = {
      country,
      email,
      phone,
      birth,
      name,
      surname,
      passport
    }; //Get Search Data
  
    const arrangement = JSON.parse(localStorage.getItem('search')); //Get Pick up and Drop off Data
  
    const pickupOfficeList = document.querySelector('#pickupLocation');
    const dropoffCityList = document.querySelector('#dropoffLocation');
    const dropoffOfficeList = document.querySelector('#dropoffOffice');
    const pickupOffice = pickupOfficeList.options[pickupOfficeList.selectedIndex].value;
    const dropoffCity = dropoffCityList.options[dropoffCityList.selectedIndex].value;
    const dropoffOffice = dropoffOfficeList.options[dropoffOfficeList.selectedIndex].value;
    const pickupSelect = document.querySelector('#pickupTime');
    const dropoffSelect = document.querySelector('#dropoffTime');
    const pickupTime = pickupSelect.options[pickupSelect.selectedIndex].value;;
    const dropoffTime = dropoffSelect.options[dropoffSelect.selectedIndex].value;
  
    if (arrangement.city == '' || arrangement.city == 'null' || dropoffOffice == '' || dropoffOffice == 'null') {
      showError('errorModal', translation[getLang()].noCity);
      return;
    }
  
    if (dropoffCity == '' || dropoffCity == 'null' || pickupOffice == '' || pickupOffice == 'null') {
      showError('errorModal', translation[getLang()].noCityOff);
      return;
    }
    
    arrangement.pickOffice = pickupOffice;
    arrangement.dropoffCity = dropoffCity;
    arrangement.dropoffOffice = dropoffOffice;
    arrangement.pickupTime = pickupTime;
    arrangement.dropoffTime = dropoffTime; //Prepare Data to be submitted
  
    saveObj = {
      driver: driver,
      arrangement: arrangement,
      car: localStorage.getItem('carid'),
      currency: whichCurrency(),
      language: getLang(),
      penalty: false,
      website: website
    };
    
    const pickCompare = '1 Jun 2020 ' + pickupTime;
    const dropCompare = '1 Jun 2020 ' + dropoffTime;
  
    if (new Date(pickCompare).getTime() < new Date(dropCompare).getTime()) {
      saveObj.penalty = true;
    }
  
    transmit(saveObj);
  }; 

  const transmit = saveObj => {
    const url = '/newCarOrder';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/json");
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
  
          const data = JSON.parse(xhr.responseText);
  
          if (data.status == "Error") {
            closeModal('saveModal');
            showError('errorModal', translation[getLang()][data.msg]);
            return;
          }
  
          localStorage.setItem('carBooking', xhr.responseText);
          const localPath = getLang() == "ENG" ? 'ENG/select-payment/' : 'seleccionar-pago/';
          let urlRedirect = baseUrl + localPath + '?payType=no_card';
          window.location.href = urlRedirect;
  
        } else {
          closeModal('saveModal');
          showError('errorModal', "System Error");
        }
      }
    };
  
    const elem = document.querySelector('#saveModal').innerHTML = spinner;
    openModal('saveModal');
    xhr.send(JSON.stringify(saveObj));
  };

  export default save;