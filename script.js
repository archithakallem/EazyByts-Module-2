// Replace with your actual Twelve Data API key
const API_KEY = "0801ba4c39884b7bb10361cd55116ca6"; 

const stockData = [
  { name: 'AAPL' },
  { name: 'GOOGL' },
  { name: 'MSFT' }
];

const portfolio = [];

function displayStocks() {
  const container = document.getElementById('stock-list');
  container.innerHTML = '';
  stockData.forEach(stock => {
    const card = document.createElement('div');
    card.className = 'stock-card';
    card.innerHTML = `
      <h3>${stock.name}</h3>
      <p id="price-${stock.name}">Price: loading...</p>
      <button onclick="buyStock('${stock.name}')">Buy</button>
      <button onclick="sellStock('${stock.name}')">Sell</button>
    `;
    container.appendChild(card);
    // Optional: preload price on page load (if desired)
    fetchAndShowPrice(stock.name);
  });
}

async function fetchPrice(symbol) {
  try {
    const res = await fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data && data.price && !isNaN(data.price)) {
      return parseFloat(data.price);
    } else {
      console.error(`API Error for ${symbol}:`, data);
      notify(`Price fetch failed for ${symbol}. Using last known price.`);
      
      // Fallback: use last known price from portfolio if available
      const existing = portfolio.find(item => item.name === symbol);
      if (existing) return existing.price;
      
      return 0;
    }
  } catch (error) {
    console.error("Network/API error:", error);
    notify(`Network issue fetching price for ${symbol}`);
    return 0;
  }
}


async function fetchAndShowPrice(symbol) {
    console.log("Fetching price for:", symbol);
  const price = await fetchPrice(symbol);
  const priceElement = document.getElementById(`price-${symbol}`);
  if (priceElement) {
    priceElement.textContent = `Price: $${price}`;
  }
}

async function buyStock(name) {
  const price = await fetchPrice(name);
  const existing = portfolio.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
    existing.totalInvestment += price;
    existing.price = price;
  } else {
    portfolio.push({ name, quantity: 1, price, totalInvestment: price });
  }
  updatePortfolio();
  fetchAndShowPrice(name);
  notify(`You bought 1 share of ${name} at $${price}`);
}

async function sellStock(name) {
  const price = await fetchPrice(name);
  const existing = portfolio.find(item => item.name === name);
  if (existing && existing.quantity > 0) {
    existing.quantity -= 1;
    existing.totalInvestment -= price;
    existing.price = price;
    if (existing.quantity === 0) {
      const index = portfolio.indexOf(existing);
      portfolio.splice(index, 1);
    }
    updatePortfolio();
    fetchAndShowPrice(name);
    notify(`You sold 1 share of ${name} at $${price}`);
  } else {
    notify(`You don't own any ${name} stocks to sell`);
  }
}

function updatePortfolio() {
  const tbody = document.querySelector('#portfolio-table tbody');
  tbody.innerHTML = '';

  let totalInvestment = 0;
  let currentValue = 0;

  portfolio.forEach(stock => {
    totalInvestment += stock.totalInvestment;
    currentValue += stock.quantity * stock.price;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${stock.name}</td>
      <td>${stock.quantity}</td>
      <td>$${stock.price}</td>
      <td>$${(stock.quantity * stock.price).toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('total-investment').textContent = `$${totalInvestment.toFixed(2)}`;
  document.getElementById('total-profit').textContent = `$${(currentValue - totalInvestment).toFixed(2)}`;
  updateChart();
}

function notify(message) {
  const box = document.getElementById('notification-box');
  box.textContent = message;
  box.style.display = 'block';
  setTimeout(() => {
    box.style.display = 'none';
  }, 3000);
}

// Chart.js logic
let chart;

function updateChart() {
  const labels = portfolio.map(stock => stock.name);
  const data = portfolio.map(stock => stock.quantity * stock.price);

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  } else {
    const ctx = document.getElementById('portfolio-chart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Stock Value ($)',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

displayStocks();
