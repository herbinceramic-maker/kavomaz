
const translations = {
en:{hero_title:"Activewear that moves with you",hero_text:"Comfort and confidence"},
ar:{hero_title:"ملابس رياضية تتحرك معك",hero_text:"راحة وثقة"},
ru:{hero_title:"Спортивная одежда",hero_text:"Комфорт и уверенность"},
tr:{hero_title:"Spor giyim",hero_text:"Konfor ve güven"}
};

function setLang(l){
document.querySelectorAll("[data-key]").forEach(el=>{
const k=el.getAttribute("data-key");
el.innerText=translations[l][k]||"";
});
document.body.dir = (l==="ar")?"rtl":"ltr";
}
setLang("en");
