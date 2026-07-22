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

// KAVOMAZ V5 Enterprise Tracking Layer
// GTM container: GTM-WVSCZN22
(function () {
  window.dataLayer = window.dataLayer || [];

  const pushEvent = (payload) => {
    window.dataLayer.push(Object.assign({
      event_source: "kavomaz_v5_enterprise",
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title
    }, payload));
  };

  pushEvent({ event: "kavomaz_page_context" });

  const classifyLink = (link) => {
    const href = link.href || "";
    const text = (link.textContent || "").trim().replace(/\s+/g, " ");
    const product = link.getAttribute("data-product") || "";
    const host = (() => { try { return new URL(href).hostname; } catch (e) { return ""; } })();

    let type = "internal_click";
    if (/amazon\./i.test(host) || /amazon\./i.test(href)) type = "amazon_click";
    else if (/wa\.me|whatsapp/i.test(href)) type = "whatsapp_click";
    else if (/^mailto:/i.test(href)) type = "email_click";
    else if (/^tel:/i.test(href)) type = "phone_click";
    else if (host && host !== window.location.hostname) type = "outbound_click";
    else if (/leggings|sports-bra|activewear/i.test(href + " " + product + " " + text)) type = "product_click";

    return { type, href, text, product, host };
  };

  document.addEventListener("click", function (e) {
    const link = e.target.closest && e.target.closest("a[href]");
    if (!link) return;
    const info = classifyLink(link);

    pushEvent({
      event: "kavomaz_link_click",
      click_type: info.type,
      click_url: info.href,
      click_text: info.text,
      click_product: info.product || undefined,
      outbound_domain: info.host || undefined
    });
  }, true);

  const scrollMarks = [25, 50, 75, 90];
  const fired = new Set();
  const onScroll = () => {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pct = Math.round((window.scrollY / max) * 100);
    scrollMarks.forEach((mark) => {
      if (pct >= mark && !fired.has(mark)) {
        fired.add(mark);
        pushEvent({ event: "kavomaz_scroll_depth", scroll_percent: mark });
      }
    });
    if (fired.size === scrollMarks.length) window.removeEventListener("scroll", onScroll, { passive: true });
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  window.addEventListener("error", function (event) {
    pushEvent({
      event: "kavomaz_js_error",
      error_message: event.message,
      error_source: event.filename,
      error_line: event.lineno
    });
  });
})();

/* KAIOS-V7-NEWSLETTER-JS-START */
document.querySelectorAll('form[data-newsletter-mailto]').forEach(function(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var input=form.querySelector('input[type="email"]');
    if(!input || !input.checkValidity()){if(input) input.reportValidity();return;}
    var to=form.getAttribute('data-newsletter-mailto')||'info@kavomaz.com';
    var subject='KAVOMAZ Activewear newsletter request';
    var body='Please add this email address to the KAVOMAZ Activewear newsletter request list:%0D%0A%0D%0A'+encodeURIComponent(input.value)+'%0D%0A%0D%0AI understand that I can unsubscribe by emailing KAVOMAZ.';
    window.location.href='mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+body;
  });
});
/* KAIOS-V7-NEWSLETTER-JS-END */
