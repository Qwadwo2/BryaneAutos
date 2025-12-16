
// ====== Manu  Scripts ======


// Populate car cards and select options
const carGrid = document.getElementById('carGrid');
const carSelect = document.getElementById('carSelect');
const classFilter = document.getElementById('classFilter');

function renderCars(list) {
  carGrid.setAttribute('aria-busy', 'true');
  carGrid.innerHTML = '';
  list.forEach(car => {
    const card = document.createElement('article');
    card.className = 'card car-card';
    card.innerHTML = `
      <div class="car-media"><img src="${car.img}" alt="${car.name}"/></div>
      <div>
        <div class="car-title">
          <h3>${car.name}</h3>
          <span class="price">GHS ${car.pricePerDay}/day</span>
        </div>
        <div class="car-specs">${car.specs.map(s=>`<span>${s}</span>`).join('')}</div>
        <div class="car-actions">
          <button class="btn btn-ghost" data-id="${car.id}">Details</button>
          <button class="btn btn-primary" data-id="${car.id}" onclick="quickSelect('${car.id}')">Select</button>
        </div>
      </div>
    `;
    carGrid.appendChild(card);
  });
  carGrid.setAttribute('aria-busy', 'false');
}

function populateSelect() {
  carSelect.innerHTML = '<option value="">Choose a car</option>' + cars.map(c=>`<option value="${c.id}">${c.name} — GHS ${c.pricePerDay}/day</option>`).join('');
}

function filterCars() {
  const v = classFilter.value;
  const list = v === 'all' ? cars : cars.filter(c => c.class === v);
  renderCars(list);
}

function quickSelect(id) {
  carSelect.value = id;
  carSelect.dispatchEvent(new Event('change'));
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}


// Theme toggle
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') root.classList.add('light'); else root.classList.remove('light');
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const now = document.documentElement.classList.contains('light') ? 'dark' : 'light';
  applyTheme(now);
});

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Init
setMinDates();
populateSelect();
renderCars(cars);
updatePrice();

document.getElementById('year').textContent = new Date().getFullYear();

function bookCar(carName) {
  localStorage.setItem("selectedCar", carName);
  window.location.href = "booking.html";
}


// Pre-footer scroll reveal
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('active');
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

