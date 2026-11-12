// AgriSmart demo data: crop facts and general fertilizer starting points.
const crops = [
  { name: 'Rice', scientific: 'Oryza sativa', season: 'Kharif · 90–150 days', soil: 'Clayey / loamy', water: 'High · keep evenly moist', fertilizer: 'NPK guided by soil test', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=85', alt: 'Golden rice crop ready for harvest' },
  { name: 'Wheat', scientific: 'Triticum aestivum', season: 'Rabi · 110–150 days', soil: 'Well-drained loam', water: 'Moderate · key stages', fertilizer: 'Balanced NPK; split nitrogen', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=85', alt: 'Sunlit wheat field' },
  { name: 'Maize', scientific: 'Zea mays', season: 'Kharif / Rabi · 80–110 days', soil: 'Fertile, well-drained loam', water: 'Moderate · avoid waterlogging', fertilizer: 'Nitrogen in split doses', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=85', alt: 'Golden corn cobs growing on the stalk' },
  { name: 'Cotton', scientific: 'Gossypium spp.', season: 'Kharif · 150–180 days', soil: 'Deep black / alluvial', water: 'Moderate · critical at flowering', fertilizer: 'NPK based on field test', image: 'https://images.unsplash.com/photo-1594877820870-4b5892c82f69?auto=format&fit=crop&w=900&q=85', alt: 'Soft cotton bolls growing in a field' },
  { name: 'Sugarcane', scientific: 'Saccharum officinarum', season: 'Annual · 10–18 months', soil: 'Deep, fertile loam', water: 'High · regular moisture', fertilizer: 'Split N and K guided by test', image: 'https://images.unsplash.com/photo-1575567677858-1c9df57a0a9c?auto=format&fit=crop&w=900&q=85', alt: 'Tall sugarcane plants in a field' },
  { name: 'Tomato', scientific: 'Solanum lycopersicum', season: 'Season varies by region', soil: 'Well-drained sandy loam', water: 'Regular · avoid wet leaves', fertilizer: 'Balanced nutrients; add compost', image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85', alt: 'Ripe tomatoes growing on the vine' }
];

const fertilizerGuidance = {
  rice: 'Rice generally benefits from balanced nutrients, with nitrogen often split across growth stages. Keep water management in mind and check local guidance for your variety.',
  wheat: 'Wheat commonly uses balanced NPK, with nitrogen split between planting and early growth. Consider phosphorus and potassium based on test results.',
  maize: 'Maize has a strong nitrogen demand; split applications can help match crop uptake. Include phosphorus and potassium according to soil-test results.',
  cotton: 'Cotton nutrient needs change through the season. Balanced nitrogen and potassium are often important; avoid excess nitrogen and follow tested field recommendations.',
  sugarcane: 'Sugarcane is a long-duration crop with substantial nutrient needs. Apply nutrients in stages as locally recommended and use organic matter to support soil.',
  tomato: 'Tomatoes need balanced nutrition and steady moisture. Avoid excess nitrogen, which can favor leaves over fruit, and use soil-test guidance for potassium.'
};

const soilNotes = {
  alluvial: 'Alluvial soils are often productive, but nutrient availability varies by field.',
  clay: 'Clay soils can hold nutrients and water; avoid waterlogging and apply amendments based on testing.',
  loamy: 'Loamy soils often drain and retain moisture well; maintain organic matter and test regularly.',
  sandy: 'Sandy soils may leach nutrients quickly; smaller, well-timed applications may be suitable.',
  black: 'Black soils can retain moisture; manage drainage and verify micronutrient status with a test.',
  red: 'Red soils can vary in acidity and nutrient levels; test pH and nutrient status before amending.'
};

const cropGrid = document.querySelector('#crop-grid');
const cropSearch = document.querySelector('#crop-search');
const cropCount = document.querySelector('#crop-count');
const cropEmpty = document.querySelector('#crop-empty');

function renderCrops(query = '') {
  const normalizedQuery = query.trim().toLowerCase();
  const matchingCrops = crops.filter((crop) => `${crop.name} ${crop.scientific} ${crop.season}`.toLowerCase().includes(normalizedQuery));
  cropCount.textContent = `${matchingCrops.length} ${matchingCrops.length === 1 ? 'crop' : 'crops'}`;
  cropEmpty.hidden = matchingCrops.length > 0;
  cropGrid.innerHTML = matchingCrops.map((crop) => `
    <article class="crop-card">
      <div class="crop-image-wrap"><img src="${crop.image}" alt="${crop.alt}" loading="lazy"><span class="crop-season">${crop.season}</span></div>
      <div class="crop-info"><div class="crop-title-row"><h3>${crop.name}</h3><span>${crop.scientific}</span></div>
        <div class="crop-facts">
          <div class="crop-fact"><span>Soil</span><strong>${crop.soil}</strong></div>
          <div class="crop-fact"><span>Water</span><strong>${crop.water}</strong></div>
          <div class="crop-fact"><span>Growing season</span><strong>${crop.season}</strong></div>
          <div class="crop-fact"><span>Fertilizer</span><strong>${crop.fertilizer}</strong></div>
        </div>
      </div>
    </article>`).join('');
}

renderCrops();
cropSearch.addEventListener('input', (event) => renderCrops(event.target.value));
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    cropSearch.focus();
    document.querySelector('#crops').scrollIntoView({ behavior: 'smooth' });
  }
});

// Compact mobile navigation closes after a link is selected or Escape is pressed.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
function closeNavigation() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navLinks.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('is-open', !isExpanded);
});
navLinks.addEventListener('click', (event) => { if (event.target.closest('a')) closeNavigation(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeNavigation(); });

// Open-Meteo is a free weather service and does not require an API key.
const weatherForm = document.querySelector('#weather-form');
const weatherStatus = document.querySelector('#weather-status');
const weatherCodes = {
  0: ['Clear sky', '☀'], 1: ['Mostly clear', '🌤'], 2: ['Partly cloudy', '⛅'], 3: ['Overcast', '☁'],
  45: ['Foggy', '🌫'], 48: ['Icy fog', '🌫'], 51: ['Light drizzle', '🌦'], 53: ['Drizzle', '🌦'], 55: ['Heavy drizzle', '🌧'],
  61: ['Light rain', '🌦'], 63: ['Rain', '🌧'], 65: ['Heavy rain', '🌧'], 71: ['Light snow', '🌨'], 73: ['Snow', '🌨'], 75: ['Heavy snow', '❄'],
  80: ['Rain showers', '🌦'], 81: ['Showers', '🌧'], 82: ['Heavy showers', '🌧'], 95: ['Thunderstorm', '⛈'], 96: ['Thunderstorm', '⛈'], 99: ['Heavy thunderstorm', '⛈']
};

async function getWeather(city) {
  weatherStatus.classList.remove('error');
  weatherStatus.textContent = 'Finding your city…';
  const locationResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
  if (!locationResponse.ok) throw new Error('Could not look up the city right now. Please try again.');
  const locationData = await locationResponse.json();
  const location = locationData.results?.[0];
  if (!location) throw new Error('City not found. Try a nearby city or check the spelling.');

  weatherStatus.textContent = 'Getting current conditions…';
  const params = new URLSearchParams({ latitude: location.latitude, longitude: location.longitude, current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m', temperature_unit: 'celsius', wind_speed_unit: 'kmh', precipitation_unit: 'mm', timezone: 'auto' });
  const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!weatherResponse.ok) throw new Error('Weather information is unavailable right now. Please try again later.');
  const weatherData = await weatherResponse.json();
  const current = weatherData.current;
  const [description, icon] = weatherCodes[current.weather_code] || ['Current conditions', '☁'];
  document.querySelector('#weather-location').textContent = `${location.name}${location.admin1 ? `, ${location.admin1}` : ''}`;
  document.querySelector('#weather-temp').textContent = `${Math.round(current.temperature_2m)}°`;
  document.querySelector('#weather-description').textContent = description;
  document.querySelector('#weather-icon').textContent = icon;
  document.querySelector('#weather-humidity').textContent = `${current.relative_humidity_2m}%`;
  document.querySelector('#weather-rain').textContent = `${current.precipitation} mm`;
  document.querySelector('#weather-wind').textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  weatherStatus.textContent = `Live conditions · ${new Date(current.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = document.querySelector('#city-input').value.trim();
  if (!city) return;
  const button = weatherForm.querySelector('button');
  button.disabled = true;
  try {
    await getWeather(city);
  } catch (error) {
    weatherStatus.textContent = error.message || 'Weather could not be loaded. Please try again.';
    weatherStatus.classList.add('error');
  } finally {
    button.disabled = false;
  }
});
getWeather('Coimbatore').catch((error) => {
  weatherStatus.textContent = error.message || 'Weather could not be loaded. Enter a city to retry.';
  weatherStatus.classList.add('error');
});

// Local-only image preview and a clearly labeled educational demo (not AI diagnosis).
const uploadInput = document.querySelector('#leaf-upload');
const uploadZone = document.querySelector('#upload-zone');
const leafPreview = document.querySelector('#leaf-preview');
const detectButton = document.querySelector('#detect-button');
const diagnosisResult = document.querySelector('#diagnosis-result');
let selectedLeafUrl = '';

function previewLeaf(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    diagnosisResult.hidden = false;
    diagnosisResult.innerHTML = '<strong>Please choose an image file.</strong>Select a JPG, PNG or other supported image.';
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    diagnosisResult.hidden = false;
    diagnosisResult.innerHTML = '<strong>That image is too large.</strong>Please choose an image under 10 MB.';
    return;
  }
  if (selectedLeafUrl) URL.revokeObjectURL(selectedLeafUrl);
  selectedLeafUrl = URL.createObjectURL(file);
  leafPreview.src = selectedLeafUrl;
  leafPreview.hidden = false;
  diagnosisResult.hidden = true;
  detectButton.disabled = false;
}

uploadInput.addEventListener('change', () => previewLeaf(uploadInput.files[0]));
['dragenter', 'dragover'].forEach((eventName) => uploadZone.addEventListener(eventName, (event) => {
  event.preventDefault();
  uploadZone.classList.add('drag-over');
}));
['dragleave', 'drop'].forEach((eventName) => uploadZone.addEventListener(eventName, (event) => {
  event.preventDefault();
  uploadZone.classList.remove('drag-over');
}));
uploadZone.addEventListener('drop', (event) => previewLeaf(event.dataTransfer.files[0]));
detectButton.addEventListener('click', () => {
  if (!selectedLeafUrl) return;
  diagnosisResult.hidden = false;
  diagnosisResult.innerHTML = '<strong>Demo result: visual review recommended</strong>This interface does not analyze the image. Check both sides of several leaves, note how widely symptoms appear, and ask a local agricultural extension officer to identify the cause before applying any treatment.';
});

// General educational recommendations; no application rates are provided.
document.querySelector('#fertilizer-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const crop = document.querySelector('#fertilizer-crop').value;
  const soil = document.querySelector('#soil-type').value;
  const result = document.querySelector('#recommendation-result');
  if (!crop || !soil) return;
  result.innerHTML = `<strong>${crop} · ${soil} soil</strong>${fertilizerGuidance[crop.toLowerCase()]} ${soilNotes[soil.toLowerCase()]}`;
  result.hidden = false;
});

// Client-side validation and demo confirmation; connect a backend to receive submissions.
const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-status');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  contactStatus.classList.remove('error');
  if (!contactForm.reportValidity()) {
    contactStatus.textContent = 'Please check the highlighted fields and try again.';
    contactStatus.classList.add('error');
    return;
  }
  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  contactStatus.textContent = `Thanks, ${name}! Your message is ready. This demo does not send it to a server.`;
  contactForm.reset();
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
