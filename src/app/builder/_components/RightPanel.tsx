"use client";

// ─────────────────────────────────────────────
// RightPanel.tsx — Sticky right settings sidebar
// Shows section settings OR element property inspector
// ─────────────────────────────────────────────

import { useState } from "react";
import {
  Settings, Image, Upload, Type, AlignLeft, AlignCenter, AlignRight,
  PaintBucket, Maximize2, CornerUpLeft, Layers, ChevronDown, ChevronUp,
  Plus, Trash2, Star, X
} from "lucide-react";
import { useBuilder } from "./BuilderContext";
import {
  TitleSize, SubtitleSize, CustomElement,
  ElementFontSize, ElementFontWeight, ElementPadding,
  ElementRounded, ElementShadow, ElementWidth, ElementAlign,
} from "./types";

// ─── Option pill helper ───────────────────────
function Pill({ active, onClick, children, className = "" }: { active?: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
        active ? "bg-purple-500/20 border border-purple-500/40 text-purple-300" : "bg-white/[0.04] border border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.07]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

// ─── Color input ──────────────────────────────
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const PRESETS = ["#ffffff", "#a78bfa", "#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#64748b", "#0f172a", "transparent"];
  return (
    <div>
      <label className="block text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {PRESETS.map((c) => (
          <button
            key={c}
            title={c}
            onClick={() => onChange(c)}
            className={`w-5 h-5 rounded cursor-pointer border-2 transition-all ${value === c ? "border-purple-400 scale-110" : "border-transparent hover:scale-105"}`}
            style={{ backgroundColor: c === "transparent" ? undefined : c, backgroundImage: c === "transparent" ? "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)" : undefined, backgroundSize: "8px 8px", backgroundPosition: "0 0, 4px 4px" }}
          />
        ))}
      </div>
      <div className="flex gap-1.5">
        <input
          type="color"
          value={value && value !== "transparent" ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border border-white/10 bg-transparent flex-shrink-0"
        />
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#hex or rgba(...)"
          className="flex-1 text-xs px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-neutral-600 focus:outline-none focus:border-purple-500/50"
        />
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────
function PanelSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.05]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-0 text-xs font-semibold text-neutral-300 cursor-pointer hover:text-white transition-colors"
      >
        {title}
        {open ? <ChevronUp className="w-3.5 h-3.5 text-neutral-500" /> : <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />}
      </button>
      {open && <div className="pb-4 space-y-3">{children}</div>}
    </div>
  );
}

