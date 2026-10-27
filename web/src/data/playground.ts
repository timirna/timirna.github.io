import { ariaHints, catHints } from "./rive-hints";

export type Demo =
  | {
      id: string;
      kind: "rive";
      title: string;
      blurb: string;
      src: string;
      stateMachine: string;
      artboard?: string;
      demo: string;
      hints?: typeof ariaHints | typeof catHints;
    }
  | { id: string; kind: "lottie"; title: string; blurb: string; files: string[] };

export const demos: Demo[] = [
  {
    id: "cat",
    kind: "rive",
    title: "Silver Tabby Gaze Rig",
    blurb: "Head and eyes snap between drawn poses as the look target moves.",
    src: "/animations/rive/cat.riv",
    stateMachine: "Cat_SM",
    demo: "/cat-preview/",
    hints: catHints,
  },
  {
    id: "bird",
    kind: "rive",
    title: "ZEIZIQ Bird",
    blurb: "Idle, flap and glide, blended by one state machine.",
    src: "/animations/rive/bird.riv",
    stateMachine: "BirdSM",
    artboard: "ZEIZIQ_Bird",
    demo: "/zeiziq-bird/",
  },
  {
    id: "countly",
    kind: "rive",
    title: "Countly",
    blurb: "Wave, frustrate and a coffin wake-up loading loop via data binding.",
    src: "/animations/rive/countly.riv",
    stateMachine: "State Machine 1",
    artboard: "Artboard 1",
    demo: "/countly-preview/",
  },
  {
    id: "aria",
    kind: "rive",
    title: "Aria Teacher Rig",
    blurb: "Seven expressions and a speaking toggle for a teaching assistant.",
    src: "/animations/rive/aria.riv",
    stateMachine: "Aria",
    demo: "/aria-preview/",
    hints: ariaHints,
  },
  {
    id: "lottie-character",
    kind: "lottie",
    title: "Lottie Character Set",
    blurb: "Production Lottie files: idle, walk, wave, blush and app screens.",
    files: [
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
    id: "unicorn",
    kind: "lottie",
    title: "Unicorn Wink",
    blurb: "A 1.5-second logo moment: wink, smile, bashful nod.",
    files: ["/animations/lottie/unicorn-wink.json"],
  },
];
