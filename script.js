document.documentElement.classList.add("js-ready");\n\ndocument.addEventListener("DOMContentLoaded", () => {
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

  const letterSection = document.querySelector(".founder-letter");
  if (letterSection) {
    const startLetter = () => {
      if (letterSection.classList.contains("is-writing")) return;
      requestAnimationFrame(() => letterSection.classList.add("is-writing"));
    };

    if (reduce) {
      letterSection.classList.add("is-writing");
    } else if ("IntersectionObserver" in window) {
      const letterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startLetter();
            letterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: .12, rootMargin: "0px 0px -8% 0px" });
      letterObserver.observe(letterSection);

      const rect = letterSection.getBoundingClientRect();
      if (rect.top < window.innerHeight * .9 && rect.bottom > 0) {
        startLetter();
        letterObserver.unobserve(letterSection);
      }
    } else {
      startLetter();
    }
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