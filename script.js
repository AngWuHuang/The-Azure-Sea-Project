// ========== Smooth Scrolling for Hash Links ==========
document.addEventListener("click", function (e) {
  const a = e.target.closest("a");
  if (!a) return;
  const href = a.getAttribute("href") || "";
  if (href.startsWith("#")) {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

// ========== Dark / Light Mode Toggle ==========
const themeBtn = document.createElement("button");
themeBtn.id = "themeToggle";
themeBtn.style.position = "fixed";
themeBtn.style.bottom = "20px";
themeBtn.style.right = "20px";
themeBtn.style.padding = "8px 12px";
themeBtn.style.borderRadius = "8px";
themeBtn.style.cursor = "pointer";
themeBtn.style.zIndex = "9999";

function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
}
const saved = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
applyTheme(saved);
themeBtn.textContent = saved === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  themeBtn.textContent = next === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
});
document.body.appendChild(themeBtn);

// ========== Back to Top Button ==========
const topBtn = document.createElement("button");
topBtn.id = "backToTop";
topBtn.textContent = "↑ Top";
topBtn.style.position = "fixed";
topBtn.style.bottom = "70px";
topBtn.style.right = "20px";
topBtn.style.padding = "10px 14px";
topBtn.style.borderRadius = "8px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.zIndex = "9999";

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.body.appendChild(topBtn);

// ========== Fade-in Animations ==========
const fadeTargets = document.querySelectorAll("h1, h2, h3, p, section, article, li");
fadeTargets.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(14px)";
  el.style.transition = "opacity .7s ease, transform .7s ease";
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "none";
      observer.unobserve(entry.target);
    }
  });
});
fadeTargets.forEach(el => observer.observe(el));

// ========== Lazy-load images ==========
document.querySelectorAll("img").forEach(img => {
  if (!img.getAttribute("loading")) img.setAttribute("loading", "lazy");
});
