"use strict";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setupMenu = () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-menu");
  if (!toggle || !menu) return;
  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    menu.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    menu.classList.toggle("is-open", !isOpen);
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) close();
  });
};

const setupReveal = () => {
  const elements = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: .12 });
  elements.forEach((element) => observer.observe(element));
};

const setupCounters = () => {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;
  const animate = (counter) => {
    const target = Number(counter.dataset.counter);
    if (reducedMotion) { counter.textContent = `${target}+`; return; }
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 900, 1);
      counter.textContent = `${Math.floor(progress * target)}+`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!("IntersectionObserver" in window)) { counters.forEach(animate); return; }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { animate(entry.target); currentObserver.unobserve(entry.target); } });
  }, { threshold: .7 });
  counters.forEach((counter) => observer.observe(counter));
};

const setupProjectFilters = () => {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll(".project-item");
  const emptyState = document.querySelector("#empty-state");
  if (!buttons.length || !cards.length) return;
  buttons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach((item) => item.classList.toggle("is-active", item === button));
    let visible = 0;
    cards.forEach((card) => {
      const matches = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !matches);
      if (matches) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible > 0;
  }));
};

const setupProjectModal = () => {
  const modal = document.querySelector("#project-modal");
  if (!modal) return;
  const title = modal.querySelector("#modal-title");
  const description = modal.querySelector("#modal-description");
  const tech = modal.querySelector("#modal-tech");
  const features = modal.querySelector("#modal-features");
  const visual = modal.querySelector("#modal-visual");
  const githubLink = modal.querySelector(".modal-github");
  const liveLink = modal.querySelector(".modal-live");
  let lastFocused = null;
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };
  document.querySelectorAll(".view-project").forEach((button) => button.addEventListener("click", () => {
    const card = button.closest(".project-item");
    lastFocused = button;
    title.textContent = card.dataset.title;
    description.textContent = card.dataset.description;
    tech.textContent = card.dataset.tech;
    features.innerHTML = card.dataset.features.split("|").map((feature) => `<li>${feature}</li>`).join("");
    githubLink.href = card.dataset.github;
    liveLink.hidden = !card.dataset.live;
    if (card.dataset.live) liveLink.href = card.dataset.live;
    const sourceVisual = card.querySelector(".project-visual");
    visual.className = `modal-visual ${[...sourceVisual.classList].filter((className) => className.startsWith("visual-")).join(" ")}`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }));
  modal.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", close));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("is-open")) close(); });
};

const setupContactForm = () => {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    status.textContent = "Thanks for reaching out. Your message passed validation and is ready for a backend or email service.";
    form.reset();
  });
};

const setCurrentYear = () => document.querySelectorAll("[data-current-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });

setupMenu();
setupReveal();
setupCounters();
setupProjectFilters();
setupProjectModal();
setupContactForm();
setCurrentYear();
