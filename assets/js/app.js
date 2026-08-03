
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
let catalog={}, galleries={}, lang='it', currentCode='', currentIndex=0;

const ui={
  it:{
    collection:"Collezione",about:"La collezione",contact:"Contatti",
    heroTag:"Collezione privata di antiquariato italiano",
    heroCopy:"Una selezione curata di mobili, dipinti, specchi e oggetti decorativi raccolti nel tempo.",
    explore:"Esplora la collezione",art:"L’arte del collezionare",
    artCopy:"Ogni pezzo racconta una storia di artigianato, eredità e bellezza. AUREA presenta una collezione privata italiana costruita nel corso dei decenni.",
    title:"La collezione",intro:"Mobili, dipinti, specchi e sedute provenienti da una collezione privata italiana.",
    all:"Tutti",dimensions:"Misure",condition:"Condizioni",price:"Prezzo",availability:"Disponibilità",available:"Disponibile",request:"Richiedi informazioni"
  },
  en:{
    collection:"Collection",about:"About",contact:"Contact",
    heroTag:"Private collection of Italian antiques",
    heroCopy:"A curated selection of furniture, paintings, mirrors and decorative objects assembled over time.",
    explore:"Explore the collection",art:"The Art of Collecting",
    artCopy:"Each piece tells a story of craftsmanship, heritage and beauty. AUREA presents a private Italian collection assembled over decades.",
    title:"The Collection",intro:"Furniture, paintings, mirrors and seating from a private Italian collection.",
    all:"All",dimensions:"Dimensions",condition:"Condition",price:"Price",availability:"Availability",available:"Available",request:"Request information"
  },
  fr:{
    collection:"Collection",about:"À propos",contact:"Contact",
    heroTag:"Collection privée d’antiquités italiennes",
    heroCopy:"Une sélection soignée de meubles, peintures, miroirs et objets décoratifs réunis au fil du temps.",
    explore:"Découvrir la collection",art:"L’art de collectionner",
    artCopy:"Chaque pièce raconte une histoire de savoir-faire, de patrimoine et de beauté. AUREA présente une collection privée italienne constituée au fil des décennies.",
    title:"La collection",intro:"Meubles, peintures, miroirs et sièges provenant d’une collection privée italienne.",
    all:"Tout",dimensions:"Dimensions",condition:"État",price:"Prix",availability:"Disponibilité",available:"Disponible",request:"Demander des informations"
  }
};

async function init(){
  catalog=await (await fetch("data/catalog.json")).json();
  galleries=Object.fromEntries(Object.entries(catalog).map(([k,v])=>[k,v.images]));
  const heroImg=catalog.A001.images[0];
  $("#hero").style.backgroundImage=`url('${heroImg}')`;
  render();
  $$(".lang-btn").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
  $$(".filter-btn").forEach(b=>b.addEventListener("click",()=>filterCards(b)));
}
function t(k){return ui[lang][k]}
function itemField(item,base){return item[base+"_"+lang] || item[base+"_it"]}

function render(){
  $("#navCollection").textContent=t("collection");
  $("#navAbout").textContent=t("about");
  $("#navContact").textContent=t("contact");
  $("#heroTag").textContent=t("heroTag");
  $("#heroCopy").textContent=t("heroCopy");
  $("#heroExplore").textContent=t("explore");
  $("#artTitle").textContent=t("art");
  $("#artCopy").textContent=t("artCopy");
  $("#collectionTitle").textContent=t("title");
  $("#collectionIntro").textContent=t("intro");
  $("#filterAll").textContent=t("all");

  const grid=$("#catalogGrid");
  const details=$("#details");
  grid.innerHTML=""; details.innerHTML="";

  Object.entries(catalog).forEach(([code,item])=>{
    const card=document.createElement("article");
    card.className="lot-card";
    card.dataset.category=itemField(item,"category");
    card.innerHTML=`
      <a class="lot-photo" href="#${code}"><img src="${item.images[0]}" alt="${itemField(item,'title')}"></a>
      <div class="lot-info">
        <div class="lot-meta"><span>${code}</span><span>${itemField(item,'category')}</span></div>
        <h3>${itemField(item,'title')}</h3>
        <div class="lot-desc">${itemField(item,'description')}</div>
        <div class="lot-bottom"><span>${itemField(item,'price')}</span><span>${item.dimensions}</span></div>
      </div>`;
    grid.appendChild(card);

    const sec=document.createElement("section");
    sec.className="detail"; sec.id=code;
    sec.innerHTML=`
      <div class="detail-grid">
        <img class="detail-main" src="${item.images[0]}" alt="${itemField(item,'title')}" onclick="openLightbox('${code}',0)">
        <div class="detail-copy">
          <div class="kicker">${code} · ${itemField(item,'category')}</div>
          <h2>${itemField(item,'title')}</h2>
          <p>${itemField(item,'description')}</p>
          <dl>
            <dt>${t("dimensions")}</dt><dd>${item.dimensions}</dd>
            <dt>${t("condition")}</dt><dd>${itemField(item,'condition')}</dd>
            <dt>${t("price")}</dt><dd>${itemField(item,'price')}</dd>
            <dt>${t("availability")}</dt><dd>${t("available")}</dd>
          </dl>
          <a class="cta" href="#contact">${t("request")}</a>
        </div>
      </div>
      <div class="gallery">${item.images.map((img,i)=>`<button class="thumb" onclick="openLightbox('${code}',${i})"><img src="${img}" alt=""></button>`).join("")}</div>`;
    details.appendChild(sec);
  });
}

function setLang(l){
  lang=l;
  $$(".lang-btn").forEach(b=>b.classList.toggle("active",b.dataset.lang===l));
  render();
}
function filterCards(btn){
  $$(".filter-btn").forEach(b=>b.classList.remove("active")); btn.classList.add("active");
  const f=btn.dataset.filter;
  $$(".lot-card").forEach(c=>c.style.display=(f==="all"||c.dataset.category===f)?"":"none");
}
function openLightbox(code,index){currentCode=code;currentIndex=index;$("#lbImage").src=galleries[code][index];$("#lightbox").classList.add("open")}
function closeLightbox(){$("#lightbox").classList.remove("open")}
function move(step){const a=galleries[currentCode];currentIndex=(currentIndex+step+a.length)%a.length;$("#lbImage").src=a[currentIndex]}
document.addEventListener("DOMContentLoaded",init);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();if(e.key==="ArrowLeft")move(-1);if(e.key==="ArrowRight")move(1)});
