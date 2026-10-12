(() => {
  const root = document.documentElement;
  const header = document.getElementById("site-header");
  const themeButton = document.getElementById("theme-toggle");
  const menuButton = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const copyButton = document.getElementById("copy-profile");
  const copyFeedback = document.getElementById("copy-feedback");
  const preview = document.getElementById("hover-preview");
  const previewImage = preview ? preview.querySelector("img") : null;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  const getTheme = () => {
    const current = root.dataset.theme;
    return current === "light" || current === "dark" ? current : getSystemTheme();
  };
  const updateThemeButton = () => {
    const theme = getTheme();
    themeButton.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " theme");
    themeButton.title = "Switch to " + (theme === "dark" ? "light" : "dark") + " theme";
    themeButton.querySelector(".theme-glyph").textContent = theme === "dark" ? "☼" : "◐";
  };

  try {
    const saved = localStorage.getItem("charis-portfolio-theme");
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch (_) {}
  updateThemeButton();

  themeButton.addEventListener("click", () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("charis-portfolio-theme", next); } catch (_) {}
    updateThemeButton();
  });

  const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navLinks.classList.toggle("is-open", open);
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }));

  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      const holder = img.closest(".project-media, .hero-art-link");
      if (holder) holder.classList.add("image-failed");
    }, { once: true });
  });

  if (copyButton && copyFeedback) {
    copyButton.addEventListener("click", async () => {
      const value = copyButton.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        copyButton.textContent = "Copied";
        copyFeedback.textContent = value.includes("@") ? "Email address copied." : "Profile link copied.";
      } catch (_) {
        copyFeedback.textContent = value;
      }
      window.setTimeout(() => { copyButton.textContent = value.includes("@") ? "Copy email address" : "Copy profile link"; }, 1800);
    });
  }

  if (preview && previewImage && finePointer.matches && !reduceMotion.matches) {
    const rows = document.querySelectorAll(".project-table tbody tr[data-preview]");
    let activeRow = null;
    rows.forEach(row => {
      row.addEventListener("pointerenter", () => {
        activeRow = row;
        const src = row.dataset.preview;
        if (previewImage.src !== src) previewImage.src = src;
        preview.classList.add("is-visible");
      });
      row.addEventListener("pointermove", event => {
        preview.style.left = Math.min(event.clientX, window.innerWidth - 275) + "px";
        preview.style.top = Math.min(event.clientY, window.innerHeight - 205) + "px";
      });
      row.addEventListener("pointerleave", () => {
        activeRow = null;
        preview.classList.remove("is-visible");
      });
    });
    previewImage.addEventListener("error", () => {
      preview.classList.remove("is-visible");
    });
    window.addEventListener("scroll", () => {
      if (activeRow) preview.classList.remove("is-visible");
    }, { passive: true });
  }
})();