(function () {
  "use strict";

  var KEY = "kai_fashion_consent_v1";
  var CLARITY_ID = "xe1t02moh3";
  var clarityLoaded = false;
  var metricaLoaded = false;
  var lang = (document.documentElement.lang || "en").toLowerCase().slice(0, 2);

  function loadClarity() {
    if (clarityLoaded) return;
    clarityLoaded = true;
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script",CLARITY_ID);
  }

  function loadMetrica() {
    if (metricaLoaded) return;
    metricaLoaded = true;
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
    })(window,document,"script","https://mc.yandex.ru/metrika/tag.js?id=114647781","ym");
    window.ym(114647781,"init",{ssr:true,webvisor:true,clickmap:true,ecommerce:"dataLayer",referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});
  }

  var copy = {
    en: {
      title: "KAVOMAZ uses cookies",
      text: "We use essential cookies and optional analytics and advertising measurement.",
      accept: "Accept cookies",
      decline: "Decline optional",
      policy: "Cookie Policy",
      url: "/cookie-policy/"
    },
    ar: {
      title: "تستخدم KAVOMAZ ملفات تعريف الارتباط",
      text: "نستخدم ملفات أساسية وملفات اختيارية للتحليلات وقياس الإعلانات.",
      accept: "قبول ملفات الارتباط",
      decline: "رفض الاختيارية",
      policy: "سياسة ملفات الارتباط",
      url: "/ar/cookie-policy/"
    },
    ru: {
      title: "KAVOMAZ использует файлы cookie",
      text: "Мы используем обязательные и дополнительные файлы cookie для аналитики и рекламы.",
      accept: "Принять",
      decline: "Отклонить необязательные",
      policy: "Политика cookie",
      url: "/ru/cookie-policy/"
    },
    tr: {
      title: "KAVOMAZ çerezleri kullanır",
      text: "Zorunlu çerezlerin yanında isteğe bağlı analiz ve reklam ölçüm çerezleri kullanıyoruz.",
      accept: "Çerezleri kabul et",
      decline: "İsteğe bağlıları reddet",
      policy: "Çerez Politikası",
      url: "/tr/cookie-policy/"
    }
  };

  var t = copy[lang] || copy.en;

  function updateConsent(choice) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };

    var granted = choice === "accepted";

    window.gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
      personalization_storage: granted ? "granted" : "denied",
      functionality_storage: "granted",
      security_storage: "granted"
    });

    window.dataLayer.push({
      event: "cookie_consent_update",
      cookie_choice: choice,
      consent_state: granted ? "granted" : "denied",
      project: "kavomaz-fashion"
    });

    if (granted) {
      loadClarity();
      loadMetrica();
    }
  }

  function saveChoice(choice) {
    try {
      localStorage.setItem(KEY, choice);
    } catch (e) {}
    updateConsent(choice);

    var banner = document.getElementById("kai-consent-banner");
    if (banner) banner.hidden = true;
  }

  function createBanner() {
    var banner = document.createElement("section");
    banner.id = "kai-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", t.title);

    if (lang === "ar") banner.setAttribute("dir", "rtl");

    banner.innerHTML =
      '<div class="kai-consent-copy"><strong>' + t.title + "</strong>" +
      "<span>" + t.text + "</span></div>" +
      '<div class="kai-consent-actions">' +
      '<button id="kai-consent-decline" type="button">' + t.decline + "</button>" +
      '<button id="kai-consent-accept" type="button">' + t.accept + "</button>" +
      '<a id="kai-consent-policy" href="' + t.url + '">' + t.policy + "</a>" +
      "</div>";

    document.body.appendChild(banner);

    document.getElementById("kai-consent-accept").onclick = function () {
      saveChoice("accepted");
    };

    document.getElementById("kai-consent-decline").onclick = function () {
      saveChoice("declined");
    };
  }

  function start() {
    var saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch (e) {}

    if (saved === "accepted" || saved === "declined") {
      updateConsent(saved);
      return;
    }

    createBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
