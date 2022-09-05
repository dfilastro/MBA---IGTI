(() => {
  (async () => {
    let response = await axios.get('https://api.covid19api.com/summary');

    const data = response.data;

    loadSummary(data);
    loadPieChart(data);
    loadBarChart(data);
  })();
})();

function loadSummary(data) {
  let confirmed = document.getElementById('confirmed');
  let death = document.getElementById('death');
  let recovered = document.getElementById('recovered');
  let date = document.getElementById('date');

  confirmed.innerText = data.Global.TotalConfirmed.toLocaleString('PT');
  death.innerText = data.Global.TotalDeaths.toLocaleString('PT');
  recovered.innerText = data.Global.TotalRecovered.toLocaleString('PT');
  date.innerText = `${date.innerText} ${formatDate(new Date(data.Global.Date))}`;
}

function loadPieChart(data) {
  const pizza = document.getElementById('pizza').getContext('2d');

  const chartData = {
    labels: ['Confirmados', 'Recuperados', 'Mortes'],
    datasets: [
      {
        data: [data.Global.NewConfirmed, data.Global.NewRecovered, data.Global.NewDeaths],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCD56'],
      },
    ],
  };

  const pieChart = new Chart(pizza, {
    type: 'pie',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Distribuição de novos casos',
        },
      },
    },
  });
}

function loadBarChart(data) {
  const top10DeathsPerCountry = getTopDeathsPerCountry(data);

  const countries = [];
  const totalDeaths = [];
  for (let country of top10DeathsPerCountry) {
    countries.push(country.name);
    totalDeaths.push(country.totalDeaths);
  }

  const chartData = {
    labels: countries,
    datasets: [
      {
        data: totalDeaths,
        backgroundColor: ['#9966FF'],
      },
    ],
  };

  const barras = document.getElementById('barras').getContext('2d');

  const barChart = new Chart(barras, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Total de Mortes por país - Top 10',
        },
      },
    },
  });
}

function getTopDeathsPerCountry(data) {
  const deathsPerCountry = data.Countries.map((country) => {
    return { name: country.Country, totalDeaths: country.TotalDeaths };
  });

  const sorted = _.orderBy(deathsPerCountry, ['totalDeaths'], ['desc']);

  const top10 = _.take(sorted, 10);

  return top10;
}

function formatDate(date) {
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes(),
  ].map((c) => c.slice(-2));

  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
