document.getElementById('CC').addEventListener('click', () => {
    window.location.href = 'CC.html';
  });
  
const apiKey = 'cur_live_ykFnGFtoDO2klEuisnXyZd2cFat0FbIeT3rAneFO';
const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`;

  let conversionRates = {};
  
  function addCurrencies(currencies) {
    const currency1 = document.getElementById('currency1');
    const currency2 = document.getElementById('currency2');
  
    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = currency;
      option2.value = currency;
      option1.textContent = currency;
      option2.textContent = currency;
      currency1.appendChild(option1);
      currency2.appendChild(option2);
    });
  }
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      conversionRates = data.data; 
      const currencies = Object.keys(conversionRates);
      addCurrencies(currencies);
    })
    .catch(error => console.error('Error:', error));
  

  function convert(currencyA, currencyB) {
    return conversionRates[currencyB].value / conversionRates[currencyA].value;
  }
  

  document.getElementById('find').addEventListener('click', () => {
    const currency1 = document.getElementById('currency1').value;
    const currency2 = document.getElementById('currency2').value;
    
    let initialRate=convert(currency1, currency2);
    let imdtcurrency1 = null, imdtcurrency2=null, imdtcurrency3=null;
    let maxRate1 = 0, maxRate2=0, maxRate3=0;
  
    Object.keys(conversionRates).forEach(currency => {
      const finalRate = convert(currency1, currency)* convert(currency, currency2);
  
      if (finalRate > maxRate1) {
        maxRate3 = maxRate2; imdtcurrency3 = imdtcurrency2;
        maxRate2 = maxRate1; imdtcurrency2 = imdtcurrency1;
        maxRate1 = finalRate; imdtcurrency1 = currency;
      }
      else if(finalRate > maxRate2) {
        maxRate3 = maxRate2; imdtcurrency3 = imdtcurrency2;
        maxRate2 = finalRate; imdtcurrency2 = currency;
      }
      else if(finalRate > maxRate3) {
        maxRate3 = finalRate; imdtcurrency3 = currency;
      }
    });
  
    document.getElementById('result1').textContent = `${currency1} → ${imdtcurrency1} → ${currency2}`;
    document.getElementById('details1').textContent = `(${maxRate1} ${currency2} instead of ${initialRate} ${currency2})`;
    document.getElementById('result2').textContent = `${currency1} → ${imdtcurrency2} → ${currency2}`;
    document.getElementById('details2').textContent = `(${maxRate2} ${currency2} instead of ${initialRate} ${currency2})`;
    document.getElementById('result3').textContent = `${currency1} → ${imdtcurrency3} → ${currency2}`;
    document.getElementById('details3').textContent = `(${maxRate3} ${currency2} instead of ${initialRate} ${currency2})`;
  });
  