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

// SLIDER WITH SWIPE FUNCTIONALITY
const trackWrap = document.querySelector(".slider-track-wrap");
const track = document.getElementById("sliderTrack");
const prev = document.getElementById("prevSlide");
const next = document.getElementById("nextSlide");

if (trackWrap && track && prev && next) {
  let index = 0;
  const totalSlides = track.children.length;
  let autoPlay = setInterval(autoSlide, 4500);

  function autoSlide() {
    if (window.innerWidth > 720) {
      index = (index + 1) % totalSlides;
      updateSlider();
    }
  }

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(autoSlide, 4500);
  }

  next.addEventListener("click", () => {
    index = (index + 1) % totalSlides;
    updateSlider();
    resetAutoPlay();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoPlay();
  });

  // Touch and Swipe Variables
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  trackWrap.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    track.style.transition = 'none'; // Snap instantly during drag
    clearInterval(autoPlay); // Pause auto-scroll during swipe
  }, { passive: true });

  trackWrap.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const movePercent = (diff / trackWrap.clientWidth) * 100;
    track.style.transform = `translateX(calc(-${index * 100}% + ${movePercent}%))`;
  }, { passive: true });

  trackWrap.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 400ms ease'; // Re-enable smooth transition
    
    const diff = currentX - startX;
    
    // If swiped more than 50px, change slide
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        index = (index + 1) % totalSlides; // Swipe left (next)
      } else {
        index = (index - 1 + totalSlides) % totalSlides; // Swipe right (prev)
      }
    }
    updateSlider();
    resetAutoPlay();
  });
}