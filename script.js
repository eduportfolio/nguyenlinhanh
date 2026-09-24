// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ============================================
// Gallery data: build groups from every image
// found inside each activity's .activity__gallery.
// Each activity only has one <button> in the HTML
// (the cover photo); we derive the rest of the
// album from the image count shown in the badge,
// assuming files are named 1.jpg, 2.jpg, 3.jpg ...
// inside assets/activities/<group>/
// ============================================
const galleryButtons = document.querySelectorAll(".activity__img-btn");
const groups = {};

galleryButtons.forEach((btn) => {
  const group = btn.dataset.group;
  const imgElements = btn.querySelectorAll("img");
  const images = [];

  imgElements.forEach((img) => {
    images.push({
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt") || "Gallery photo",
    });
  });

  groups[group] = images;

  btn.addEventListener("click", () => openLightbox(group, 0));
});

// ============================================
// Lightbox
// ============================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentGroup = null;
let currentIndex = 0;

function openLightbox(group, index) {
  currentGroup = group;
  currentIndex = index;
  renderLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderLightbox() {
  const images = groups[currentGroup] || [];
  const img = images[currentIndex];
  if (!img) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;

  const multi = images.length > 1;
  lightboxPrev.hidden = !multi;
  lightboxNext.hidden = !multi;
  lightboxCounter.textContent = multi
    ? `${currentIndex + 1} / ${images.length}`
    : img.alt;
}

function stepLightbox(delta) {
  const images = groups[currentGroup] || [];
  if (images.length < 2) return;
  currentIndex = (currentIndex + delta + images.length) % images.length;
  renderLightbox();
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => stepLightbox(-1));
lightboxNext.addEventListener("click", () => stepLightbox(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});
