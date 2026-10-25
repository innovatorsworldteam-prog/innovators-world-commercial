'use strict';

const el = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storageKey = 'iw-practical-gear-v1';
let catalogue = [];
let selections = [];
let category = 'All';
let activeProduct = null;
let toastTimer;

function readSavedList() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (Array.isArray(saved.items)) selections = saved.items.filter(item => {
      const product = catalogue.find(p => p.id === item.productId);
      return product && product.options.includes(item.option) && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 999 && (!product.needsDeviceModel || (typeof item.device === 'string' && item.device.trim().length > 0 && item.device.length <= 120));
    });
    el('notes').value = typeof saved.notes === 'string' ? saved.notes.slice(0, 2000) : '';
  } catch { selections = []; }
  updateCount();
}

function save() {
  try { localStorage.setItem(storageKey, JSON.stringify({items:selections, notes:el('notes').value})); } catch {}
  updateCount();
}

function updateCount() {
  el('count').textContent = String(selections.reduce((total, item) => total + item.quantity, 0));
}

function photo(product, full = false) {
  const focus = full ? 'full' : product.focus;
  return `<span class="photo-frame focus-${escapeHtml(focus)}"><img class="product-photo" src="/assets/gear/${escapeHtml(product.photo)}.webp" alt="${escapeHtml(product.name)} — proposed physical gear with Innovators World branding; collection mockup" loading="lazy"></span>`;
}

function render() {
  const query = el('search').value.trim().toLowerCase();
  const guide = el('guide').value;
  const products = catalogue.filter(p =>
    (category === 'All' || category === p.category) &&
    (guide === 'All' || guide === p.guide || (guide !== 'Both' && p.guide === 'Both')) &&
    `${p.name} ${p.category} ${p.guide} ${p.description} ${p.material} ${p.materials}`.toLowerCase().includes(query)
  );
  el('results').textContent = `${products.length} ${products.length === 1 ? 'item' : 'items'} to explore`;
  if (!products.length) {
    el('products').innerHTML = '<p class="empty-results">No gear matches these filters. Try another collection, category or search term.</p>';
    return;
  }
  el('products').innerHTML = products.map(p => `<article class="product">
    <button class="product-art" data-detail="${escapeHtml(p.id)}" aria-label="Explore ${escapeHtml(p.name)}">${photo(p)}</button>
    <p class="meta">${escapeHtml(p.category.toUpperCase())} · ${escapeHtml(p.guide === 'Both' ? 'SHARED ESSENTIALS' : p.guide.toUpperCase())}</p>
    <h3>${escapeHtml(p.name)}</h3>
    <p class="material-tag">${escapeHtml(p.material)}</p>
    <p>${escapeHtml(p.description)}</p>
    <div class="row"><span>Price to be confirmed</span><button class="add" data-detail="${escapeHtml(p.id)}">Choose options ↗</button></div>
  </article>`).join('');
}

function openDetail(id) {
  const p = catalogue.find(product => product.id === id);
  if (!p) return;
  activeProduct = p;
  el('detail-content').innerHTML = `<div class="product-art">${photo(p, true)}</div>
    <p class="eyebrow">${escapeHtml(p.guide === 'Both' ? 'INNOVATORS WORLD' : p.guide.toUpperCase() + '’S GEAR')} · DESIGN MOCKUP</p>
    <h2 id="detail-title">${escapeHtml(p.name)}</h2>
    <p>${escapeHtml(p.description)}</p>
    <h3>Materials &amp; construction</h3><p>${escapeHtml(p.materials)}</p>
    <h3>What to know</h3><p>${escapeHtml(p.details)}</p>
    <p class="finish">${escapeHtml(p.finish)}</p>
    <form id="configure-product" class="configuration">
      <label>${escapeHtml(p.optionLabel)}<select id="product-option">${p.options.map(option => `<option>${escapeHtml(option)}</option>`).join('')}</select></label>
      <label>Quantity<input id="product-quantity" type="number" value="1" min="1" max="999" step="1" required></label>
      ${p.needsDeviceModel ? '<label class="device-model-label">Device make, exact model and year<input id="device-model" type="text" maxlength="120" required placeholder="Include lid dimensions for a custom laptop cut"></label>' : ''}
      <button class="button gold" type="submit">Add this gear to my list +</button>
    </form>
    <p class="caption">Generated collection mockup; companion products may be pictured. Only the named item or stated pack is included. Final materials, sizing, price and availability require confirmation before ordering.</p>`;
  el('detail').showModal();
}

