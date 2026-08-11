"use client";

import React, { useState } from "react";
import {
  Layers, Globe, Server, Play, Eye, Edit3, Zap, Shield,
  ArrowUp, ArrowDown, Trash2, Plus, ChevronRight, Move,
  Settings, Upload, Star, X, Check, Loader2, Link as LinkIcon,
  Palette, Bold, Italic, Underline, AlignLeft, AlignCenter,
  AlignRight, List, ListOrdered, Type, Activity, Cpu, HardDrive,
  Power, Terminal, ChevronLeft, Quote, Building2, GripVertical,
  Heading, Image as ImageIcon, Square, Minus, Sparkles,
  ShieldCheck, Link2, ExternalLink,
} from "lucide-react";
import { BuilderProvider, useBuilder, createSection } from "./_components/BuilderContext";
import {
  Section, SectionType, CustomElement, CarouselSlide, ReviewItem,
  TitleSize, SubtitleSize, ElementFontSize, ElementFontWeight,
  ElementPadding, ElementRounded, ElementShadow, ElementWidth, ElementAlign,
} from "./_components/types";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────
const G = {
  surface: "bg-[#0d0d14]",
  panel: "bg-[#111118]/80 backdrop-blur-xl border border-white/[0.06]",
  panelSolid: "bg-[#111118] border border-white/[0.06]",
  input: "bg-white/[0.04] border border-white/[0.08] focus:border-purple-500/50 text-white placeholder:text-white/20 focus:outline-none rounded-xl px-3 py-2 text-xs transition-all w-full",
  pill: (active: boolean) => `px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${active ? "bg-purple-500/20 border-purple-500/40 text-purple-300" : "bg-white/[0.03] border-white/[0.05] text-neutral-500 hover:text-white hover:border-white/10"}`,
  btn: "flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97]",
};

// ─────────────────────────────────────────────────────────────
// ROOT PAGE
// ─────────────────────────────────────────────────────────────
export default function BuilderPage() {
  return (
    <BuilderProvider>
      <BuilderLayout />
    </BuilderProvider>
  );
}

