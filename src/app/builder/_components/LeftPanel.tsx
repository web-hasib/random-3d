"use client";

// ─────────────────────────────────────────────
// LeftPanel.tsx — Sticky left sidebar
// (Elements preset + WYSIWYG hint)
// ─────────────────────────────────────────────

import { Plus, Move, ChevronRight, Sparkles } from "lucide-react";
import { useBuilder } from "./BuilderContext";
import { SectionType } from "./types";

const PRESETS: { type: SectionType; label: string }[] = [
  { type: "hero",            label: "🚀 Hero Section" },
  { type: "features",        label: "⚡ Feature Cards" },
  { type: "carousel",        label: "🎠 Image Carousel" },
  { type: "review-carousel", label: "⭐ Review Carousel" },
  { type: "image-block",     label: "🖼️  Image Block" },
  { type: "custom-block",    label: "🛠️  Custom Layout Block" },
  { type: "cta",             label: "📣 Call To Action" },
  { type: "contact",         label: "✉️  Contact Form" },
  { type: "footer",          label: "🏁 Site Footer" },
];

export default function LeftPanel() {
  const { addSection, setIsDraggingNew } = useBuilder();

  return (
    <div className="lg:col-span-3 sticky top-24 self-start space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
      {/* Element presets */}
      <div className="bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-purple-400" /> Elements Preset
        </h2>
        <p className="text-[11px] text-neutral-400 mb-4">
          Drag or click to add a block to the canvas.
        </p>

        <div className="grid grid-cols-1 gap-2.5">
          {PRESETS.map((item) => (
            <div
              key={item.type}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("newSectionType", item.type);
                setIsDraggingNew(item.type);
              }}
              onDragEnd={() => setIsDraggingNew(null)}
              onClick={() => addSection(item.type)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/15 transition-all text-left text-xs font-semibold text-neutral-200 group cursor-grab active:cursor-grabbing select-none"
            >
              <span className="flex items-center gap-2">
                <Move className="w-3.5 h-3.5 text-neutral-500 group-hover:text-purple-400 flex-shrink-0" />
                {item.label}
              </span>
              <ChevronRight className="w-3 h-3 text-neutral-500 group-hover:text-purple-400 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* WYSIWYG hint */}
      <div className="bg-gradient-to-b from-purple-950/20 to-indigo-950/10 border border-purple-500/10 rounded-2xl p-5 space-y-2">
        <h3 className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> WYSIWYG Editor
        </h3>
        <p className="text-[11px] text-neutral-400 leading-relaxed">
          Select any text inside a canvas block, then use the <strong className="text-white">Formatting Toolbar</strong> above to style it.
        </p>
      </div>
    </div>
  );
}
