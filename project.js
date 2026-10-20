/*
 * project.js: draws one project's page. The address says which one: project.html?p=<slug>.
 * The video is a "facade": a picture with a play button that becomes the real YouTube player
 * only when clicked, so the page loads fast and tracks nothing until someone presses play.
 */
document.addEventListener("DOMContentLoaded", () => {
  const slug = new URLSearchParams(location.search).get("p");
  const sorted = [...PROJECTS].sort((a, b) => b.year - a.year);
  const i = sorted.findIndex(p => p.slug === slug);
  const root = document.getElementById("project");
  if (i < 0) {
    root.innerHTML = `<a class="back" href="index.html#work">← All work</a><h1 style="margin-top:40px">That project was not found.</h1>`;
    return;
  }
  const p = sorted[i];
  document.title = `${p.title}: Boraq Abdulmajeed`;

  const id = youtubeId(p.video);
  const player = document.getElementById("player");
  if (id) {
    // the picture first; the real player replaces it on the first click
    player.innerHTML = `<img src="${thumbnailUrl(p.video)}" alt="" onerror="this.src=this.src.replace('maxresdefault','hqdefault')"><button class="play-big" aria-label="Play ${p.title.replace(/"/g, "")}"></button>`;
    player.querySelector("button").addEventListener("click", () => {
      player.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${p.title.replace(/"/g, "")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    });
  } else {
    player.classList.add("empty");
    player.style.background = placeholderBackground(p.title);
    player.innerHTML = `<span>video coming soon</span>`;
  }

  // a project with a photo album and no video shows the album and drops the empty video frame
  const album = p.album && typeof ALBUMS !== "undefined" ? ALBUMS[p.album] : null;
  if (album && !id) player.remove();

  document.getElementById("title").textContent = p.title;
  document.getElementById("facts").innerHTML =
    `<span>${p.year}</span><span>${p.category}</span>` + (p.role ? `<span>${p.role}</span>` : "");
  const blurb = document.getElementById("blurb");
  if (p.blurb) blurb.textContent = p.blurb; else blurb.remove();

  if (album) buildGallery(p, album);

  // previous / next, in the order of the grid (newest first)
  const prev = sorted[(i - 1 + sorted.length) % sorted.length];
  const next = sorted[(i + 1) % sorted.length];
  document.getElementById("pager").innerHTML =
    `<a href="project.html?p=${prev.slug}"><small>← Previous</small>${prev.title}</a>
     <a href="project.html?p=${next.slug}" style="text-align:right"><small>Next →</small>${next.title}</a>`;
});

// ---- the photo gallery and its lightbox ---------------------------------------------------------------

/**
 * Fills #gallery with a grid of thumbnails (each links to the full-size picture) and wires up the lightbox.
 * Every photo's size is known in advance (it is stored in albums.js), so the page does not jump around
 * while the pictures load.
 */
function buildGallery(p, album) {
  const box = document.getElementById("gallery");
  const title = p.title.replace(/"/g, "");
  box.className = "gallery";
  box.innerHTML = `<p class="gallery-count">${album.photos.length} photos</p><div class="gallery-grid"></div>`;
  const grid = box.querySelector(".gallery-grid");
  album.photos.forEach((ph, i) => {
    const b = document.createElement("button");
    b.className = "gshot";
    b.setAttribute("aria-label", `Open photo ${i + 1} of ${album.photos.length}`);
    b.innerHTML = `<img src="${ph.f}-t.jpg" width="${Math.round(ph.w * 560 / Math.max(ph.w, ph.h))}" height="${Math.round(ph.h * 560 / Math.max(ph.w, ph.h))}" loading="lazy" alt="${title}, photo ${i + 1}">`;
    b.addEventListener("click", () => openLightbox(album, i, title));
    grid.appendChild(b);
  });
}

/**
 * Shows one photo large over the page. Left/right arrow keys (or the on-screen arrows, or a swipe) move
 * between photos; Escape, the X, or a click on the dark area closes it.
 */
function openLightbox(album, start, title) {
  let i = start;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `<button class="lb-close" aria-label="Close">×</button>
    <button class="lb-prev" aria-label="Previous photo">‹</button>
    <img alt="">
    <button class="lb-next" aria-label="Next photo">›</button>
    <p class="lb-count"></p>`;
  document.body.appendChild(lb);
  document.body.style.overflow = "hidden";           // the page behind stays still
  const img = lb.querySelector("img"), count = lb.querySelector(".lb-count");

  function show() {
    const ph = album.photos[i];
    img.src = `${ph.f}.jpg`;
    img.alt = `${title}, photo ${i + 1}`;
    count.textContent = `${i + 1} / ${album.photos.length}`;
    // load the neighbours quietly so the next click is instant
    [i - 1, i + 1].forEach(j => { if (album.photos[j]) new Image().src = `${album.photos[j].f}.jpg`; });
  }
  function step(d) { i = (i + d + album.photos.length) % album.photos.length; show(); }
  function close() {
    document.removeEventListener("keydown", onKey);
    document.body.style.overflow = "";
    lb.remove();
  }
  function onKey(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  }

  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => step(-1));
  lb.querySelector(".lb-next").addEventListener("click", () => step(1));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });   // the dark area, not the picture or buttons
  document.addEventListener("keydown", onKey);
  let x0 = null;                                       // swipe on a phone
  lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    x0 = null;
  });
  show();
}
