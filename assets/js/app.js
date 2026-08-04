
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const catalog = window.AUREA_CATALOG || {};
let galleries = {};
let lang = "it";
let activeFilter = "all";
let activeStatus = "all";
let currentCode = "";
let currentIndex = 0;
let currentInquiry = null;

const ui = {
  it: {
    collection: "Collezione", about: "La collezione", contact: "Contatti",
    heroTag: "Collezione privata di antiquariato italiano",
    heroCopy: "Mobili, dipinti e oggetti decorativi appartenuti alla nostra famiglia e presentati con essenzialità.",
    explore: "Esplora la collezione",
    art: "Una collezione privata di famiglia",
    artCopy: "AUREA Collection nasce dal desiderio di valorizzare mobili, dipinti e oggetti decorativi appartenuti alla nostra famiglia. Ogni pezzo è presentato con fotografie accurate e descrizioni essenziali, nel rispetto della sua storia e della sua bellezza.",
    title: "La collezione",
    intro: "Una selezione privata di mobili, dipinti, specchi, sedute e oggetti decorativi.",
    all: "Tutti", dimensions: "Misure", request: "Richiedi informazioni su questo oggetto",
    furniture: "Mobili", mirrors: "Specchi", paintings: "Dipinti", seating: "Sedute", decorative: "Oggetti decorativi", decorative_panels: "Pannelli decorativi", lighting: "Illuminazione",
    available: "Disponibile", reserved: "Riservato", sold: "Venduto",
    allStatuses: "Tutti gli stati",
    aboutCopy: "AUREA Collection riunisce mobili, dipinti, specchi e oggetti decorativi appartenuti a una collezione privata italiana di famiglia.",
    contactTitle: "Richiedi informazioni",
    contactCopy: "Per ulteriori informazioni o per concordare una visione in Italia, indica sempre il codice dell’oggetto.",
    formTitle: "Richiedi informazioni",
    name: "Nome e cognome", email: "Email", phone: "Numero di cellulare",
    preferred: "Come preferisce essere contattato?", byEmail: "Email", byPhone: "Cellulare",
    message: "Messaggio", send: "Invia richiesta", close: "Chiudi",
    defaultMessage: "Vorrei ricevere informazioni sull’oggetto",
    phoneRequired: "Inserisca il numero di cellulare.",
    labelRole: "Lei è", rolePlaceholder: "Seleziona", rolePrivate: "Privato", roleCollector: "Collezionista", roleAntiqueDealer: "Antiquario", roleGallery: "Galleria", roleInteriorDesigner: "Interior Designer", roleArchitect: "Architetto", roleOther: "Altro", labelOtherRole: "Specificare",
    otherRoleRequired: "Specifichi la tipologia.",
    sentNote: ""
  },
  en: {
    collection: "Collection", about: "About", contact: "Contact",
    heroTag: "Private collection of Italian antiques",
    heroCopy: "Furniture, paintings and decorative objects belonging to our family and presented with restraint.",
    explore: "Explore the collection",
    art: "A private family collection",
    artCopy: "AUREA Collection was created to preserve and present furniture, paintings and decorative objects belonging to our family. Each piece is shown through accurate photography and concise descriptions, with respect for its history and beauty.",
    title: "The Collection",
    intro: "A private selection of furniture, paintings, mirrors, seating and decorative objects.",
    all: "All", dimensions: "Dimensions", request: "Request information about this object",
    furniture: "Furniture", mirrors: "Mirrors", paintings: "Paintings", seating: "Seating", decorative: "Decorative Objects", decorative_panels: "Decorative Panels", lighting: "Lighting",
    available: "Available", reserved: "Reserved", sold: "Sold",
    allStatuses: "All statuses",
    aboutCopy: "AUREA Collection brings together furniture, paintings, mirrors and decorative objects from a private Italian family collection.",
    contactTitle: "Request information",
    contactCopy: "For further information or to arrange a viewing in Italy, please always quote the item code.",
    formTitle: "Request information",
    name: "Full name", email: "Email", phone: "Mobile number",
    preferred: "How would you prefer to be contacted?", byEmail: "Email", byPhone: "Mobile phone",
    message: "Message", send: "Send request", close: "Close",
    defaultMessage: "I would like to receive information about",
    phoneRequired: "Please enter your mobile number.",
    labelRole: "You are", rolePlaceholder: "Select", rolePrivate: "Private individual", roleCollector: "Collector", roleAntiqueDealer: "Antique dealer", roleGallery: "Gallery", roleInteriorDesigner: "Interior Designer", roleArchitect: "Architect", roleOther: "Other", labelOtherRole: "Please specify",
    otherRoleRequired: "Please specify your role.",
    sentNote: ""
  },
  fr: {
    collection: "Collection", about: "À propos", contact: "Contact",
    heroTag: "Collection privée d’antiquités italiennes",
    heroCopy: "Meubles, peintures et objets décoratifs appartenant à notre famille, présentés avec sobriété.",
    explore: "Découvrir la collection",
    art: "Une collection familiale privée",
    artCopy: "AUREA Collection est née du désir de valoriser des meubles, peintures et objets décoratifs appartenant à notre famille. Chaque pièce est présentée avec des photographies soignées et des descriptions essentielles, dans le respect de son histoire et de sa beauté.",
    title: "La collection",
    intro: "Une sélection privée de meubles, peintures, miroirs, sièges et objets décoratifs.",
    all: "Tout", dimensions: "Dimensions", request: "Demander des informations sur cet objet",
    furniture: "Mobilier", mirrors: "Miroirs", paintings: "Peintures", seating: "Sièges", decorative: "Objets décoratifs", decorative_panels: "Panneaux décoratifs", lighting: "Luminaires",
    available: "Disponible", reserved: "Réservé", sold: "Vendu",
    allStatuses: "Tous les statuts",
    aboutCopy: "AUREA Collection réunit meubles, peintures, miroirs et objets décoratifs provenant d’une collection familiale italienne privée.",
    contactTitle: "Demander des informations",
    contactCopy: "Pour davantage d’informations ou pour organiser une visite en Italie, veuillez toujours indiquer le code de l’objet.",
    formTitle: "Demander des informations",
    name: "Nom et prénom", email: "Email", phone: "Numéro de portable",
    preferred: "Comment préférez-vous être contacté ?", byEmail: "Email", byPhone: "Téléphone portable",
    message: "Message", send: "Envoyer la demande", close: "Fermer",
    defaultMessage: "Je souhaite recevoir des informations sur",
    phoneRequired: "Veuillez saisir votre numéro de portable.",
    labelRole: "Vous êtes", rolePlaceholder: "Sélectionner", rolePrivate: "Particulier", roleCollector: "Collectionneur", roleAntiqueDealer: "Antiquaire", roleGallery: "Galerie", roleInteriorDesigner: "Décorateur d’intérieur", roleArchitect: "Architecte", roleOther: "Autre", labelOtherRole: "Veuillez préciser",
    otherRoleRequired: "Veuillez préciser votre activité.",
    sentNote: ""
  }
};

