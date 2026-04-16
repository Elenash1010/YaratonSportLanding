const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("siteNav");

function syncHeaderState() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 8);
}

function closeMenu() {
  if (!header || !menuToggle) return;
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;
    const nextState = !item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      if (openItem !== item) openItem.classList.remove("open");
    });
    item.classList.toggle("open", nextState);
  });
});

document.querySelectorAll(".schedule-tabs").forEach((tabGroup) => {
  const buttons = [...tabGroup.querySelectorAll(".tab-btn")];
  const scope = tabGroup.closest(".schedule-card");
  if (!scope || buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.day;
      buttons.forEach((innerButton) => innerButton.classList.toggle("active", innerButton === button));
      scope.querySelectorAll(".day-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetId);
      });
    });
  });
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 })
  : null;

document.querySelectorAll("[data-reveal]").forEach((element) => {
  if (!revealObserver) {
    element.classList.add("is-visible");
    return;
  }
  revealObserver.observe(element);
});
