"use client";

import React, { createContext, useContext, useRef, useState, useEffect, useCallback, RefObject } from "react";
import { Section, SectionType, ConnectedDomain, CustomPromptConfig, ServerStats, CarouselSlide, CustomElement, ReviewItem, ElementStyle } from "./types";

const DEFAULT_SECTIONS: Section[] = [
  {
    id: "hero-1", type: "hero",
    title: "Design Your Future in One Click",
    subtitle: "The ultimate open-source website building experience. Build, map domains, and host seamlessly.",
    bgColor: "#0f0a1e",
    textColor: "text-white", titleSize: "text-5xl", subtitleSize: "text-lg",
    customElements: [
      { id: "hero-badge", type: "badge", content: "⚡ Live Builder Platform", fontSize: "text-xs", fontWeight: "font-medium", textColor: "#a78bfa", padding: "p-2", rounded: "rounded-full", border: "border border-purple-500/25", align: "text-center", width: "col-span-full", marginTop: "mt-2", marginBottom: "mb-2" },
      { id: "hero-title", type: "heading", content: "Design Your Future in One Click", fontSize: "text-4xl", fontWeight: "font-extrabold", textColor: "#ffffff", align: "text-center", width: "col-span-full" },
      { id: "hero-subtitle", type: "text", content: "The ultimate open-source website building experience. Build, map domains, and host seamlessly.", fontSize: "text-base", fontWeight: "font-normal", textColor: "#94a3b8", align: "text-center", width: "col-span-full", marginTop: "mt-2", marginBottom: "mb-4" },
      { id: "hero-btn-1", type: "button", content: "Get Started Free", buttonVariant: "solid", buttonColor: "#7c3aed", textColor: "#ffffff", fontSize: "text-sm", fontWeight: "font-semibold", padding: "px-6 py-3", rounded: "rounded-xl", width: "col-span-full", align: "text-center", buttonLink: "https://nextgen.sh" },
    ]
  },
  {
    id: "features-1", type: "features",
    title: "Platform Core Features",
    subtitle: "Everything you need to scale your web presence.",
    bgColor: "#0a0a0f", textColor: "text-neutral-200",
    titleSize: "text-3xl", subtitleSize: "text-sm",
    customElements: [
      { id: "f-title", type: "heading", content: "Platform Core Features", fontSize: "text-3xl", fontWeight: "font-bold", textColor: "#ffffff", align: "text-center", width: "col-span-full" },
      { id: "f-sub", type: "text", content: "Everything you need to scale your web presence.", fontSize: "text-sm", fontWeight: "font-normal", textColor: "#71717a", align: "text-center", width: "col-span-full", marginBottom: "mb-8" },
      { id: "f-c1", type: "badge", content: "⚡ One-Click Deploy\nContainerize your pages and push to active edge nodes globally.", fontSize: "text-xs", textColor: "#a78bfa", padding: "p-5", rounded: "rounded-xl", bgColor: "rgba(255,255,255,0.02)", border: "border border-white/5", width: "col-span-1" },
      { id: "f-c2", type: "badge", content: "🛡️ Automatic SSL\nPowered by Caddy. Automatic ACME validation every time.", fontSize: "text-xs", textColor: "#60a5fa", padding: "p-5", rounded: "rounded-xl", bgColor: "rgba(255,255,255,0.02)", border: "border border-white/5", width: "col-span-1" },
      { id: "f-c3", type: "badge", content: "🌐 Custom Domains\nPoint your A record and start serving traffic in seconds.", fontSize: "text-xs", textColor: "#34d399", padding: "p-5", rounded: "rounded-xl", bgColor: "rgba(255,255,255,0.02)", border: "border border-white/5", width: "col-span-1" }
    ]
  },
];

