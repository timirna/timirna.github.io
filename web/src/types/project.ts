export type Category = "Rive" | "Lottie" | "UI Motion" | "2D Motion" | "Video" | "Character";

export type GalleryItem =
  | { type?: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  client?: string;
  year?: number;
  categories: Category[];
  summary: string;
  role?: string;
  services?: string[];
  tools?: string[];
  /** Poster image. Leave empty to render the intentional placeholder. */
  cover: string;
  coverAlt: string;
  /** Muted clip played on hover in cards. */
  previewVideo?: string;
  /** Main video on the detail page. */
  heroVideo?: string;
  /** Live Rive file (path under /public) and its state machine. */
  riveFile?: string;
  riveStateMachine?: string;
  riveArtboard?: string;
  /** One or more Lottie JSON files played live. */
  lottieFiles?: string[];
  externalDemo?: string;
  challenge?: string;
  approach?: string[];
  deliverables?: string[];
  gallery?: GalleryItem[];
  /** "in-progress": listed, but its media/facts still need confirming. */
  status?: "published" | "in-progress";
};
