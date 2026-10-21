/*
 * projects.js: every piece of work on the site lives in this one list.
 *
 * To add or change a project, edit an entry here; nothing else needs to be touched.
 *   slug      the page's address: project.html?p=<slug> (letters, numbers and dashes only)
 *   title     as shown on the card and the page
 *   year      shown on the card; the grid is sorted newest first
 *   category  "Film", "Documentary" or "Events" (the filter buttons on the home page use these)
 *   blurb     a sentence or two under the video (leave "" for none)
 *   video     a YouTube link (any form: youtu.be/..., youtube.com/watch?v=..., or just the 11-character id).
 *             The card's thumbnail is taken from the video automatically. Leave "" until there is one.
 *   role      what you did on it (leave "" until you decide)
 *   album     (optional) the name of a photo album made with make_album.py, for example "saudi-national-day-2024".
 *             The gallery appears on the project's page and the album's cover is used on the card when there
 *             is no video. A project can have a video, an album, or both.
 *
 * !! The titles, years and blurbs are copied from the old Adobe Portfolio site. The categories are a
 * !! first guess made from the titles, so please correct any that are wrong.
 */
const PROJECTS = [
  // 2026
  { slug: "nyc", title: "NYC", year: 2026, category: "Documentary", blurb: "", video: "cvNAHIbaSvg", role: "" },
  { slug: "la-la-chi", title: "LA LA CHI", year: 2026, category: "Documentary", blurb: "", video: "O0kfFpcFIvs", role: "" },
  { slug: "pre-approved", title: "Pre-Approved", year: 2026, category: "Film", blurb: "A sitcom.", video: "y9TDN1bYtCk", role: "" },
  { slug: "loves-lost-is-found", title: "Love's Lost is Found", year: 2026, category: "Film", blurb: "", video: "a-2NpW62KB8", role: "" },
  { slug: "checkmate", title: "Checkmate", year: 2026, category: "Film", blurb: "", video: "juiajXo8lbs", role: "" },
  { slug: "bob-i-need-the-greeting-codes", title: "Bob, I need the greeting codes", year: 2026, category: "Film", blurb: "", video: "XyKDjBN2z-8", role: "" },
  { slug: "fleeting-phantom", title: "Fleeting Phantom", year: 2026, category: "Film", blurb: "", video: "otdv77azTSU", role: "" },
  { slug: "boy-meets-girl", title: "Boy Meets Girl", year: 2026, category: "Film", blurb: "The charm is in how you interpret the story.", video: "vM3kMnqIiCU", role: "" },

  // 2024
  { slug: "saudi-national-day-2024", title: "Saudi National Day Celebration 2024", year: 2024, category: "Events", blurb: "Celebrates Saudi National Day on the MSU campus, the Saudi Student Union's first ISA-funded event.", video: "", role: "", album: "saudi-national-day-2024" },
  { slug: "best-of-5k-run", title: "Best of 5K Run", year: 2024, category: "Events", blurb: "Photos from the 5K Run For Humanity at Michigan State University.", video: "", role: "", album: "best-of-5k-run" },
  { slug: "5k-run-for-palestine", title: "5K Run For Palestine", year: 2024, category: "Events", blurb: "An MSA event supporting Palestinian refugees.", video: "Q0ijwQajPdQ", role: "" },
  { slug: "cat-cafe-spartan-shifa", title: "Cat Cafe: Spartan Shifa", year: 2024, category: "Events", blurb: "A cat cafe in East Lansing by Spartan Shifa, which promotes mental health dialogue in the Muslim-American community.", video: "", role: "", album: "cat-cafe-spartan-shifa" },
  { slug: "chicago-2024", title: "Chicago 2024", year: 2024, category: "Documentary", blurb: "Boraq and friends' spring break trip to Chicago.", video: "", role: "", album: "chicago-2024" },
  { slug: "saudi-founding-day-2024", title: "Saudi Founding Day 2024", year: 2024, category: "Events", blurb: "A celebration of Saudi Arabia's founding day at MSU.", video: "", role: "", album: "saudi-founding-day-2024" },
  { slug: "party-noise", title: "Party Noise", year: 2024, category: "Film", blurb: "Aanya feels blue after winter break, even when hanging out with friends.", video: "", role: "" },

  // 2023
  { slug: "secret-santa", title: "Secret Santa", year: 2023, category: "Film", blurb: "Boraq and friends go on a chaotic adventure.", video: "LwRWKFhu9lg", role: "" },
  { slug: "ann-arbor-thanksgiving", title: "Ann Arbor Thanksgiving", year: 2023, category: "Documentary", blurb: "An atmospheric video of Ann Arbor on Thanksgiving.", video: "OhG1Ak1532Y", role: "" },
  { slug: "pinball-documentary", title: "Pinball Documentary", year: 2023, category: "Documentary", blurb: "A mini-documentary on a landmark in East Lansing.", video: "R7WQiEA6wnk", role: "" },
  { slug: "are-you-on-your-way", title: "Are you on your way?", year: 2023, category: "Film", blurb: "", video: "HWjqfqWyuno", role: "" },
  { slug: "zahra-flower", title: "ZAHRA (Flower)", year: 2023, category: "Film", blurb: "", video: "", role: "" },
];
