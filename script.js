const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// Simple click tracking in browser console.
// Later you can connect Google Analytics or Cloudflare Web Analytics here.
document.querySelectorAll(".track-click").forEach((link) => {
  link.addEventListener("click", () => {
    const product = link.getAttribute("data-product") || "unknown";
    console.log("KAVOMAZ_CLICK:", product, link.href);

    // Google Analytics event placeholder:
    // if (window.gtag) {
    //   gtag("event", "amazon_click", {
    //     product_name: product,
    //     destination_url: link.href
    //   });
    // }
  });
});



const translations = {
  en: {
    eyebrow: "Women’s Activewear • Available on Amazon UAE",
    hero_title: "Activewear that moves with you.",
    hero_text: "KAVOMAZ designs women’s activewear for comfort, confidence, and everyday movement.",
    t1: "Secure Amazon checkout",
    t2: "UAE delivery",
    t3: "Easy order tracking",
    s1: "Shop KAVOMAZ",
    s2: "Three activewear essentials for the UAE market",
    f1: "Why KAVOMAZ",
    f2: "Comfort first. Confidence always.",
    a1: "Secure shopping via Amazon UAE",
    a2: "We do not process payments on this website.",
    c1: "Contact",
    c2: "KAVOMAZ Activewear"
  },
  ar: {
    eyebrow: "ملابس رياضية نسائية متاحة على أمازون الإمارات",
    hero_title: "ملابس رياضية تتحرك معك",
    hero_text: "تصمم KAVOMAZ ملابس رياضية للراحة والثقة والحركة اليومية",
    t1: "دفع آمن عبر أمازون",
    t2: "توصيل داخل الإمارات",
    t3: "تتبع سهل للطلبات",
    s1: "تسوق KAVOMAZ",
    s2: "3 أساسيات للملابس الرياضية",
    f1: "لماذا KAVOMAZ",
    f2: "الراحة أولاً. الثقة دائماً.",
    a1: "تسوق آمن عبر أمازون الإمارات",
    a2: "لا نقوم بعمليات دفع مباشرة على الموقع",
    c1: "تواصل معنا",
    c2: "KAVOMAZ الملابس الرياضية"
  },
  ru: {
    eyebrow: "Женская спортивная одежда на Amazon UAE",
    hero_title: "Одежда, которая движется с тобой",
    hero_text: "KAVOMAZ создаёт комфортную спортивную одежду для уверенности и движения",
    t1: "Безопасная оплата Amazon",
    t2: "Доставка по ОАЭ",
    t3: "Отслеживание заказов",
    s1: "Коллекция KAVOMAZ",
    s2: "3 ключевых товара",
    f1: "Почему KAVOMAZ",
    f2: "Комфорт прежде всего",
    a1: "Покупка через Amazon UAE",
    a2: "Оплата на сайте не производится",
    c1: "Контакты",
    c2: "KAVOMAZ Activewear"
  },
  tr: {
    eyebrow: "Kadın spor giyim Amazon UAE’de",
    hero_title: "Seninle hareket eden spor giyim",
    hero_text: "KAVOMAZ konfor ve güven için spor giyim tasarlar",
    t1: "Güvenli Amazon ödeme",
    t2: "BAE teslimat",
    t3: "Kolay sipariş takibi",
    s1: "KAVOMAZ Ürünler",
    s2: "3 temel ürün",
    f1: "Neden KAVOMAZ",
    f2: "Önce konfor",
    a1: "Amazon UAE üzerinden alışveriş",
    a2: "Sitede ödeme alınmaz",
    c1: "İletişim",
    c2: "KAVOMAZ Activewear"
  }
};

function applyLang(lang){
  document.documentElement.lang = lang;
  document.body.dir = (lang === "ar") ? "rtl" : "ltr";

  document.querySelectorAll("[data-key]").forEach(el=>{
    const key = el.getAttribute("data-key");
    if(translations[lang][key]){
      el.innerText = translations[lang][key];
    }
  });

  localStorage.setItem("lang", lang);
}

function setLang(lang){ applyLang(lang); }

window.addEventListener("load", ()=>{
  applyLang(localStorage.getItem("lang") || "en");
});
