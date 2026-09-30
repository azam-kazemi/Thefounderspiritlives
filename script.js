document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.classList.add("is-ready");

  const revealElements = document.querySelectorAll(
    ".section, .image-section, .closing"
  );

  if (prefersReducedMotion) {
    revealElements.forEach((el) => {
      el.classList.add("reveal", "is-visible");
    });
    return;
  }

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  const heroImage = document.querySelector(".hero__image");
  if (heroImage) {
    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY;
        if (scrollY <= window.innerHeight) {
          const movement = scrollY * 0.08;
          heroImage.style.transform =
            `scale(1.035) translateY(${movement}px)`;
        }
      },
      { passive: true }
    );
  }

  const nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 40) {
          nav.classList.add("nav--scrolled");
        } else {
          nav.classList.remove("nav--scrolled");
        }
      },
      { passive: true }
    );
  }
});
