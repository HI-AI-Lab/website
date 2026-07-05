const header = document.getElementById('siteHeader');
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('siteNav');

function updateHeader(){
  if(window.scrollY > 32) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
window.addEventListener('scroll', updateHeader);
updateHeader();

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
  header.classList.toggle('menu-active', isOpen);
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    header.classList.remove('menu-active');
    toggle?.setAttribute('aria-expanded','false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Country click interaction for merged collaboration section
const countryNodes = document.querySelectorAll('.country-node');
const countryPanels = document.querySelectorAll('.bridge-detail');
const collaborationSurface = document.querySelector('.interactive-bridge') || document.querySelector('.host-collab');

function clearCountryPanels(){
  countryNodes.forEach(node => {
    node.classList.remove('active');
    node.setAttribute('aria-expanded', 'false');
  });
  countryPanels.forEach(panel => panel.classList.remove('active'));
}

function activateCountry(targetId){
  clearCountryPanels();
  countryNodes.forEach(node => {
    const active = node.dataset.target === targetId;
    node.classList.toggle('active', active);
    node.setAttribute('aria-expanded', String(active));
  });
  countryPanels.forEach(panel => {
    panel.classList.toggle('active', panel.dataset.panel === targetId);
  });
}

countryNodes.forEach(node => {
  const targetId = node.dataset.target;

  node.addEventListener('mouseenter', () => activateCountry(targetId));
  node.addEventListener('focus', () => activateCountry(targetId));
 
  node.addEventListener('blur', clearCountryPanels);

  node.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault();
      activateCountry(targetId);
    }
    if(event.key === 'Escape'){
      clearCountryPanels();
    }
  });
});

collaborationSurface?.addEventListener('mouseleave', clearCountryPanels);

// Impact board interaction
const impactCopy = {
  first: {
    eyebrow: 'Pakistan’s first',
    title: 'Human-Inspired AI Lab',
    text: 'A dedicated lab for human-centered AI research with national and international relevance.'
  },
  research: {
    eyebrow: 'Research value',
    title: 'National and global impact',
    text: 'Applied research designed for education, healthcare, agriculture, robotics and smart cities.'
  },
  exchange: {
    eyebrow: 'Academic mobility',
    title: 'Pak–Türkiye exchange',
    text: 'Creates opportunities for student exchange, faculty mobility and shared research activity.'
  },
  inclusion: {
    eyebrow: 'Social value',
    title: 'Inclusion and opportunity',
    text: 'Supports gender equality, inclusivity, poverty alleviation and wider access to AI capacity.'
  },
  bridge: {
    eyebrow: 'Ecosystem bridge',
    title: 'Academia, industry and government',
    text: 'Connects research expertise with public-sector priorities and industry-facing applications.'
  },
  workforce: {
    eyebrow: 'Talent pipeline',
    title: 'Students, researchers and IT workforce',
    text: 'Builds practical skills and creates pathways for Pakistan’s emerging AI workforce.'
  }
};
const impactButtons = document.querySelectorAll('.impact-point');
const impactDetail = document.getElementById('impactDetail');
function activateImpact(key){
  const item = impactCopy[key];
  if(!item || !impactDetail) return;
  impactButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.impact === key));
  impactDetail.innerHTML = `<span>${item.eyebrow}</span><h3>${item.title}</h3><p>${item.text}</p>`;
}
impactButtons.forEach(btn => {
  btn.addEventListener('mouseenter', () => activateImpact(btn.dataset.impact));
  btn.addEventListener('focus', () => activateImpact(btn.dataset.impact));
  btn.addEventListener('click', () => activateImpact(btn.dataset.impact));
});

// Final domain showcase interaction
const domainData = {
  education: { no:'01', title:'Education', text:'Natural language processing for personalized learning and assessment.' },
  vision: { no:'02', title:'Computer vision', text:'Crop disease, precision agriculture, autonomous vehicles and patient care.' },
  robotics: { no:'03', title:'Robotics', text:'Field-assisted robotics, drone surveillance and surveying.' },
  healthcare: { no:'04', title:'Healthcare', text:'Diagnostics, drug discovery, DNA sequencing and medical image processing.' },
  cities: { no:'05', title:'Smart cities', text:'IoT, smart metering and smart transportation.' },
  foundations: { no:'06', title:'AI foundations', text:'Machine learning, deep learning, data science, NLP and data visualization.' }
};
const domainTabs = document.querySelectorAll('.domain-tab');
const domainDisplay = document.getElementById('domainDisplay');
function activateDomain(key){
  const item = domainData[key];
  if(!item || !domainDisplay) return;
  domainTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.domain === key));
  domainDisplay.innerHTML = `<span>${item.no}</span><h3>${item.title}</h3><p>${item.text}</p>`;
}
domainTabs.forEach(tab => {
  tab.addEventListener('click', () => activateDomain(tab.dataset.domain));
  tab.addEventListener('mouseenter', () => activateDomain(tab.dataset.domain));
  tab.addEventListener('focus', () => activateDomain(tab.dataset.domain));
});

