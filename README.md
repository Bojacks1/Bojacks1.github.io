# Boraq Abdulmajeed: portfolio

A plain HTML, CSS and JavaScript site (no build step, no libraries). Open `index.html` in a browser, or run
`python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Adding a video
Open `projects.js`, find the project, and paste the YouTube link into its `video: ""`. The card's
thumbnail and the project page's player are made from it automatically. Change `category`, `blurb` and
`role` in the same place.

## Files (everything is in one folder, so it can be uploaded by dragging files)
- `index.html`, `project.html`, `games.html`, `about.html`, `404.html`: the pages
- `style.css`: the whole look (colours are variables at the top)
- `projects.js`: the list of work (edit this)
- `site.js`, `project.js`: the small scripts
- `crankblade-dash.gif`, `crankfm-beats.gif`, `vinyl.gif`: the games' looping clips
- `og.png`: the picture shown when the link is shared; `favicon.svg`: the tab icon

## Publishing and updating (GitHub Pages)
Create a public repository named `Bojacks1.github.io` on github.com, upload these files (drag them in), and in
Settings > Pages choose "Deploy from a branch", branch `main`, folder `/ (root)`. The site is then live at
https://bojacks1.github.io. To change something later, edit the file here and upload it again (it replaces
the old one); the change shows up within a minute or two.
