
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