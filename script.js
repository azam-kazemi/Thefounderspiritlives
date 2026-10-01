document.documentElement.classList.add("js-ready");

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

  const letterImage = document.querySelector(".founder-letter-image");
  if (letterImage) {
    const showLetter = () => {
      if (letterImage.classList.contains("is-visible")) return;
      requestAnimationFrame(() => letterImage.classList.add("is-visible"));
    };

    if (reduce) {
      showLetter();
    } else if ("IntersectionObserver" in window) {
      const letterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            showLetter();
            letterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: .28, rootMargin: "0px 0px -6% 0px" });

      letterObserver.observe(letterImage);

      const rect = letterImage.getBoundingClientRect();
      if (rect.top < window.innerHeight * .9 && rect.bottom > 0) {
        showLetter();
        letterObserver.unobserve(letterImage);
      }
    } else {
      showLetter();
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
