/* uMlazi Paws: Part 3 JavaScript. Plain JavaScript, no frameworks. */
const $ = (s, r = document) => r.querySelector(s);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^(0\d{9}|\+27\d{9})$/;
let animals = [];

/* ---- Load animal data (dynamic content) ---- */
async function loadAnimals() {
  try {
    const res = await fetch('data/animals.json');
    if (!res.ok) throw new Error(res.status);
    animals = await res.json();
  } catch (err) { console.warn('Could not load animals.json', err); }
  return animals;
}

/* ---- Adoptions page: render, search, filter, sort ---- */
function initAdoptions() {
  const box = $('#adoptable-animals');
  if (!box || !$('#controls')) return;
  const render = () => {
    const q = $('#search').value.trim().toLowerCase(), sp = $('#species').value, so = $('#sort').value;
    const list = animals
      .filter(a => (sp === 'all' || a.species === sp) && (a.name + ' ' + a.breed + ' ' + a.description).toLowerCase().includes(q))
      .sort((a, b) => so === 'young' ? a.ageYears - b.ageYears : so === 'old' ? b.ageYears - a.ageYears : a.name.localeCompare(b.name));
    box.replaceChildren();
    list.forEach(a => {
      const art = document.createElement('article'); art.className = 'animal-profile reveal show';
      const img = new Image(); img.src = 'images/' + a.image + '.jpg'; img.alt = a.alt; img.loading = 'lazy';
      img.dataset.full = 'images/large/' + a.image + '.jpg'; img.dataset.lightbox = '';
      const h = document.createElement('h3'); h.textContent = a.name;
      const p1 = document.createElement('p'), p2 = document.createElement('p'), p3 = document.createElement('p');
      p1.innerHTML = '<strong>Species:</strong> '; p1.append(a.species + ' \u2014 ' + a.breed);
      p2.innerHTML = '<strong>Age:</strong> '; p2.append(a.age);
      p3.textContent = a.description;
      art.append(img, h, p1, p2, p3); box.append(art);
    });
    $('#result-count').textContent = list.length ? list.length + ' of ' + animals.length + ' animals shown' : 'No animals match your search. Try clearing the filters.';
  };
  ['search', 'species', 'sort'].forEach(id => $('#' + id).addEventListener('input', render));
  loadAnimals().then(() => { if (animals.length) render(); else $('#result-count').textContent = ''; });
}

/* ---- Accordion ---- */
document.querySelectorAll('.acc-btn').forEach(btn =>
  btn.addEventListener('click', () => btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true'))));

/* ---- Lightbox (works for dynamically added images too) ---- */
const lb = document.createElement('div');
lb.className = 'lightbox'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Enlarged photo');
lb.innerHTML = '<button type="button" aria-label="Close photo">&times;</button><img alt="">';
document.body.append(lb);
const closeLb = () => { lb.hidden = true; };
document.addEventListener('click', e => {
  const t = e.target;
  if (t.matches('img[data-lightbox]')) { const i = $('img', lb); i.src = t.dataset.full || t.src; i.alt = t.alt; lb.hidden = false; $('button', lb).focus(); }
  else if (t === lb || t.closest('.lightbox button')) closeLb();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

/* ---- Scroll reveal animation ---- */
const targets = document.querySelectorAll('main section');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); } }), { threshold: 0.1 });
  targets.forEach(s => { s.classList.add('reveal'); io.observe(s); });
}

/* ---- Leaflet map (contact page) ---- */
function initMap() {
  if (!$('#leaflet-map') || typeof L === 'undefined') return;
  const sites = [
    { n: 'Main Shelter, uMlazi', a: '123 Mangosuthu Highway, uMlazi', p: [-29.95659, 30.82499] },
    { n: 'Donation & Drop-Off Point, Durban Central', a: '45 Dr Pixley KaSeme Street', p: [-29.85819, 31.02253] }];
  const map = L.map('leaflet-map');
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  sites.forEach(s => { const m = L.marker(s.p).addTo(map); const d = document.createElement('div'); const b = document.createElement('strong'); b.textContent = s.n; d.append(b, document.createElement('br'), s.a); m.bindPopup(d); });
  map.fitBounds(sites.map(s => s.p), { padding: [40, 40] });
}
window.addEventListener('load', initMap);