function t(key) { return ui[lang][key] || key; }
function field(item, base) { return item[`${base}_${lang}`] || item[`${base}_it`] || ""; }
function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}
function statusLabel(status) { return t(status || "available"); }
function statusBadge(status) {
  const value = ["available", "reserved", "sold"].includes(status) ? status : "available";
  return `<span class="status status-${value}"><span class="status-dot"></span>${esc(statusLabel(value))}</span>`;
}
function itemCode(code) { return `AUREA ${code}`; }

function init() {
  galleries = Object.fromEntries(Object.entries(catalog).map(([code, item]) => [code, item.images || []]));
  const heroItem = catalog.A006 || Object.values(catalog).find(x => x.images?.length);
  if (heroItem) $("#hero").style.backgroundImage = `url('${heroItem.images[0]}')`;

  $$(".lang-btn").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
  $$(".filter-btn").forEach(b => b.addEventListener("click", () => setFilter(b.dataset.filter)));
  $$(".status-filter").forEach(b => b.addEventListener("click", () => setStatusFilter(b.dataset.status)));
  $$(".category-card").forEach(card => card.addEventListener("click", e => {
    e.preventDefault();
    setFilter(card.dataset.filter);
    $("#collection").scrollIntoView({ behavior: "smooth" });
  }));

  $("#contactPreference").addEventListener("change", updatePhoneField);
  $("#clientRole").addEventListener("change", updateOtherRoleField);
  $$("[data-open-contact='true']").forEach(link => link.addEventListener("click", e => { e.preventDefault(); openGeneralInquiry(); }));
  $("#inquiryForm").addEventListener("submit", validateInquiry);
  $("#modalClose").addEventListener("click", closeInquiry);
  $("#inquiryModal").addEventListener("click", e => {
    if (e.target.id === "inquiryModal") closeInquiry();
  });

  render();
}

