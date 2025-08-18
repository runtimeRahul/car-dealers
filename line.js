(function initThemeEarly() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldDark = stored ? stored === 'dark' : prefersDark;
  if (shouldDark) document.documentElement.classList.add('dark');
})();
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const themeToggle = $('#themeToggle');
const iconMoon = $('#iconMoon');
const iconSun  = $('#iconSun');
const searchToggle = $('#searchToggle');
const navSearchBar = $('#navSearchBar');
const navSearchInput = $('#navSearchInput');
const navSearchClose = $('#navSearchClose');
const menuBtn = $('#menuBtn');
const mobileMenu = $('#mobileMenu');

const yearEl = $('#year');

function setTheme(isDark) 
{
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    iconMoon.classList.add('hidden');
    iconSun.classList.remove('hidden');
  } else {
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
  }
}
function initTheme() {
  const stored = localStorage.getItem('theme');
  const isDark = stored
    ? stored === 'dark'
    : document.documentElement.classList.contains('dark');
  setTheme(isDark);
}

themeToggle.addEventListener('click', () => {
  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  setTheme(!isCurrentlyDark);
});

function openNavSearch() {
  navSearchBar.classList.remove('hidden');
  navSearchInput.focus();
}
function closeNavSearch() {
  navSearchBar.classList.add('hidden');
}
searchToggle.addEventListener('click', () => {
  if (navSearchBar.classList.contains('hidden')) openNavSearch();
  else closeNavSearch();
});
navSearchClose.addEventListener('click', closeNavSearch);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNavSearch();
});

menuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
const models = [
  {
    id: 1,
    title: "BMW 3 Series",
    Model: "3 Series 330Li M Sport ",
    price: 6200000,
    type: "Sedan",
    featured: true,
    image: "bmw3ser.webp"
  },
  {
    id: 2,
    title: "Audi A5",
    Model: "A5 Coupe 40 TFSI",
    price: 6000000,
    type: "Coupe",
    featured: true,
    image: "audicoupe.webp"
  },
  {
    id: 3,
    title: "BMW Z4",
    Model: "Z4 Roadster sDrive M40i",
    price: 9200000,
    type: "Convertible",
    featured: true,
    image: "bmwz4.webp"
  },
  {
    id: 4,
    title: "Toyota Fontuner",
    Model: "Legender 4x4 AT",
    price:4500000,
    type: "SUV",
    featured: true,
    image: "fortuner.webp"
  },
  {
    id: 5,
    title: "Mini Cooper",
    Model: "3-Door Hatch",
    price: 4200000,
    type: "Mini",
    featured: true,
    image: "cooper3.webp"
  },
  {
    id: 6,
    title: "Toyota Vellfire",
    Model: "Vellfire Executive Lounge",
    price: 13200000,
    type: "MUV",
    featured: true,
    image: "vellfire.webp"
  },
  {
    id: 7,
    title: "Mercedes-Benz AMG",
    Model: "AMG A 45 S",
    price: 9480000,
    type: "Hatchback",
    featured: true,
    image: "benz.webp"
  },
  {
    id: 8,
    title: "Volvo XC40 ",
    Model: "XC40 Recharge",
    price: 5299000,
    type: "Crossover",
    featured: true,
    image: "xc40.webp"
  },
  {
    id: 9,
    title: "Mazda RX",
    Model: "RX-8",
    price: 3500000,
    type: "Sports",
    featured: true,
    image: "mazda.webp"
  },
];

const grid = $('#modelGrid');
const emptyState = $('#emptyState');
const searchForm = $('#searchForm');
const searchLocation = $('#searchLocation');
const modelType = $('#modelType');
const onlyFeatured = $('#onlyFeatured');
const maxPrice = $('#maxPrice');
const sortBy = $('#sortBy');

const formatPrice = (n) => `₹${n.toLocaleString()}`;

function renderCards(list) 
{
  grid.innerHTML = list.map(p => `
    <article class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200 dark:border-gray-800">
      <div class="relative">
        <img src="${p.image}" alt="${p.title}" class="w-full h-56 object-cover">
        ${p.featured ? '<span class="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">Featured</span>' : ''}
        <div class="absolute bottom-3 right-3 bg-white/90 dark:bg-white-500/80 backdrop-blur px-3 py-1 rounded-lg text-sm font-semibold">${formatPrice(p.price)}</div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-100">${p.title}</h3>
        <p class="text-gray-600 dark:text-gray-300">${p.Model}</p>
        <div class="mt-3 flex items-center gap-2">
          <span class="inline-flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-100 border border-gray-200 dark:border-blue-200">${p.type}</span>
          <button class="ml-auto text-blue-700 dark:text-blue-400 hover:underline text-sm">View details</button>
        </div>
      </div>
    </article>
  `).join('');

  emptyState.classList.toggle('hidden', list.length !== 0);
}
function applyFilters() {
  const loc = (searchLocation?.value || '').trim().toLowerCase();
  const type = modelType?.value || '';
  const featuredOnly = !!(onlyFeatured && onlyFeatured.checked);
  const max = parseInt(maxPrice?.value || '', 10);

  let list = [...models].filter(p => {
    const matchesLoc = !loc || p.location.toLowerCase().includes(loc);
    const matchesType = !type || p.type === type;
    const matchesFeatured = !featuredOnly || p.featured;
    const matchesPrice = !max || p.price <= max;
    return matchesLoc && matchesType && matchesFeatured && matchesPrice;
  });

  switch (sortBy?.value) {
    case 'priceAsc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      list.sort((a, b) => b.price - a.price);
      break;
    default: 
      list.sort((a, b) => b.id - a.id);
  }

  renderCards(list);
}
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderCards(models);
  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilters();
    document.querySelector('#models')?.scrollIntoView({ behavior: 'smooth' });
  });

  [modelType, onlyFeatured, maxPrice, sortBy].forEach(el => {
    el?.addEventListener('change', applyFilters);
  });
  searchLocation?.addEventListener('input', applyFilters);

  navSearchInput?.addEventListener('input', () => {
    if (searchLocation) {
      searchLocation.value = navSearchInput.value;
      applyFilters();
    }
  });
});