// ─── Main component ───────────────────────────
export default function RightPanel() {
  const {
    sections, selectedSectionId, selectedElementId, setSelectedElementId,
    updateSectionField, updateCustomElement,
    fileInputRef, bgFileInputRef, handleImageUpload, handleBgImageUpload,
    addCarouselSlide, deleteCarouselSlide, updateSlide,
    addReview, deleteReview, updateReview,
    addCustomElement,
    isPreviewMode,
  } = useBuilder();

  const section = sections.find((s) => s.id === selectedSectionId);
  if (!section) {
    return (
      <div className="lg:col-span-3 sticky top-24 self-start">
        <div className="bg-neutral-900/40 border border-white/[0.06] rounded-2xl p-5 text-center text-neutral-500 text-xs">
          Select a section to see settings
        </div>
      </div>
    );
  }

  // If a custom element is selected, show the element inspector
  const selectedEl = section.customElements?.find((el) => el.id === selectedElementId);
  if (selectedEl && section.type === "custom-block") {
    return (
      <div className="lg:col-span-3 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-1 space-y-2">
        <ElementInspector sectionId={section.id} el={selectedEl} onClose={() => setSelectedElementId(null)} />
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
      <div className="bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-2xl p-5 space-y-1">
        <h2 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4 text-purple-400" />
          {section.type.replace("-", " ").toUpperCase()} Settings
        </h2>

        {/* ── Text & Content ── */}
        <PanelSection title="📝 Content">
          {["hero","cta","features","contact","footer","image-block","carousel","review-carousel","custom-block"].includes(section.type) && (
            <>
              <div>
                <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1 block">Title</label>
                <input value={section.title} onChange={(e) => updateSectionField(section.id, "title", e.target.value)} className="w-full text-xs px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-purple-500/50" />
              </div>
              <div>
                <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1 block">Subtitle</label>
                <textarea value={section.subtitle} onChange={(e) => updateSectionField(section.id, "subtitle", e.target.value)} rows={2} className="w-full text-xs px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-purple-500/50 resize-none" />
              </div>
              {section.buttonText !== undefined && (
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1 block">Button Text</label>
                  <input value={section.buttonText || ""} onChange={(e) => updateSectionField(section.id, "buttonText", e.target.value)} className="w-full text-xs px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-purple-500/50" />
                </div>
              )}
            </>
          )}
        </PanelSection>

        {/* ── Typography ── */}
        <PanelSection title="🔤 Typography">
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Title Size</label>
            <div className="flex flex-wrap gap-1.5">
              {(["text-2xl","text-3xl","text-4xl","text-5xl","text-6xl"] as TitleSize[]).map((s) => (
                <Pill key={s} active={section.titleSize === s} onClick={() => updateSectionField(section.id, "titleSize", s)}>
                  {s.replace("text-","")}
                </Pill>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Subtitle Size</label>
            <div className="flex flex-wrap gap-1.5">
              {(["text-xs","text-sm","text-base","text-lg","text-xl"] as SubtitleSize[]).map((s) => (
                <Pill key={s} active={section.subtitleSize === s} onClick={() => updateSectionField(section.id, "subtitleSize", s)}>
                  {s.replace("text-","")}
                </Pill>
              ))}
            </div>
          </div>
        </PanelSection>

        {/* ── Background ── */}
        <PanelSection title="🎨 Background">
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">BG Preset</label>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { label: "Dark Black", value: "bg-black" },
                { label: "Zinc 950", value: "bg-zinc-950" },
                { label: "Slate 950", value: "bg-slate-950" },
                { label: "Indigo→Black", value: "bg-gradient-to-br from-indigo-950 via-slate-900 to-black" },
                { label: "Purple tint", value: "bg-purple-950/40 border border-purple-500/20 backdrop-blur-md" },
                { label: "Glass", value: "bg-white/5 backdrop-blur-lg border border-white/10" },
              ].map((preset) => (
                <button key={preset.value} onClick={() => updateSectionField(section.id, "bgColor", preset.value)}
                  className={`text-left px-3 py-2 rounded-lg text-xs transition-all cursor-pointer ${section.bgColor === preset.value ? "border border-purple-500/40 bg-purple-500/10 text-purple-300" : "border border-white/[0.05] bg-white/[0.03] text-neutral-400 hover:text-white"}`}>
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Text Color</label>
            <div className="flex flex-wrap gap-1.5">
              {["text-white","text-neutral-200","text-purple-200","text-blue-200","text-amber-200","text-green-200"].map((c) => (
                <Pill key={c} active={section.textColor === c} onClick={() => updateSectionField(section.id, "textColor", c)}>
                  {c.replace("text-","")}
                </Pill>
              ))}
            </div>
          </div>
        </PanelSection>

        {/* ── Background Image ── */}
        <PanelSection title="🖼️  Background Media">
          <input ref={bgFileInputRef} type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
          <button onClick={() => bgFileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-dashed border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06] text-neutral-400 hover:text-white text-xs transition-all cursor-pointer">
            <Upload className="w-4 h-4" /> Upload Background Image
          </button>
          {section.bgImageUrl && (
            <div className="relative rounded-xl overflow-hidden border border-white/10 mt-2">
              <img src={section.bgImageUrl} alt="" className="w-full h-20 object-cover" />
              <button onClick={() => updateSectionField(section.id, "bgImageUrl", "")} className="absolute top-1 right-1 p-1 rounded bg-red-900/80 text-red-300 hover:bg-red-800 cursor-pointer"><X className="w-3 h-3" /></button>
            </div>
          )}
        </PanelSection>

        {/* ── Image block upload ── */}
        {section.type === "image-block" && (
          <PanelSection title="📷 Section Image">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-dashed border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06] text-neutral-400 hover:text-white text-xs transition-all cursor-pointer">
              <Upload className="w-4 h-4" /> Upload Section Image
            </button>
            {section.imageUrl && (
              <div className="relative rounded-xl overflow-hidden border border-white/10 mt-2">
                <img src={section.imageUrl} alt="" className="w-full h-24 object-cover" />
                <button onClick={() => updateSectionField(section.id, "imageUrl", "")} className="absolute top-1 right-1 p-1 rounded bg-red-900/80 text-red-300 cursor-pointer"><X className="w-3 h-3" /></button>
              </div>
            )}
          </PanelSection>
        )}

        {/* ── Custom block: elements list ── */}
        {section.type === "custom-block" && (
          <PanelSection title="🛠️  Custom Elements">
            <div>
              <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Grid Columns</label>
              <div className="flex gap-1.5">
                {([2,3,4] as const).map((n) => (
                  <Pill key={n} active={section.customGridCols === n} onClick={() => updateSectionField(section.id, "customGridCols", n)}>{n} cols</Pill>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {(section.customElements || []).map((el) => (
                <button key={el.id} onClick={() => setSelectedElementId(el.id)} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-white/[0.03] border border-white/[0.05] hover:border-purple-500/30 text-neutral-300 hover:text-white transition-all cursor-pointer text-left capitalize">
                  <span className="w-2 h-2 rounded-full bg-purple-500/60 flex-shrink-0" />
                  {el.type}: <span className="truncate text-neutral-500 ml-1">{el.content.slice(0, 28) || "—"}</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-neutral-600">Click an element to open the style inspector.</p>
          </PanelSection>
        )}

        {/* ── Carousel slides ── */}
        {section.type === "carousel" && section.slides && (
          <PanelSection title="🎠 Slides">
            {section.slides.map((slide, i) => (
              <div key={slide.id} className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">Slide {i + 1}</span>
                  <button onClick={() => deleteCarouselSlide(section.id, slide.id)} className="p-1 rounded hover:bg-red-900/50 text-neutral-500 hover:text-red-400 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                </div>
                <input value={slide.title} onChange={(e) => updateSlide(section.id, slide.id, "title", e.target.value)} placeholder="Slide Title" className="w-full text-xs px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none" />
                <input value={slide.subtitle} onChange={(e) => updateSlide(section.id, slide.id, "subtitle", e.target.value)} placeholder="Subtitle" className="w-full text-xs px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none" />
                <input value={slide.imageUrl} onChange={(e) => updateSlide(section.id, slide.id, "imageUrl", e.target.value)} placeholder="Image URL" className="w-full text-xs px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none" />
              </div>
            ))}
            <button onClick={() => addCarouselSlide(section.id)} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-white/10 hover:border-purple-500/30 text-neutral-400 hover:text-white text-xs cursor-pointer transition-all">
              <Plus className="w-3.5 h-3.5" /> Add Slide
            </button>
          </PanelSection>
        )}

        {/* ── Reviews ── */}
        {section.type === "review-carousel" && section.reviews && (
          <PanelSection title="⭐ Reviews">
            {section.reviews.map((rv, i) => (
              <div key={rv.id} className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">Review {i + 1}</span>
                  <button onClick={() => deleteReview(section.id, rv.id)} className="p-1 rounded hover:bg-red-900/50 text-neutral-500 hover:text-red-400 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                </div>
                <input value={rv.name} onChange={(e) => updateReview(section.id, rv.id, "name", e.target.value)} placeholder="Name" className="w-full text-xs px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none" />
                <input value={rv.role} onChange={(e) => updateReview(section.id, rv.id, "role", e.target.value)} placeholder="Job Role" className="w-full text-xs px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none" />
                <input value={rv.company} onChange={(e) => updateReview(section.id, rv.id, "company", e.target.value)} placeholder="Company" className="w-full text-xs px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none" />
                <input value={rv.avatarUrl} onChange={(e) => updateReview(section.id, rv.id, "avatarUrl", e.target.value)} placeholder="Avatar URL" className="w-full text-xs px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none" />
                <textarea value={rv.text} onChange={(e) => updateReview(section.id, rv.id, "text", e.target.value)} placeholder="Review text..." rows={2} className="w-full text-xs px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white focus:outline-none resize-none" />
                <div>
                  <label className="text-[10px] text-neutral-500 mb-1 block">Rating (stars)</label>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((n) => (
                      <button key={n} onClick={() => updateReview(section.id, rv.id, "rating", n)} className="cursor-pointer">
                        <Star className={`w-4 h-4 transition-colors ${n <= rv.rating ? "text-amber-400 fill-amber-400" : "text-neutral-600"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => addReview(section.id)} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-white/10 hover:border-purple-500/30 text-neutral-400 hover:text-white text-xs cursor-pointer transition-all">
              <Plus className="w-3.5 h-3.5" /> Add Review
            </button>
          </PanelSection>
        )}
      </div>
    </div>
  );
}

// ─── Element Style Inspector ─────────────────
// Full property editor for a single custom element

function ElementInspector({ sectionId, el, onClose }: { sectionId: string; el: CustomElement; onClose: () => void }) {
  const { updateCustomElement } = useBuilder();
  const u = (updates: Partial<CustomElement>) => updateCustomElement(sectionId, el.id, updates);

  return (
    <div className="bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-2xl p-5 space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-neutral-200 flex items-center gap-2 capitalize">
          <Layers className="w-4 h-4 text-purple-400" />
          {el.type} Inspector
        </h2>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer transition-all">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <PanelSection title="📝 Content">
        {el.type !== "divider" && el.type !== "spacer" && (
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1 block">
              {el.type === "image" ? "Image URL" : "Text Content"}
            </label>
            <textarea
              value={el.content}
              onChange={(e) => u({ content: e.target.value })}
              rows={2}
              className="w-full text-xs px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-purple-500/50 resize-none"
            />
          </div>
        )}
        {el.type === "image" && (
          <>
            <div>
              <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Image Height</label>
              <div className="flex flex-wrap gap-1.5">
                {(["h-24","h-32","h-48","h-64","h-80","h-96"] as const).map((h) => (
                  <Pill key={h} active={el.imageHeight === h} onClick={() => u({ imageHeight: h })}>{h}</Pill>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Image Fit</label>
              <div className="flex gap-1.5">
                {(["object-cover","object-contain","object-fill"] as const).map((f) => (
                  <Pill key={f} active={el.imageFit === f} onClick={() => u({ imageFit: f })}>{f.replace("object-","")}</Pill>
                ))}
              </div>
            </div>
          </>
        )}
        {el.type === "button" && (
          <>
            <div>
              <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Button Style</label>
              <div className="flex gap-1.5">
                {(["solid","outline","ghost"] as const).map((v) => (
                  <Pill key={v} active={el.buttonVariant === v} onClick={() => u({ buttonVariant: v })} className="capitalize">{v}</Pill>
                ))}
              </div>
            </div>
            <ColorField label="Button Color" value={el.buttonColor || "#7c3aed"} onChange={(v) => u({ buttonColor: v })} />
          </>
        )}
      </PanelSection>

      {/* Typography */}
      {!["image","divider","spacer"].includes(el.type) && (
        <PanelSection title="🔤 Typography">
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Font Size</label>
            <div className="flex flex-wrap gap-1.5">
              {(["text-xs","text-sm","text-base","text-lg","text-xl","text-2xl","text-3xl","text-4xl"] as ElementFontSize[]).map((s) => (
                <Pill key={s} active={el.fontSize === s} onClick={() => u({ fontSize: s })}>{s.replace("text-","")}</Pill>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Font Weight</label>
            <div className="flex flex-wrap gap-1.5">
              {(["font-normal","font-medium","font-semibold","font-bold","font-extrabold"] as ElementFontWeight[]).map((w) => (
                <Pill key={w} active={el.fontWeight === w} onClick={() => u({ fontWeight: w })}>{w.replace("font-","")}</Pill>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Alignment</label>
            <div className="flex gap-1.5">
              {(["text-left","text-center","text-right"] as ElementAlign[]).map((a) => (
                <Pill key={a} active={el.align === a} onClick={() => u({ align: a })}>
                  {a === "text-left" ? <AlignLeft className="w-3.5 h-3.5" /> : a === "text-center" ? <AlignCenter className="w-3.5 h-3.5" /> : <AlignRight className="w-3.5 h-3.5" />}
                </Pill>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Line Height</label>
            <div className="flex flex-wrap gap-1.5">
              {(["leading-tight","leading-snug","leading-normal","leading-relaxed","leading-loose"] as const).map((v) => (
                <Pill key={v} active={el.lineHeight === v} onClick={() => u({ lineHeight: v })}>{v.replace("leading-","")}</Pill>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Letter Spacing</label>
            <div className="flex flex-wrap gap-1.5">
              {(["tracking-tighter","tracking-tight","tracking-normal","tracking-wide","tracking-wider"] as const).map((v) => (
                <Pill key={v} active={el.letterSpacing === v} onClick={() => u({ letterSpacing: v })}>{v.replace("tracking-","")}</Pill>
              ))}
            </div>
          </div>
        </PanelSection>
      )}

      {/* Colors */}
      <PanelSection title="🎨 Colors">
        {!["divider","spacer","image"].includes(el.type) && (
          <ColorField label="Text Color" value={el.textColor || "#ffffff"} onChange={(v) => u({ textColor: v })} />
        )}
        <ColorField label="Background Color" value={el.bgColor || "transparent"} onChange={(v) => u({ bgColor: v })} />
      </PanelSection>

      {/* Box / Border */}
      <PanelSection title="📦 Box & Border">
        <div>
          <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Padding</label>
          <div className="flex flex-wrap gap-1.5">
            {(["p-0","p-1","p-2","p-3","p-4","p-5","p-6","p-8","p-10","px-6 py-3","px-4 py-2","px-5 py-2.5","px-8 py-3.5","px-6 py-3.5"] as ElementPadding[]).map((p) => (
              <Pill key={p} active={el.padding === p} onClick={() => u({ padding: p })}>{p}</Pill>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Border Radius</label>
          <div className="flex flex-wrap gap-1.5">
            {(["rounded-none","rounded","rounded-lg","rounded-xl","rounded-2xl","rounded-3xl","rounded-full"] as ElementRounded[]).map((r) => (
              <Pill key={r} active={el.rounded === r} onClick={() => u({ rounded: r })}>{r.replace("rounded-","") || "none"}</Pill>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1 block">Border</label>
          <input value={el.border || ""} onChange={(e) => u({ border: e.target.value })} placeholder='e.g. border border-white/10' className="w-full text-xs px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-purple-500/50" />
        </div>
        <div>
          <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Shadow</label>
          <div className="flex flex-wrap gap-1.5">
            {(["shadow-none","shadow-sm","shadow","shadow-md","shadow-lg","shadow-xl"] as ElementShadow[]).map((s) => (
              <Pill key={s} active={el.shadow === s} onClick={() => u({ shadow: s })}>{s.replace("shadow-","") || "none"}</Pill>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Opacity</label>
          <div className="flex flex-wrap gap-1.5">
            {["opacity-100","opacity-75","opacity-50","opacity-25"].map((o) => (
              <Pill key={o} active={el.opacity === o} onClick={() => u({ opacity: o })}>{o.replace("opacity-","") + "%"}</Pill>
            ))}
          </div>
        </div>
      </PanelSection>

      {/* Layout */}
      <PanelSection title="📐 Layout">
        <div>
          <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Width (Grid Span)</label>
          <div className="flex flex-wrap gap-1.5">
            {(["col-span-1","col-span-2","col-span-3","col-span-4","col-span-full"] as ElementWidth[]).map((w) => (
              <Pill key={w} active={el.width === w} onClick={() => u({ width: w })}>{w.replace("col-span-","")}</Pill>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Margin Top</label>
          <div className="flex flex-wrap gap-1.5">
            {(["mt-0","mt-2","mt-4","mt-6","mt-8"] as const).map((m) => (
              <Pill key={m} active={el.marginTop === m} onClick={() => u({ marginTop: m })}>{m}</Pill>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Margin Bottom</label>
          <div className="flex flex-wrap gap-1.5">
            {(["mb-0","mb-2","mb-4","mb-6","mb-8"] as const).map((m) => (
              <Pill key={m} active={el.marginBottom === m} onClick={() => u({ marginBottom: m })}>{m}</Pill>
            ))}
          </div>
        </div>
      </PanelSection>
    </div>
  );
}
