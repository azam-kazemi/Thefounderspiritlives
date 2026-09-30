document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const intro = document.querySelector(".intro-loader");
  if (intro) {
    const dismissIntro = () => {
      intro.classList.add("is-leaving");
      document.body.classList.remove("intro-lock");
      window.setTimeout(() => intro.remove(), reduce ? 0 : 950);
    };

    if (reduce) {
      window.setTimeout(dismissIntro, 550);
    } else {
      window.setTimeout(dismissIntro, 3200);
    }
  }

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

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });
});