const sections = Array.from(document.querySelectorAll(".screen"));
let currentIndex = 0;
let isScrolling = false;

// Tự nhảy về đúng vị trí khi tải trang
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.replace("/", "") || "home";
    const index = sections.findIndex(sec => sec.id === path);
    if (index !== -1) {
        currentIndex = index;
        sections[currentIndex].scrollIntoView({ behavior: "instant" });
        history.replaceState(null, "", "/" + sections[currentIndex].id);
    }
});

// Xử lý lăn chuột
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
    }, 100); // chặn spam scroll
});


const toggleButton = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);
toggleButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";

toggleButton.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    toggleButton.textContent = newTheme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", newTheme);
});


// Nếu người dùng resize hay nhảy tay
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

document.getElementById("name").addEventListener("click", () => {
  window.location.href = "/index.html"; // cuộn về section có id="home"
});

// const themeToggle = document.getElementById('themeToggle');
// const body = document.body;

// themeToggle.addEventListener('click', () => {
//   body.classList.toggle('light');

//   // Đổi biểu tượng nút (mặt trăng <=> mặt trời)
//   themeToggle.textContent = body.classList.contains('light') ? '☀️' : '🌙';
// });


