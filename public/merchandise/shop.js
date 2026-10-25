'use strict';
const catalogue = [
  {
    "id": "everyday-tee",
    "name": "The Everyday Innovator Tee",
    "category": "T-Shirts",
    "guide": "Brand",
    "shape": "tee",
    "line": "QUESTION<br>EVERYTHING.",
    "description": "A clean everyday essential with a small gold chest emblem and a bold question-led back print.",
    "materials": "Proposed production spec: 200 gsm combed cotton jersey, ribbed neckline, reinforced shoulder tape and screen-printed artwork.",
    "details": "Regular unisex fit. Front: 7 cm emblem. Back: 26 cm typographic artwork. Sizes and garment measurements must be confirmed against supplier samples.",
    "variants": "Midnight navy / Chalk white · XS–XXL target"
  },
  {
    "id": "oversized-tee",
    "name": "See. Think. Create. Oversized Tee",
    "category": "T-Shirts",
    "guide": "Brand",
    "shape": "tee",
    "line": "SEE. THINK.<br>CREATE.",
    "description": "A relaxed silhouette with a statement message for people who make things happen.",
    "materials": "Proposed production spec: 240 gsm cotton jersey, dropped shoulders and a substantial rib collar.",
    "details": "Oversized unisex fit with a large three-line front print and a small back-neck signature. Colourfastness and shrinkage to be verified during sampling.",
    "variants": "Chalk white / Deep teal · XS–XXL target"
  },
  {
    "id": "hoodie",
    "name": "The Everyday Innovator Hoodie",
    "category": "Hoodies",
    "guide": "Brand",
    "shape": "hoodie",
    "line": "STAY<br>CURIOUS.",
    "description": "The layer you reach for when a small idea turns into a late-night project.",
    "materials": "Proposed production spec: 320 gsm cotton-rich brushed fleece, double-layer hood, rib cuffs and hem, kangaroo pocket.",
    "details": "Pullover unisex fit. Gold chest embroidery and a tonal back statement. Supplier must confirm final fibre composition and a separate drawcord-free youth specification.",
    "variants": "Midnight navy / Deep teal · Adult XS–XXL target"
  },
  {
    "id": "zip-hoodie",
    "name": "The Studio Zip Hoodie",
    "category": "Hoodies",
    "guide": "Brand",
    "shape": "hoodie",
    "line": "IDEAS<br>IN MOTION.",
    "description": "An easy studio-to-street layer with understated Innovators World detailing.",
    "materials": "Proposed production spec: 300 gsm cotton-rich loopback fabric, full-length zip, two front pockets and rib cuffs.",
    "details": "Left-chest embroidered emblem with a back-neck wordmark. Zip hardware, exact blend and size chart to be confirmed during sampling.",
    "variants": "Midnight navy · Adult XS–XXL target"
  },
  {
    "id": "backpack",
    "name": "The Daily Discovery Backpack",
    "category": "Bags",
    "guide": "Brand",
    "shape": "backpack",
    "line": "GO<br>DISCOVER.",
    "description": "A purposeful everyday backpack for notebooks, your laptop and your next big idea.",
    "materials": "Proposed production spec: 600D polyester outer, lined main compartment, padded back panel and adjustable shoulder straps.",
    "details": "Target capacity 20 L; padded sleeve targeting laptops up to 15 inches, front zipped pocket and two bottle pockets. Fit, load and zip durability require sample verification.",
    "variants": "Midnight navy / Deep teal · 20 L target"
  },
  {
    "id": "tote",
    "name": "The Ideas Tote",
    "category": "Bags",
    "guide": "Brand",
    "shape": "tote",
    "line": "GOOD IDEAS<br>GO PLACES.",
    "description": "A generous canvas carryall with a bold message and room for everyday essentials.",
    "materials": "Proposed production spec: 340 gsm cotton canvas, reinforced long handles and internal slip pocket.",
    "details": "Target dimensions 38 × 42 cm with a 10 cm gusset. Single-colour screen print, suitable for individual sales and workshop bundles.",
    "variants": "Natural / Midnight navy · One size"
  },
  {
    "id": "notebook",
    "name": "The Idea Book",
    "category": "Notebooks",
    "guide": "Brand",
    "shape": "book",
    "line": "EVERY IDEA<br>STARTS HERE.",
    "description": "A premium hardback notebook for sketches, notes and questions worth keeping.",
    "materials": "Proposed production spec: A5 cloth-textured hard cover, 160 pages of 100 gsm uncoated paper, sewn binding and ribbon marker.",
    "details": "Choice of ruled or dot-grid pages. Gold foil front emblem with a short observation prompt on the opening page.",
    "variants": "Midnight navy / Deep teal · A5 · Ruled or dot grid"
  },
  {
    "id": "pocket-notebooks",
    "name": "Pocket Ideas Notebook Trio",
    "category": "Notebooks",
    "guide": "Brand",
    "shape": "book",
    "line": "NOTICE.<br>NOTE.<br>REPEAT.",
    "description": "Three pocket notebooks, ready whenever inspiration interrupts your day.",
    "materials": "Proposed production spec: three A6 softcover notebooks, 48 pages each, 90 gsm paper and stitched spines.",
    "details": "One ruled, one plain and one dot-grid notebook. Navy, teal and natural covers with coordinated gold typography.",
    "variants": "Mixed colour trio · A6 · 3 notebooks"
  },
  {
    "id": "pencil-case",
    "name": "The Studio Pencil Case",
    "category": "Stationery",
    "guide": "Brand",
    "shape": "pouch",
    "line": "TOOLS FOR<br>WHAT IF.",
    "description": "A compact zip pouch to keep your everyday making tools together.",
    "materials": "Proposed production spec: cotton canvas outer, wipe-clean lining and metal zip pull.",
    "details": "Target dimensions 21 × 8 × 5 cm. Small printed emblem on the front. Contents are sold separately.",
    "variants": "Midnight navy / Deep teal · One size"
  },
  {
    "id": "pens",
    "name": "Signature Pen Duo",
    "category": "Stationery",
    "guide": "Brand",
    "shape": "pens",
    "line": "MAKE<br>YOUR MARK.",
    "description": "Two smooth-writing everyday pens with a considered navy-and-gold finish.",
    "materials": "Proposed production spec: two aluminium-barrel click pens with replaceable 0.7 mm black-ink refills.",
    "details": "Laser-marked wordmark and gold-tone clip. Refill compatibility, ink performance and finish durability to be confirmed by supplier.",
    "variants": "Navy + teal · 2 pens · Black ink"
  },
  {
    "id": "pencils",
    "name": "Sketch & Think Pencil Set",
    "category": "Stationery",
    "guide": "Brand",
    "shape": "pencils",
    "line": "DRAW OUT<br>AN IDEA.",
    "description": "A six-pencil set for quick sketches, rough plans and possibilities on paper.",
    "materials": "Proposed production spec: six wood-cased graphite pencils with printed barrels in a card sleeve.",
    "details": "Two HB, two 2B and two 4B pencils. Navy and teal barrel finish with gold text. Graphite grades and coating suitability to be confirmed before sale.",
    "variants": "Mixed grades · 6 pencils"
  },
  {
    "id": "desk-pad",
    "name": "The What If? Desk Pad",
    "category": "Stationery",
    "guide": "Brand",
    "shape": "pad",
    "line": "WHAT IF<br>YOU TRIED?",
    "description": "A clear space for the question, the sketch and the next step.",
    "materials": "Proposed production spec: A4 landscape tear-off pad, 50 sheets of 100 gsm paper and rigid card backing.",
    "details": "Printed sections for Observe, Question, Sketch and Next Step. Designed for workshops and everyday planning.",
    "variants": "Warm white · A4 landscape · 50 sheets"
  },
  {
    "id": "stationery-set",
    "name": "The Everyday Ideas Stationery Set",
    "category": "Sets",
    "guide": "Brand",
    "shape": "bundle",
    "line": "OPEN UP<br>POSSIBILITY.",
    "description": "Your everyday thinking tools, brought together in one ready-to-gift set.",
    "materials": "Proposed production spec: one A5 Idea Book, one Signature Pen Duo and one Studio Pencil Case in a kraft presentation box.",
    "details": "Three coordinated product types. A useful starter gift for students, teams and programme participants; notebook ruling can be requested.",
    "variants": "Navy / Teal · Notebook + 2 pens + case"
  },
  {
    "id": "campus-set",
    "name": "The Campus Starter Set",
    "category": "Sets",
    "guide": "Brand",
    "shape": "bundle",
    "line": "READY FOR<br>WHAT’S NEXT.",
    "description": "A backpack, notebook and pencil case for the next chapter of your journey.",
    "materials": "Proposed production spec: one Daily Discovery Backpack, one A5 Idea Book and one Studio Pencil Case.",
    "details": "Packed as a coordinated everyday carry set. Suitable for institutional enquiries with requested quantities and customisation.",
    "variants": "Midnight navy / Deep teal · 3 products"
  }
];
const $ = id => document.getElementById(id);
let selected = {};
try { const saved=JSON.parse(localStorage.getItem('iw-merch-list')||'{}'); for(const p of catalogue) if(Number.isInteger(saved[p.id])&&saved[p.id]>0&&saved[p.id]<=999) selected[p.id]=saved[p.id]; } catch {}
let category='All', timer;
function save(){try{localStorage.setItem('iw-merch-list',JSON.stringify(selected));}catch{} $('count').textContent=String(Object.values(selected).reduce((a,b)=>a+b,0));}
function art(p){return `<div class="${p.shape==='book'?'book':'object '+p.shape}"><img src="/assets/innovators-world-symbol.png" alt="Innovators World emblem"><b>${p.line}</b><small>INNOVATORS WORLD</small></div>`;}
function render(){const query=$('search').value.trim().toLowerCase();const items=catalogue.filter(p=>(category==='All'||p.category===category)&&`${p.name} ${p.guide} ${p.description} ${p.materials}`.toLowerCase().includes(query));$('results').textContent=`${items.length} design${items.length===1?'':'s'} to explore`;$('products').innerHTML=items.map(p=>`<article class="product"><button class="product-art" data-detail="${p.id}" aria-label="Explore ${p.name}">${art(p)}</button><p class="meta">${p.category.toUpperCase()}</p><h3>${p.name}</h3><p>${p.description}</p><div class="row"><span>Preview · Price to be confirmed</span><button class="add" data-add="${p.id}">Add to list +</button></div></article>`).join('');if(!items.length)$('products').textContent='No designs match your search. Try another term or category.';}
$('filters').innerHTML=['All',...new Set(catalogue.map(p=>p.category))].map(c=>`<button aria-pressed="${c===category}" data-category="${c}">${c}</button>`).join('');
$('filters').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;for(const el of $('filters').children)el.setAttribute('aria-pressed',String(el===b));render();});
$('search').addEventListener('input',render);
function add(id){selected[id]=Math.min(999,(selected[id]||0)+1);save();$('toast').textContent='Added to your enquiry list';clearTimeout(timer);timer=setTimeout(()=>$('toast').textContent='',2500);}
document.addEventListener('click',e=>{const addButton=e.target.closest('[data-add]');if(addButton)add(addButton.dataset.add);const detail=e.target.closest('[data-detail]');if(detail){const p=catalogue.find(p=>p.id===detail.dataset.detail);$('detail-content').innerHTML=`<div class="product-art">${art(p)}</div><p class="eyebrow">INNOVATORS WORLD · PRODUCT DESIGN</p><h2>${p.name}</h2><p>${p.description}</p><h3>Proposed materials</h3><p>${p.materials}</p><h3>Thoughtful details</h3><p>${p.details}</p><p>${p.variants}</p><p>Price, availability and delivery to be confirmed. Product mockup; final product subject to sampling.</p><button class="button gold" data-add="${p.id}">Add to enquiry list +</button>`;$('detail').showModal();}const close=e.target.closest('[data-close]');if(close)$(close.dataset.close).close();});
function renderList(){$('list-items').innerHTML=Object.keys(selected).length?catalogue.filter(p=>selected[p.id]).map(p=>`<div><strong>${p.name}</strong><label>Qty <input type="number" min="1" max="999" step="1" value="${selected[p.id]}" data-qty="${p.id}" aria-label="Quantity for ${p.name}"></label><button data-remove="${p.id}">Remove</button></div>`).join(''):'<p>Your list is empty. Explore the collection and add a design.</p>';$('download').disabled=!Object.keys(selected).length;}
function openList(){renderList();$('list').showModal();}
$('open-list').addEventListener('click',openList);$('bulk-list').addEventListener('click',openList);
$('list-items').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b){delete selected[b.dataset.remove];save();renderList();}});
$('list-items').addEventListener('change',e=>{if(e.target.dataset.qty){const v=Number(e.target.value);if(!Number.isInteger(v)||v<1||v>999){e.target.value=selected[e.target.dataset.qty];return;}selected[e.target.dataset.qty]=v;save();}});
$('list-items').addEventListener('input',e=>{if(e.target.dataset.qty){const v=Number(e.target.value);if(Number.isInteger(v)&&v>=1&&v<=999){selected[e.target.dataset.qty]=v;save();}}});
$('download').addEventListener('click',()=>{const lines=['INNOVATORS WORLD — MERCHANDISE ENQUIRY','This is a request for a quote, not an order. Prices, availability, materials and delivery require confirmation.','',...catalogue.filter(p=>selected[p.id]).map(p=>`${p.id} | ${p.name} | Quantity: ${selected[p.id]} | ${p.variants}`),'','Notes:',$('notes').value,'','Share this file with your Innovators World contact. No enquiry has been submitted automatically.'];const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='innovators-world-merchandise-enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
save();render();
