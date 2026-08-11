// ─────────────────────────────────────────────
// types.ts — Shared TypeScript interfaces
// ─────────────────────────────────────────────

// ─── Custom Block Element (fully customizable) ─

export type CustomElementType =
  | "text"
  | "heading"
  | "button"
  | "image"
  | "divider"
  | "spacer"
  | "badge"
  | "input"
  | "textarea";

export type ElementWidth =
  | "col-span-1"
  | "col-span-2"
  | "col-span-3"
  | "col-span-4"
  | "col-span-full";

export type ElementAlign = "text-left" | "text-center" | "text-right";
export type ElementFontSize =
  | "text-xs" | "text-sm" | "text-base" | "text-lg"
  | "text-xl" | "text-2xl" | "text-3xl" | "text-4xl" | "text-5xl" | "text-6xl";
export type ElementFontWeight =
  | "font-normal" | "font-medium" | "font-semibold" | "font-bold" | "font-extrabold";
export type ElementPadding =
  | "p-0" | "p-1" | "p-2" | "p-3" | "p-4" | "p-5" | "p-6" | "p-8" | "p-10"
  | "px-6 py-3" | "px-4 py-2" | "px-5 py-2.5" | "px-8 py-3.5" | "px-6 py-3.5";
export type ElementRounded =
  | "rounded-none" | "rounded-sm" | "rounded" | "rounded-lg"
  | "rounded-xl" | "rounded-2xl" | "rounded-3xl" | "rounded-full";
export type ElementShadow =
  | "shadow-none" | "shadow-sm" | "shadow" | "shadow-md" | "shadow-lg" | "shadow-xl" | "shadow-2xl";

export interface CustomElement {
  id: string;
  type: CustomElementType;
  content: string;

  // Text styling
  fontSize?: ElementFontSize;
  fontWeight?: ElementFontWeight;
  textColor?: string;   // hex or tailwind class e.g. "#a78bfa"
  align?: ElementAlign;
  lineHeight?: "leading-tight" | "leading-snug" | "leading-normal" | "leading-relaxed" | "leading-loose";
  letterSpacing?: "tracking-tighter" | "tracking-tight" | "tracking-normal" | "tracking-wide" | "tracking-wider";

  // Background & border
  bgColor?: string;     // hex or tailwind class
  border?: string;      // e.g. "border border-white/10" or "border-none"
  rounded?: ElementRounded;
  shadow?: ElementShadow;
  opacity?: string;     // opacity-50 opacity-75 opacity-100

  // Layout
  width?: ElementWidth;
  padding?: ElementPadding;
  marginTop?: "mt-0" | "mt-2" | "mt-4" | "mt-6" | "mt-8";
  marginBottom?: "mb-0" | "mb-2" | "mb-4" | "mb-6" | "mb-8";

  // Button specific
  buttonVariant?: "solid" | "outline" | "ghost";
  buttonColor?: string; // hex for background
  buttonLink?: string;  // redirect link URL
  buttonTextColor?: string; // hex for text

  // Image specific  
  imageHeight?: "h-24" | "h-32" | "h-48" | "h-64" | "h-80" | "h-96" | "h-auto";
  imageFit?: "object-cover" | "object-contain" | "object-fill";
  
  // Input specific
  inputPlaceholder?: string;
  inputLabel?: string;
  inputType?: "text" | "email" | "password" | "tel";
}

// ─── Carousel Slide ───────────────────────────

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

// ─── Review / Testimonial ─────────────────────

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  text: string;
  rating: number; // 1–5
}

// ─── Section Types ────────────────────────────

export type SectionType =
  | "hero"
  | "features"
  | "cta"
  | "contact"
  | "footer"
  | "image-block"
  | "custom-block"
  | "carousel"
  | "review-carousel";

export type TitleSize = "text-2xl" | "text-3xl" | "text-4xl" | "text-5xl" | "text-6xl";
export type SubtitleSize = "text-xs" | "text-sm" | "text-base" | "text-lg" | "text-xl";

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: string;
}

export interface ElementStyle {
  fontSize?: ElementFontSize;
  fontWeight?: ElementFontWeight;
  textColor?: string;
  align?: ElementAlign;
  bgColor?: string;
  padding?: ElementPadding;
  rounded?: ElementRounded;
  shadow?: ElementShadow;
  marginTop?: string;
  marginBottom?: string;
  lineHeight?: string;
  letterSpacing?: string;
}

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  subtitle: string;
  buttonText?: string;
  bgColor: string;        // hex color e.g. "#0a0a0f" — applied as inline style
  textColor: string;      // tailwind class e.g. "text-white"
  titleSize: TitleSize;
  subtitleSize: SubtitleSize;
  imageUrl?: string;
  bgImageUrl?: string;
  items?: { title: string; desc: string; icon?: string }[];
  customElements?: CustomElement[];
  customGridCols?: 2 | 3 | 4;
  formFields?: FormField[];
  slides?: CarouselSlide[];
  reviews?: ReviewItem[];
  elementStyles?: Record<string, ElementStyle>; // e.g. "title", "subtitle", "buttonText"
}

// ─── App-level interfaces ─────────────────────

export interface ConnectedDomain {
  name: string;
  status: "active" | "checking" | "failed";
}

export interface CustomPromptConfig {
  isOpen: boolean;
  type: "color" | "link";
  title: string;
  placeholder: string;
  value: string;
  onSubmit: (val: string) => void;
}

export interface ServerStats {
  cpu: number;
  ram: number;
  bandwidth: number;
}
