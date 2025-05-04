document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".current-year").textContent =
    new Date().getFullYear();

  const toggleBtn = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-menu a");

  if (toggleBtn && sidebar && overlay) {
    // Toggle sidebar
    toggleBtn.addEventListener("click", () => {
      const isActive = sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "auto";
      sidebar.setAttribute("aria-hidden", !isActive);
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
      sidebar.setAttribute("aria-hidden", "true");
    });
  }

  // Sidebar link click handler
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
      sidebar.setAttribute("aria-hidden", "true");

      const targetId = link.getAttribute("href")?.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement && window.innerWidth <= 768) {
        event.preventDefault();
        const yOffset = -60;
        const y =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  // Reset sidebar on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
      sidebar.setAttribute("aria-hidden", "true");
    }
  });

  // Highlight current section in sidebar (with debounce)
  let scrollTimeout;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(highlightCurrentSection, 100);
    },
    { passive: true }
  );

  function highlightCurrentSection() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        sidebarLinks.forEach((item) => item.classList.remove("selected"));
        const currentMenuItem = document.querySelector(
          `.sidebar-menu a[href="#${sectionId}"]`
        );
        if (currentMenuItem) {
          currentMenuItem.classList.add("selected");
        }
      }
    });
  }
});
