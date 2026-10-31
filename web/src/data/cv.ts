/**
 * Résumé content, from "Timir Deb Nath — CV" (Oct 2026). The phone number and
 * street-level address are deliberately left out of the public site.
 */

export const cv = {
  name: "Timir Deb Nath",
  title: "Motion Designer & Rive Specialist",
  focus: "UI / Product Animation · Performance Video Ads · Lottie",
  location: "Dhaka, Bangladesh (UTC+6) · Open to remote",
  profile:
    "Motion designer with 8+ years of professional experience making product animation, app promos and short-form video for SaaS companies, mobile apps and marketing teams. I build interactive Rive characters and state machines, developer-ready Lottie assets, and high-volume video content in After Effects and Premiere Pro. Delivered 50+ animation projects for clients in the US, Europe and Bangladesh, and currently produce 3–5 videos a day in-house at Inovetix.",
  skills: [
    { area: "Interactive & UI motion", items: "Rive (bones, constraints, state machines), Lottie / Bodymovin, UI and onboarding animation, splash screens, micro-interactions" },
    { area: "Video & ads", items: "Short-form vertical video (9:16), app promo videos, SaaS explainers, video editing, YouTube content and SEO" },
    { area: "Character & 2D", items: "Character design and rigging, 2D animation, mascots, logo animation" },
    { area: "AI-assisted production", items: "ChatGPT, Claude, Higgsfield; AI-assisted video pipelines; custom After Effects tools and scripts" },
    { area: "Tools", items: "After Effects, Premiere Pro, Rive, Figma, Illustrator, Photoshop, Blender, Airtable" },
  ],
  experience: [
    {
      role: "Video Editor & Motion Graphics Designer",
      org: "Inovetix (US company, remote)",
      dates: "Aug 2026 – Present",
      points: [
        "Produce 3–5 finished videos per day: promos, explainers and short-form social content.",
        "Own growth of the company's YouTube channels: content planning, playlists, titles, descriptions and SEO.",
        "Turned a 200+ video library of training content into a structured, tiered online course (Basic / Premium / Master).",
        "Designed an AI-assisted production pipeline (AI tools + After Effects, tracked in Airtable) to raise daily output.",
      ],
    },
    {
      role: "Design Executive",
      org: "FocusOn Global Limited",
      dates: "Sep 2025 – Mar 2026",
      points: ["Created motion design and animated content for the agency's client brands."],
    },
    {
      role: "Motion Designer (Freelance)",
      org: "Fiverr “MotionDesk”, Upwork, direct clients",
      dates: "2014 – Present",
      points: [
        "Delivered 50+ animation projects for SaaS products, mobile apps, websites and marketing campaigns.",
        "Built multi-state Rive characters, e.g. a 9-state koala mascot for a sleep-tracker app and a gaze-tracking cat for a login screen, each shipped as one lightweight .riv file.",
        "Made app promo videos and logo splash animations for mobile apps.",
        "Prepared developer-ready Lottie assets optimized for web and mobile performance.",
      ],
    },
    {
      role: "Motion Graphics Designer",
      org: "Gora Network (Switzerland, remote)",
      dates: "Feb 2023 – Feb 2024",
      points: [
        "Produced 50+ 2D explainer videos and campaign animations that made Web3 concepts easy to follow.",
        "Built social and promotional animations and kept a consistent motion identity across campaigns.",
      ],
    },
    {
      role: "Video Editor",
      org: "Wicked Reports (US, remote, part-time)",
      dates: "Oct 2021 – Feb 2023",
      points: [
        "Edited product, promotional, educational and social videos for a marketing analytics company.",
        "Added motion graphics that explained product features and sharpened campaign messages.",
      ],
    },
    {
      role: "Creative Executive",
      org: "G Technologies (Dhaka)",
      dates: "Jul 2017 – Jul 2022",
      points: [
        "Produced motion graphics, explainer videos and campaign assets; wrote storyboards from marketing briefs.",
        "Designed social graphics, banners and UI/UX concepts for digital products.",
      ],
    },
    {
      role: "Graphic Designer",
      org: "Daffodil Japan IT (Dhaka)",
      dates: "Jul 2015 – Jul 2017",
      points: ["Designed branding materials, flyers, banners and logos; supported brand identity work."],
    },
  ],
  projects: [
    { name: "Koala Sleep Tracker (iOS app)", what: "Custom koala mascot: 9 emotional states in one state machine, running live in the app", tools: "Illustrator, Rive", href: "/work/koala-sleep-tracker/" },
    { name: "Aura AI CRM", what: "SaaS explainer from concept and storyboard to final UI animation", tools: "After Effects, Figma", href: "/work/aura-saas-explainer/" },
    { name: "Stemio, Cuelize, Soho (mobile apps)", what: "App promo videos", tools: "After Effects, Premiere Pro" },
    { name: "Free After Effects tools", what: "7 AE panels (easing presets, Lottie-safe rig, shape-to-SVG, counters), free on my site", tools: "After Effects scripting, AI-assisted coding" },
  ],
  education: [
    { what: "BSc in Computer Science", where: "Sonargaon University", dates: "2020 – 2024" },
    { what: "Diploma in Architectural Visualization", where: "Daffodil International Professional Training Institute", dates: "2014 – 2015" },
    { what: "BSc in Mathematics (partial)", where: "Chittagong College", dates: "2011 – 2013" },
  ],
  /** Set to "/assets/Timir_Deb_Nath_CV.pdf" once a shareable PDF is approved. */
  pdf: null as string | null,
};
