// ===============================
// BRYANE AUTOS — EXECUTIVE SHOWROOM SYSTEM
// Scroll-pop reveal + 50+ cars
// ===============================

// ========== CAR DATABASE (AUTO-GENERATED TO 54 CARS) ==========
const baseCars = [
  { name: 'Toyota Corolla', class: 'economy', price: 350, img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&auto=format&fit=crop', specs: ['Auto', '5 seats', 'Petrol'] },
  { name: 'Hyundai Accent', class: 'economy', price: 300, img: 'https://hips.hearstapps.com/hmg-prod/images/2022-hyundai-accent-mmp-1-1634756931.jpg?resize=2048:*', specs: ['Manual', '5 seats', 'Aircon'] },
  { name: 'Mercedes-Benz C300', class: 'executive', price: 1200, img: 'https://images.unsplash.com/photo-1630596369706-57eaf9ba7cae?w=1200&auto=format&fit=crop', specs: ['Auto', 'Leather', 'Wi-Fi'] },
  { name: 'BMW 5 Series', class: 'executive', price: 1500, img: 'https://www.topgear.com/sites/default/files/2024/04/TopGear%20-%20First%20Drive%20-%20BMW%205%20Series%202024-031.jpg?w=1200&auto=format&fit=crop', specs: ['Auto', 'Luxury', 'Premium Sound'] },
  { name: 'Toyota Fortuner', class: 'suv', price: 1000, img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&auto=format&fit=crop', specs: ['4x4', '7 seats'] },
  { name: 'Nissan Patrol V8', class: 'suv', price: 1300, img: 'https://assets.autobuzz.my/wp-content/uploads/2024/09/04154801/All-new-Nissan-Patrol.jpg?w=1200&auto=format&fit=crop', specs: ['V8', 'Luxury SUV'] }
];

// Expand to 54 cars
const cars = Array.from({ length: 54 }, (_, i) => {
  const base = baseCars[i % baseCars.length];
  return {
    id: `${base.class}-${i + 1}`,
    name: `${base.name} ${i + 1}`,
    class: base.class,
    pricePerDay: base.price,
    img: base.img,
    specs: base.specs
  };
});

// ========== DOM ==========
const grid = document.getElementById('showroomGrid');
const sentinel = document.getElementById('sentinel');
const modalRoot = document.getElementById('carModal');
const resultCount = document.getElementById('resultCount');
const classFilter = document.getElementById('classFilter');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
document.getElementById('yearFooter').textContent = new Date().getFullYear();

// ========== STATE ==========
const BATCH = 6;
let index = 0;
let filteredCars = [...cars];

// ========== FILTER + SEARCH ==========
function applyFilters() {
  const term = searchInput.value.toLowerCase();
  const cls = classFilter.value;
  const sort = sortSelect.value;

  filteredCars = cars.filter(car => {
    if (cls !== 'all' && car.class !== cls) return false;
    return car.name.toLowerCase().includes(term);
  });

  if (sort === 'price-asc') filteredCars.sort((a,b)=>a.pricePerDay-b.pricePerDay);
  if (sort === 'price-desc') filteredCars.sort((a,b)=>b.pricePerDay-a.pricePerDay);
  if (sort === 'name-asc') filteredCars.sort((a,b)=>a.name.localeCompare(b.name));

  grid.innerHTML = '';
  index = 0;
  resultCount.textContent = `${filteredCars.length} vehicles`;
  loadNextBatch();
}

// ========== CARD ==========
function createCard(car) {
  const el = document.createElement('article');
  el.className = 'card showroom-card';
  el.innerHTML = `
    <div class="showroom-media">
      <img src="${car.img}" />
    </div>
    <div class="card-body">
      <div class="car-meta">
        <div>
          <h3>${car.name}</h3>
          <div class="car-specs">${car.specs.map(s=>`<span>${s}</span>`).join('')}</div>
        </div>
        <div>
          <strong>GHS ${car.pricePerDay}/day</strong>
          <div class="small-muted">${car.class.toUpperCase()}</div>
        </div>
      </div>
      <div style="margin-top:.7rem; display:flex; gap:.5rem;">
        <button class="btn btn-ghost small" onclick="openModal('${car.id}')">Details</button>
        <button class="btn btn-primary small" onclick="reserveCar('${car.id}')">Reserve</button>
      </div>
    </div>
  `;
  return el;
}

// ========== LOAD ON SCROLL ==========
function loadNextBatch() {
  const slice = filteredCars.slice(index, index + BATCH);
  slice.forEach(car => {
    const card = createCard(car);
    grid.appendChild(card);
    revealObserver.observe(card);
  });
  index += BATCH;
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) loadNextBatch();
}, { rootMargin: '300px' });

observer.observe(sentinel);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
});

// ========== MODAL ==========
window.openModal = function(id) {
  const car = cars.find(c=>c.id===id);
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal">
        <h3>${car.name}</h3>
        <img src="${car.img}" style="width:100%; border-radius:12px;">
        <p>${car.specs.join(' • ')}</p>
        <p><strong>GHS ${car.pricePerDay}/day</strong></p>
        <button class="btn btn-primary" onclick="reserveCar('${car.id}')">Reserve</button>
        <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      </div>
    </div>
  `;
  modalRoot.style.display = 'block';
};

window.closeModal = function() {
  modalRoot.style.display = 'none';
  modalRoot.innerHTML = '';
};

// ========== RESERVE ==========
window.reserveCar = function(id) {
  const car = cars.find(c=>c.id===id);
  localStorage.setItem('selectedCar', car.name);
  localStorage.setItem('selectedCarId', car.id);
  window.location.href = 'booking.html';
};

// ========== EVENT BINDINGS ==========
searchInput.addEventListener('input', applyFilters);
classFilter.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);

// ========== INIT ==========
applyFilters();
