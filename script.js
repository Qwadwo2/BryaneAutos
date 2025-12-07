
// ====== Manu  Scripts ======
const cars = [
  {
    id: 'eco-01',
    name: 'Toyota Corolla 1.6L',
    class: 'economy',
    pricePerDay: 350, // GHS
    img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG95b3RhJTIwY29yb2xsYXxlbnwwfHwwfHx8MA%3D%3D?q=80&w=1200&auto=format&fit=crop',
    specs: ['Auto', '5 seats', 'Aircon', 'Petrol']
  },
  {
    id: 'exec-01',
    name: 'Mercedes-Benz C300',
    class: 'executive',
    pricePerDay: 1200,
    img: 'https://images.unsplash.com/photo-1630596369706-57eaf9ba7cae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lcmNlZGVzJTIwYmVuenxlbnwwfHwwfHx8MA%3D%3D?q=80&w=1200&auto=format&fit=crop',
    specs: ['Auto', '5 seats', 'Leather', 'Wi‑Fi']
  },
  {
    id: 'suv-01',
    name: 'Toyota Fortuner 2.8D',
    class: 'suv',
    pricePerDay: 1000,
    img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop',
    specs: ['Auto', '7 seats', '4x4', 'Diesel']
  },
  {
    id: 'eco-02',
    name: 'Hyundai Accent 1.4L',
    class: 'economy',
    pricePerDay: 300,
    img: 'https://hips.hearstapps.com/hmg-prod/images/2022-hyundai-accent-mmp-1-1634756931.jpg?crop=1.00xw:0.849xh;0,0.125xh&resize=2048:*',
    specs: ['Manual', '5 seats', 'Aircon', 'Petrol']
  },
  {
    id: 'exec-02',
    name: 'BMW 5 Series',
    class: 'executive',
    pricePerDay: 1500,
    img: 'https://www.topgear.com/sites/default/files/2024/04/TopGear%20-%20First%20Drive%20-%20BMW%205%20Series%202024-031.jpg?q=80&w=1200&auto=format&fit=crop',
    specs: ['Auto', '5 seats', 'Leather', 'Premium Sound']
  },
  {
    id: 'suv-02',
    name: 'Nissan Patrol V8',
    class: 'suv',
    pricePerDay: 1300,
    img: 'https://assets.autobuzz.my/wp-content/uploads/2024/09/04154801/All-new-Nissan-Patrol.jpg?q=80&w=1200&auto=format&fit=crop',
    specs: ['Auto', '7 seats', '4x4', 'Petrol']
  }
];

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

// Booking logic
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const priceSummary = document.getElementById('priceSummary');

function setMinDates() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth()+1).padStart(2,'0');
  const dd = String(today.getDate()).padStart(2,'0');
  const ymd = `${yyyy}-${mm}-${dd}`;
  startDate.min = ymd;
  endDate.min = ymd;
}

function calcDays() {
  if (!startDate.value || !endDate.value) return 0;
  const s = new Date(startDate.value);
  const e = new Date(endDate.value);
  const diff = (e - s) / (1000*60*60*24);
  return Math.max(0, Math.ceil(diff));
}

function currentCar() {
  const id = carSelect.value;
  return cars.find(c => c.id === id);
}

function updatePrice() {
  const days = calcDays();
  const car = currentCar();
  let total = 0;
  if (days && car) {
    total = days * car.pricePerDay;
  }
  priceSummary.textContent = `Total: GHS ${total}`;
}

// Form validation
const bookingForm = document.getElementById('bookingForm');
function validateField(el) {
  const small = el.parentElement.querySelector('small.error');
  if (!el.checkValidity || el.checkValidity()) { small.textContent = ''; return true; }
  if (el.validity.valueMissing) small.textContent = 'This field is required';
  else small.textContent = 'Invalid value';
  return false;
}

[...bookingForm.querySelectorAll('input, select')].forEach(el => {
  el.addEventListener('change', () => { validateField(el); updatePrice(); });
  el.addEventListener('input', () => { validateField(el); updatePrice(); });
});

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  [...bookingForm.querySelectorAll('input, select')].forEach(el => { ok = validateField(el) && ok; });

  const days = calcDays();
  const car = currentCar();
  if (!days || days < 1) { ok = false; bookingForm.querySelector('#endDate').parentElement.querySelector('small.error').textContent = 'End date must be after start date'; }
  if (!car) { ok = false; bookingForm.querySelector('#carSelect').parentElement.querySelector('small.error').textContent = 'Please choose a vehicle'; }

  if (!ok) return;

  const data = {
    pickLocation: document.getElementById('pickLocation').value,
    dropLocation: document.getElementById('dropLocation').value,
    startDate: startDate.value,
    endDate: endDate.value,
    carId: car.id,
    fullName: document.getElementById('fullName').value,
    phone: document.getElementById('phone').value,
    total: priceSummary.textContent.replace('Total: GHS ', '')
  };

  // In real use, send data to your backend. For static demo:
  alert(`Booking submitted!

${JSON.stringify(data, null, 2)}`);
  bookingForm.reset();
  updatePrice();
});

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