/* ---- Form helpers ---- */
function setErr(input, msg) {
  let sp = input.nextElementSibling;
  if (!sp || !sp.classList.contains('error-msg')) { sp = document.createElement('span'); sp.className = 'error-msg'; input.after(sp); }
  sp.textContent = msg; input.classList.toggle('invalid', !!msg); input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  return !msg;
}
function status(msg, ok) { const s = $('#formStatus'); s.textContent = msg; s.className = ok ? 'ok' : 'bad'; }
function validateCommon(f) {
  const v = id => f.elements[id].value.trim();
  const phone = v('phone').replace(/[\s-]/g, '');
  const res = [
    setErr(f.elements['full-name'], v('full-name').length < 2 ? 'Enter your full name (at least 2 characters).' : ''),
    setErr(f.elements.email, EMAIL.test(v('email')) ? '' : 'Enter a valid email address, e.g. name@example.com.'),
    setErr(f.elements.message, v('message').length >= 20 && v('message').length <= 500 ? '' : 'Your message must be 20 to 500 characters (currently ' + v('message').length + ').')];
  const req = f.elements.phone.required;
  res.push(setErr(f.elements.phone, (!phone && !req) || PHONE.test(phone) ? '' : 'Enter a valid South African number, e.g. 0821234567 or +27821234567.'));
  return res.every(Boolean);
}

/* ---- Enquiry form: validation + AJAX ---- */
const eForm = $('#enquiryForm');
if (eForm) {
  loadAnimals().then(() => { $('#animal-list').replaceChildren(...animals.map(a => Object.assign(document.createElement('option'), { value: a.name }))); });
  const today = new Date().toISOString().split('T')[0]; eForm.elements['visit-date'].min = today;
  eForm.addEventListener('submit', async e => {
    e.preventDefault();
    const type = eForm.elements['enquiry-type'], animal = eForm.elements['animal-name'], date = eForm.elements['visit-date'];
    const dt = date.value ? new Date(date.value + 'T00:00:00') : null;
    const ok = [
      setErr(type, type.value ? '' : 'Please choose what you are enquiring about.'),
      setErr(animal, type.value === 'adoption' && !animal.value.trim() ? "Enter the animal's name for an adoption enquiry." : ''),
      setErr(date, dt && (date.value < today || dt.getDay() === 0) ? 'Choose a date from today onwards, Monday to Saturday.' : ''),
      validateCommon(eForm)].every(Boolean);
    if (!ok) { status('Please fix the highlighted fields.', false); return; }
    status('Sending your enquiry...', true);
    try {
      const res = await fetch(eForm.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(eForm) });
      if (!res.ok) throw new Error(res.status);
      let msg = 'Thank you, ' + eForm.elements['full-name'].value.trim() + '. Your enquiry has been sent and we will reply by email as soon as possible.';
      const a = animals.find(x => x.name.toLowerCase() === animal.value.trim().toLowerCase());
      if (type.value === 'adoption' && a) msg += a.available ? ' Good news: ' + a.name + ' is currently available for adoption.' : ' Unfortunately ' + a.name + ' is no longer available, but we have other animals looking for homes.';
      else if (type.value === 'adoption' && animal.value.trim()) msg += ' We could not find an animal called ' + animal.value.trim() + ' on our list; we will check and confirm.';
      status(msg, true); eForm.reset();
    } catch (err) { status('Sorry, your enquiry could not be sent. Please try again or email info@umlazipaws.org.za.', false); }
  });
}

/* ---- Contact form: validation, then compile an email ---- */
const cForm = $('#contactForm');
if (cForm) {
  cForm.addEventListener('submit', e => {
    e.preventDefault();
    const t = cForm.elements['msg-type'];
    if (![setErr(t, t.value ? '' : 'Please choose a message type.'), validateCommon(cForm)].every(Boolean)) { status('Please fix the highlighted fields.', false); return; }
    const f = id => cForm.elements[id].value.trim();
    const body = 'Name: ' + f('full-name') + '\nEmail: ' + f('email') + '\nPhone: ' + f('phone') + '\nType: ' + t.value + '\n\n' + f('message');
    status('Opening your email app. Press send there to deliver your message.', true);
    location.href = 'mailto:info@umlazipaws.org.za?subject=' + encodeURIComponent(t.value + ' from ' + f('full-name')) + '&body=' + encodeURIComponent(body);
  });
}
initAdoptions();
