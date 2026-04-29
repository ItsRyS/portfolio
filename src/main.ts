document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.querySelector(".current-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const toggleBtn = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  const overlay = document.querySelector<HTMLElement>(".sidebar-overlay");
  const sidebarLinks =
    document.querySelectorAll<HTMLAnchorElement>(".sidebar-menu a");

  function closeSidebar(): void {
    sidebar?.classList.remove("active");
    overlay?.classList.remove("active");
    document.body.style.overflow = "auto";
    sidebar?.setAttribute("aria-hidden", "true");
  }

  if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener("click", () => {
      const isActive = sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "auto";
      sidebar.setAttribute("aria-hidden", String(!isActive));
    });

    overlay.addEventListener("click", closeSidebar);
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      closeSidebar();

      const targetId = link.getAttribute("href")?.substring(1);
      const targetElement = targetId
        ? document.getElementById(targetId)
        : null;

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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeSidebar();
  });

  let scrollTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(highlightCurrentSection, 100);
    },
    { passive: true }
  );

  function highlightCurrentSection(): void {
    const scrollPosition = window.scrollY;

    document.querySelectorAll<HTMLElement>("section").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        sidebarLinks.forEach((item) => item.classList.remove("selected"));
        const currentMenuItem = document.querySelector<HTMLAnchorElement>(
          `.sidebar-menu a[href="#${sectionId}"]`
        );
        currentMenuItem?.classList.add("selected");
      }
    });
  }
});
