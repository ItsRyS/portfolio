document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  const toggleBtn = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

// 👉 Accordion Dropdown Control
document.querySelectorAll(".accordion-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parent = btn.closest(".nav-education");
    const container = parent.parentElement;

    const wasActive = parent.classList.contains("active");

    // ปิดเฉพาะในกลุ่มเดียวกัน
    container.querySelectorAll(".nav-education").forEach((el) =>
      el.classList.remove("active")
    );

    if (!wasActive) {
      parent.classList.add("active");
    }
  });
});

});