function addConfiguredProduct(event) {
  if (event.target.id !== 'configure-product') return;
  event.preventDefault();
  if (!activeProduct || !event.target.reportValidity()) return;
  const quantity = Number(el('product-quantity').value);
  const option = el('product-option').value;
  const device = activeProduct.needsDeviceModel ? el('device-model').value.trim() : '';
  if (activeProduct.needsDeviceModel && !device) return;
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999 || !activeProduct.options.includes(option)) return;
  const existing = selections.find(item => item.productId === activeProduct.id && item.option === option && (item.device || '') === device);
  if (existing) existing.quantity = Math.min(999, existing.quantity + quantity);
  else selections.push({productId:activeProduct.id, option, quantity, device});
  save();
  el('detail').close();
  clearTimeout(toastTimer);
  el('toast').textContent = `${activeProduct.name} added · ${option}`;
  toastTimer = setTimeout(() => { el('toast').textContent = ''; }, 3500);
}

function renderList() {
  el('list-items').innerHTML = selections.length ? selections.map((item, index) => {
    const p = catalogue.find(product => product.id === item.productId);
    return `<div class="list-line"><div class="list-description"><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(item.option)}</span>${item.device ? `<span>Device: ${escapeHtml(item.device)}</span>` : ''}</div>
      <label>Qty <input type="number" min="1" max="999" step="1" required value="${item.quantity}" data-qty="${index}" aria-label="Quantity for ${escapeHtml(p.name)}, ${escapeHtml(item.option)}${item.device ? ', ' + escapeHtml(item.device) : ''}"></label>
      <button data-remove="${index}" aria-label="Remove ${escapeHtml(p.name)}, ${escapeHtml(item.option)}${item.device ? ', ' + escapeHtml(item.device) : ''}">Remove</button></div>`;
  }).join('') : '<p>Your list is empty. Explore the gear and choose a size or format to get started.</p>';
  updateDownloadState();
}

function updateDownloadState() {
  const fields = [...el('list-items').querySelectorAll('input')];
  el('download').disabled = !selections.length || fields.some(field => !field.checkValidity());
}

function openList() { renderList(); el('list').showModal(); }

function downloadList() {
  if (!selections.length || [...el('list-items').querySelectorAll('input')].some(input => !input.reportValidity())) return;
  const lines = ['INNOVATORS WORLD — PRACTICAL GEAR ENQUIRY',
    'Request for a quote only. This is not an order. Confirm final materials, sizes, device compatibility, price, stock and delivery before payment.', '',
    ...selections.map(item => {
      const product = catalogue.find(p => p.id === item.productId);
      return `${product.id} | ${product.name} | ${item.option}${item.device ? ' | Device: ' + item.device : ''} | Quantity: ${item.quantity}`;
    }), '', 'Notes / exact device model / dimensions / customisation:', el('notes').value, '',
    'Share this file with your Innovators World contact. No enquiry has been submitted automatically.'];
  const url = URL.createObjectURL(new Blob([lines.join('\n')], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'innovators-world-gear-enquiry.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

el('filters').addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  category = button.dataset.category;
  for (const child of el('filters').children) child.setAttribute('aria-pressed', String(child === button));
  render();
});
el('search').addEventListener('input', render);
el('guide').addEventListener('change', render);
el('notes').addEventListener('input', save);
el('open-list').addEventListener('click', openList);
el('bulk-list').addEventListener('click', openList);
el('download').addEventListener('click', downloadList);
document.addEventListener('submit', addConfiguredProduct);
document.addEventListener('click', event => {
  const detail = event.target.closest('[data-detail]');
  if (detail) openDetail(detail.dataset.detail);
  const close = event.target.closest('[data-close]');
  if (close) el(close.dataset.close).close();
});
el('list-items').addEventListener('click', event => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  selections.splice(Number(button.dataset.remove), 1);
  save();
  renderList();
});
el('list-items').addEventListener('input', event => {
  if (!event.target.matches('[data-qty]')) return;
  const value = Number(event.target.value);
  if (Number.isInteger(value) && value >= 1 && value <= 999) {
    selections[Number(event.target.dataset.qty)].quantity = value;
    save();
  }
  updateDownloadState();
});

(async function init() {
  try {
    const response = await fetch('/merchandise/catalogue.json?v=4');
    if (!response.ok) throw new Error('Catalogue unavailable');
    const data = await response.json();
    if (!Array.isArray(data) || data.some(p => !p.id || !p.name || !Array.isArray(p.options) || !p.options.length || !/^[a-z-]+$/.test(p.photo))) throw new Error('Invalid catalogue');
    catalogue = data;
    readSavedList();
    el('filters').innerHTML = ['All', ...new Set(catalogue.map(p => p.category))].map(c => `<button aria-pressed="${c === category}" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('');
    render();
  } catch (error) {
    el('results').textContent = 'The collection could not be loaded. Please reload the page to try again.';
    console.error('Merchandise catalogue load failed', error);
  }
})();
