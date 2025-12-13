// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export const METADATA = {
  title: "DURKKAS",
  description:
    "Durkkas Innovations Pvt. Ltd. stands as a holistic innovation ecosystem, bridging technology, learning, and enterprise growth. DURKKAS’s mission and vision drive its commitment to transform industries, empower communities, and create a future-ready digital society. ",
  siteUrl: "https://durkkas.com/",
};

export const MENULINKS = [
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Our Division",
    ref: "about",
  },
  {
    name: "Vision & Mission",
    ref: "vision",
  },
  {
    name: "Our Innovation",
    ref: "innovation",
  },
  {
    name: "Contact",
    ref: "contact",
  },
];

export const INNOVATE_MENULINKS = [
  {
    name: "Home",
    ref: "/",
    isExternal: true,
  },
  {
    name: "About",
    ref: "about",
    isExternal: false,
  },
  {
    name: "Our Services",
    ref: "services",
    isExternal: false,
  },
  {
    name: "Our Technology",
    ref: "tech",
    isExternal: false,
  },
  {
    name: "Contact",
    ref: "contact",
    isExternal: false,
  },
];

export const EDUCATE_MENULINKS = [
  {
    name: "Home",
    ref: "/",
    isExternal: true,
  },
  {
    name: "About",
    ref: "about",
    isExternal: false,
  },
  {
    name: "Our Division",
    ref: "division",
    isExternal: false,
  },
  {
    name: "Our Gallery",
    ref: "gallery",
    isExternal: false,
  },
  {
    name: "Contact",
    ref: "contact",
    isExternal: false,
  },
];

export const ELEVATE_MENULINKS = [
  {
    name: "Home",
    ref: "/",
    isExternal: true,
  },
  {
    name: "About",
    ref: "about",
    isExternal: false,
  },
  {
    name: "Our Services",
    ref: "services",
    isExternal: false,
  },
  {
    name: "Contact",
    ref: "contact",
    isExternal: false,
  },
];

export const TYPED_STRINGS = [
  // "I design and develop things",
  'An Eco System to <span class="typed-innovate">INNOVATE</span>',
  'An Eco System to <span class="typed-educate">EDUCATE</span>',
  'An Eco System to <span class="typed-elevate">ELEVATE</span>',
];

export const EMAIL = "ayush.singh.xda@gmail.com";

export const SOCIAL_LINKS = {
  linkedin: "#",
  github: "#",
  
  instagram: "#",
  facebook: "#",
  
  twitter: "#",
  
};


export const SKILLS = {
  frontend: [
    "javascript",
    "react",
    "redux",
    "next",
    "angular",
    "gsap",
    "tailwind",
    "sass",
    "svg",
    "html",
    "css",
  ],
  userInterface: ["figma", "sketch", "illustrator", "photoshop"],
  other: ["git", "webpack", "gulp", "lightroom", "aftereffects"],
};

export enum Branch {
  LEFT = "leftSide",
  RIGHT = "rightSide",
}

export enum NodeTypes {
  CONVERGE = "converge",
  DIVERGE = "diverge",
  CHECKPOINT = "checkpoint",
}

export enum ItemSize {
  SMALL = "small",
  LARGE = "large",
}

export const TIMELINE: Array<TimelineNodeV2> = [
  {
    type: NodeTypes.CHECKPOINT,
    title: "D",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Data",
    size: ItemSize.SMALL,
    subtitle:
      "Collect, organize, and prepare business, customer and market data. ",
    // image: "/timeline/reactindia.svg",
    slideImage: "/timeline/data.jpg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "U",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Understand",
    size: ItemSize.SMALL,
    subtitle: "Analyze trends, customer segments and predictive insights. ",
    // image: "/timeline/hotstar.svg",
    slideImage: "/timeline/understand.jpg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "R",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Recommend",
    size: ItemSize.SMALL,
    subtitle: "Design intelligent, personalized offers and decisions.",
    // image: "/timeline/flipkart.svg",
    slideImage: "/timeline/recommand.jpg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "K",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.DIVERGE,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Keep",
    size: ItemSize.SMALL,
    subtitle: "Retain customers, reduce churn and build loyalty.",
    // image: "/timeline/huminos.svg",
    slideImage: "/timeline/keep.jpg",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "KPI Tracking",
    size: ItemSize.SMALL,
    subtitle: "Measure what matters using AI-driven dashboards.",
    // image: "/timeline/octanner.svg",
    slideImage: "/timeline/kpi.jpg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CONVERGE,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "A",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Automate",
    size: ItemSize.SMALL,
    subtitle: "Streamline workflows, cut costs and save time.",
    // image: "/timeline/dltlabs.svg",
    slideImage: "/timeline/automate.jpg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },

  {
    type: NodeTypes.CHECKPOINT,
    title: "S",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Scale",
    size: ItemSize.SMALL,
    subtitle: "Expand into new markets, channels and geographies seamlessly.",
    // image: "/timeline/scalelogo.png",
    slideImage: "/timeline/scale.jpg",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
];

export type TimelineNodeV2 = CheckpointNode | BranchNode;

export interface CheckpointNode {
  type: NodeTypes.CHECKPOINT;
  title: string;
  subtitle?: string;
  size: ItemSize;
  image?: string;
  slideImage?: string;
  shouldDrawLine: boolean;
  alignment: Branch;
}

export interface BranchNode {
  type: NodeTypes.CONVERGE | NodeTypes.DIVERGE;
}

export const GTAG = "UA-163844688-1";
