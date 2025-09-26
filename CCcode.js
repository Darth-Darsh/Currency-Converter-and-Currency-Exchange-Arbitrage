const apiKey = 'cur_live_ykFnGFtoDO2klEuisnXyZd2cFat0FbIeT3rAneFO';
const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`;

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
      const currencies = Object.keys(data.data);
      addCurrencies(currencies);
    })
    .catch(error => console.error('Error in adding currencies: ', error));

    document.getElementById('convert').addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('currency1').value;
        const toCurrency = document.getElementById('currency2').value;
      
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const rates = data.data;
            const rate = rates[toCurrency].value / rates[fromCurrency].value;
            const convertedAmount = amount * rate;
      
            document.getElementById('result').textContent = 
              `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
          })
          .catch(error => console.error('Error in conversion: ', error));
      });
      
      /*Webpage of bonus question i.e. Currency Exchange Arbitrage*/
      document.getElementById('CEA').addEventListener('click', () => {
        window.location.href='CEA.html';
      })