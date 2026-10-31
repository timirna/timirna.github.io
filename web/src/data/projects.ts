import type { Category, Project } from "@/types/project";

const FIVERR = "https://fiverr-res.cloudinary.com";
const img = (path: string) => `${FIVERR}/image/upload/f_auto,q_auto/v1/attachments/project_item/attachment/${path}`;
const vid = (path: string) => `${FIVERR}/video/upload/t_fiverr_hd/v1/video-attachments/${path}.mp4`;
const vidPoster = (path: string) => `${FIVERR}/video/upload/so_0,w_960,f_auto,q_auto/v1/video-attachments/${path}.jpg`;

/**
 * All portfolio content lives here. Add a project by appending an object;
 * its /work/[slug] page is generated automatically.
 * Only write facts you can confirm — leave a field out rather than guess.
 */
export const projects: Project[] = [
  {
    slug: "koala-sleep-tracker",
    title: "Koala Sleep Tracker Mascot",
    categories: ["Rive", "Character"],
    summary:
      "From one reference image to a living koala mascot — designed in Illustrator, rigged in Rive with a nine-state unified state machine, and delivered as one production-ready .riv file for iOS.",
    role: "Character design, rigging, interactive animation",
    tools: ["Adobe Illustrator", "Rive"],
    deliverables: ["Single .riv file", "Unified state machine with nine states"],
    cover: img("f24c69f0e2a4aad6ecb437249b862a28-1783890456236/Rive%20app%20animation.gif"),
    coverAlt: "The koala mascot animating inside the sleep tracker app",
    challenge:
      "The developer came with a single reference image and a vision: the koala shouldn't be decoration — it should be the app experience. That meant a wide emotional range, smooth transitions between moods, and a file light enough to run in real time on mobile. Pre-rendered video was never an option; every state had to be interactive and instant.",
    approach: [
      "In Illustrator I developed the reference into a complete master illustration, drawn as clean flat vector with every limb, ear, eyelid and facial feature built as a separate, rig-ready piece.",
      "Shadows, colour refinement and depth were added inside Rive rather than baked into the artwork, so the shading moves with the character while staying 100% vector and lightweight.",
      "I rigged the koala with bones and constraints and built nine states: Idle, Talking, Sleepy, Tired, Sleeping, Wake Up, Celebration, Crying and Pride. States that originally lived across several artboards were consolidated into one unified state machine on a single artboard, so the koala flows between any mood the app calls for.",
    ],
    gallery: [
      { src: img("f24c69f0e2a4aad6ecb437249b862a28-1783890870631/SH-03_1.gif"), alt: "Koala rig shown in the Rive editor" },
      { src: img("40116cbaee57e19ca856bc511eb71d96-1783889560566/Celebration_Victory.gif"), alt: "Celebration state" },
      { src: img("40116cbaee57e19ca856bc511eb71d96-1783889565987/Koala_Tired.gif"), alt: "Tired state" },
      { src: img("40116cbaee57e19ca856bc511eb71d96-1783889584583/Koala_crying.gif"), alt: "Crying state" },
    ],
  },
  {
    slug: "silver-tabby-cat",
    title: "Silver Tabby Gaze Rig",
    year: 2026,
    categories: ["Rive", "Character"],
    summary:
      "A Rive cat mascot for a sign-in screen whose head and eyes follow your cursor or finger, with blink, nose-lick and happy reactions. Move your pointer — it's live.",
    role: "Character rigging, interactive animation",
    tools: ["Rive"],
    deliverables: ["Single .riv file", "View model CatVM: Look_X, Look_Y", "Triggers: Blink, LickNose, Happy"],
    cover: "",
    coverAlt: "A silver tabby cat that looks at your cursor",
    riveFile: "/animations/rive/cat.riv",
    riveStateMachine: "Cat_SM",
    externalDemo: "/cat-preview/",
    challenge:
      "The cat had to sit above a sign-in card and feel attentive — watching the user wherever they move — while running in the same web runtime the app will use.",
    approach: [
      "The gaze is a grid of drawn head poses: five rows on Look_Y, with nine poses across the middle row and three on the others. Two numbers, Look_X and Look_Y from −1 to 1, pick the pose, so the app only has to pass the pointer position.",
      "Idle breathing runs all the time, and the cat blinks on its own while looking straight ahead. Blink, LickNose and Happy are triggers on the view model for moments the app wants to call out.",
      "Shown here as a preview — the art isn't final.",
    ],
  },
  {
    slug: "zeiziq-bird",
    title: "ZEIZIQ Bird",
    year: 2026,
    categories: ["Rive", "Character"],
    summary:
      "A Rive bird that perches, takes off, flaps, glides and lands — one state machine the website drives while its own code sets the flight path.",
    role: "Character animation, state machine",
    tools: ["Rive"],
    deliverables: ["Single .riv file (2800 × 2400 artboard)", "View model BirdVM: attention, takeoff, land, isGliding"],
    cover: "",
    coverAlt: "The ZEIZIQ bird character",
    riveFile: "/animations/rive/bird.riv",
    riveStateMachine: "BirdSM",
    riveArtboard: "ZEIZIQ_Bird",
    externalDemo: "/zeiziq-bird/",
    challenge:
      "The bird needed to live on a website and move around it — so the animation had to stay fixed inside its artboard and leave position, flight path, scale and timing to the site's code.",
    approach: [
      "Three loops — idle (5 s), flap (0.6 s) and glide (3 s) — and three one-shots — attention (1.6 s), takeoff (1 s) and land-settle (1.6 s).",
      "The state machine knows where the bird is: Attention and Take off only work while it's perched; Glide and Land only work while it's flying. The site drives it through the BirdVM view model with three triggers and an isGliding boolean.",
      "Later passes added a new body, a flap-down wing pose, a tilt in flight, visible legs and a larger artboard.",
    ],
  },
  {
    slug: "countly-character",
    title: "Countly",
    year: 2026,
    categories: ["Rive", "Character"],
    summary:
      "An in-app Rive mascot with nine animations — idle, reactions, four loading loops and daily-habit moments — plus a pull-to-refresh bat, all driven from one file through data binding.",
    role: "Character animation, rigging, state machines",
    tools: ["Rive"],
    deliverables: [
      "Single .riv file, two state machines",
      "Triggers: wave, frustrate, water, exercise, flex",
      "Booleans: loading, cooking, scanning, fridge, refreshing",
      "Image property: mealPhoto",
    ],
    cover: "",
    coverAlt: "Countly, an animated mascot",
    riveFile: "/animations/rive/countly.riv",
    riveStateMachine: "State Machine 1",
    riveArtboard: "Artboard 1",
    externalDemo: "/countly-preview/",
    challenge:
      "Countly is the face of the app: alive while idle, reacting on cue, standing in for loading screens and celebrating daily habits — without the app juggling separate files.",
    approach: [
      "Idle (4 s) breathes, sways and blinks. Reactions — wave (3 s) and frustrated (2.5 s) — fire from triggers, play once and return to idle; they only start from idle so they never cut each other off.",
      "Four loading loops each sit behind a boolean: a coffin wake-up (6 s, loading), a cauldron stir (4 s, cooking — used for meal recommendations), a food scan (4 s, scanning) and a fridge with a bat (5 s, fridge). A mealPhoto image property puts the user's own photo into the scene. Turn the boolean off and he fades back to idle.",
      "Phase 2 added daily-habit one-shots — watering the plant (4 s), pull-up bar crunches (4.5 s) and a mirror flex (4.5 s) — and a second state machine, Bat Refresh, where Countly drops in as a bat, hovers while the list refreshes, then flies off.",
    ],
  },
  {
    slug: "aria-teacher-rig",
    title: "Aria Teacher Rig",
    categories: ["Rive", "Character"],
    summary: "A Rive teacher character with seven expressions and a speaking toggle, driven by one state machine.",
    cover: "",
    coverAlt: "Aria, an animated teacher character",
    riveFile: "/animations/rive/aria.riv",
    riveStateMachine: "Aria",
    externalDemo: "/aria-preview/",
  },
  {
    slug: "sohopay-launch-films",
    title: "SohoPay",
    client: "SohoPay",
    year: 2026,
    categories: ["2D Motion", "Video"],
    summary:
      "Agents can do the work, but they can't pay for it. Eight films for SohoPay, the payments layer built for AI agents — explainers, launch films, a product film, brand films and a story cut.",
    services: ["Explainer", "Launch film", "Product film", "Brand film"],
    tools: ["After Effects", "Premiere Pro"],
    deliverables: ["8 films", "1920×1080"],
    cover: "/assets/sohopay-launch.jpg",
    coverAlt: "SohoPay launch film frame",
    backdrop: "/assets/sohopay-link-film.jpg",
    previewVideo: "/assets/sohopay-launch.mp4",
    heroVideo: "/assets/sohopay-launch.mp4",
  },
  {
    slug: "aura-saas-explainer",
    title: "Aura — SaaS Explainer",
    client: "Aura",
    categories: ["2D Motion", "Video"],
    summary:
      "Product explainer for Aura (English version) — turning the platform's value into a clear, engaging story from script to screen.",
    services: ["Explainer video", "2D motion"],
    cover: "/assets/aura-explainer.jpg",
    coverAlt: "Aura explainer frame: a web form notification card on a violet grid",
    previewVideo: "/assets/aura-explainer.mp4",
    heroVideo: "/assets/aura-explainer.mp4",
  },
  {
    slug: "gora-blockchain-explainer",
    title: "Gora — Blockchain Oracle Explainer",
    client: "Gora",
    categories: ["2D Motion", "Video"],
    summary:
      "A 2D explainer for Gora, the next-generation blockchain oracle — script-to-screen storytelling that turns a complex Web3 product into a clear narrative.",
    services: ["Explainer video", "2D motion"],
    cover: "/assets/gora-explainer.jpg",
    coverAlt: "Gora logo glowing over a green network scene",
    previewVideo: "/assets/gora-explainer.mp4",
    heroVideo: "/assets/gora-explainer.mp4",
    gallery: [
      { src: "https://cdn.dribbble.com/userupload/11339073/file/original-0ec9f9b979f0fffe31f9756bab030b65.gif", alt: "Gora brand animation" },
    ],
  },
  {
    slug: "interactive-micro-animations",
    title: "Interactive Micro Animations",
    categories: ["Lottie", "UI Motion"],
    summary:
      "A set of interactive Lottie micro-animations — staged onboarding and product motion delivered as lightweight, web-ready files.",
    services: ["UI motion", "Lottie export"],
    cover: "/assets/stage-3.jpg",
    coverAlt: "Onboarding micro-animation, stage three",
    previewVideo: "/assets/stage-3.mp4",
    heroVideo: "/assets/stage-1.mp4",
    gallery: [2, 3, 4, 5].map((n) => ({
      type: "video" as const,
      src: `/assets/stage-${n}.mp4`,
      poster: `/assets/stage-${n}.jpg`,
      alt: `Onboarding stage ${n}`,
    })),
  },
  {
    slug: "interactive-lottie-character",
    title: "Interactive Lottie Character",
    categories: ["Lottie", "Character"],
    summary:
      "A Lottie character set — idle, walk, hand wave, head movement, tail shake and blush — plus animated app screens. Real production files, playing live.",
    services: ["Character animation", "Lottie export"],
    cover: "",
    coverAlt: "Lottie character waving",
    lottieFiles: [
      "/animations/lottie/hand-wave.json",
      "/animations/lottie/idle.json",
      "/animations/lottie/walk.json",
      "/animations/lottie/head-movement.json",
      "/animations/lottie/shake-tail.json",
      "/animations/lottie/annoyed-blush.json",
      "/animations/lottie/alarm-screen.json",
      "/animations/lottie/home-screen.json",
      "/animations/lottie/analytics-screen.json",
    ],
  },
  {
    slug: "ask-rosie-hero",
    title: "Ask Rosie Hero Animation",
    client: "Ask Rosie",
    categories: ["UI Motion", "2D Motion"],
    summary: "Hero section animation for Ask Rosie Visual — smooth, attention-grabbing motion for the website's opening view.",
    cover: "https://cdn.dribbble.com/userupload/21729180/file/still-1f816328dc30cd7ea2389d173f23e999.png",
    coverAlt: "Ask Rosie website hero",
    previewVideo: "https://cdn.dribbble.com/userupload/21729180/file/large-a4feaaf401ae32b3789d09194bba6050.mp4",
    heroVideo: "https://cdn.dribbble.com/userupload/21729180/file/large-a4feaaf401ae32b3789d09194bba6050.mp4",
  },
  {
    slug: "trace-saas-explainer",
    title: "TRACE — SaaS Explainer",
    client: "TRACE",
    categories: ["2D Motion", "Video"],
    summary: "A SaaS product explainer designed, animated and delivered in HD.",
    cover: "/assets/trace.jpg",
    coverAlt: "Floating dashboard panels with charts",
    previewVideo: "/assets/trace.mp4",
    heroVideo: "/assets/trace.mp4",
  },
  {
    slug: "unicorn-logo-wink",
    title: "Unicorn Logo Wink",
    categories: ["Lottie"],
    summary:
      "A soft wink, a wider smile and a small bashful nod before resetting — a charming logo moment in about 1.5 seconds, delivered as Lottie.",
    cover: "",
    coverAlt: "Unicorn logo winking",
    lottieFiles: ["/animations/lottie/unicorn-wink.json"],
  },
  {
    slug: "logo-lottie-app-web",
    title: "Logo Lottie for App & Web",
    categories: ["Lottie"],
    summary: "Logo animations delivered as Lottie for app and web — crisp motion at any size.",
    cover: "https://cdn.dribbble.com/userupload/21761532/file/original-854c42236bb6d18807cdc64dbc4c9024.jpg",
    coverAlt: "Logo animation still",
    previewVideo: "https://cdn.dribbble.com/userupload/21761533/file/large-5b47d3d97681e04f3ee060d9e1708d35.mp4",
    heroVideo: "https://cdn.dribbble.com/userupload/21761533/file/large-5b47d3d97681e04f3ee060d9e1708d35.mp4",
    gallery: [
      {
        type: "video",
        src: "https://cdn.dribbble.com/userupload/21761534/file/large-3dc93779373a7e5a84282ee0091b2186.mp4",
        alt: "Second logo animation",
      },
    ],
  },
  {
    slug: "logos-to-life-lottie",
    title: "Bringing Logos to Life",
    categories: ["Lottie"],
    summary: "Logo animations built in Lottie — lightweight, crisp motion that brings brand marks to life on web and app.",
    cover: "https://cdn.dribbble.com/userupload/21697050/file/still-a14249c1a6e3f17dc2994888637ce3f0.png",
    coverAlt: "Logo animation collection still",
    previewVideo: "https://cdn.dribbble.com/userupload/21697050/file/original-a7986f4449f322c59e3ba93bc79a3043.mp4",
    heroVideo: "https://cdn.dribbble.com/userupload/21697050/file/original-a7986f4449f322c59e3ba93bc79a3043.mp4",
  },
  {
    slug: "app-splash-screens",
    title: "App Splash Screens",
    categories: ["Lottie", "UI Motion"],
    summary: "Lottie splash screen animations for mobile apps — fast, branded first impressions.",
    cover: "https://cdn.dribbble.com/userupload/21729440/file/still-c9b3be6312d16226f7f0cec9528f1c73.png",
    coverAlt: "App splash screen still",
    previewVideo: "https://cdn.dribbble.com/userupload/21729462/file/large-ea28925a506dd149dfa98a0362bddf6d.mp4",
    heroVideo: "https://cdn.dribbble.com/userupload/21729462/file/large-ea28925a506dd149dfa98a0362bddf6d.mp4",
    gallery: [
      {
        type: "video",
        src: "https://cdn.dribbble.com/userupload/21729463/file/large-642ab8cbad2fe3be17cddbba8a177040.mp4",
        alt: "Second splash screen",
      },
      {
        type: "video",
        src: vid("delivery/asset/9fc666d402eb6e85983bdf59b9cab6bc-1726325863/final%20splash%20screen%202_3"),
        poster: vidPoster("delivery/asset/9fc666d402eb6e85983bdf59b9cab6bc-1726325863/final%20splash%20screen%202_3"),
        alt: "Client splash screen",
      },
      {
        type: "video",
        src: vid("project_item/attachment/6fe2640061aa67f7e3e0918d6490ec3d-1740123198377/original-b00c3683fca9990752dd3ae2ac10548f"),
        poster: vidPoster("project_item/attachment/6fe2640061aa67f7e3e0918d6490ec3d-1740123198377/original-b00c3683fca9990752dd3ae2ac10548f"),
        alt: "Geological hazard platform splash screen",
      },
    ],
  },
  {
    slug: "blender-3d-roll-lottie",
    title: "Blender 3D Roll in Lottie",
    categories: ["Lottie"],
    summary: "A Blender-made 3D roll exported to Lottie — real 3D depth with Lottie's lightweight delivery for web and app.",
    tools: ["Blender", "After Effects", "Lottie"],
    cover: "https://cdn.dribbble.com/userupload/21761569/file/original-79dc1930ffb141f55ab181a1847596f5.jpg",
    coverAlt: "3D rolling object still",
    previewVideo: "https://cdn.dribbble.com/userupload/21761570/file/large-df5f955563b3427e3bdf7ffd557bd0a2.mp4",
    heroVideo: "https://cdn.dribbble.com/userupload/21761570/file/large-df5f955563b3427e3bdf7ffd557bd0a2.mp4",
  },
  {
    slug: "ux-interactive-motion",
    title: "UX Interactive Motion",
    categories: ["UI Motion"],
    summary: "Interface responses that guide and delight users.",
    cover: "https://cdn.dribbble.com/userupload/21761572/file/original-5835d00e0c12adda76e35568ec62abb4.gif",
    coverAlt: "Interactive UI motion",
    gallery: [{ src: "https://cdn.dribbble.com/userupload/21761571/file/original-2f89e8afd40fbe4d850d28cf5dbf3c5e.jpg", alt: "UI motion still" }],
  },
  {
    slug: "sports-app-characters",
    title: "Sports App Characters",
    categories: ["Lottie", "Character"],
    summary: "Lottie character animation for a sports and fitness app splash screen — each character designed, then animated.",
    cover: img("29eb9d5e0e7dc1ac66be8f2e5f937642-1728495382163/Comp_54.gif"),
    coverAlt: "Sports characters animation",
    gallery: [
      { src: img("29eb9d5e0e7dc1ac66be8f2e5f937642-1728495143022/football_3.gif"), alt: "Football character" },
      { src: img("29eb9d5e0e7dc1ac66be8f2e5f937642-1728495365225/busket_ball.gif"), alt: "Basketball character" },
      { src: img("29eb9d5e0e7dc1ac66be8f2e5f937642-1728495354754/tennis.gif"), alt: "Tennis character" },
    ],
  },
  {
    slug: "lottie-character-design",
    title: "Lottie Character Design",
    categories: ["Lottie", "Character"],
    summary:
      "A custom character designed and animated for Lottie — clean vector assets, rigging and multiple smooth animations while keeping the file light.",
    cover: img("c8d4a3787be1b03b90abec289dfb5baf-1783890916873/3D_Camera_Square_Animation_HD_6.gif"),
    coverAlt: "Character animation preview",
    heroVideo: vid("project_item/attachment/050a03f416e229270a08d400255902bc-1783885659869/3D_Camera_Square_Animation_HD_6"),
    gallery: [
      {
        type: "video",
        src: vid("project_item/attachment/c8d4a3787be1b03b90abec289dfb5baf-1783890940452/character%20animation%20in%20after%20effect%20preview_1"),
        poster: vidPoster("project_item/attachment/c8d4a3787be1b03b90abec289dfb5baf-1783890940452/character%20animation%20in%20after%20effect%20preview_1"),
        alt: "Character animation in After Effects",
      },
      { src: img("c8d4a3787be1b03b90abec289dfb5baf-1783890962314/flyaway_rig.gif"), alt: "Character rig" },
    ],
  },
  {
    slug: "spoon-micro-animation",
    title: "Spoon Micro-Animation",
    categories: ["Lottie", "UI Motion"],
    summary: "A Lottie & web micro-animation for a client product, delivered through Fiverr.",
    cover: vidPoster("delivery/asset/8e1166ae6ae7a423236ff08517c63f9a-1727457907/Only%20spoon%20move"),
    coverAlt: "Spoon animation",
    previewVideo: vid("delivery/asset/8e1166ae6ae7a423236ff08517c63f9a-1727457907/Only%20spoon%20move"),
    heroVideo: vid("delivery/asset/8e1166ae6ae7a423236ff08517c63f9a-1727457907/Only%20spoon%20move"),
  },
  {
    slug: "jamin-k-hero",
    title: "Jamin K. Website Hero",
    categories: ["Lottie", "UI Motion"],
    summary: "Lottie animation for a website hero section, designed to capture attention with smooth, lightweight motion.",
    cover: vidPoster("project_item/attachment/1b0b50fdf3cd92618e081b2f4cdf4fd8-1742492409096/lil%20bit%20faster"),
    coverAlt: "Website hero animation",
    previewVideo: vid("project_item/attachment/1b0b50fdf3cd92618e081b2f4cdf4fd8-1742492409096/lil%20bit%20faster"),
    heroVideo: vid("project_item/attachment/1b0b50fdf3cd92618e081b2f4cdf4fd8-1742492409096/lil%20bit%20faster"),
  },
  {
    slug: "bfour-real-estate-promo",
    title: "Bfour Real Estate Promo",
    client: "Bfour",
    categories: ["Video"],
    summary:
      "Promo film for Bfour's Jolshiri projects — drone footage edited with title animations, pacing and a branded end card.",
    services: ["Video editing", "Title animation"],
    cover: "/assets/bfour-promo.jpg",
    coverAlt: "Aerial view of the Bfour development",
    previewVideo: "/assets/bfour-promo.mp4",
    heroVideo: "/assets/bfour-promo.mp4",
  },
  {
    slug: "istanbul-travel-reel",
    title: "Istanbul Travel Reel",
    categories: ["Video"],
    summary: "A fast-cut vertical travel reel — punchy transitions, beat-synced edits and colour grading for full-screen mobile.",
    cover: "/assets/istanbul-reel.jpg",
    coverAlt: "Istanbul skyline",
    previewVideo: "/assets/istanbul-reel.mp4",
    heroVideo: "/assets/istanbul-reel.mp4",
  },
  {
    slug: "sucuk-food-short",
    title: "Sucuk Food Short",
    categories: ["Video"],
    summary: "A vertical food short for social — appetite-driving close-ups, snappy pacing and clean captions.",
    cover: "/assets/sucuk-short.jpg",
    coverAlt: "Sucuk close-up",
    previewVideo: "/assets/sucuk-short.mp4",
    heroVideo: "/assets/sucuk-short.mp4",
  },

  // ---- Live character demos (also in the Playground) ----
  // ---- Seeded from the brief: media and facts still to confirm ----
  {
    slug: "reportability",
    title: "Reportability",
    categories: ["Lottie", "2D Motion"],
    summary: "SaaS process explainer in Lottie and 2D motion.",
    cover: "", // TODO: add approved artwork and deliverables
    coverAlt: "Reportability explainer",
    status: "in-progress",
  },
  {
    slug: "sports-app-fox-mascot",
    title: "Sports App Fox Mascot",
    categories: ["Character", "Lottie"],
    summary: "Character animation for a sports app fox mascot, delivered as Lottie.",
    cover: "", // TODO: confirm final approved visuals and permission to show
    coverAlt: "Fox mascot",
    status: "in-progress",
  },
  {
    slug: "radar-gift-card",
    title: "Radar Gift Card",
    categories: ["Lottie", "UI Motion"],
    summary: "Interactive logo hover animations in Lottie.",
    cover: "", // TODO: add Lottie files or a recording
    coverAlt: "Radar gift card logo",
    status: "in-progress",
  },
  {
    slug: "kiosk-avatar",
    title: "Kiosk Avatar",
    categories: ["Rive", "Character"],
    summary: "A Rive character with expressions and a lip-sync state machine for a kiosk.",
    cover: "", // TODO: add the .riv file and confirm state machine/input names
    coverAlt: "Kiosk avatar character",
    status: "in-progress",
  },
  {
    slug: "cyclist-animation",
    title: "Cyclist Animation",
    categories: ["Rive", "UI Motion"],
    summary: "Interactive Rive cyclist states for a fitness interface.",
    cover: "", // TODO: add the .riv file
    coverAlt: "Cyclist character",
    status: "in-progress",
  },
  {
    slug: "book-reveal",
    title: "Book Reveal",
    categories: ["Video", "2D Motion"],
    summary: "A 3D-style book reveal animation.",
    cover: "", // TODO: add the render and poster
    coverAlt: "Book reveal",
    status: "in-progress",
  },
];

