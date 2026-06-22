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

