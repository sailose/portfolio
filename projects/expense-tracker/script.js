let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalEl = document.getElementById('total');
let chart;

function initChart() {
  const ctx = document.getElementById('expense-chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['#1e90ff', '#ff4444', '#00cc00', '#ffbb33']
      }]
    },
    options: {
      responsive: true
    }
  });
}

function updateChart() {
  const categories = {};
  expenses.forEach(exp => {
    categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
  });
  chart.data.labels = Object.keys(categories);
  chart.data.datasets[0].data = Object.values(categories);
  chart.update();
}

function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;
  expenses.forEach((exp, index) => {
    total += exp.amount;
    const li = document.createElement('li');
    li.classList.add('expense-item');
    li.innerHTML = `
      ${exp.description}: $${exp.amount} (${exp.category})
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
  totalEl.textContent = total.toFixed(2);
  updateChart();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  expenses.push({ description, amount, category });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  form.reset();
  renderExpenses();
});

initChart();
renderExpenses();