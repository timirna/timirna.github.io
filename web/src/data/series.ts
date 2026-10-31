/**
 * "TIMIR — The Series": the profile, viewer profiles, seasons and intro reel.
 * Only facts from the previous site / project data — confirm before adding more.
 */

export const profile = {
  name: "TIMIR",
  fullName: "Timir Deb Nath",
  tagline: "THE SERIES",
  role: "Motion Designer · Lottie · Rive · 2D",
  // Served from Fiverr's CDN; replace with a local file (e.g. /assets/portrait.jpg) when available.
  portrait:
    "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/d4449f9244fc2d18ac1524cd2a39594a-1777942378776/9a0e990d-23e8-4a41-8db5-ca2a1efc336a.jpg",
  summary:
    "Characters that react, interfaces that explain themselves and explainers that make complex products simple — built web-ready so developers can ship them.",
  meta: ["2014 – Now", "Lottie • Rive • 2D"],
  // Verified 2026-10-31 from https://www.fiverr.com/timir69
  // (AggregateRating 4.9 / reviewCount 1029; seller_level level_two_seller).
  stats: [
    { value: "4.9 ★", label: "Fiverr rating" },
    { value: "1,000+", label: "client reviews" },
    { value: "Level 2", label: "Fiverr seller" },
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
    rows: ["continue", "characters", "top", "films", "explainers", "lottie", "logos"],
  },
  {
    id: "client",
    name: "Client",
    blurb: "Films, characters & how we'd work",
    avatar: { kind: "rive", src: "/animations/rive/cat.riv", stateMachine: "Cat_SM" },
    tile: "linear-gradient(160deg,#7fd3e6,#2f7fa8 55%,#1d4f73)",
    rows: ["films", "characters", "explainers", "top", "continue", "lottie", "logos"],
  },
  {
    id: "developer",
    name: "Developer",
    blurb: "Live .riv & Lottie files, inputs & handoff",
    avatar: { kind: "rive", src: "/animations/rive/countly.riv", stateMachine: "State Machine 1", artboard: "Artboard 1" },
    tile: "linear-gradient(160deg,#8be38f,#2f9a52 55%,#17602f)",
    rows: ["characters", "lottie", "continue", "top", "logos", "films", "explainers"],
  },
  {
    id: "recruiter",
    name: "Recruiter",
    blurb: "Experience, skills & highlights first",
    avatar: { kind: "rive", src: "/animations/rive/aria.riv", stateMachine: "Aria" },
    tile: "linear-gradient(160deg,#ffd76a,#e09a1c 55%,#a2620b)",
    rows: ["top", "continue", "characters", "films", "explainers", "lottie", "logos"],
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

// TODO: confirm dates and wording (taken from the previous site's experience list).
export const seasons: Season[] = [
  {
    id: "s1",
    number: 1,
    title: "The Beginning",
    years: "2014 – 2017",
    role: "Executive (Design)",
    org: "Daffodil Japan IT",
    summary: "Where it started: branding, image enhancement and clipping-path work — learning craft, detail and deadlines.",
    episodes: [],
  },
  {
    id: "s2",
    number: 2,
    title: "Studio Years",
    years: "2016 – 2023",
    role: "Creative Designer",
    org: "G Technologies",
    summary: "Motion graphics, explainer videos and UI/UX prototypes — turning products into stories that move.",
    episodes: ["gora-blockchain-explainer", "trace-saas-explainer", "aura-saas-explainer", "ask-rosie-hero"],
  },
  {
    id: "s3",
    number: 3,
    title: "Going Independent",
    years: "2023 – Now",
    role: "Freelance Motion Designer",
    org: "Fiverr — Level 2 seller",
    summary: "Going solo: Lottie and Rive for apps and websites, SaaS explainers and launch films for clients around the world.",
    episodes: ["sohopay-launch-films", "countly-character", "silver-tabby-cat", "zeiziq-bird", "aria-teacher-rig", "koala-sleep-tracker", "interactive-micro-animations"],
  },
];

/** ▶ Play Intro: a short highlight reel. */
export const introSlides = [
  { kicker: "Previously on", title: "TIMIR", text: "A motion designer with a computer-science background.", media: { kind: "portrait" as const } },
  { kicker: "Season 3 · Episode 1", title: "SohoPay", text: "Eight films for a payments layer built for AI agents.", media: { kind: "image" as const, src: "/assets/sohopay-link-film.jpg" } },
  { kicker: "Live Rive", title: "Countly", text: "Nine animations and a pull-to-refresh bat in one file.", media: { kind: "rive" as const, src: "/animations/rive/countly.riv", stateMachine: "State Machine 1", artboard: "Artboard 1" } },
  { kicker: "Live Rive", title: "Silver Tabby", text: "A sign-in cat that follows your cursor.", media: { kind: "rive" as const, src: "/animations/rive/cat.riv", stateMachine: "Cat_SM" } },
  { kicker: "Explainers", title: "Aura · Gora · TRACE", text: "Complex products, made simple in under two minutes.", media: { kind: "image" as const, src: "/assets/aura-explainer.jpg" } },
  { kicker: "Next episode", title: "Yours?", text: "Lottie, Rive, UI motion and explainers — let's make it move.", media: { kind: "portrait" as const } },
];
