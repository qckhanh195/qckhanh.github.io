const sections = Array.from(document.querySelectorAll(".screen"));
let currentIndex = 0;
let isScrolling = false;

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.replace("/", "") || "home";
  const index = sections.findIndex(sec => sec.id === path);
  if (index !== -1) {
    currentIndex = index;
    sections[currentIndex].scrollIntoView({ behavior: "instant" });
    history.replaceState(null, "", "/" + sections[currentIndex].id);
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(savedTheme);
  document.getElementById("themeToggle").textContent = savedTheme === "dark" ? "☀️" : "🌙";
});

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;
  isScrolling = true;

  const direction = e.deltaY > 0 ? 1 : -1;
  const nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < sections.length) {
    currentIndex = nextIndex;
    sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", "/" + sections[currentIndex].id);
  }

  setTimeout(() => {
    isScrolling = false;
  }, 300);
});

window.addEventListener("scroll", () => {
  const vh = window.innerHeight;
  const index = Math.round(window.scrollY / vh);
  if (index !== currentIndex && sections[index]) {
    currentIndex = index;
    history.replaceState(null, "", "/" + sections[currentIndex].id);
  }
});

document.getElementById("backToTop").addEventListener("click", () => {
  currentIndex = 0;
  sections[currentIndex].scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", "/" + sections[currentIndex].id);
});

document.getElementById("themeToggle").addEventListener("click", () => {
  const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.body.classList.remove(currentTheme);
  document.body.classList.add(newTheme);
  document.getElementById("themeToggle").textContent = newTheme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", newTheme);
});

// Menu toggle button
const menuToggle = document.getElementById('menuToggle');
const navItems = document.querySelector('.nav-items');

menuToggle.addEventListener('click', () => {
  const isOpen = navItems.classList.toggle('show');
  menuToggle.textContent = isOpen ? '✕' : '☰';
  document.body.classList.toggle('nav-open', isOpen);
});


// Tự đóng menu khi bấm vào mục
document.querySelectorAll('.nav-items a').forEach(link => {
  link.addEventListener('click', () => {
    navItems.classList.remove('show');
    menuToggle.textContent = '☰';
    document.body.classList.remove('nav-open');
  });
});