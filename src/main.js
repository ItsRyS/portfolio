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
  const accordions = document.querySelectorAll(".accordion-toggle");

  accordions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".nav-skill");
      const wasActive = parent.classList.contains("active");

      // ปิดทั้งหมดก่อน
      document.querySelectorAll(".nav-skill").forEach((el) =>
        el.classList.remove("active")
      );

      // ถ้าไม่ได้เปิดอยู่ก่อนหน้า → เปิดอันที่คลิก
      if (!wasActive) {
        parent.classList.add("active");
      }
    });
  });
});
