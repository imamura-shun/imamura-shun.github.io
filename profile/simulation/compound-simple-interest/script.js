let chart;

function calculateCompoundInterest(principal, interestRate, year) {
  return Math.pow(1 + interestRate, year) * principal;
}

function calculateAndPlot() {
  const principalCompound = parseFloat(document.getElementById('principalCompound').value);
  const interestRateCompound = parseFloat(document.getElementById('interestRateCompound').value) / 100;
  const principalSimple = parseFloat(document.getElementById('principalSimple').value);
  const interestRateSimple = parseFloat(document.getElementById('interestRateSimple').value) / 100;
  const maxYears = parseInt(document.getElementById('maxYears').value);
  
  const years = Array.from({length: maxYears + 1}, (_, i) => i);
  const compoundData = years.map(year => calculateCompoundInterest(principalCompound, interestRateCompound, year));
  const simpleData = years.map(year => principalSimple * (1 + interestRateSimple * year));
  
  if (chart) {
    chart.destroy();
  }
  
  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Compound Interest',
          data: compoundData,
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Simple Interest',
          data: simpleData,
          borderColor: 'red',
          fill: false
        }
      ]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Years'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Current Total Amount (10,000 yen)'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Comparison of Compound and Simple Interest'
        }
      }
    }
  });
}