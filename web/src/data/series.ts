/**
 * "TIMIR — The Series": the profile, viewer profiles, seasons and intro reel.
 * Only facts from the previous site / project data — confirm before adding more.
 */

export const profile = {
  name: "TIMIR",
  fullName: "Timir Deb Nath",
  tagline: "THE SERIES",
  role: "Motion Designer & Rive Specialist",
  // Served from Fiverr's CDN; replace with a local file (e.g. /assets/portrait.jpg) when available.
  portrait:
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/d4449f9244fc2d18ac1524cd2a39594a-1777942378776/9a0e990d-23e8-4a41-8db5-ca2a1efc336a.jpg",
  summary:
    "Characters that react, interfaces that explain themselves and explainers that make complex products simple — built web-ready so developers can ship them.",
  meta: ["2014 – Now", "Lottie • Rive • 2D"],
  // 8+ years and 50+ projects are from the CV; the Fiverr rating is from the previous site — keep it current.
  stats: [
    { value: "8+ years", label: "in motion design" },
    { value: "50+", label: "animation projects" },
    { value: "4.9 ★", label: "Fiverr rating" },
  ],
};

export type ViewerId = "timir" | "client" | "developer" | "recruiter";

export type Viewer = {
  id: ViewerId;
  name: string;
  blurb: string;
  /** Live Rive avatar, or the portrait for the main profile. */
  avatar: { kind: "portrait" } | { kind: "rive"; src: string; stateMachine: string; artboard?: string };
  tile: string;
  /** Home row order for this viewer (row ids from the homepage). */
  rows: string[];
};

export const viewers: Viewer[] = [
  {
    id: "timir",
    name: "Timir",
    blurb: "The full series, in order",
    avatar: { kind: "portrait" },
    tile: "radial-gradient(circle at 50% 40%,#a1243a,#4a0c18)",
    rows: ["continue", "characters", "top", "films", "explainers", "lottie", "logos", "edits"],
  },
  {
    id: "client",
    name: "Client",
    blurb: "Films, characters & how we'd work",
    avatar: { kind: "rive", src: "/animations/rive/cat.riv", stateMachine: "Cat_SM" },
    tile: "linear-gradient(160deg,#7fd3e6,#2f7fa8 55%,#1d4f73)",
    rows: ["films", "characters", "explainers", "top", "continue", "lottie", "logos", "edits"],
  },
  {
    id: "developer",
    name: "Developer",
    blurb: "Live .riv & Lottie files, inputs & handoff",
    avatar: { kind: "rive", src: "/animations/rive/countly.riv", stateMachine: "State Machine 1", artboard: "Artboard 1" },
    tile: "linear-gradient(160deg,#8be38f,#2f9a52 55%,#17602f)",
    rows: ["characters", "lottie", "continue", "top", "logos", "films", "explainers", "edits"],
  },
  {
    id: "recruiter",
    name: "Recruiter",
    blurb: "Experience, skills & résumé first",
    avatar: { kind: "rive", src: "/animations/rive/aria.riv", stateMachine: "Aria" },
    tile: "linear-gradient(160deg,#ffd76a,#e09a1c 55%,#a2620b)",
    rows: ["top", "continue", "characters", "films", "explainers", "lottie", "logos", "edits"],
  },
];

export type Season = {
  id: string;
  number: number;
  title: string;
  years: string;
  role: string;
  org: string;
  summary: string;
  /** Project slugs shown as episodes. */
  episodes: string[];
};

// From the CV (Oct 2026).
export const seasons: Season[] = [
  {
    id: "s1",
    number: 1,
    title: "The Beginning",
    years: "2014 – 2017",
    role: "Graphic Designer",
    org: "Daffodil Japan IT, Dhaka · first freelance work",
    summary:
      "Freelancing starts in 2014 alongside a diploma in architectural visualization. At Daffodil Japan IT: branding materials, flyers, banners and logos.",
    episodes: [],
  },
  {
    id: "s2",
    number: 2,
    title: "Studio Years",
    years: "2017 – 2022",
    role: "Creative Executive",
    org: "G Technologies, Dhaka",
    summary:
      "Motion graphics, explainer videos and campaign assets, storyboards written from marketing briefs, plus social graphics and UI/UX concepts. A BSc in Computer Science starts in 2020.",
    episodes: [],
  },
  {
    id: "s3",
    number: 3,
    title: "Remote Teams",
    years: "2021 – 2024",
    role: "Video Editor → Motion Graphics Designer",
    org: "Wicked Reports (US) · Gora Network (Switzerland)",
    summary:
      "Product, promo and educational edits for a US marketing-analytics company, then 50+ 2D explainers and campaign animations that made Web3 easy to follow for Gora Network.",
    episodes: ["gora-blockchain-explainer"],
  },
  {
    id: "s4",
    number: 4,
    title: "Going Independent",
    years: "2024 – 2026",
    role: "Motion Designer (Freelance) · Design Executive",
    org: "Fiverr “MotionDesk”, Upwork & direct clients · FocusOn Global",
    summary:
      "Multi-state Rive characters, developer-ready Lottie, SaaS explainers and app promos for clients in the US, Europe and Bangladesh — 50+ projects in all.",
    episodes: ["koala-sleep-tracker", "silver-tabby-cat", "aura-saas-explainer", "countly-character", "zeiziq-bird", "aria-teacher-rig", "interactive-micro-animations"],
  },
  {
    id: "s5",
    number: 5,
    title: "Now Playing",
    years: "Aug 2026 – Now",
    role: "Video Editor & Motion Graphics Designer",
    org: "Inovetix (US, remote)",
    summary:
      "3–5 finished videos a day, YouTube channel growth, a 200+ video library turned into a tiered course, and an AI-assisted production pipeline tracked in Airtable.",
    episodes: ["sohopay-launch-films"],
  },
];

/** ▶ Play Intro: a short highlight reel. */
export const introSlides = [
  { kicker: "Previously on", title: "TIMIR", text: "8+ years in motion design, a computer-science degree and 50+ projects.", media: { kind: "portrait" as const } },
  { kicker: "Now playing", title: "SohoPay", text: "Eight films for a payments layer built for AI agents.", media: { kind: "image" as const, src: "/assets/sohopay-link-film.jpg" } },
  { kicker: "Live Rive", title: "Countly", text: "Nine animations and a pull-to-refresh bat in one file.", media: { kind: "rive" as const, src: "/animations/rive/countly.riv", stateMachine: "State Machine 1", artboard: "Artboard 1" } },
  { kicker: "Live Rive", title: "Silver Tabby", text: "A sign-in cat that follows your cursor.", media: { kind: "rive" as const, src: "/animations/rive/cat.riv", stateMachine: "Cat_SM" } },
  { kicker: "Explainers", title: "Aura · Gora · TRACE", text: "Complex products, made simple in under two minutes.", media: { kind: "image" as const, src: "/assets/aura-explainer.jpg" } },
  { kicker: "Next episode", title: "Yours?", text: "Lottie, Rive, UI motion and explainers — let's make it move.", media: { kind: "portrait" as const } },
];
