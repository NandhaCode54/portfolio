/*==================== MOBILE MENU ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => navMenu.classList.add("show"));
}
if (navClose) {
  navClose.addEventListener("click", () => navMenu.classList.remove("show"));
}

/* Close menu when a link is clicked */
document.querySelectorAll(".nav__link").forEach((link) =>
  link.addEventListener("click", () => navMenu.classList.remove("show"))
);

/*==================== THEME TOGGLE ====================*/
const themeButton = document.getElementById("theme-toggle"),
  themeIcon = themeButton ? themeButton.querySelector("i") : null,
  darkClass = "dark-theme";

const applyTheme = (isDark) => {
  document.body.classList.toggle(darkClass, isDark);
  if (themeIcon) {
    themeIcon.classList.toggle("bx-sun", isDark);
    themeIcon.classList.toggle("bx-moon", !isDark);
  }
};

/* Respect saved preference, else system preference */
const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const isDark = !document.body.classList.contains(darkClass);
    applyTheme(isDark);
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  });
}

/*==================== DYNAMIC FOOTER YEAR ====================*/
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/*==================== ACTIVE LINK ON SCROLL ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 80,
      sectionId = current.getAttribute("id"),
      link = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*==================== SCROLL TOP BUTTON ====================*/
const scrollTop = document.getElementById("scroll-top");

const showScrollTop = () => {
  if (window.scrollY >= 400) {
    scrollTop.classList.add("show-scroll");
  } else {
    scrollTop.classList.remove("show-scroll");
  }
};
window.addEventListener("scroll", showScrollTop);

/*==================== ANIMATED STAT COUNTERS ====================*/
const counters = document.querySelectorAll(".stats__number");
let countersStarted = false;

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 20);
    let current = 0;

    const update = () => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        counter.textContent = target + suffix;
      } else {
        counter.textContent = current + suffix;
        setTimeout(update, stepTime);
      }
    };
    update();
  });
};

const statsSection = document.querySelector(".stats");
if (statsSection && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(statsSection);
} else {
  animateCounters();
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    origin: "top",
    distance: "50px",
    duration: 1200,
    delay: 150,
    reset: false,
  });

  sr.reveal(".home__data, .section-subtitle, .section-title");
  sr.reveal(".home__img", { origin: "bottom", delay: 300 });
  sr.reveal(".stats__card", { interval: 100, origin: "bottom" });
  sr.reveal(".about__img", { origin: "left" });
  sr.reveal(".about__data", { origin: "right" });
  sr.reveal(".skills__group, .project__card", {
    interval: 100,
    origin: "bottom",
  });
  sr.reveal(".timeline__item", { interval: 150, origin: "left" });
  sr.reveal(".contact__info", { origin: "left" });
  sr.reveal(".contact__form", { origin: "right" });
}
