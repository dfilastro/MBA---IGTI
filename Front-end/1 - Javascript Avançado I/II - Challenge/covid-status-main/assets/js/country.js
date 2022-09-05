(() => {
  (async () => {
    let response = await axios.get('https://api.covid19api.com/countries');

    const data = response.data;

    loadDefaults();
    loadCountries(data);
    applyFilter();
  })();
})();

function loadDefaults() {
  let dateStart = document.getElementById('date_start');
  let dateEnd = document.getElementById('date_end');
  let applyBtn = document.getElementById('filtro');

  const today = new Date();
  const firsDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  dateStart.value = formatDate(firsDayOfMonth);
  dateEnd.value = formatDate(today);

  applyBtn.addEventListener('click', applyFilter);
}

function loadCountries(data) {
  let combo = document.getElementById('cmbCountry');

  data.sort((a, b) => {
    let x = a.Country.toUpperCase();
    let y = b.Country.toUpperCase();

    return x === y ? 0 : x > y ? 1 : -1;
  });

  for (index in data) {
    combo.options[combo.options.length] = new Option(data[index].Country, data[index].Country);
  }

  // Default selected
  combo.value = 'Brazil';
}

function applyFilter() {
  let startDate = new Date(document.getElementById('date_start').value);
  const endDate = new Date(document.getElementById('date_end').value);
  const country = document.getElementById('cmbCountry').value;
  const dataType = document.getElementById('cmbData').value;

  startDate.setDate(startDate.getDate() - 1);

  getCountryData(startDate, endDate, country, dataType);
}

function getCountryData(startDate, endDate, country, dataType) {
  (async () => {
    let response = await Promise.allSettled([
      axios.get(`https://api.covid19api.com/summary`),
      axios.get(
        `https://api.covid19api.com/total/country/${country}?from=${startDate.toISOString()}&to=${endDate.toISOString()}`
      ),
    ]);

    if (response[0].status == 'fulfilled') {
      loadKPIs(response[0].value.data, country);
    }

    if (response[1].status == 'fulfilled') {
      loadLineChart(response[1].value.data, dataType);
    }
  })();
}

function loadKPIs(data, country) {
  let kpiConfirmed = document.getElementById('kpiconfirmed');
  let kpiDeaths = document.getElementById('kpideaths');
  let kpiRecovered = document.getElementById('kpirecovered');

  const countryData = data.Countries.find((ctry) => ctry.Country === country);

  kpiConfirmed.innerText = countryData ? countryData.TotalConfirmed.toLocaleString('PT') : '-';
  kpiDeaths.innerText = countryData ? countryData.TotalDeaths.toLocaleString('PT') : '-';
  kpiRecovered.innerText = countryData ? countryData.TotalRecovered.toLocaleString('PT') : '-';
}

function loadLineChart(data, dataType) {
  const dates = [];
  const numbers = [];

  for (let i = 1; i < data.length; i++) {
    dates.push(data[i].Date.substr(0, 10));
    numberDelta = data[i][dataType] - data[i - 1][dataType];
    numbers.push(numberDelta);
  }

  const average = _.meanBy(numbers, (number) => number);
  const averages = Array(numbers.length).fill(average);

  const dataTypes = document.getElementById('cmbData').options;
  let selectedDataType = '';

  for (let option of dataTypes) {
    if (option.value === dataType) {
      selectedDataType = option.innerText;
      break;
    }
  }

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: selectedDataType,
        data: numbers,
        borderColor: ['#FC9626'],
      },
      {
        label: 'Média',
        data: averages,
        borderColor: ['#FF3131'],
      },
    ],
  };

  /* Remove existing canvas and insert a new one.
     This is needed to reload the same chart more than once.
  */
  document.getElementById('linhas').remove();
  let canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'linhas');
  canvas.setAttribute('width', '300');
  canvas.setAttribute('height', '100');
  document.querySelector('#chart-container').appendChild(canvas);

  const linhas = document.getElementById('linhas').getContext('2d');

  const lineChart = new Chart(linhas, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: 'Curva diária de Covid-19',
        },
      },
    },
  });
}

function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