function BuilderLayout() {
  const { activeTab, isPreviewMode, toast, sections, accentColor } = useBuilder();
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className={`min-h-screen ${G.surface} text-white`} style={{ fontFamily: "'Inter', system-ui, sans-serif", ["--accent-color" as any]: accentColor }}>
      {/* Top nav */}
      <TopNav leftOpen={leftOpen} setLeftOpen={setLeftOpen} rightOpen={rightOpen} setRightOpen={setRightOpen} />

      {activeTab === "editor" ? (
        <EditorLayout leftOpen={leftOpen} setLeftOpen={setLeftOpen} rightOpen={rightOpen} setRightOpen={setRightOpen} />
      ) : activeTab === "domain" ? (
        <DomainTab />
      ) : (
        <HostingTab />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#1a1a24]/95 border border-white/10 shadow-2xl shadow-black/50 text-sm text-white backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {toast}
        </div>
      )}

      <PromptModal />
      <SandboxModal />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TOP NAVIGATION
// ─────────────────────────────────────────────────────────────
function TopNav({ leftOpen, setLeftOpen, rightOpen, setRightOpen }: {
  leftOpen: boolean; setLeftOpen: (v: boolean) => void;
  rightOpen: boolean; setRightOpen: (v: boolean) => void;
}) {
  const { activeTab, setActiveTab, isPreviewMode, setIsPreviewMode, handleDeploy, isDeploying, sections, accentColor } = useBuilder();

  return (
    <nav className="sticky top-0 z-40 h-14 border-b border-white/[0.05] bg-[#0d0d14]/90 backdrop-blur-xl flex items-center justify-between px-4 sm:px-5">
      {/* Left controls & Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        {activeTab === "editor" && !isPreviewMode && (
          <button
            onClick={() => setLeftOpen(!leftOpen)}
            className="lg:hidden p-2 rounded-xl border border-white/[0.06] text-white/50 hover:text-white cursor-pointer active:scale-[0.97]"
            title="Toggle Add Blocks"
          >
            <Plus className="w-4 h-4 transition-transform duration-200" style={leftOpen ? { transform: "rotate(45deg)", color: accentColor } : undefined} />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${accentColor}, #4f46e5)`, boxShadow: `0 4px 12px ${accentColor}30` }}>
            <Layers className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-white/90 tracking-tight hidden sm:inline">NextGen <span className="text-white/30">Builder</span></span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border hidden md:inline" style={{ backgroundColor: `${accentColor}10`, color: accentColor, borderColor: `${accentColor}20` }}>
          {sections.length} blocks
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
        {([
          { id: "editor", icon: Layers, label: "Editor" },
          { id: "domain", icon: Globe, label: "Domains" },
          { id: "hosting", icon: Server, label: "Hosting" },
        ] as const).map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setIsPreviewMode(false); }}
            className={`flex items-center gap-1 px-2.5 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${activeTab === id ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/80"}`}
          >
            <Icon className="w-3.5 h-3.5" /> <span className="hidden xs:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {activeTab === "editor" && (
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white/50 hover:text-white border border-white/[0.06] hover:border-white/15 transition-all cursor-pointer"
          >
            {isPreviewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPreviewMode ? "Edit" : "Preview"}</span>
          </button>
        )}
        <button
          onClick={() => { setActiveTab("hosting"); handleDeploy(); }}
          disabled={isDeploying}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer disabled:opacity-60 active:scale-[0.97]"
          style={{ background: `linear-gradient(to right, ${accentColor}, #4f46e5)`, boxShadow: `0 4px 12px ${accentColor}25` }}
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span className="hidden sm:inline">{isDeploying ? "Deploying…" : "Deploy"}</span>
        </button>
        {activeTab === "editor" && !isPreviewMode && (
          <button
            onClick={() => setRightOpen(!rightOpen)}
            className="lg:hidden p-2 rounded-xl border border-white/[0.06] text-white/50 hover:text-white cursor-pointer active:scale-[0.97]"
            title="Toggle Properties"
          >
            <Settings className="w-4 h-4 transition-transform duration-200" style={rightOpen ? { transform: "rotate(90deg)", color: accentColor } : undefined} />
          </button>
        )}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// EDITOR LAYOUT
// ─────────────────────────────────────────────────────────────
function EditorLayout({ leftOpen, setLeftOpen, rightOpen, setRightOpen }: {
  leftOpen: boolean; setLeftOpen: (v: boolean) => void;
  rightOpen: boolean; setRightOpen: (v: boolean) => void;
}) {
  const { isPreviewMode } = useBuilder();

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden relative">
      {!isPreviewMode && <LeftSidebar leftOpen={leftOpen} />}

      {/* Canvas area (scrollable) */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        {!isPreviewMode && <FormattingBar />}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
          <Canvas />
        </div>
      </div>

      {!isPreviewMode && <RightSidebar rightOpen={rightOpen} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LEFT SIDEBAR
// ─────────────────────────────────────────────────────────────
const ELEMENTS: { type: SectionType; emoji: string; label: string; desc: string }[] = [
  { type: "hero",            emoji: "🚀", label: "Hero",           desc: "Full-width landing hero" },
  { type: "features",        emoji: "⚡", label: "Features",       desc: "Feature cards grid" },
  { type: "carousel",        emoji: "🎠", label: "Image Carousel", desc: "Sliding image gallery" },
  { type: "review-carousel", emoji: "⭐", label: "Reviews",        desc: "Testimonial carousel" },
  { type: "image-block",     emoji: "🖼️", label: "Image Block",   desc: "Featured media section" },
  { type: "custom-block",    emoji: "🛠️", label: "Custom Block",  desc: "Draggable element canvas" },
  { type: "cta",             emoji: "📣", label: "Call To Action", desc: "Conversion CTA section" },
  { type: "contact",         emoji: "✉️", label: "Contact Form",  desc: "Editable contact form" },
  { type: "footer",          emoji: "🏁", label: "Footer",         desc: "Site footer bar" },
];

function LeftSidebar({ leftOpen }: { leftOpen: boolean }) {
  const { addSection, setIsDraggingNew } = useBuilder();

  return (
    <aside className={`fixed lg:relative z-30 lg:z-auto top-14 lg:top-0 bottom-0 left-0 w-60 border-r border-white/[0.05] flex flex-col bg-[#0a0a10] h-[calc(100vh-56px)] lg:h-full transition-transform duration-300 ${leftOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
      <div className="p-4 border-b border-white/[0.05]">
        <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">Add Blocks</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {ELEMENTS.map((el) => (
          <button
            key={el.type}
            draggable
            onDragStart={(e) => { e.dataTransfer.setData("newSectionType", el.type); setIsDraggingNew(el.type); }}
            onDragEnd={() => setIsDraggingNew(null)}
            onClick={() => addSection(el.type)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-transparent hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06] text-left transition-all cursor-grab active:cursor-grabbing group"
          >
            <span className="text-base leading-none">{el.emoji}</span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/80 group-hover:text-white leading-none mb-0.5">{el.label}</p>
              <p className="text-[10px] text-white/25 truncate">{el.desc}</p>
            </div>
            <ChevronRight className="w-3 h-3 text-white/15 ml-auto flex-shrink-0 group-hover:text-white/40 transition-colors" />
          </button>
        ))}
      </div>
      <div className="p-3 border-t border-white/[0.05]">
        <div className="px-3 py-2.5 rounded-xl bg-violet-500/5 border border-violet-500/10">
          <p className="text-[10px] font-medium text-violet-400 flex items-center gap-1 mb-1"><Sparkles className="w-3 h-3" /> WYSIWYG</p>
          <p className="text-[10px] text-white/30 leading-relaxed">Select text in canvas → use toolbar above to style it</p>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────
// FORMATTING BAR
// ─────────────────────────────────────────────────────────────
function FormattingBar() {
  const { formatText, triggerLinkModal, triggerColorModal, setPromptConfig } = useBuilder();
  const Btn = ({ icon: Icon, title, cmd, val }: { icon: any; title: string; cmd: string; val?: string }) => (
    <button
      onMouseDown={(e) => { e.preventDefault(); formatText(cmd, val); }}
      title={title}
      className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all cursor-pointer"
    >
      <Icon className="w-3.5 h-3.5" />
    </button>
  );
  return (
    <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-white/[0.05] bg-[#0d0d14]/80 select-none">
      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest mr-2 pl-1">Format</span>
      <Btn icon={Bold} title="Bold" cmd="bold" />
      <Btn icon={Italic} title="Italic" cmd="italic" />
      <Btn icon={Underline} title="Underline" cmd="underline" />
      <Btn icon={Minus} title="Strikethrough" cmd="strikeThrough" />
      
      <div className="w-px h-4 bg-white/[0.06] mx-1" />
      
      <Btn icon={AlignLeft} title="Align Left" cmd="justifyLeft" />
      <Btn icon={AlignCenter} title="Align Center" cmd="justifyCenter" />
      <Btn icon={AlignRight} title="Align Right" cmd="justifyRight" />
      
      <div className="w-px h-4 bg-white/[0.06] mx-1" />
      
      <Btn icon={List} title="Bullet List" cmd="insertUnorderedList" />
      <Btn icon={ListOrdered} title="Ordered List" cmd="insertOrderedList" />
      
      <div className="w-px h-4 bg-white/[0.06] mx-1" />
      
      <button onMouseDown={(e) => e.preventDefault()} onClick={triggerLinkModal} title="Link" className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all cursor-pointer"><LinkIcon className="w-3.5 h-3.5" /></button>
      <button onMouseDown={(e) => e.preventDefault()} onClick={triggerColorModal} title="Text Color" className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all cursor-pointer"><Palette className="w-3.5 h-3.5" /></button>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setPromptConfig({ isOpen: true, type: "color", title: "Highlight Color", placeholder: "#f59e0b", value: "#f59e0b", onSubmit: (v) => formatText("backColor", v) })}
        title="Highlight Color"
        className="p-1.5 rounded-lg hover:bg-white/[0.06] text-amber-400/70 hover:text-amber-400 transition-all cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>

      <div className="w-px h-4 bg-white/[0.06] mx-1" />

      {/* Font Family selector */}
      <select
        onChange={(e) => formatText("fontName", e.target.value)}
        className="bg-white/[0.03] border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-white/60 focus:outline-none focus:border-purple-500/50 cursor-pointer h-7"
      >
        <option value="Inter" className="bg-[#0d0d14]">Inter</option>
        <option value="Georgia" className="bg-[#0d0d14]">Serif</option>
        <option value="Courier New" className="bg-[#0d0d14]">Mono</option>
      </select>

      {/* Font Size selector */}
      <select
        onChange={(e) => formatText("fontSize", e.target.value)}
        className="bg-white/[0.03] border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-white/60 focus:outline-none focus:border-purple-500/50 cursor-pointer h-7"
      >
        <option value="3" className="bg-[#0d0d14]">Normal</option>
        <option value="1" className="bg-[#0d0d14]">Small</option>
        <option value="5" className="bg-[#0d0d14]">Large</option>
        <option value="7" className="bg-[#0d0d14]">Huge</option>
      </select>

      <div className="w-px h-4 bg-white/[0.06] mx-1" />
      
      <button
        onMouseDown={(e) => { e.preventDefault(); formatText("removeFormat"); }}
        title="Clear Formatting"
        className="p-1.5 rounded-lg hover:bg-white/[0.06] text-red-400/50 hover:text-red-400 transition-all cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CANVAS
// ─────────────────────────────────────────────────────────────
function Canvas() {
  const { sections, setSections, selectedSectionId, setSelectedSectionId, setSelectedElementId,
    isPreviewMode, addSection, deleteSection, moveSection,
    draggedIndex, setDraggedIndex, dragOverIndex, setDragOverIndex, isDraggingNew, accentColor } = useBuilder();

  const handleDrop = (e: React.DragEvent) => {
    const type = e.dataTransfer.getData("newSectionType") as SectionType;
    if (type) { addSection(type); }
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      setSections((prev) => { const a = [...prev]; const [m] = a.splice(draggedIndex, 1); a.splice(dragOverIndex, 0, m); return a; });
    }
    setDraggedIndex(null); setDragOverIndex(null);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden min-h-[600px] transition-all duration-200"
      style={{
        boxShadow: isDraggingNew ? `0 0 0 2px ${accentColor}80, 0 0 40px ${accentColor}1e` : undefined,
        border: isDraggingNew ? undefined : "1px solid rgba(255,255,255,0.04)"
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {sections.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[500px] gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <Plus className="w-7 h-7 text-white/20" />
          </div>
          <p className="text-white/30 text-sm">Drag a block here or click a preset</p>
        </div>
      )}

      {sections.map((section, index) => {
        const isSelected = selectedSectionId === section.id;
        const isPreview = isPreviewMode;
        const bgStyle: React.CSSProperties = {};
        if (section.bgImageUrl) { bgStyle.backgroundImage = `url(${section.bgImageUrl})`; bgStyle.backgroundSize = "cover"; bgStyle.backgroundPosition = "center"; }

        return (
          <div
            key={section.id}
            onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }}
            onClick={() => { setSelectedSectionId(section.id); setSelectedElementId(null); }}
            className="relative group transition-all duration-150"
            style={{ 
              backgroundColor: section.bgColor || "#0a0a0f", 
              ...bgStyle,
              boxShadow: isSelected && !isPreviewMode ? `inset 0 0 0 2px ${accentColor}` : undefined
            }}
          >
            {section.bgImageUrl && <div className="absolute inset-0 bg-black/55 pointer-events-none" />}

            {/* Section overlay for edit mode */}
            {!isPreviewMode && (
              <>
                <div className={`absolute top-2 right-2 z-20 flex items-center gap-1 transition-all duration-200 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                  <span 
                    className="text-[9px] font-mono px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border uppercase tracking-wider font-semibold"
                    style={{ borderColor: `${accentColor}30`, color: accentColor }}
                  >
                    {section.type}
                  </span>
                  
                  {/* Dedicated drag handle */}
                  <div
                    draggable
                    onDragStart={() => setDraggedIndex(index)}
                    onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
                    className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white cursor-grab active:cursor-grabbing transition-all"
                    title="Drag to reorder section"
                  >
                    <GripVertical className="w-3 h-3" />
                  </div>

                  <button onClick={(e) => { e.stopPropagation(); moveSection(index, "up"); }} className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white cursor-pointer transition-all"><ArrowUp className="w-3 h-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); moveSection(index, "down"); }} className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/50 hover:text-white cursor-pointer transition-all"><ArrowDown className="w-3 h-3" /></button>
                  <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className="p-1.5 rounded-lg bg-red-500/15 backdrop-blur-sm border border-red-500/20 text-red-400 hover:bg-red-500/25 cursor-pointer transition-all"><Trash2 className="w-3 h-3" /></button>
                </div>
                {dragOverIndex === index && draggedIndex !== null && draggedIndex !== index && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 z-30" style={{ backgroundColor: accentColor }} />
                )}
              </>
            )}

            <div className="relative z-10">
              <SectionRender section={section} isSelected={isSelected} isPreview={isPreview} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section type router ──────────────────────────────────────
function SectionRender({ section, isSelected, isPreview }: { section: Section; isSelected: boolean; isPreview: boolean }) {
  const { setSelectedSectionId, updateSectionField, updateFeatureItem, contactFormInputs, setContactFormInputs, updateFormField,
    fileInputRef, handleImageUpload, activeSlideIndices, handleSlideNav, activeReviewIndices, handleReviewNav,
    selectedElementId, setSelectedElementId, addCustomElement, deleteCustomElement, updateCustomElement, reorderCustomElements, accentColor } = useBuilder();

  const edit = (f: keyof Section) => ({
    contentEditable: !isPreview,
    suppressContentEditableWarning: true,
    onBlur: (e: any) => updateSectionField(section.id, f, e.currentTarget.textContent || ""),
    onClick: (e: any) => {
      if (!isPreview) {
        e.stopPropagation();
        setSelectedSectionId(section.id);
        setSelectedElementId(null);
      }
    }
  } as any);

  switch (section.type) {
    // ── CUSTOM-ELEMENTS BASED SECTIONS (Hero, Features, CTA, Contact, Footer, Image-block, Custom-block) ──
    case "hero":
    case "features":
    case "cta":
    case "contact":
    case "image-block":
    case "footer":
    case "custom-block": {
      const elements = section.customElements || [];
      const [dragEl, setDragEl] = React.useState<number | null>(null);
      const [dragOverEl, setDragOverEl] = React.useState<number | null>(null);
      
      // Determine grid columns based on section type
      let gridCols = 1;
      if (section.type === "features") gridCols = 3;
      else if (section.type === "custom-block") gridCols = section.customGridCols || 2;
      
      const gridClass = gridCols === 2 ? "grid-cols-2" : gridCols === 3 ? "grid-cols-1 md:grid-cols-3" : gridCols === 4 ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1";

      return (
        <div className={`relative w-full overflow-hidden transition-all ${
          section.type === "hero" ? "py-20 md:py-28 px-4 md:px-10 text-center" :
          section.type === "features" ? "py-20 px-10" :
          section.type === "cta" ? "py-20 px-4 sm:px-10 text-center" :
          section.type === "contact" ? "py-20 px-4 sm:px-10" :
          section.type === "image-block" ? "py-16 px-4 md:px-10" :
          section.type === "footer" ? "py-8 px-10 text-center border-t border-white/[0.04]" : "py-12 px-10"
        }`}>
          {section.type === "hero" && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ backgroundColor: `${accentColor}08` }} />
            </div>
          )}
          
          <div className={`${section.type === "contact" ? "max-w-xl" : "max-w-6xl"} w-full mx-auto flex flex-col items-center gap-3`}>
            {section.type === "cta" ? (
              <div className="max-w-2xl w-full mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.02] to-white/[0.04] border border-white/[0.06] flex flex-col items-center gap-3">
                {elements.map((el, idx) => (
                  <div
                    key={el.id}
                    draggable={!isPreview}
                    onDragStart={(e) => { e.stopPropagation(); setDragEl(idx); }}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverEl(idx); }}
                    onDragEnd={() => {
                      if (dragEl !== null && dragOverEl !== null && dragEl !== dragOverEl) reorderCustomElements(section.id, dragEl, dragOverEl);
                      setDragEl(null); setDragOverEl(null);
                    }}
                    onClick={(e) => { if (!isPreview) { e.stopPropagation(); setSelectedSectionId(section.id); setSelectedElementId(el.id); } }}
                    className={`w-full flex justify-center transition-all ${el.width || "col-span-full"} ${
                      !isPreview && selectedElementId === el.id ? "" : "hover:ring-1 hover:ring-white/5 rounded-xl"
                    } ${dragOverEl === idx ? "opacity-40" : ""}`}
                    style={{
                      boxShadow: !isPreview && selectedElementId === el.id ? `0 0 0 2px ${accentColor}` : undefined,
                      borderRadius: !isPreview && selectedElementId === el.id ? '12px' : undefined,
                      borderTop: dragOverEl === idx ? `2px solid ${accentColor}` : undefined
                    }}
                  >
                    <div className="w-full flex justify-center">
                      <CustomElementRender el={el} isPreview={isPreview} isSelected={selectedElementId === el.id} sectionId={section.id} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid gap-4 w-full ${gridClass}`}>
                {elements.map((el, idx) => (
                  <div
                    key={el.id}
                    draggable={!isPreview}
                    onDragStart={(e) => { e.stopPropagation(); setDragEl(idx); }}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverEl(idx); }}
                    onDragEnd={() => {
                      if (dragEl !== null && dragOverEl !== null && dragEl !== dragOverEl) reorderCustomElements(section.id, dragEl, dragOverEl);
                      setDragEl(null); setDragOverEl(null);
                    }}
                    onClick={(e) => { if (!isPreview) { e.stopPropagation(); setSelectedSectionId(section.id); setSelectedElementId(el.id); } }}
                    className={`w-full flex justify-center transition-all ${el.width || "col-span-full"} ${
                      !isPreview && selectedElementId === el.id ? "" : "hover:ring-1 hover:ring-white/5 rounded-xl"
                    } ${dragOverEl === idx ? "opacity-40" : ""}`}
                    style={{
                      boxShadow: !isPreview && selectedElementId === el.id ? `0 0 0 2px ${accentColor}` : undefined,
                      borderRadius: !isPreview && selectedElementId === el.id ? '12px' : undefined,
                      borderTop: dragOverEl === idx ? `2px solid ${accentColor}` : undefined
                    }}
                  >
                    <div className="w-full flex justify-center">
                      <CustomElementRender el={el} isPreview={isPreview} isSelected={selectedElementId === el.id} sectionId={section.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!isPreview && (
              <div className="mt-6 flex flex-wrap justify-center gap-1.5 p-2 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] w-full max-w-xl">
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest self-center mr-1">+ Add Element</span>
                {(["text","heading","button","image","badge","divider","spacer","input","textarea"] as const).map((t) => (
                  <button key={t} onClick={(e) => { e.stopPropagation(); addCustomElement(section.id, t); }} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-white/50 hover:text-white text-[11px] cursor-pointer transition-all capitalize">{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // ── CAROUSEL ─────────────────────────────────
    case "carousel": {
      const slides = section.slides || [];
      const cur = activeSlideIndices[section.id] || 0;
      const slide = slides[cur];
      return (
        <div className="py-16 px-10">
          <div className="text-center mb-10">
            <h2 {...edit("title")} className={`${section.titleSize} font-bold ${section.textColor} mb-2`}>{section.title}</h2>
            <p {...edit("subtitle")} className={`${section.subtitleSize} ${section.textColor} opacity-45`}>{section.subtitle}</p>
          </div>
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden aspect-[16/9] border border-white/[0.06] shadow-2xl shadow-black/60">
            {slide ? (
              <>
                <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-1">{slide.title}</h3>
                  <p className="text-white/60 text-sm">{slide.subtitle}</p>
                </div>
                {slides.length > 1 && (
                  <>
                    <button onClick={() => handleSlideNav(section.id, slides.length, "prev")} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-black/70 cursor-pointer transition-all"><ChevronLeft className="w-5 h-5" /></button>
                    <button onClick={() => handleSlideNav(section.id, slides.length, "next")} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-black/70 cursor-pointer transition-all"><ChevronRight className="w-5 h-5" /></button>
                    <div className="absolute bottom-4 right-6 flex gap-1.5">
                      {slides.map((_, i) => <div key={i} className={`rounded-full transition-all ${i === cur ? "w-5 h-1.5" : "w-1.5 h-1.5 bg-white/30"}`} style={{ backgroundColor: i === cur ? accentColor : undefined }} />)}
                    </div>
                  </>
                )}
              </>
            ) : <div className="h-full flex items-center justify-center text-white/25 text-sm">No slides yet</div>}
          </div>
        </div>
      );
    }

    // ── REVIEW CAROUSEL ──────────────────────────
    case "review-carousel": {
      const reviews = section.reviews || [];
      const cur = activeReviewIndices[section.id] || 0;
      const rv = reviews[cur];
      return (
        <div className="py-20 px-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium mb-5" style={{ backgroundColor: `${accentColor}10`, border: `1px solid ${accentColor}25`, color: accentColor }}>
              <Star className="w-3.5 h-3.5 fill-current" /> Trusted Reviews
            </span>
            <h2 {...edit("title")} className={`${section.titleSize} font-bold ${section.textColor} mb-3`}>{section.title}</h2>
            <p {...edit("subtitle")} className={`${section.subtitleSize} ${section.textColor} opacity-45 max-w-lg mx-auto`}>{section.subtitle}</p>
          </div>
          {rv && (
            <div className="max-w-2xl mx-auto">
              <div className="relative p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.06] shadow-2xl shadow-black/40">
                <Quote className="w-9 h-9 mb-5 opacity-20" style={{ color: accentColor }} />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4" style={{ color: i < rv.rating ? "#fbbf24" : "rgba(255,255,255,0.1)", fill: i < rv.rating ? "#fbbf24" : "none" }} />)}
                </div>
                <p className="text-base text-white/70 leading-relaxed mb-8 italic">&ldquo;{rv.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.05]">
                  <img src={rv.avatarUrl} alt={rv.name} className="w-12 h-12 rounded-full object-cover" style={{ boxShadow: `0 0 0 2px ${accentColor}20` }} onError={(e) => { (e.currentTarget as any).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(rv.name)}&background=${accentColor.replace("#","")}&color=fff`; }} />
                  <div>
                    <div className="font-semibold text-white text-sm">{rv.name}</div>
                    <div className="text-xs text-white/35 flex items-center gap-1.5 mt-0.5">{rv.role} <span className="text-white/15">·</span> <Building2 className="w-3 h-3" />{rv.company}</div>
                  </div>
                  {reviews.length > 1 && (
                    <div className="ml-auto flex gap-2">
                      <button onClick={() => handleReviewNav(section.id, reviews.length, "prev")} className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/15 cursor-pointer transition-all"><ChevronLeft className="w-4 h-4" /></button>
                      <button onClick={() => handleReviewNav(section.id, reviews.length, "next")} className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/15 cursor-pointer transition-all"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              </div>
              {reviews.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-6">
                  {reviews.map((_, i) => <div key={i} className="rounded-full transition-all" style={{ width: i === cur ? "20px" : "6px", height: "6px", backgroundColor: i === cur ? accentColor : "rgba(255,255,255,0.15)" }} />)}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // ── CUSTOM BLOCK ─────────────────────────────
    case "custom-block": {
      const elements = section.customElements || [];
      const grid = section.customGridCols || 2;
      const [dragEl, setDragEl] = React.useState<number | null>(null);
      const [dragOverEl, setDragOverEl] = React.useState<number | null>(null);
      return (
        <div className="py-12 px-10">
          <div className="mb-8">
            <h2 {...edit("title")} className={`${section.titleSize} font-bold ${section.textColor} mb-2`}>{section.title}</h2>
            <p {...edit("subtitle")} className={`${section.subtitleSize} ${section.textColor} opacity-45`}>{section.subtitle}</p>
          </div>
          {isSelected && !isPreview && (
            <div className="mb-5 flex flex-wrap gap-1.5 p-2.5 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01]">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest self-center mr-1">+ Add</span>
              {(["text","heading","button","image","badge","divider","spacer"] as const).map((t) => (
                <button key={t} onClick={() => addCustomElement(section.id, t)} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-white/50 hover:text-white text-[11px] cursor-pointer transition-all capitalize">{t}</button>
              ))}
            </div>
          )}
          <div className={`grid gap-3 ${grid === 2 ? "grid-cols-2" : grid === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
            {elements.map((el, idx) => (
              <div
                key={el.id}
                className={`relative group ${el.width || "col-span-1"} transition-all duration-150 ${dragOverEl === idx ? "opacity-60 scale-[1.01]" : ""}`}
                draggable={isSelected && !isPreview}
                onDragStart={() => setDragEl(idx)}
                onDragOver={(e) => { e.preventDefault(); setDragOverEl(idx); }}
                onDrop={() => { if (dragEl !== null && dragEl !== idx) reorderCustomElements(section.id, dragEl, idx); setDragEl(null); setDragOverEl(null); }}
                onDragEnd={() => { setDragEl(null); setDragOverEl(null); }}
                onClick={(e) => { if (!isPreview && isSelected) { e.stopPropagation(); setSelectedElementId(el.id); } }}
              >
                {isSelected && !isPreview && selectedElementId === el.id && <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-10" style={{ boxShadow: `0 0 0 2px ${accentColor}` }} />}
                {isSelected && !isPreview && (
                  <div className="absolute -top-2 -right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-1 rounded-md bg-[#1a1a24] border border-white/10 text-white/30 cursor-grab"><GripVertical className="w-2.5 h-2.5" /></div>
                    <button onClick={(e) => { e.stopPropagation(); deleteCustomElement(section.id, el.id); }} className="p-1 rounded-md bg-red-500/15 border border-red-500/20 text-red-400 cursor-pointer hover:bg-red-500/25"><Trash2 className="w-2.5 h-2.5" /></button>
                  </div>
                )}
                <CustomElementRender el={el} isPreview={isPreview} isSelected={isSelected && selectedElementId === el.id} sectionId={section.id} />
              </div>
            ))}
            {elements.length === 0 && <div className="col-span-full py-10 flex items-center justify-center text-white/15 text-xs border border-dashed border-white/[0.06] rounded-2xl">Add elements above</div>}
          </div>
        </div>
      );
    }

    default: return null;
  }
}

// ─────────────────────────────────────────────────────────────
// CUSTOM ELEMENT RENDERER
// ─────────────────────────────────────────────────────────────
function CustomElementRender({ el, isPreview, isSelected, sectionId }: { el: CustomElement; isPreview: boolean; isSelected: boolean; sectionId: string }) {
  const { setSelectedSectionId, setSelectedElementId, updateCustomElement, deleteCustomElement } = useBuilder();
  const inlineColor: React.CSSProperties = { color: el.textColor && !el.textColor.startsWith("text-") ? el.textColor : undefined };
  const inlineBg: React.CSSProperties = { backgroundColor: el.bgColor && !el.bgColor.startsWith("bg-") && el.bgColor !== "transparent" ? el.bgColor : undefined };
  const cls = [el.rounded || "", el.shadow || "", el.border || "", el.align || "", el.fontSize || "text-sm", el.fontWeight || "font-normal", el.marginTop || "", el.marginBottom || "", el.opacity || "", el.lineHeight || "", el.letterSpacing || ""].filter(Boolean).join(" ");

  const renderContent = () => {
    if (el.type === "divider") return <div className={`w-full h-px ${el.marginTop || ""} ${el.marginBottom || ""}`} style={{ backgroundColor: el.bgColor || "rgba(255,255,255,0.08)" }} />;
    if (el.type === "spacer") return <div style={{ paddingBottom: el.padding ? (el.padding.includes("px") ? el.padding : "24px") : "24px" }} />;
    if (el.type === "image") return (
      <div className={`overflow-hidden ${el.rounded || "rounded-xl"} ${el.shadow || ""}`}>
        <img 
          src={el.content} 
          alt="" 
          className={`w-full ${el.imageFit || "object-cover"}`} 
          style={{ height: el.imageHeight ? (el.imageHeight.includes("px") ? el.imageHeight : `${el.imageHeight}px`) : "300px" }} 
        />
      </div>
    );
    if (el.type === "input") return (
      <div className={`w-full text-left ${el.marginTop || ""} ${el.marginBottom || ""}`}>
        {el.inputLabel && <label className="block text-xs font-medium text-white/50 mb-1.5">{el.inputLabel}</label>}
        <input 
          type={el.inputType || "text"} 
          placeholder={el.inputPlaceholder || "Enter text..."} 
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] focus:border-violet-500/40 text-white text-sm placeholder:text-white/15 focus:outline-none transition-all cursor-text"
          style={{ borderColor: isSelected ? 'var(--accent-color)' : undefined }}
          disabled
        />
      </div>
    );
    if (el.type === "textarea") return (
      <div className={`w-full text-left ${el.marginTop || ""} ${el.marginBottom || ""}`}>
        {el.inputLabel && <label className="block text-xs font-medium text-white/50 mb-1.5">{el.inputLabel}</label>}
        <textarea 
          rows={3}
          placeholder={el.inputPlaceholder || "Enter message..."} 
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] focus:border-violet-500/40 text-white text-sm placeholder:text-white/15 focus:outline-none transition-all resize-none"
          style={{ borderColor: isSelected ? 'var(--accent-color)' : undefined }}
          disabled
        />
      </div>
    );
    if (el.type === "button") return (
      <div className={`${el.align || "text-left"} ${el.marginTop || ""} ${el.marginBottom || ""}`}>
        <button className={`inline-flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.97] ${el.padding || "px-6 py-3"} ${el.rounded || "rounded-xl"} ${el.shadow || ""} ${el.fontSize || "text-sm"} ${el.fontWeight || "font-semibold"} ${el.border || ""}`}
          style={{ backgroundColor: el.buttonVariant === "solid" ? (el.buttonColor || "#7c3aed") : "transparent", color: el.buttonTextColor || (el.textColor && !el.textColor.startsWith("text-") ? el.textColor : "#ffffff"), border: el.buttonVariant === "outline" ? `2px solid ${el.buttonColor || "#7c3aed"}` : undefined }}>
          {el.content}
        </button>
      </div>
    );
    if (el.type === "badge") return <div className={`inline-flex items-center justify-center ${el.padding || "p-2"} ${cls}`} style={{ ...inlineBg, ...inlineColor }}>{el.content}</div>;

    const Tag = el.type === "heading" ? "h3" : "p";
    return (
      <Tag className={`${el.padding || "p-4"} ${cls} w-full`} style={{ ...inlineBg, ...inlineColor }}
        contentEditable={!isPreview} suppressContentEditableWarning
        onBlur={(e: any) => updateCustomElement(sectionId, el.id, { content: e.currentTarget.textContent || "" })}
        onClick={(e: any) => {
          if (!isPreview) {
            e.stopPropagation();
            setSelectedSectionId(sectionId);
            setSelectedElementId(el.id);
          }
        }}>
        {el.content}
      </Tag>
    );
  };

  return (
    <div className="relative w-full group/resizer">
      {renderContent()}
      
      {isSelected && !isPreview && (
        <>
          {/* Industry Standard Element Control Bar */}
          <div className="absolute -top-3.5 right-2 z-30 flex items-center gap-1 bg-[#12121a]/95 backdrop-blur-md border border-white/10 rounded-lg p-0.5 shadow-xl select-none">
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest px-1.5">{el.type}</span>
            <div className="w-px h-3 bg-white/10" />
            <button 
              onClick={(e) => { e.stopPropagation(); deleteCustomElement(sectionId, el.id); }} 
              className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded cursor-pointer transition-colors"
              title="Delete Element"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>

          {/* Corner Resize Anchor */}
          <div 
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const startX = e.clientX;
              const startY = e.clientY;
              let currentWidth = el.width || "col-span-full";
              let currentHeight = el.imageHeight || "300px";
              let currentSpacer = el.padding || "24px";
              let currentSize = el.fontSize || "text-sm";

              const handleMouseMove = (moveEvent: MouseEvent) => {
                const diffX = moveEvent.clientX - startX;
                const diffY = moveEvent.clientY - startY;

                // Horizontal Resize (Width/col-span) - smoother 25px step
                if (Math.abs(diffX) > 25) {
                  const step = diffX > 0 ? 1 : -1;
                  const widths: ("col-span-1" | "col-span-2" | "col-span-3" | "col-span-full")[] = ["col-span-1", "col-span-2", "col-span-3", "col-span-full"];
                  const curIdx = widths.indexOf(currentWidth as any);
                  let nextIdx = curIdx + step;
                  if (nextIdx >= 0 && nextIdx < widths.length) {
                    const nextWidth = widths[nextIdx];
                    if (nextWidth !== currentWidth) {
                      currentWidth = nextWidth;
                      updateCustomElement(sectionId, el.id, { width: nextWidth });
                    }
                  }
                }

                // Vertical Resize (Pixel precision for Heights, Spacing)
                if (Math.abs(diffY) > 3) {
                  if (el.type === "image") {
                    const currentHVal = parseInt(currentHeight) || 300;
                    const nextH = Math.max(80, Math.min(800, currentHVal + diffY));
                    currentHeight = `${nextH}px`;
                    updateCustomElement(sectionId, el.id, { imageHeight: `${nextH}px` as any });
                  } else if (el.type === "spacer" || el.type === "divider") {
                    const currentPadVal = parseInt(currentSpacer) || 24;
                    const nextPad = Math.max(4, Math.min(250, currentPadVal + diffY));
                    currentSpacer = `${nextPad}px`;
                    updateCustomElement(sectionId, el.id, { padding: `${nextPad}px` as any });
                  } else if (["heading", "text", "button", "badge"].includes(el.type)) {
                    const sizes: ElementFontSize[] = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl"];
                    const curSizeIdx = sizes.indexOf(currentSize);
                    const stepY = diffY > 15 ? 1 : diffY < -15 ? -1 : 0;
                    if (stepY !== 0) {
                      let nextSizeIdx = curSizeIdx + stepY;
                      if (nextSizeIdx >= 0 && nextSizeIdx < sizes.length) {
                        const nextSize = sizes[nextSizeIdx];
                        if (nextSize !== currentSize) {
                          currentSize = nextSize;
                          updateCustomElement(sectionId, el.id, { fontSize: nextSize });
                        }
                      }
                    }
                  }
                }
              };

              const handleMouseUp = () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
              };

              window.addEventListener("mousemove", handleMouseMove);
              window.addEventListener("mouseup", handleMouseUp);
            }}
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-violet-600 rounded-tl-md border border-white/20 cursor-se-resize flex items-center justify-center z-30 shadow-lg active:scale-110 transition-transform"
            title="Drag to Resize"
          >
            <div className="w-1.5 h-1.5 border-r border-b border-white/80" />
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RIGHT SIDEBAR
// ─────────────────────────────────────────────────────────────
function RightSidebar({ rightOpen }: { rightOpen: boolean }) {
  const { sections, selectedSectionId, selectedElementId, setSelectedElementId, updateSectionField,
    updateCustomElement, bgFileInputRef, handleBgImageUpload, addCarouselSlide, deleteCarouselSlide,
    updateSlide, addReview, deleteReview, updateReview, accentColor, setAccentColor } = useBuilder();

  const section = sections.find((s) => s.id === selectedSectionId);
  const selectedEl = section?.customElements?.find((el) => el.id === selectedElementId);

  return (
    <aside className={`fixed lg:relative z-30 lg:z-auto top-14 lg:top-0 bottom-0 right-0 w-72 border-l border-white/[0.05] bg-[#0a0a10] flex flex-col h-[calc(100vh-56px)] lg:h-full transition-transform duration-300 ${rightOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
      <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
        <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
          {selectedEl ? `${selectedEl.type} Properties` : "Properties"}
        </p>
        {selectedEl && <button onClick={() => setSelectedElementId(null)} className="p-1 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white cursor-pointer transition-all"><X className="w-3.5 h-3.5" /></button>}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!section ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-white/20">
            <Settings className="w-6 h-6" />
            <p className="text-xs">Select a section</p>
          </div>
        ) : selectedEl ? (
          <ElementInspector sectionId={section.id} el={selectedEl} />
        ) : (
          <SectionSettings section={section} />
        )}
      </div>
      <input ref={bgFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
    </aside>
  );
}

// ─── Collapsible panel group ──────────────────
function PropGroup({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.04]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-[11px] font-semibold text-white/40 hover:text-white/60 uppercase tracking-widest cursor-pointer transition-colors">
        {title} <span className="text-white/20">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

// ─── Label ───────────────────────────────────
function L({ children }: { children: React.ReactNode }) {
  return <label className="block text-[10px] font-medium text-white/30 uppercase tracking-wider mb-1.5">{children}</label>;
}

// ─── Color field ─────────────────────────────
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const PRESETS = ["#ffffff", "#a78bfa", "#7c3aed", "#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#71717a", "transparent"];
  return (
    <div>
      <L>{label}</L>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {PRESETS.map((c) => (
          <button key={c} onClick={() => onChange(c)} title={c}
            className={`w-5 h-5 rounded-md border-2 cursor-pointer transition-all hover:scale-110 flex-shrink-0 ${value === c ? "border-violet-400 scale-110" : "border-transparent"}`}
            style={{ backgroundColor: c === "transparent" ? undefined : c, backgroundImage: c === "transparent" ? "repeating-conic-gradient(#555 0% 25%, transparent 0% 50%) 0 0 / 6px 6px" : undefined }} />
        ))}
      </div>
      <div className="flex gap-2">
        <input type="color" value={value && value !== "transparent" ? value : "#000000"} onChange={(e) => onChange(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border border-white/10 bg-transparent flex-shrink-0" />
        <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="hex / rgba" className={`${G.input} flex-1`} />
      </div>
    </div>
  );
}

// ─── Pill row ─────────────────────────────────
function Pills<T extends string>({ label, value, options, onChange }: { label: string; value: T | undefined; options: { v: T; l: string }[]; onChange: (v: T) => void }) {
  return (
    <div>
      <L>{label}</L>
      <div className="flex flex-wrap gap-1.5">
        {options.map(({ v, l }) => (
          <button key={v} onClick={() => onChange(v)} className={G.pill(value === v)}>{l}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Section Settings ────────────────────────
function SectionSettings({ section }: { section: Section }) {
  const { updateSectionField, updateFormField, bgFileInputRef, addCarouselSlide, deleteCarouselSlide, updateSlide, addReview, deleteReview, updateReview, setSelectedElementId, accentColor, setAccentColor } = useBuilder();
  const u = (f: keyof Section, v: any) => updateSectionField(section.id, f, v);
  const siteAccentPresets = ["#7c3aed", "#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

  return (
    <div>
      {/* Global Theme */}
      <PropGroup title="Global Accent Theme" defaultOpen={true}>
        <ColorField label="Site Accent Color" value={accentColor} onChange={setAccentColor} />
      </PropGroup>

      {/* Content */}
      <PropGroup title="Content">
        <div><L>Title</L><input value={section.title} onChange={(e) => u("title", e.target.value)} className={G.input} /></div>
        <div><L>Subtitle</L><textarea value={section.subtitle} onChange={(e) => u("subtitle", e.target.value)} rows={2} className={`${G.input} resize-none`} /></div>
        {section.buttonText !== undefined && <div><L>Button</L><input value={section.buttonText || ""} onChange={(e) => u("buttonText", e.target.value)} className={G.input} /></div>}
      </PropGroup>

      {/* Typography */}
      <PropGroup title="Typography" defaultOpen={false}>
        <Pills label="Title Size" value={section.titleSize} options={[{v:"text-2xl",l:"2xl"},{v:"text-3xl",l:"3xl"},{v:"text-4xl",l:"4xl"},{v:"text-5xl",l:"5xl"},{v:"text-6xl",l:"6xl"}] as any} onChange={(v) => u("titleSize", v)} />
        <Pills label="Subtitle Size" value={section.subtitleSize} options={[{v:"text-xs",l:"xs"},{v:"text-sm",l:"sm"},{v:"text-base",l:"base"},{v:"text-lg",l:"lg"},{v:"text-xl",l:"xl"}] as any} onChange={(v) => u("subtitleSize", v)} />
      </PropGroup>

      {/* Colors */}
      <PropGroup title="Colors" defaultOpen={false}>
        <ColorField label="Background Color" value={section.bgColor || "#0a0a0f"} onChange={(v) => u("bgColor", v)} />
        <div>
          <L>Text Color</L>
          <div className="flex flex-wrap gap-1.5">
            {["text-white","text-neutral-200","text-neutral-400","text-purple-200","text-blue-200"].map((c) => (
              <button key={c} onClick={() => u("textColor", c)} className={G.pill(section.textColor === c)}>{c.replace("text-","")}</button>
            ))}
          </div>
        </div>
      </PropGroup>

      {/* Background image */}
      <PropGroup title="Background Image" defaultOpen={false}>
        <button onClick={() => bgFileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/[0.08] hover:border-violet-500/30 text-white/30 hover:text-white/60 text-xs cursor-pointer transition-all">
          <Upload className="w-4 h-4" /> Upload Image
        </button>
        {section.bgImageUrl && (
          <div className="relative rounded-xl overflow-hidden border border-white/[0.06]">
            <img src={section.bgImageUrl} alt="" className="w-full h-16 object-cover" />
            <button onClick={() => u("bgImageUrl", "")} className="absolute top-1 right-1 p-1 rounded-md bg-black/70 text-red-400 cursor-pointer"><X className="w-3 h-3" /></button>
          </div>
        )}
      </PropGroup>

      {/* Custom block — grid + elements list */}
      {section.type === "custom-block" && (
        <PropGroup title="Custom Block">
          <Pills label="Grid Columns" value={section.customGridCols?.toString() as any} options={[{v:"2",l:"2"},{v:"3",l:"3"},{v:"4",l:"4"}]} onChange={(v) => u("customGridCols", parseInt(v))} />
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {(section.customElements || []).map((el) => (
              <button key={el.id} onClick={() => setSelectedElementId(el.id)} className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-violet-500/25 text-white/50 hover:text-white text-xs cursor-pointer text-left transition-all capitalize">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500/60 flex-shrink-0" />
                {el.type}: <span className="truncate text-white/25 ml-1">{el.content.slice(0, 24) || "—"}</span>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/20">Click element to open inspector</p>
        </PropGroup>
      )}

      {/* Carousel slides */}
      {section.type === "carousel" && section.slides && (
        <PropGroup title="Slides">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {section.slides.map((sl, i) => (
              <div key={sl.id} className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 space-y-2">
                <div className="flex items-center justify-between"><span className="text-[10px] font-mono text-white/25">Slide {i+1}</span><button onClick={() => deleteCarouselSlide(section.id, sl.id)} className="p-1 rounded text-white/25 hover:text-red-400 cursor-pointer"><Trash2 className="w-3 h-3" /></button></div>
                <input value={sl.title} onChange={(e) => updateSlide(section.id, sl.id, "title", e.target.value)} placeholder="Title" className={G.input} />
                <input value={sl.subtitle} onChange={(e) => updateSlide(section.id, sl.id, "subtitle", e.target.value)} placeholder="Subtitle" className={G.input} />
                <input value={sl.imageUrl} onChange={(e) => updateSlide(section.id, sl.id, "imageUrl", e.target.value)} placeholder="Image URL" className={G.input} />
              </div>
            ))}
          </div>
          <button onClick={() => addCarouselSlide(section.id)} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-dashed border-white/[0.08] hover:border-violet-500/30 text-white/30 hover:text-white/60 text-xs cursor-pointer transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Slide
          </button>
        </PropGroup>
      )}

      {/* Reviews */}
      {section.type === "review-carousel" && section.reviews && (
        <PropGroup title="Reviews">
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {section.reviews.map((rv, i) => (
              <div key={rv.id} className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 space-y-2">
                <div className="flex justify-between"><span className="text-[10px] font-mono text-white/25">Review {i+1}</span><button onClick={() => deleteReview(section.id, rv.id)} className="p-1 rounded text-white/25 hover:text-red-400 cursor-pointer"><Trash2 className="w-3 h-3" /></button></div>
                <input value={rv.name} onChange={(e) => updateReview(section.id, rv.id, "name", e.target.value)} placeholder="Name" className={G.input} />
                <input value={rv.role} onChange={(e) => updateReview(section.id, rv.id, "role", e.target.value)} placeholder="Role" className={G.input} />
                <input value={rv.company} onChange={(e) => updateReview(section.id, rv.id, "company", e.target.value)} placeholder="Company" className={G.input} />
                <textarea value={rv.text} onChange={(e) => updateReview(section.id, rv.id, "text", e.target.value)} placeholder="Review text…" rows={2} className={`${G.input} resize-none`} />
                <div className="flex gap-1 mt-1">
                  {[1,2,3,4,5].map((n) => <button key={n} onClick={() => updateReview(section.id, rv.id, "rating", n)} className="cursor-pointer"><Star className={`w-3.5 h-3.5 ${n <= rv.rating ? "text-amber-400 fill-amber-400" : "text-white/15"}`} /></button>)}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => addReview(section.id)} className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-dashed border-white/[0.08] hover:border-violet-500/30 text-white/30 hover:text-white/60 text-xs cursor-pointer transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Review
          </button>
        </PropGroup>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ELEMENT INSPECTOR (full property editor)
// ─────────────────────────────────────────────────────────────
function ElementInspector({ sectionId, el }: { sectionId: string; el: CustomElement }) {
  const { updateCustomElement } = useBuilder();
  const u = (updates: Partial<CustomElement>) => updateCustomElement(sectionId, el.id, updates);

  return (
    <div>
      {/* Content */}
      <PropGroup title="Content">
        <div>
          <L>{el.type === "image" ? "Image URL" : "Text Content"}</L>
          <textarea value={el.content} onChange={(e) => u({ content: e.target.value })} rows={2} className={`${G.input} resize-none`} />
        </div>
        {el.type === "button" && (
          <>
            <Pills label="Button Style" value={el.buttonVariant} options={[{v:"solid",l:"Solid"},{v:"outline",l:"Outline"},{v:"ghost",l:"Ghost"}] as any} onChange={(v) => u({ buttonVariant: v as any })} />
            <ColorField label="Button Color" value={el.buttonColor || "#7c3aed"} onChange={(v) => u({ buttonColor: v })} />
            <ColorField label="Button Text Color" value={el.buttonTextColor || "#ffffff"} onChange={(v) => u({ buttonTextColor: v })} />
            <div>
              <L>Button Link (URL)</L>
              <input value={el.buttonLink || ""} onChange={(e) => u({ buttonLink: e.target.value })} placeholder="https://example.com" className={G.input} />
            </div>
          </>
        )}
        {["input", "textarea"].includes(el.type) && (
          <>
            <div>
              <L>Label Text</L>
              <input value={el.inputLabel || ""} onChange={(e) => u({ inputLabel: e.target.value })} placeholder="Enter label..." className={G.input} />
            </div>
            <div>
              <L>Placeholder Text</L>
              <input value={el.inputPlaceholder || ""} onChange={(e) => u({ inputPlaceholder: e.target.value })} placeholder="Enter placeholder..." className={G.input} />
            </div>
            {el.type === "input" && (
              <Pills label="Input Type" value={el.inputType} options={[{v:"text",l:"Text"},{v:"email",l:"Email"},{v:"password",l:"Password"},{v:"tel",l:"Phone"}] as any} onChange={(v) => u({ inputType: v as any })} />
            )}
          </>
        )}
      </PropGroup>

      {/* Typography */}
      <PropGroup title="Typography" defaultOpen={false}>
        <Pills label="Font Size" value={el.fontSize} options={[{v:"text-xs",l:"xs"},{v:"text-sm",l:"sm"},{v:"text-base",l:"base"},{v:"text-lg",l:"lg"},{v:"text-xl",l:"xl"},{v:"text-2xl",l:"2xl"},{v:"text-3xl",l:"3xl"},{v:"text-4xl",l:"4xl"}] as any} onChange={(v) => u({ fontSize: v as any })} />
        <Pills label="Weight" value={el.fontWeight} options={[{v:"font-normal",l:"Normal"},{v:"font-medium",l:"Medium"},{v:"font-semibold",l:"Semi"},{v:"font-bold",l:"Bold"},{v:"font-extrabold",l:"Extra"}] as any} onChange={(v) => u({ fontWeight: v as any })} />
        <Pills label="Align" value={el.align} options={[{v:"text-left",l:"←"},{v:"text-center",l:"↔"},{v:"text-right",l:"→"}] as any} onChange={(v) => u({ align: v as any })} />
        <Pills label="Line Height" value={el.lineHeight} options={[{v:"leading-tight",l:"Tight"},{v:"leading-normal",l:"Normal"},{v:"leading-relaxed",l:"Relaxed"},{v:"leading-loose",l:"Loose"}] as any} onChange={(v) => u({ lineHeight: v as any })} />
      </PropGroup>

      {/* Colors */}
      <PropGroup title="Colors" defaultOpen={false}>
        <ColorField label="Text Color" value={el.textColor || "#ffffff"} onChange={(v) => u({ textColor: v })} />
        <ColorField label="Background" value={el.bgColor || "transparent"} onChange={(v) => u({ bgColor: v })} />
      </PropGroup>

      {/* Box */}
      <PropGroup title="Box & Spacing" defaultOpen={false}>
        <Pills label="Padding" value={el.padding} options={[{v:"p-0",l:"0"},{v:"p-2",l:"2"},{v:"p-3",l:"3"},{v:"p-4",l:"4"},{v:"p-5",l:"5"},{v:"p-6",l:"6"},{v:"p-8",l:"8"}] as any} onChange={(v) => u({ padding: v as any })} />
        <Pills label="Rounded" value={el.rounded} options={[{v:"rounded-none",l:"None"},{v:"rounded",l:"sm"},{v:"rounded-lg",l:"lg"},{v:"rounded-xl",l:"xl"},{v:"rounded-2xl",l:"2xl"},{v:"rounded-full",l:"full"}] as any} onChange={(v) => u({ rounded: v as any })} />
        <Pills label="Shadow" value={el.shadow} options={[{v:"shadow-none",l:"None"},{v:"shadow-sm",l:"sm"},{v:"shadow-md",l:"md"},{v:"shadow-lg",l:"lg"},{v:"shadow-xl",l:"xl"}] as any} onChange={(v) => u({ shadow: v as any })} />
        <div><L>Border</L><input value={el.border || ""} onChange={(e) => u({ border: e.target.value })} placeholder="border border-white/10" className={G.input} /></div>
        <Pills label="Margin Top" value={el.marginTop} options={[{v:"mt-0",l:"0"},{v:"mt-2",l:"2"},{v:"mt-4",l:"4"},{v:"mt-6",l:"6"},{v:"mt-8",l:"8"}] as any} onChange={(v) => u({ marginTop: v as any })} />
        <Pills label="Margin Bottom" value={el.marginBottom} options={[{v:"mb-0",l:"0"},{v:"mb-2",l:"2"},{v:"mb-4",l:"4"},{v:"mb-6",l:"6"},{v:"mb-8",l:"8"}] as any} onChange={(v) => u({ marginBottom: v as any })} />
      </PropGroup>

      {/* Layout */}
      <PropGroup title="Layout" defaultOpen={false}>
        <Pills label="Width" value={el.width} options={[{v:"col-span-1",l:"1/4"},{v:"col-span-2",l:"2/4"},{v:"col-span-3",l:"3/4"},{v:"col-span-full",l:"Full"}] as any} onChange={(v) => u({ width: v as any })} />
        <Pills label="Opacity" value={el.opacity} options={[{v:"opacity-100",l:"100%"},{v:"opacity-75",l:"75%"},{v:"opacity-50",l:"50%"},{v:"opacity-25",l:"25%"}] as any} onChange={(v) => u({ opacity: v })} />
      </PropGroup>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DOMAIN TAB
// ─────────────────────────────────────────────────────────────
function DomainTab() {
  const { domainInput, setDomainInput, connectedDomains, dnsCheckStep, dnsCheckingName, handleConnectDomain, removeDomain } = useBuilder();
  return (
    <div className="max-w-4xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-[#111118] border border-white/[0.06] p-6 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center"><Globe className="w-4.5 h-4.5 text-blue-400" /></div>
          <div><p className="text-sm font-semibold text-white">Connect Domain</p><p className="text-xs text-white/30">Auto SSL via Caddy ACME</p></div>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] font-mono text-xs space-y-1.5 text-white/40">
          <div className="flex gap-6"><span className="text-blue-400 w-16">A</span><span>@</span><span className="text-green-400">your.server.ip</span></div>
          <div className="flex gap-6"><span className="text-blue-400 w-16">CNAME</span><span>www</span><span className="text-green-400">yourdomain.com</span></div>
        </div>
        <form onSubmit={handleConnectDomain} className="flex gap-2">
          <input value={domainInput} onChange={(e) => setDomainInput(e.target.value)} placeholder="yoursite.com" className={G.input} />
          <button type="submit" className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-all"><Link2 className="w-4 h-4" /></button>
        </form>
        {dnsCheckStep > 0 && (
          <div className="space-y-2">
            {[{ l: `Resolving ${dnsCheckingName}`, s: 1 }, { l: "Verifying DNS propagation", s: 2 }, { l: "Issuing SSL certificate", s: 3 }].map(({ l, s }) => (
              <div key={s} className="flex items-center gap-2.5 text-xs">
                {dnsCheckStep > s ? <Check className="w-3.5 h-3.5 text-green-400" /> : dnsCheckStep === s ? <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/10" />}
                <span className={dnsCheckStep >= s ? "text-white/60" : "text-white/25"}>{l}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="rounded-2xl bg-[#111118] border border-white/[0.06] p-6 space-y-4">
        <p className="text-sm font-semibold text-white flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-400" /> Connected Domains</p>
        {connectedDomains.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-white/20 text-xs">No domains connected</div>
        ) : (
          <div className="space-y-2">
            {connectedDomains.map((d) => (
              <div key={d.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                  <div><p className="text-sm text-white font-medium">{d.name}</p><p className="text-[10px] text-green-400/70">SSL Active · Live</p></div>
                </div>
                <button onClick={() => removeDomain(d.name)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/25 hover:text-red-400 cursor-pointer transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOSTING TAB
// ─────────────────────────────────────────────────────────────
const REGIONS = [{ id: "us-east", label: "US East", sub: "N. Virginia", ping: "12ms" }, { id: "eu-west", label: "EU West", sub: "Frankfurt", ping: "28ms" }, { id: "ap-south", label: "Asia Pacific", sub: "Singapore", ping: "65ms" }];

function HostingTab() {
  const { selectedRegion, setSelectedRegion, isDeploying, deployLogs, isServerActive, setIsServerActive, serverStats, handleDeploy, terminalEndRef } = useBuilder();
  return (
    <div className="max-w-4xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-2xl bg-[#111118] border border-white/[0.06] p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center"><Server className="w-4 h-4 text-green-400" /></div>
          <div><p className="text-sm font-semibold text-white">Deployment</p><p className="text-xs text-white/30">Push to edge infrastructure</p></div>
        </div>
        <div className="space-y-2">
          {REGIONS.map((r) => (
            <button key={r.id} onClick={() => setSelectedRegion(r.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-xs transition-all cursor-pointer ${selectedRegion === r.id ? "bg-violet-500/8 border-violet-500/25 text-white" : "bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white"}`}>
              <span>{r.label} <span className="text-white/25">({r.sub})</span></span>
              <span className="font-mono text-green-400/70">{r.ping}</span>
            </button>
          ))}
        </div>
        <button onClick={handleDeploy} disabled={isDeploying} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold text-sm cursor-pointer hover:from-green-400 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/20 active:scale-[0.97]">
          {isDeploying ? <><Activity className="w-4 h-4 animate-pulse" /> Deploying…</> : <><Play className="w-4 h-4 fill-black" /> Deploy Now</>}
        </button>
        {deployLogs.length > 0 && (
          <div className="rounded-xl bg-black/60 border border-white/[0.05] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04]"><Terminal className="w-3 h-3 text-green-400" /><span className="text-[10px] font-mono text-white/30">Deploy Log</span></div>
            <div className="p-3 max-h-36 overflow-y-auto space-y-0.5">{deployLogs.map((log, i) => <p key={i} className="text-[10px] font-mono text-green-300/80">{log}</p>)}<div ref={terminalEndRef} /></div>
          </div>
        )}
      </div>
      <div className="rounded-2xl bg-[#111118] border border-white/[0.06] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center"><Activity className="w-4 h-4 text-blue-400" /></div>
            <div><p className="text-sm font-semibold text-white">Live Metrics</p><p className="text-xs text-white/30">Real-time performance</p></div>
          </div>
          <button onClick={() => setIsServerActive(!isServerActive)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${isServerActive ? "bg-red-500/8 border-red-500/15 text-red-400" : "bg-green-500/8 border-green-500/15 text-green-400"}`}>
            <Power className="w-3 h-3" /> {isServerActive ? "Stop" : "Start"}
          </button>
        </div>
        <div className={`px-4 py-2.5 rounded-xl border text-xs flex items-center gap-2 ${isServerActive ? "bg-green-500/5 border-green-500/10 text-green-400/70" : "bg-red-500/5 border-red-500/10 text-red-400/70"}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isServerActive ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
          {isServerActive ? "HEALTHY — Serving Traffic" : "OFFLINE — No Traffic"}
        </div>
        {[
          { label: "CPU", icon: Cpu, value: `${serverStats.cpu}%`, pct: serverStats.cpu / 100, color: serverStats.cpu > 80 ? "#ef4444" : "#8b5cf6" },
          { label: "RAM", icon: HardDrive, value: `${serverStats.ram} MB`, pct: serverStats.ram / 512, color: "#3b82f6" },
          { label: "Bandwidth", icon: Activity, value: `${serverStats.bandwidth} GB/s`, pct: serverStats.bandwidth / 5, color: "#10b981" },
        ].map(({ label, icon: Icon, value, pct, color }) => (
          <div key={label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Icon className="w-3.5 h-3.5 text-white/30" /><span className="text-xs text-white/40">{label}</span></div>
              <span className="text-xs font-mono text-white/70">{value}</span>
            </div>
            <div className="h-1 rounded-full bg-white/[0.04]"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(pct * 100, 100)}%`, backgroundColor: color }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────────────────────────
function PromptModal() {
  const { promptConfig, setPromptConfig } = useBuilder();
  if (!promptConfig.isOpen) return null;
  const close = () => setPromptConfig((p) => ({ ...p, isOpen: false }));
  const submit = () => { promptConfig.onSubmit(promptConfig.value); close(); };
  const PRESETS = ["#ffffff","#a78bfa","#7c3aed","#6366f1","#3b82f6","#10b981","#f59e0b","#ef4444","#f97316","#ec4899"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={close}>
      <div className="bg-[#111118] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">{promptConfig.type === "color" ? <Palette className="w-4 h-4 text-violet-400" /> : <LinkIcon className="w-4 h-4 text-blue-400" />}{promptConfig.title}</h3>
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        {promptConfig.type === "color" && (
          <div className="flex flex-wrap gap-2 mb-4">
            {PRESETS.map((c) => (
              <button key={c} onClick={() => setPromptConfig((p) => ({ ...p, value: c }))}
                className={`w-7 h-7 rounded-lg cursor-pointer border-2 hover:scale-110 transition-all ${promptConfig.value === c ? "border-white scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
        <div className="flex gap-2 mb-4">
          {promptConfig.type === "color" && <input type="color" value={promptConfig.value} onChange={(e) => setPromptConfig((p) => ({ ...p, value: e.target.value }))} className="w-10 h-10 rounded-xl cursor-pointer border border-white/10 bg-transparent" />}
          <input type="text" value={promptConfig.value} onChange={(e) => setPromptConfig((p) => ({ ...p, value: e.target.value }))} placeholder={promptConfig.placeholder} onKeyDown={(e) => e.key === "Enter" && submit()} autoFocus className={`${G.input} flex-1`} />
        </div>
        <div className="flex gap-2">
          <button onClick={close} className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs cursor-pointer hover:text-white transition-all">Cancel</button>
          <button onClick={submit} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold text-xs cursor-pointer hover:from-violet-600 hover:to-indigo-700 transition-all">Apply</button>
        </div>
      </div>
    </div>
  );
}

function SandboxModal() {
  const { isLivePreviewOpen, livePreviewUrl, setIsLivePreviewOpen } = useBuilder();
  if (!isLivePreviewOpen) return null;
  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-[#0d0d14]">
      <div className="h-10 border-b border-white/[0.05] px-4 flex items-center justify-between bg-[#0a0a10]/90 backdrop-blur-xl">
        <span className="text-xs font-mono text-white/40 truncate">{livePreviewUrl}</span>
        <div className="flex gap-2">
          <a href={livePreviewUrl} target="_blank" rel="noreferrer" className="text-xs px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/15 text-blue-400 cursor-pointer hover:bg-blue-500/15 transition-all flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Open</a>
          <button onClick={() => setIsLivePreviewOpen(false)} className="p-1 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
      </div>
      <iframe src={livePreviewUrl} className="flex-1 w-full bg-white" sandbox="allow-scripts allow-same-origin" />
    </div>
  );
}
