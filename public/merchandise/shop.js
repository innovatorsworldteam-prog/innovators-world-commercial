'use strict';
const catalogue = [
  {
    "id": "kiivo-tee",
    "name": "Kiivo “What Do You Notice?” Tee",
    "category": "T-Shirts",
    "shape": "tee",
    "photo": "tshirts",
    "focus": "left",
    "guide": "Kiivo",
    "description": "A chalk-white cotton tee with Kiivo’s curious expression, observation doodles and a question worth wearing.",
    "line": "",
    "materials": "Proposed: 200 gsm combed cotton jersey with ribbed neckline, reinforced shoulders and a full-colour character print.",
    "details": "Front graphic based on the supplied current character reference, with a question-led slogan and globe-lightbulb branding. Unisex regular fit. Final garment measurements, print placement, wash performance and size chart require supplier samples.",
    "variants": "Kiivo: Chalk white · Leera: Midnight navy · Adult XS–XXL target"
  },
  {
    "id": "leera-tee",
    "name": "Leera “Look a Little Closer” Tee",
    "category": "T-Shirts",
    "shape": "tee",
    "photo": "tshirts",
    "focus": "right",
    "guide": "Leera",
    "description": "A navy cotton tee with Leera’s current portrait, thoughtful details and a bold everyday invitation.",
    "line": "",
    "materials": "Proposed: 200 gsm combed cotton jersey with ribbed neckline, reinforced shoulders and a full-colour character print.",
    "details": "Front graphic based on the supplied current character reference, with a question-led slogan and globe-lightbulb branding. Unisex regular fit. Final garment measurements, print placement, wash performance and size chart require supplier samples.",
    "variants": "Kiivo: Chalk white · Leera: Midnight navy · Adult XS–XXL target"
  },
  {
    "id": "kiivo-hoodie",
    "name": "Kiivo Signature Zip Hoodie",
    "category": "Hoodies",
    "shape": "hoodie",
    "photo": "hoodies",
    "focus": "left",
    "guide": "Kiivo",
    "description": "A navy full-zip layer with globe-bulb chest embroidery and a subtle Kiivo signature.",
    "line": "",
    "materials": "Proposed: 320 gsm cotton-rich fleece, double-layer hood, ribbed cuffs and hem; final fibre blend subject to supplier confirmation.",
    "details": "Choose Kiivo’s navy full-zip design with chest embroidery or Leera’s teal pullover with a character print and kangaroo pocket. These are two different constructions. Adult sizes only until a separate youth specification is sampled.",
    "variants": "Kiivo: Navy zip · Leera: Teal pullover · Adult XS–XXL target"
  },
  {
    "id": "leera-hoodie",
    "name": "Leera Explorer Pullover",
    "category": "Hoodies",
    "shape": "hoodie",
    "photo": "hoodies",
    "focus": "right",
    "guide": "Leera",
    "description": "A deep-teal pullover with Leera’s portrait, a generous hood and an everyday kangaroo pocket.",
    "line": "",
    "materials": "Proposed: 320 gsm cotton-rich fleece, double-layer hood, ribbed cuffs and hem; final fibre blend subject to supplier confirmation.",
    "details": "Choose Kiivo’s navy full-zip design with chest embroidery or Leera’s teal pullover with a character print and kangaroo pocket. These are two different constructions. Adult sizes only until a separate youth specification is sampled.",
    "variants": "Kiivo: Navy zip · Leera: Teal pullover · Adult XS–XXL target"
  },
  {
    "id": "kiivo-backpack",
    "name": "Kiivo Discovery Backpack",
    "category": "Backpacks",
    "shape": "backpack",
    "photo": "backpacks",
    "focus": "left",
    "guide": "Kiivo",
    "description": "A navy everyday backpack with purposeful pockets, gold hardware and a removable Kiivo patch.",
    "line": "",
    "materials": "Proposed: 600D woven polyester, lined compartments, padded back and shoulder straps, mesh bottle pockets and gold-tone zip pulls.",
    "details": "Target 20 L capacity with a padded laptop sleeve, front zipped pocket and removable character patch. Laptop fit, load limits, durability and patch attachment require supplier verification. Bottle shown is styling only and is not included.",
    "variants": "Kiivo: Navy · Leera: Teal · 20 L target"
  },
  {
    "id": "leera-backpack",
    "name": "Leera Explorer Backpack",
    "category": "Backpacks",
    "shape": "backpack",
    "photo": "backpacks",
    "focus": "right",
    "guide": "Leera",
    "description": "A deep-teal companion for your notebook, your next question and everything in between.",
    "line": "",
    "materials": "Proposed: 600D woven polyester, lined compartments, padded back and shoulder straps, mesh bottle pockets and gold-tone zip pulls.",
    "details": "Target 20 L capacity with a padded laptop sleeve, front zipped pocket and removable character patch. Laptop fit, load limits, durability and patch attachment require supplier verification. Bottle shown is styling only and is not included.",
    "variants": "Kiivo: Navy · Leera: Teal · 20 L target"
  },
  {
    "id": "kiivo-notebook",
    "name": "Kiivo Idea Notebook",
    "category": "Notebooks",
    "shape": "book",
    "photo": "notebooks",
    "focus": "right",
    "guide": "Kiivo",
    "description": "A navy A5 hardback for observations, sketches and ideas worth coming back to.",
    "line": "",
    "materials": "Proposed: A5 hardback, 160 pages of 100 gsm uncoated paper, cloth-textured cover and full-colour character artwork.",
    "details": "Kiivo edition uses a bound hardback format; Leera edition uses gold-tone spiral binding inspired by the supplied reference. Choose ruled or dot-grid pages. Cover finish, print alignment and paper performance require sampling. Pencil shown is not included.",
    "variants": "Kiivo: Navy hardback · Leera: Teal spiral · A5"
  },
  {
    "id": "leera-notebook",
    "name": "Leera Reflection Notebook",
    "category": "Notebooks",
    "shape": "book",
    "photo": "notebooks",
    "focus": "left",
    "guide": "Leera",
    "description": "A teal A5 spiral notebook that gives your questions room to become something more.",
    "line": "",
    "materials": "Proposed: A5 hardback, 160 pages of 100 gsm uncoated paper, cloth-textured cover and full-colour character artwork.",
    "details": "Kiivo edition uses a bound hardback format; Leera edition uses gold-tone spiral binding inspired by the supplied reference. Choose ruled or dot-grid pages. Cover finish, print alignment and paper performance require sampling. Pencil shown is not included.",
    "variants": "Kiivo: Navy hardback · Leera: Teal spiral · A5"
  },
  {
    "id": "pencil-case",
    "name": "The Studio Pencil Case",
    "category": "Stationery",
    "shape": "pouch",
    "photo": "stationery",
    "focus": "full",
    "guide": "Kiivo & Leera",
    "description": "A navy canvas zip pouch with gold globe-bulb branding. A useful home for your everyday thinking tools.",
    "line": "",
    "materials": "Proposed: navy cotton canvas outer, lined interior and gold-tone metal zip.",
    "details": "Target size 21 × 8 × 5 cm with a small gold globe-lightbulb emblem. The stationery group photograph shows companion items; this SKU includes only the pencil case.",
    "variants": "Navy · Pencil case only"
  },
  {
    "id": "stationery-set",
    "name": "The Kiivo & Leera Stationery Set",
    "category": "Stationery",
    "shape": "stationery",
    "photo": "stationery",
    "focus": "full",
    "guide": "Kiivo & Leera",
    "description": "A coordinated pencil case, pen duo, six pencils, pocket notebook and two character stickers.",
    "line": "",
    "materials": "Proposed: canvas zip pencil case, two aluminium click pens, six wood-cased graphite pencils, A6 pocket notebook and two die-cut character stickers.",
    "details": "A coordinated everyday stationery set using the current Kiivo and Leera references. Final pack contents, ink and refill compatibility, pencil grades and material composition require supplier confirmation.",
    "variants": "Navy + teal · 12 pieces across 5 product types"
  }
];
const $ = id => document.getElementById(id);
let selected = {};
try { const saved=JSON.parse(localStorage.getItem('iw-merch-list')||'{}'); for(const p of catalogue) if(Number.isInteger(saved[p.id])&&saved[p.id]>0&&saved[p.id]<=999) selected[p.id]=saved[p.id]; } catch {}
let category='All', timer;
function save(){try{localStorage.setItem('iw-merch-list',JSON.stringify(selected));}catch{} $('count').textContent=String(Object.values(selected).reduce((a,b)=>a+b,0));}
function art(p){return `<span class="photo-frame focus-${p.focus}"><img class="product-photo" src="/assets/merchandise-v3/${p.photo}.webp" alt="${p.name}; generated product mockup showing coordinated collection designs" loading="lazy"></span>`;}
function render(){const query=$('search').value.trim().toLowerCase();const items=catalogue.filter(p=>(category==='All'||p.category===category)&&`${p.name} ${p.guide} ${p.description} ${p.materials}`.toLowerCase().includes(query));$('results').textContent=`${items.length} design${items.length===1?'':'s'} to explore`;$('products').innerHTML=items.map(p=>`<article class="product"><button class="product-art" data-detail="${p.id}" aria-label="Explore ${p.name}">${art(p)}</button><p class="meta">${p.category.toUpperCase()} · ${p.guide.toUpperCase()}</p><h3>${p.name}</h3><p>${p.description}</p><div class="row"><span>Preview · Price to be confirmed</span><button class="add" data-add="${p.id}">Add to list +</button></div></article>`).join('');if(!items.length)$('products').textContent='No designs match your search. Try another term or category.';}
$('filters').innerHTML=['All',...new Set(catalogue.map(p=>p.category))].map(c=>`<button aria-pressed="${c===category}" data-category="${c}">${c}</button>`).join('');
$('filters').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;for(const el of $('filters').children)el.setAttribute('aria-pressed',String(el===b));render();});
$('search').addEventListener('input',render);
function add(id){selected[id]=Math.min(999,(selected[id]||0)+1);save();$('toast').textContent='Added to your enquiry list';clearTimeout(timer);timer=setTimeout(()=>$('toast').textContent='',2500);}
document.addEventListener('click',e=>{const addButton=e.target.closest('[data-add]');if(addButton)add(addButton.dataset.add);const detail=e.target.closest('[data-detail]');if(detail){const p=catalogue.find(p=>p.id===detail.dataset.detail);$('detail-content').innerHTML=`<div class="product-art">${art(p)}</div><p class="eyebrow">${p.guide.toUpperCase()} · PRODUCT DESIGN</p><h2>${p.name}</h2><p>${p.description}</p><h3>Proposed materials</h3><p>${p.materials}</p><h3>Thoughtful details</h3><p>${p.details}</p><p>${p.variants}</p><p>Price, availability and delivery to be confirmed. Product mockup; final product subject to sampling.</p><button class="button gold" data-add="${p.id}">Add to enquiry list +</button>`;$('detail').showModal();}const close=e.target.closest('[data-close]');if(close)$(close.dataset.close).close();});
function renderList(){$('list-items').innerHTML=Object.keys(selected).length?catalogue.filter(p=>selected[p.id]).map(p=>`<div><strong>${p.name}</strong><label>Qty <input type="number" min="1" max="999" step="1" value="${selected[p.id]}" data-qty="${p.id}" aria-label="Quantity for ${p.name}"></label><button data-remove="${p.id}">Remove</button></div>`).join(''):'<p>Your list is empty. Explore the collection and add a design.</p>';$('download').disabled=!Object.keys(selected).length;}
function openList(){renderList();$('list').showModal();}
$('open-list').addEventListener('click',openList);$('bulk-list').addEventListener('click',openList);
$('list-items').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){delete selected[b.dataset.remove];save();renderList();}});
$('list-items').addEventListener('change',e=>{if(e.target.dataset.qty){const v=Number(e.target.value);if(!Number.isInteger(v)||v<1||v>999){e.target.value=selected[e.target.dataset.qty];return;}selected[e.target.dataset.qty]=v;save();}});
$('list-items').addEventListener('input',e=>{if(e.target.dataset.qty){const v=Number(e.target.value);if(Number.isInteger(v)&&v>=1&&v<=999){selected[e.target.dataset.qty]=v;save();}}});
$('download').addEventListener('click',()=>{const lines=['INNOVATORS WORLD — MERCHANDISE ENQUIRY','This is a request for a quote, not an order. Prices, availability, materials and delivery require confirmation.','',...catalogue.filter(p=>selected[p.id]).map(p=>`${p.id} | ${p.name} | Quantity: ${selected[p.id]} | ${p.variants}`),'','Notes:',$('notes').value,'','Share this file with your Innovators World contact. No enquiry has been submitted automatically.'];const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='innovators-world-merchandise-enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
save();render();