function render() {
  document.documentElement.lang = lang;
  $("#navCollection").textContent = t("collection");
  $("#navAbout").textContent = t("about");
  $("#navContact").textContent = t("contact");
  $("#heroTag").textContent = t("heroTag");
  $("#heroCopy").textContent = t("heroCopy");
  $("#heroExplore").textContent = t("explore");
  $("#artTitle").textContent = t("art");
  $("#artCopy").textContent = t("artCopy");
  $("#collectionTitle").textContent = t("title");
  $("#collectionIntro").textContent = t("intro");
  $("#filterAll").textContent = t("all");
  $("#aboutCopy").textContent = t("aboutCopy");
  $("#contactTitle").textContent = t("contactTitle");
  $("#contactCopy").textContent = t("contactCopy");

  $$(".filter-btn[data-filter]:not([data-filter='all'])").forEach(b => b.textContent = t(b.dataset.filter));
  $$(".status-filter").forEach(b => b.textContent = b.dataset.status === "all" ? t("allStatuses") : t(b.dataset.status));
  $$(".category-card").forEach(card => {
    card.querySelector("h3").textContent = t(card.dataset.filter);
    card.querySelector("span").textContent = t("collection");
  });

  $("#modalTitle").textContent = t("formTitle");
  $("#labelName").textContent = t("name");
  $("#labelEmail").textContent = t("email");
  $("#labelPreferred").textContent = t("preferred");
  $("#emailOptionText").textContent = t("byEmail");
  $("#phoneOptionText").textContent = t("byPhone");
  $("#labelPhone").textContent = t("phone");
  $("#labelMessage").textContent = t("message");
  $("#labelRole").textContent = t("labelRole");
  $("#rolePlaceholder").textContent = t("rolePlaceholder");
  $("#rolePrivate").textContent = t("rolePrivate");
  $("#roleCollector").textContent = t("roleCollector");
  $("#roleAntiqueDealer").textContent = t("roleAntiqueDealer");
  $("#roleGallery").textContent = t("roleGallery");
  $("#roleInteriorDesigner").textContent = t("roleInteriorDesigner");
  $("#roleArchitect").textContent = t("roleArchitect");
  $("#roleOther").textContent = t("roleOther");
  $("#labelOtherRole").textContent = t("labelOtherRole");
  $("#formSubmit").textContent = t("send");
  $("#modalClose").setAttribute("aria-label", t("close"));

  const grid = $("#catalogGrid");
  const details = $("#details");
  grid.innerHTML = "";
  details.innerHTML = "";

  Object.entries(catalog).forEach(([code, item]) => {
    const images = item.images || [];
    if (!images.length) return;
    const status = item.status || "available";

    const card = document.createElement("article");
    card.className = "lot-card";
    card.dataset.category = item.category_key;
    card.dataset.status = status;
    card.innerHTML = `
      <a class="lot-photo" href="#${esc(code)}">
        <img src="${esc(images[0])}" alt="${esc(field(item, "title"))}">
      </a>
      <div class="lot-info">
        <div class="lot-meta"><span>${esc(itemCode(code))}</span><span>${esc(field(item, "category"))}</span></div>
        ${statusBadge(status)}
        <h3>${esc(field(item, "title"))}</h3>
        <div class="lot-desc">${esc(field(item, "description"))}</div>
        ${item.dimensions ? `<div class="lot-bottom"><span>${esc(item.dimensions)}</span><span>→</span></div>` : `<div class="lot-bottom"><span></span><span>→</span></div>`}
      </div>`;
    grid.appendChild(card);

    const section = document.createElement("section");
    section.className = "detail";
    section.id = code;
    section.innerHTML = `
      <div class="detail-grid">
        <img class="detail-main" src="${esc(images[0])}" alt="${esc(field(item, "title"))}" onclick="openLightbox('${esc(code)}',0)">
        <div class="detail-copy">
          <div class="kicker">${esc(itemCode(code))} · ${esc(field(item, "category"))}</div>
          ${statusBadge(status)}
          <h2>${esc(field(item, "title"))}</h2>
          <p>${esc(field(item, "description"))}</p>
          ${item.dimensions ? `<dl><dt>${esc(t("dimensions"))}</dt><dd>${esc(item.dimensions)}</dd></dl>` : ""}
          <button class="cta inquiry-button" data-code="${esc(code)}">${esc(t("request"))}</button>
        </div>
      </div>
      <div class="gallery">
        ${images.map((img, index) => `<button class="thumb" onclick="openLightbox('${esc(code)}',${index})"><img src="${esc(img)}" alt="${esc(field(item, "title"))}"></button>`).join("")}
      </div>`;
    details.appendChild(section);
  });

  $$(".inquiry-button").forEach(button => button.addEventListener("click", () => openInquiry(button.dataset.code)));
  applyFilters();
}

