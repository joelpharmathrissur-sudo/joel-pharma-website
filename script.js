const root = document.documentElement;
const header = document.getElementById("siteHeader");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.setAttribute("data-theme", prefersDark ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  root.setAttribute("data-theme", current === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const form = document.querySelector(".enquiry-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Demo wholesale enquiry submitted. Next step: connect Formspree, Web3Forms, or WhatsApp form flow.");
  });
}

const track = document.getElementById("sliderTrack");
const prev = document.getElementById("prevSlide");
const next = document.getElementById("nextSlide");

if (track && prev && next) {
  let index = 0;
  const totalSlides = track.children.length;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  next.addEventListener("click", () => {
    index = (index + 1) % totalSlides;
    updateSlider();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  setInterval(() => {
    if (window.innerWidth > 720) {
      index = (index + 1) % totalSlides;
      updateSlider();
    }
  }, 4500);
}