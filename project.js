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

  document.getElementById("title").textContent = p.title;
  document.getElementById("facts").innerHTML =
    `<span>${p.year}</span><span>${p.category}</span>` + (p.role ? `<span>${p.role}</span>` : "");
  const blurb = document.getElementById("blurb");
  if (p.blurb) blurb.textContent = p.blurb; else blurb.remove();

  // previous / next, in the order of the grid (newest first)
  const prev = sorted[(i - 1 + sorted.length) % sorted.length];
  const next = sorted[(i + 1) % sorted.length];
  document.getElementById("pager").innerHTML =
    `<a href="project.html?p=${prev.slug}"><small>← Previous</small>${prev.title}</a>
     <a href="project.html?p=${next.slug}" style="text-align:right"><small>Next →</small>${next.title}</a>`;
});