/** The eight SohoPay films, shown as their own row and on the SohoPay page. */
export type Film = { title: string; kind: string; duration: string; blurb: string; src: string; poster: string };

export const sohopayFilms: Film[] = [
  { title: "Launch Film", kind: "Launch", duration: "0:48", src: "/assets/sohopay-launch.mp4", poster: "/assets/sohopay-launch.jpg",
    blurb: "Opens on the problem — agents can do the work but can't pay for it — then shows how SohoPay clears the blocked payment." },
  { title: "How SohoPay Works", kind: "Explainer", duration: "1:20", src: "/assets/sohopay-howitworks.mp4", poster: "/assets/sohopay-howitworks.jpg",
    blurb: "The full product explainer: a step-by-step walk through the flow, built for the website and sales calls." },
  { title: "Presenter Explainer", kind: "Explainer", duration: "1:17", src: "/inovetix-reel/videos/SohoPay_Explainer_Claude_Reference_v11.mp4", poster: "/assets/sohopay-explainer-v11.jpg",
    blurb: "A presenter-led cut of the explainer: a founder on camera, with animated product UI and titles carrying the walkthrough." },
  { title: "Good to Buy", kind: "Launch", duration: "0:30", src: "/inovetix-reel/videos/SohoPay_Film_Link_Reference_v06h.mp4", poster: "/assets/sohopay-link-film.jpg",
    blurb: "A cinematic lifestyle film in the “green means go” spirit — calm rooms, green doors opening, payments that simply go through." },
  { title: "Brand Film — Agent Prompt", kind: "Brand", duration: "0:47", src: "/inovetix-reel/videos/SohoPay_Brand_Film_v8.mp4", poster: "/assets/sohopay-brand-v8.jpg",
    blurb: "A dark, green-lit brand piece built around the agent prompt: one request, and SohoPay handles the payment behind it." },
  { title: "Story", kind: "Story", duration: "0:37", src: "/inovetix-reel/videos/SohoPay_Story_v7.mp4", poster: "/assets/sohopay-story.jpg",
    blurb: "A short typographic intro that builds the pixel mascot and introduces SohoPay — made for social and the top of the site." },
  { title: "Agents", kind: "Product film", duration: "0:22", src: "/assets/sohopay-agents.mp4", poster: "/assets/sohopay-agents.jpg",
    blurb: "Live footage of real businesses with chat-style UI motion layered on top, showing agents placing orders on their own." },
  { title: "Brand Film", kind: "Brand", duration: "0:58", src: "/assets/sohopay-brand.mp4", poster: "/assets/sohopay-brand.jpg",
    blurb: "A slower, typographic piece with ambient green light that sets the tone for the brand." },
];

