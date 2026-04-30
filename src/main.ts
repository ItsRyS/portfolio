type Theme = "light" | "dark";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // ---- Year ----
  const yearEl = document.querySelector(".current-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---- Theme ----
  const themeBtn = document.querySelector<HTMLButtonElement>(".theme-toggle");
  const themeIcon = themeBtn?.querySelector<HTMLElement>("i");
  const themeLabel = themeBtn?.querySelector<HTMLElement>(".theme-toggle-label");

  function applyTheme(theme: Theme): void {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeIcon) themeIcon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
    if (themeLabel) themeLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    themeBtn?.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  applyTheme(((root.getAttribute("data-theme") || "light") as Theme));

  themeBtn?.addEventListener("click", () => {
    const current = ((root.getAttribute("data-theme") || "light") as Theme);
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // ---- Sidebar (mobile) ----
  const toggleBtn = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const sidebar = document.querySelector<HTMLElement>(".sidebar");
  const overlay = document.querySelector<HTMLElement>(".sidebar-overlay");
  const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>(".sidebar-menu a");

  function closeSidebar(): void {
    sidebar?.classList.remove("active");
    overlay?.classList.remove("active");
    document.body.style.overflow = "";
    sidebar?.setAttribute("aria-hidden", "true");
  }

  if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener("click", () => {
      const isActive = sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = isActive ? "hidden" : "";
      sidebar.setAttribute("aria-hidden", String(!isActive));
    });

    overlay.addEventListener("click", closeSidebar);
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      closeSidebar();

      const targetId = link.getAttribute("href")?.substring(1);
      const targetEl = targetId ? document.getElementById(targetId) : null;

      if (targetEl && window.innerWidth <= 768) {
        event.preventDefault();
        const y = targetEl.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeSidebar();
  });

  // ---- Scroll spy ----
  const sections = document.querySelectorAll<HTMLElement>("section");
  let scrollTimer: ReturnType<typeof setTimeout> | undefined;

  function highlightCurrentSection(): void {
    const scrollY = window.scrollY;
    const isAtBottom =
      window.innerHeight + scrollY >= document.documentElement.scrollHeight - 10;

    let activeId: string | null = null;

    if (isAtBottom) {
      activeId = sections[sections.length - 1]?.id || null;
    } else {
      sections.forEach((section) => {
        const top = section.offsetTop - 100;
        if (scrollY >= top && scrollY < top + section.offsetHeight) {
          activeId = section.id;
        }
      });
    }

    if (!activeId) return;

    sidebarLinks.forEach((link) => link.classList.remove("selected"));
    document
      .querySelector<HTMLAnchorElement>(`.sidebar-menu a[href="#${activeId}"]`)
      ?.classList.add("selected");
  }

  window.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(highlightCurrentSection, 100);
    },
    { passive: true }
  );

  window.addEventListener("hashchange", highlightCurrentSection);
  highlightCurrentSection();
});