function setLang(next) {
  lang = next;
  $$(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  render();
}
function setFilter(filter) {
  activeFilter = filter;
  $$(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.filter === filter));
  applyFilters();
}
function setStatusFilter(status) {
  activeStatus = status;
  $$(".status-filter").forEach(b => b.classList.toggle("active", b.dataset.status === status));
  applyFilters();
}
function applyFilters() {
  $$(".lot-card").forEach(card => {
    const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
    const statusMatch = activeStatus === "all" || card.dataset.status === activeStatus;
    card.style.display = categoryMatch && statusMatch ? "" : "none";
  });
}

function openLightbox(code, index) {
  const images = galleries[code] || [];
  if (!images.length) return;
  currentCode = code;
  currentIndex = index;
  $("#lbImage").src = images[index];
  $("#lightbox").classList.add("open");
}
function closeLightbox() { $("#lightbox").classList.remove("open"); }
function move(step) {
  const images = galleries[currentCode] || [];
  if (!images.length) return;
  currentIndex = (currentIndex + step + images.length) % images.length;
  $("#lbImage").src = images[currentIndex];
}


function openGeneralInquiry() {
  currentInquiry = null;
  $("#itemCode").value = "";
  $("#itemTitle").value = "";
  $("#formSubject").value = t("formTitle");
  $("#message").value = "";
  $("#contactPreference").value = "";
  $("#clientRole").value = "";
  $("#otherRole").value = "";
  $("#phone").value = "";
  updatePhoneField();
  updateOtherRoleField();
  $("#inquiryModal").classList.add("open");
  $("#name").focus();
}

function updateOtherRoleField() {
  const isOther = $("#clientRole").value === "other";
  $("#otherRoleWrap").hidden = !isOther;
  $("#otherRole").required = isOther;
}

function openInquiry(code) {
  const item = catalog[code];
  if (!item) return;
  currentInquiry = { code, item };
  $("#itemCode").value = itemCode(code);
  $("#itemTitle").value = field(item, "title");
  $("#formSubject").value = `${t("formTitle")} – ${itemCode(code)} – ${field(item, "title")}`;
  $("#message").value = `${t("defaultMessage")} ${itemCode(code)} – ${field(item, "title")}.`;
  $("#contactPreference").value = "";
  $("#clientRole").value = "";
  $("#otherRole").value = "";
  $("#phone").value = "";
  updatePhoneField();
  updateOtherRoleField();
  $("#inquiryModal").classList.add("open");
  $("#name").focus();
}
function closeInquiry() {
  $("#inquiryModal").classList.remove("open");
}
function updatePhoneField() {
  const isPhone = $("#contactPreference").value === "phone";
  $("#phoneWrap").hidden = !isPhone;
  $("#phone").required = isPhone;
}
function validateInquiry(event) {
  if ($("#clientRole").value === "other" && !$("#otherRole").value.trim()) {
    event.preventDefault();
    alert(t("otherRoleRequired"));
    $("#otherRole").focus();
    return;
  }
  if ($("#contactPreference").value === "phone" && !$("#phone").value.trim()) {
    event.preventDefault();
    alert(t("phoneRequired"));
    $("#phone").focus();
    return;
  }
  $("#preferenceHidden").value = $("#contactPreference").value === "phone" ? t("byPhone") : t("byEmail");
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("keydown", event => {
  if (event.key === "Escape") { closeLightbox(); closeInquiry(); }
  if ($("#lightbox").classList.contains("open")) {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  }
});