export const categories: Category[] = ["Rive", "Lottie", "UI Motion", "2D Motion", "Character", "Video"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Homepage rows (Netflix-style). */
export const homeRows: { title: string; note?: string; slugs: string[] }[] = [
  { title: "Live characters", note: "Interactive Rive — they react", slugs: ["silver-tabby-cat", "countly-character", "zeiziq-bird", "aria-teacher-rig", "koala-sleep-tracker"] },
  { title: "Explainers & product films", slugs: ["sohopay-launch-films", "aura-saas-explainer", "gora-blockchain-explainer", "trace-saas-explainer", "ask-rosie-hero"] },
  { title: "Lottie & UI motion", slugs: ["interactive-lottie-character", "interactive-micro-animations", "app-splash-screens", "jamin-k-hero", "spoon-micro-animation", "ux-interactive-motion", "sports-app-characters", "lottie-character-design"] },
  { title: "Logo animation", slugs: ["unicorn-logo-wink", "logo-lottie-app-web", "logos-to-life-lottie", "blender-3d-roll-lottie"] },
  { title: "Video edits", slugs: ["bfour-real-estate-promo", "istanbul-travel-reel", "sucuk-food-short"] },
];

export const topPicks = ["sohopay-launch-films", "silver-tabby-cat", "countly-character", "koala-sleep-tracker", "aura-saas-explainer", "zeiziq-bird", "gora-blockchain-explainer", "interactive-micro-animations", "aria-teacher-rig", "interactive-lottie-character"];

export const projectsBySlugs = (slugs: string[]) => slugs.map((s) => getProject(s)).filter((p): p is Project => !!p);