export function createSection(type: SectionType): Section {
  const id = `${type}-${Date.now()}`;
  const defaults = { id, type, bgColor: "#0a0a0f", textColor: "text-white", titleSize: "text-4xl" as const, subtitleSize: "text-base" as const };
  switch (type) {
    case "hero": return { ...defaults, title: "Your Powerful Headline", subtitle: "Describe your value proposition here.", bgColor: "#0f0a1e", customElements: [
      { id: `el-b-${Date.now()}`, type: "badge", content: "🚀 Launching Soon", fontSize: "text-xs", fontWeight: "font-medium", textColor: "#a78bfa", padding: "p-2", rounded: "rounded-full", border: "border border-purple-500/25", align: "text-center", width: "col-span-full", marginTop: "mt-2", marginBottom: "mb-2" },
      { id: `el-h-${Date.now()}`, type: "heading", content: "Your Powerful Headline", fontSize: "text-4xl", fontWeight: "font-extrabold", textColor: "#ffffff", align: "text-center", width: "col-span-full" },
      { id: `el-t-${Date.now()}`, type: "text", content: "Describe your value proposition here in a clear, concise way.", fontSize: "text-base", fontWeight: "font-normal", textColor: "#94a3b8", align: "text-center", width: "col-span-full", marginTop: "mt-2", marginBottom: "mb-4" },
      { id: `el-btn-${Date.now()}`, type: "button", content: "Get Started Now", buttonVariant: "solid", buttonColor: "#7c3aed", textColor: "#ffffff", fontSize: "text-sm", fontWeight: "font-semibold", padding: "px-6 py-3", rounded: "rounded-xl", width: "col-span-full", align: "text-center", buttonLink: "#" }
    ]};
    case "features": return { ...defaults, title: "Our Features", subtitle: "Everything in one platform.", bgColor: "#0a0a0f", textColor: "text-neutral-200", customElements: [
      { id: `el-fh-${Date.now()}`, type: "heading", content: "Our Features", fontSize: "text-3xl", fontWeight: "font-bold", textColor: "#ffffff", align: "text-center", width: "col-span-full" },
      { id: `el-fs-${Date.now()}`, type: "text", content: "Everything in one platform.", fontSize: "text-sm", fontWeight: "font-normal", textColor: "#71717a", align: "text-center", width: "col-span-full", marginBottom: "mb-6" },
      { id: `el-fc1-${Date.now()}`, type: "badge", content: "Feature One\nA compelling feature description goes here.", fontSize: "text-xs", textColor: "#a78bfa", padding: "p-5", rounded: "rounded-xl", bgColor: "rgba(255,255,255,0.02)", border: "border border-white/5", width: "col-span-1" },
      { id: `el-fc2-${Date.now()}`, type: "badge", content: "Feature Two\nAnother compelling feature description goes here.", fontSize: "text-xs", textColor: "#34d399", padding: "p-5", rounded: "rounded-xl", bgColor: "rgba(255,255,255,0.02)", border: "border border-white/5", width: "col-span-1" }
    ]};
    case "cta": return { ...defaults, title: "Take Action Today", subtitle: "Join thousands on our platform.", bgColor: "#0d0818", textColor: "text-purple-200", customElements: [
      { id: `el-h-${Date.now()}`, type: "heading", content: "Take Action Today", fontSize: "text-3xl", fontWeight: "font-bold", textColor: "#ffffff", align: "text-center", width: "col-span-full" },
      { id: `el-t-${Date.now()}`, type: "text", content: "Join thousands of developers and builders using our platform.", fontSize: "text-sm", fontWeight: "font-normal", textColor: "#c084fc", align: "text-center", width: "col-span-full", marginTop: "mt-2", marginBottom: "mb-4" },
      { id: `el-btn-${Date.now()}`, type: "button", content: "Get Started Free", buttonVariant: "solid", buttonColor: "#ffffff", textColor: "#000000", fontSize: "text-sm", fontWeight: "font-bold", padding: "px-8 py-3.5", rounded: "rounded-xl", width: "col-span-full", align: "text-center", buttonLink: "#" }
    ]};
    case "contact": return { ...defaults, title: "Get in Touch", subtitle: "We'd love to hear from you.", bgColor: "#080810", customElements: [
      { id: `el-ch-${Date.now()}`, type: "heading", content: "Get in Touch", fontSize: "text-3xl", fontWeight: "font-bold", textColor: "#ffffff", align: "text-center", width: "col-span-full" },
      { id: `el-cs-${Date.now()}`, type: "text", content: "We'd love to hear from you. Drop a message below.", fontSize: "text-sm", fontWeight: "font-normal", textColor: "#71717a", align: "text-center", width: "col-span-full", marginBottom: "mb-6" },
      { id: `el-cf1-${Date.now()}`, type: "input", content: "", inputLabel: "Full Name", inputPlaceholder: "Enter your full name", inputType: "text", width: "col-span-full" },
      { id: `el-cf2-${Date.now()}`, type: "input", content: "", inputLabel: "Email Address", inputPlaceholder: "Enter your email address", inputType: "email", width: "col-span-full" },
      { id: `el-cf3-${Date.now()}`, type: "textarea", content: "", inputLabel: "Message", inputPlaceholder: "Write your message here...", width: "col-span-full" },
      { id: `el-cbtn-${Date.now()}`, type: "button", content: "Send Message", buttonVariant: "solid", buttonColor: "#7c3aed", textColor: "#ffffff", fontSize: "text-sm", fontWeight: "font-semibold", padding: "px-6 py-3.5", rounded: "rounded-xl", width: "col-span-full", align: "text-center" }
    ]};
    case "footer": return { ...defaults, title: "© 2026 NextGen Builder", subtitle: "All rights reserved.", bgColor: "#050508", customElements: [
      { id: `el-fd-${Date.now()}`, type: "divider", content: "", width: "col-span-full", marginTop: "mt-4", marginBottom: "mb-4" },
      { id: `el-fh-${Date.now()}`, type: "heading", content: "© 2026 NextGen Builder", fontSize: "text-sm", fontWeight: "font-medium", textColor: "#71717a", align: "text-center", width: "col-span-full" },
      { id: `el-ft-${Date.now()}`, type: "text", content: "All rights reserved. Empowering developers worldwide.", fontSize: "text-xs", fontWeight: "font-normal", textColor: "#52525b", align: "text-center", width: "col-span-full", marginTop: "mt-2" }
    ]};
    case "image-block": return { ...defaults, title: "Featured Media", subtitle: "A captivating visual that tells your story.", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop", customElements: [
      { id: `el-h-${Date.now()}`, type: "heading", content: "Featured Media Section", fontSize: "text-2xl", fontWeight: "font-bold", textColor: "#ffffff", align: "text-center", width: "col-span-full" },
      { id: `el-t-${Date.now()}`, type: "text", content: "A captivating visual that tells your story dynamically.", fontSize: "text-sm", fontWeight: "font-normal", textColor: "#a1a1aa", align: "text-center", width: "col-span-full", marginTop: "mt-2", marginBottom: "mb-4" },
      { id: `el-img-${Date.now()}`, type: "image", content: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop", rounded: "rounded-2xl", shadow: "shadow-2xl", width: "col-span-full" }
    ]};
    case "custom-block": return { ...defaults, title: "Custom Layout Block", subtitle: "Fully customizable canvas.", bgColor: "#0a0a0f", customGridCols: 2, customElements: [
      { id: "ce-1", type: "heading", content: "Creative Headline", fontSize: "text-2xl", fontWeight: "font-bold", textColor: "#ffffff", align: "text-left", padding: "p-4", rounded: "rounded-xl", bgColor: "transparent", width: "col-span-full" },
      { id: "ce-2", type: "text", content: "This is an editable text block. Click to customize every property — color, size, background, and more.", fontSize: "text-sm", fontWeight: "font-normal", textColor: "#71717a", align: "text-left", padding: "p-4", rounded: "rounded-xl", bgColor: "rgba(255,255,255,0.02)", border: "border border-white/5", width: "col-span-1" },
      { id: "ce-3", type: "button", content: "Action Button", buttonVariant: "solid", buttonColor: "#7c3aed", textColor: "#ffffff", fontSize: "text-sm", fontWeight: "font-semibold", padding: "p-4", rounded: "rounded-xl", width: "col-span-1" },
    ]};
    case "carousel": return { ...defaults, title: "Featured Gallery", subtitle: "Explore our collection.", slides: [
      { id: "sl-1", title: "Future Platform", subtitle: "Next-Gen edge containers.", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop" },
      { id: "sl-2", title: "Decentralized Nodes", subtitle: "Sub-ms data replication.", imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop" },
    ]};
    case "review-carousel": return { ...defaults, title: "What Our Users Say", subtitle: "Trusted by thousands of builders worldwide.", bgColor: "#0a0a0f", reviews: [
      { id: "rv-1", name: "Sarah Johnson", role: "Product Designer", company: "Figma", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop", text: "This platform completely transformed how we build and deploy client websites. The interface is incredibly intuitive.", rating: 5 },
      { id: "rv-2", name: "Marcus Chen", role: "Full Stack Developer", company: "Vercel", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop", text: "Custom domain mapping and automatic SSL saved us hours of DevOps work. Absolutely love the deployment pipeline.", rating: 5 },
      { id: "rv-3", name: "Amira Osei", role: "Co-Founder", company: "LaunchPad", avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop", text: "We went from idea to live site in under an hour. The hosting dashboard gives us real-time insights.", rating: 4 },
    ]};
    default: return { ...defaults, title: "New Section", subtitle: "Add your content here." };
  }
}

interface BuilderContextValue {
  activeTab: "editor" | "domain" | "hosting"; setActiveTab: (t: "editor" | "domain" | "hosting") => void;
  isPreviewMode: boolean; setIsPreviewMode: (v: boolean) => void;
  toast: string | null; showNotification: (msg: string) => void;
  sections: Section[]; setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  selectedSectionId: string | null; setSelectedSectionId: (id: string | null) => void;
  selectedElementId: string | null; setSelectedElementId: (id: string | null) => void;
  addSection: (type: SectionType) => void; deleteSection: (id: string) => void;
  moveSection: (index: number, dir: "up" | "down") => void;
  updateSectionField: (id: string, field: keyof Section, val: any) => void;
  updateFeatureItem: (sid: string, idx: number, field: "title" | "desc", val: string) => void;
  draggedIndex: number | null; setDraggedIndex: (v: number | null) => void;
  dragOverIndex: number | null; setDragOverIndex: (v: number | null) => void;
  isDraggingNew: string | null; setIsDraggingNew: (v: string | null) => void;
  fileInputRef: RefObject<HTMLInputElement | null>; bgFileInputRef: RefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBgImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contactFormInputs: Record<string, string>; setContactFormInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  updateFormField: (sid: string, fid: string, prop: "label" | "placeholder", val: string) => void;
  activeSlideIndices: Record<string, number>;
  handleSlideNav: (sid: string, total: number, dir: "next" | "prev") => void;
  addCarouselSlide: (sid: string) => void; deleteCarouselSlide: (sid: string, slid: string) => void;
  updateSlide: (sid: string, slid: string, prop: keyof CarouselSlide, val: string) => void;
  activeReviewIndices: Record<string, number>;
  handleReviewNav: (sid: string, total: number, dir: "next" | "prev") => void;
  addReview: (sid: string) => void; deleteReview: (sid: string, rid: string) => void;
  updateReview: (sid: string, rid: string, prop: keyof ReviewItem, val: any) => void;
  addCustomElement: (sid: string, type: CustomElement["type"]) => void;
  deleteCustomElement: (sid: string, eid: string) => void;
  updateCustomElement: (sid: string, eid: string, updates: Partial<CustomElement>) => void;
  reorderCustomElements: (sid: string, from: number, to: number) => void;
  updateElementStyle: (sid: string, elKey: string, updates: Partial<ElementStyle>) => void;
  formatText: (cmd: string, val?: string) => void;
  promptConfig: CustomPromptConfig; setPromptConfig: React.Dispatch<React.SetStateAction<CustomPromptConfig>>;
  triggerLinkModal: () => void; triggerColorModal: () => void;
  isLivePreviewOpen: boolean; livePreviewUrl: string;
  openSandboxPreview: (url: string) => void; setIsLivePreviewOpen: (v: boolean) => void;
  domainInput: string; setDomainInput: (v: string) => void;
  connectedDomains: ConnectedDomain[]; dnsCheckStep: number; dnsCheckingName: string;
  handleConnectDomain: (e: React.FormEvent) => void; removeDomain: (name: string) => void;
  selectedRegion: string; setSelectedRegion: (v: string) => void;
  isDeploying: boolean; deployLogs: string[]; setDeployLogs: React.Dispatch<React.SetStateAction<string[]>>;
  isServerActive: boolean; setIsServerActive: (v: boolean) => void;
  serverStats: ServerStats; handleDeploy: () => void;
  terminalEndRef: RefObject<HTMLDivElement | null>;
  accentColor: string; setAccentColor: (v: string) => void;
  deployMode: "local" | "coolify"; setDeployMode: (m: "local" | "coolify") => void;
  coolifyUrl: string; setCoolifyUrl: (v: string) => void;
  coolifyToken: string; setCoolifyToken: (v: string) => void;
  coolifyAppUuid: string; setCoolifyAppUuid: (v: string) => void;
  githubToken: string; setGithubToken: (v: string) => void;
  githubRepo: string; setGithubRepo: (v: string) => void;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);
export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be inside BuilderProvider");
  return ctx;
}

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<"editor" | "domain" | "hosting">("editor");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>("hero-1");
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isLivePreviewOpen, setIsLivePreviewOpen] = useState(false);
  const [livePreviewUrl, setLivePreviewUrl] = useState("");
  const [activeSlideIndices, setActiveSlideIndices] = useState<Record<string, number>>({});
  const [activeReviewIndices, setActiveReviewIndices] = useState<Record<string, number>>({});
  const [contactFormInputs, setContactFormInputs] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bgFileInputRef = useRef<HTMLInputElement | null>(null);
  const [promptConfig, setPromptConfig] = useState<CustomPromptConfig>({ isOpen: false, type: "color", title: "", placeholder: "", value: "", onSubmit: () => {} });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingNew, setIsDraggingNew] = useState<string | null>(null);
  const [domainInput, setDomainInput] = useState("");
  const [connectedDomains, setConnectedDomains] = useState<ConnectedDomain[]>([]);
  const [dnsCheckStep, setDnsCheckStep] = useState(0);
  const [dnsCheckingName, setDnsCheckingName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("us-east");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);
  const [isServerActive, setIsServerActive] = useState(true);
  const [serverStats, setServerStats] = useState<ServerStats>({ cpu: 12, ram: 142, bandwidth: 0.8 });
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const [accentColor, setAccentColor] = useState("#7c3aed");

  const [deployMode, setDeployMode] = useState<"local" | "coolify">("local");
  const [coolifyUrl, setCoolifyUrl] = useState("");
  const [coolifyToken, setCoolifyToken] = useState("");
  const [coolifyAppUuid, setCoolifyAppUuid] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [githubRepo, setGithubRepo] = useState("");

  // Load config from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mode = localStorage.getItem("deploy_mode") as "local" | "coolify";
      if (mode) setDeployMode(mode);
      setCoolifyUrl(localStorage.getItem("coolify_url") || "");
      setCoolifyToken(localStorage.getItem("coolify_token") || "");
      setCoolifyAppUuid(localStorage.getItem("coolify_app_uuid") || "");
      setGithubToken(localStorage.getItem("github_token") || "");
      setGithubRepo(localStorage.getItem("github_repo") || "");
    }
  }, []);

  // Save config to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("deploy_mode", deployMode);
      localStorage.setItem("coolify_url", coolifyUrl);
      localStorage.setItem("coolify_token", coolifyToken);
      localStorage.setItem("coolify_app_uuid", coolifyAppUuid);
      localStorage.setItem("github_token", githubToken);
      localStorage.setItem("github_repo", githubRepo);
    }
  }, [deployMode, coolifyUrl, coolifyToken, coolifyAppUuid, githubToken, githubRepo]);

  const showNotification = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); }, []);
  useEffect(() => {
    if (!isServerActive) return;
    const t = setInterval(() => setServerStats((p) => ({ cpu: Math.max(5, Math.min(95, Math.round(p.cpu + Math.random() * 10 - 5))), ram: Math.max(120, Math.min(256, Math.round(p.ram + Math.random() * 8 - 4))), bandwidth: parseFloat(Math.max(0.1, p.bandwidth + Math.random() * 0.4 - 0.2).toFixed(1)) })), 3000);
    return () => clearInterval(t);
  }, [isServerActive]);
  useEffect(() => { terminalEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [deployLogs]);

  const addSection = useCallback((type: SectionType) => {
    const s = createSection(type); setSections((p) => [...p, s]); setSelectedSectionId(s.id); setSelectedElementId(null); showNotification(`Added ${type} block!`);
  }, [showNotification]);
  const deleteSection = useCallback((id: string) => { setSections((p) => p.filter((s) => s.id !== id)); setSelectedSectionId((p) => (p === id ? null : p)); setSelectedElementId(null); showNotification("Section removed."); }, [showNotification]);
  const moveSection = useCallback((index: number, dir: "up" | "down") => {
    setSections((prev) => { if (dir === "up" && index === 0) return prev; if (dir === "down" && index === prev.length - 1) return prev; const a = [...prev]; const ti = dir === "up" ? index - 1 : index + 1; [a[index], a[ti]] = [a[ti], a[index]]; return a; });
  }, []);
  const updateSectionField = useCallback((id: string, field: keyof Section, val: any) => { setSections((p) => p.map((s) => s.id === id ? { ...s, [field]: val } : s)); }, []);
  const updateFeatureItem = useCallback((sid: string, idx: number, field: "title" | "desc", val: string) => {
    setSections((p) => p.map((s) => { if (s.id === sid && s.items) { const items = [...s.items]; items[idx] = { ...items[idx], [field]: val }; return { ...s, items }; } return s; }));
  }, []);
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file || !selectedSectionId) return;
    const r = new FileReader(); r.onload = (ev) => { updateSectionField(selectedSectionId, "imageUrl", ev.target?.result as string); showNotification("Image uploaded!"); }; r.readAsDataURL(file);
  }, [selectedSectionId, updateSectionField, showNotification]);
  const handleBgImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file || !selectedSectionId) return;
    const r = new FileReader(); r.onload = (ev) => { updateSectionField(selectedSectionId, "bgImageUrl", ev.target?.result as string); showNotification("Background image uploaded!"); }; r.readAsDataURL(file);
  }, [selectedSectionId, updateSectionField, showNotification]);
  const updateFormField = useCallback((sid: string, fid: string, prop: "label" | "placeholder", val: string) => {
    setSections((p) => p.map((s) => s.id === sid && s.formFields ? { ...s, formFields: s.formFields.map((f) => f.id === fid ? { ...f, [prop]: val } : f) } : s));
  }, []);
  const navHelper = (setFn: React.Dispatch<React.SetStateAction<Record<string, number>>>) => (sid: string, total: number, dir: "next" | "prev") => {
    setFn((p) => { const cur = p[sid] || 0; let next = dir === "next" ? cur + 1 : cur - 1; if (next >= total) next = 0; if (next < 0) next = total - 1; return { ...p, [sid]: next }; });
  };
  const handleSlideNav = useCallback(navHelper(setActiveSlideIndices), []);
  const handleReviewNav = useCallback(navHelper(setActiveReviewIndices), []);
  const addCarouselSlide = useCallback((sid: string) => {
    setSections((p) => p.map((s) => { if (s.id === sid && s.slides) { const newSlide: CarouselSlide = { id: `sl-${Date.now()}`, title: "New Slide", subtitle: "Slide description.", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop" }; const slides = [...s.slides, newSlide]; setActiveSlideIndices((ai) => ({ ...ai, [sid]: slides.length - 1 })); return { ...s, slides }; } return s; }));
    showNotification("Slide added!");
  }, [showNotification]);
  const deleteCarouselSlide = useCallback((sid: string, slid: string) => {
    setSections((p) => p.map((s) => s.id === sid && s.slides ? { ...s, slides: s.slides.filter((sl) => sl.id !== slid) } : s));
    setActiveSlideIndices((ai) => ({ ...ai, [sid]: Math.max(0, (ai[sid] || 0) - 1) }));
  }, []);
  const updateSlide = useCallback((sid: string, slid: string, prop: keyof CarouselSlide, val: string) => {
    setSections((p) => p.map((s) => s.id === sid && s.slides ? { ...s, slides: s.slides.map((sl) => sl.id === slid ? { ...sl, [prop]: val } : sl) } : s));
  }, []);
  const addReview = useCallback((sid: string) => {
    setSections((p) => p.map((s) => { if (s.id === sid) { const r: ReviewItem = { id: `rv-${Date.now()}`, name: "New Reviewer", role: "Job Title", company: "Company", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop", text: "A compelling review testimonial.", rating: 5 }; return { ...s, reviews: [...(s.reviews || []), r] }; } return s; }));
    showNotification("Review added!");
  }, [showNotification]);
  const deleteReview = useCallback((sid: string, rid: string) => { setSections((p) => p.map((s) => s.id === sid && s.reviews ? { ...s, reviews: s.reviews.filter((r) => r.id !== rid) } : s)); }, []);
  const updateReview = useCallback((sid: string, rid: string, prop: keyof ReviewItem, val: any) => {
    setSections((p) => p.map((s) => s.id === sid && s.reviews ? { ...s, reviews: s.reviews.map((r) => r.id === rid ? { ...r, [prop]: val } : r) } : s));
  }, []);
  const addCustomElement = useCallback((sid: string, type: CustomElement["type"]) => {
    const defs: Partial<Record<CustomElement["type"], Partial<CustomElement>>> = {
      text: { content: "Editable text block. Click to customize.", fontSize: "text-sm", fontWeight: "font-normal", textColor: "#71717a", padding: "p-4", rounded: "rounded-xl", bgColor: "rgba(255,255,255,0.02)", border: "border border-white/5", width: "col-span-1" },
      heading: { content: "Section Heading", fontSize: "text-2xl", fontWeight: "font-bold", textColor: "#ffffff", padding: "p-3", rounded: "rounded-xl", width: "col-span-full" },
      button: { content: "Click Me", buttonVariant: "solid", buttonColor: "#7c3aed", textColor: "#ffffff", fontSize: "text-sm", fontWeight: "font-semibold", padding: "p-4", rounded: "rounded-xl", width: "col-span-1" },
      image: { content: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop", imageHeight: "h-48", imageFit: "object-cover", rounded: "rounded-xl", width: "col-span-1" },
      divider: { content: "", bgColor: "rgba(255,255,255,0.08)", width: "col-span-full", padding: "p-0" },
      spacer: { content: "", width: "col-span-full", padding: "p-6" },
      badge: { content: "New", bgColor: "rgba(124, 58, 237, 0.15)", textColor: "#a78bfa", fontSize: "text-xs", fontWeight: "font-medium", padding: "p-2", rounded: "rounded-full", border: "border border-purple-500/25", align: "text-center", width: "col-span-1" },
    };
    const el: CustomElement = { id: `ce-${Date.now()}`, type, ...(defs[type] || {}) } as CustomElement;
    setSections((p) => p.map((s) => s.id === sid ? { ...s, customElements: [...(s.customElements || []), el] } : s));
    setSelectedElementId(el.id); showNotification(`${type} added!`);
  }, [showNotification]);
  const deleteCustomElement = useCallback((sid: string, eid: string) => { setSections((p) => p.map((s) => s.id === sid ? { ...s, customElements: (s.customElements || []).filter((el) => el.id !== eid) } : s)); setSelectedElementId(null); }, []);
  const updateCustomElement = useCallback((sid: string, eid: string, updates: Partial<CustomElement>) => { setSections((p) => p.map((s) => s.id === sid ? { ...s, customElements: (s.customElements || []).map((el) => el.id === eid ? { ...el, ...updates } : el) } : s)); }, []);
  const reorderCustomElements = useCallback((sid: string, from: number, to: number) => {
    setSections((p) => p.map((s) => { if (s.id === sid && s.customElements) { const els = [...s.customElements]; const [moved] = els.splice(from, 1); els.splice(to, 0, moved); return { ...s, customElements: els }; } return s; }));
  }, []);
  const updateElementStyle = useCallback((sid: string, elKey: string, updates: Partial<ElementStyle>) => {
    setSections((p) => p.map((s) => s.id === sid ? { ...s, elementStyles: { ...s.elementStyles, [elKey]: { ...s.elementStyles?.[elKey], ...updates } } } : s));
  }, []);
  const formatText = useCallback((cmd: string, val = "") => { document.execCommand(cmd, false, val); showNotification(`Applied: ${cmd}`); }, [showNotification]);
  const triggerLinkModal = useCallback(() => { setPromptConfig({ isOpen: true, type: "link", title: "Insert Hyperlink URL", placeholder: "https://example.com", value: "https://", onSubmit: (v) => formatText("createLink", v) }); }, [formatText]);
  const triggerColorModal = useCallback(() => { setPromptConfig({ isOpen: true, type: "color", title: "Select Text Color", placeholder: "#7c3aed", value: "#7c3aed", onSubmit: (v) => formatText("foreColor", v) }); }, [formatText]);
  const openSandboxPreview = useCallback((url: string) => { setLivePreviewUrl(url); setIsLivePreviewOpen(true); }, []);
  const handleConnectDomain = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput || !domainInput.includes(".")) { showNotification("Enter a valid domain."); return; }
    const domain = domainInput.trim().toLowerCase();
    setDnsCheckingName(domain);
    setDnsCheckStep(1);
    setDomainInput("");

    try {
      await new Promise((r) => setTimeout(r, 1000));
      setDnsCheckStep(2);
      
      const res = await fetch("/api/domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          config: {
            coolifyUrl,
            coolifyToken,
            coolifyAppUuid
          }
        })
      });
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        setDnsCheckStep(0);
        showNotification(data.message || "Domain connection failed.");
        return;
      }

      setDnsCheckStep(3);
      await new Promise((r) => setTimeout(r, 1200));
      
      setConnectedDomains((p) => [...p, { name: domain, status: "active" }]);
      showNotification(`${domain} linked successfully!`);
    } catch (err: any) {
      showNotification(err.message || "Failed to link domain.");
    } finally {
      setDnsCheckStep(0);
    }
  }, [domainInput, coolifyUrl, coolifyToken, coolifyAppUuid, showNotification]);

  const removeDomain = useCallback((name: string) => { setConnectedDomains((p) => p.filter((d) => d.name !== name)); showNotification("Domain removed."); }, [showNotification]);

  const handleDeploy = useCallback(async () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setDeployLogs(["⚡ Initializing build pipeline...", "📦 Preparing sections data..."]);

    try {
      await new Promise((r) => setTimeout(r, 800));
      setDeployLogs((p) => [...p, "✨ Compiling React components to static HTML..."]);
      
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sections,
          config: {
            mode: deployMode,
            githubToken,
            githubRepo,
            coolifyUrl,
            coolifyToken,
            coolifyAppUuid
          }
        })
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setDeployLogs((p) => [...p, `❌ Error: ${data.error || "Deployment failed."}`]);
        showNotification("Deployment failed.");
        setIsDeploying(false);
        return;
      }

      if (deployMode === "local") {
        setDeployLogs((p) => [
          ...p,
          "💾 Writing index.html to local disk...",
          "🟢 Deployment successful!",
          `🔗 Local Preview URL: ${data.url}`
        ]);
        showNotification("Local deploy complete!");
      } else {
        setDeployLogs((p) => [
          ...p,
          "📤 Pushing static website files to GitHub...",
          "🚀 Triggering Coolify webhook...",
          "🟢 Webhook triggered! Coolify is building/deploying your site."
        ]);
        showNotification("Coolify deployment triggered!");
      }
    } catch (err: any) {
      setDeployLogs((p) => [...p, `❌ Network Error: ${err.message || "Failed to reach server."}`]);
      showNotification("Deployment failed.");
    } finally {
      setIsDeploying(false);
    }
  }, [isDeploying, sections, deployMode, githubToken, githubRepo, coolifyUrl, coolifyToken, coolifyAppUuid, showNotification]);

  const value: BuilderContextValue = {
    activeTab, setActiveTab, isPreviewMode, setIsPreviewMode, toast, showNotification,
    sections, setSections, selectedSectionId, setSelectedSectionId, selectedElementId, setSelectedElementId,
    addSection, deleteSection, moveSection, updateSectionField, updateFeatureItem,
    draggedIndex, setDraggedIndex, dragOverIndex, setDragOverIndex, isDraggingNew, setIsDraggingNew,
    fileInputRef, bgFileInputRef, handleImageUpload, handleBgImageUpload,
    contactFormInputs, setContactFormInputs, updateFormField,
    activeSlideIndices, handleSlideNav, addCarouselSlide, deleteCarouselSlide, updateSlide,
    activeReviewIndices, handleReviewNav, addReview, deleteReview, updateReview,
    addCustomElement, deleteCustomElement, updateCustomElement, reorderCustomElements, updateElementStyle,
    formatText, promptConfig, setPromptConfig, triggerLinkModal, triggerColorModal,
    isLivePreviewOpen, livePreviewUrl, openSandboxPreview, setIsLivePreviewOpen,
    domainInput, setDomainInput, connectedDomains, dnsCheckStep, dnsCheckingName, handleConnectDomain, removeDomain,
    selectedRegion, setSelectedRegion, isDeploying, deployLogs, setDeployLogs,
    isServerActive, setIsServerActive, serverStats, handleDeploy, terminalEndRef,
    accentColor, setAccentColor,
    deployMode, setDeployMode,
    coolifyUrl, setCoolifyUrl,
    coolifyToken, setCoolifyToken,
    coolifyAppUuid, setCoolifyAppUuid,
    githubToken, setGithubToken,
    githubRepo, setGithubRepo,
  };

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}
