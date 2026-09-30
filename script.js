document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".editorial,.statement,.full-image,.dark-quote");

  if (!reduce && "IntersectionObserver" in window) {
    items.forEach(el => el.classList.add("reveal"));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(el => io.observe(el));
  }

  const menu = document.querySelector(".site-menu");
  const openBtn = document.querySelector(".menu-trigger");
  const closeBtn = document.querySelector(".menu-close");

  const closeMenu = () => {
    if (!menu || !openBtn) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menu || !openBtn) return;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  openBtn?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });
});