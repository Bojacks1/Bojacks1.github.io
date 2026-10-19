/*
 * site.js: the small amount of script every page shares, plus the home page's work grid.
 * No libraries: it is plain JavaScript so the site stays fast and easy to read.
 */

// ---- YouTube helpers -----------------------------------------------------------------------------

/** Pulls the 11-character video id out of any YouTube link (or returns an id you pass in as is). */
function youtubeId(link) {
  if (!link) return "";
  const m = String(link).match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(link) ? link : "";
}

/** The address of a video's thumbnail picture (YouTube makes one for every video). */
function thumbnailUrl(link) {
  const id = youtubeId(link);
  return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "";
}

/**
 * A stand-in picture for a project that has no video yet: a dark, grainy gradient whose colours are
 * picked from the title, so each card looks a little different. Returns a CSS background value.
 */
function placeholderBackground(title) {
  let h = 0;
  for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) % 360;
  const a = (h % 40) + 20;          // warm hue (amber to red)
  const b = ((h * 7) % 40) + 180;   // cool hue (teal to blue)
  return `radial-gradient(120% 90% at 20% 10%, hsl(${a} 55% 22% / .85), transparent 60%),
          radial-gradient(110% 90% at 85% 95%, hsl(${b} 55% 20% / .9), transparent 62%), #111214`;
}

// ---- the home page's work grid -------------------------------------------------------------------

/** Builds one project card (a link to the project's own page). */
function projectCard(p) {
  const a = document.createElement("a");
  a.className = "card";
  a.href = `project.html?p=${p.slug}`;
  a.dataset.category = p.category;
  const thumb = thumbnailUrl(p.video);
  a.innerHTML = `
    <div class="card-frame" style="background:${thumb ? "#000" : placeholderBackground(p.title)}">
      ${thumb ? `<img src="${thumb}" alt="" loading="lazy" onerror="this.src=this.src.replace('maxresdefault','hqdefault')">` : `<span class="card-soon">coming soon</span>`}
      <span class="card-play" aria-hidden="true"></span>
    </div>
    <div class="card-meta"><span class="card-year">${p.year}</span><span class="card-title"></span></div>`;
  a.querySelector(".card-title").textContent = p.title; // textContent, not innerHTML: titles are never read as code
  return a;
}

/** Fills the work grid and wires up the filter buttons. Only runs on pages that have a #work-grid. */
function initWorkGrid() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;
  const sorted = [...PROJECTS].sort((a, b) => b.year - a.year);
  for (const p of sorted) grid.appendChild(projectCard(p));

  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.toggle("on", b === btn));
      const want = btn.dataset.filter;
      grid.querySelectorAll(".card").forEach(c => {
        c.hidden = !(want === "All" || c.dataset.category === want);
      });
    });
  });
}

// ---- the navigation bar ----------------------------------------------------------------------------

/** The bar turns solid once you scroll, so it stays readable over the pictures. */
function initNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const update = () => nav.classList.toggle("solid", window.scrollY > 30);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initWorkGrid();
});
