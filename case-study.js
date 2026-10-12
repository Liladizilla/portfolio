(() => {
  const progress = document.querySelector(".case-progress span");
  const rail = document.querySelector(".case-rail");
  const sections = Array.from(document.querySelectorAll(".case-section"));
  if (!progress || !rail || !sections.length) return;

  const links = Array.from(rail.querySelectorAll("a[href^='#']"));
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    progress.style.width = (ratio * 100) + "%";
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      links.forEach(link => {
        if (link.getAttribute("href") === "#" + visible.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }
})();