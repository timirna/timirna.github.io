export const site = {
  name: "Timir Deb Nath",
  wordmark: "TIMIR",
  role: "Independent Motion Designer",
  url: "https://timirna.github.io",
  email: "timir690@gmail.com",
  description:
    "Timir is an independent motion designer creating Lottie, Rive, interactive UI motion, character animation and 2D explainers for products, brands and the web.",
  // Only verified profiles. Add more here once confirmed.
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/timir69/" },
    { label: "Dribbble", href: "https://dribbble.com/timir69" },
    { label: "Behance", href: "https://www.behance.net/timirna" },
  ],
  /**
   * TODO: add the showreel when it's cut, e.g.
   * { src: "/assets/showreel.mp4", poster: "/assets/showreel.jpg", captions: "/assets/showreel.vtt" }
   */
  showreel: null as null | { src: string; poster: string; captions?: string },
} as const;

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/playground/", label: "Playground" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;
