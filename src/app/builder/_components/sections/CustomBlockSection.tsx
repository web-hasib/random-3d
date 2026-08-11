"use client";

// ─────────────────────────────────────────────
// sections/CustomBlockSection.tsx
// Fully customizable block with draggable elements
// ─────────────────────────────────────────────

import { useRef, useState } from "react";
import { GripVertical, Trash2, Plus, Type, Heading, Image as ImageIcon, Square, Minus, Minus as DividerIcon, AlignCenter } from "lucide-react";
import { Section, CustomElement } from "../types";
import { useBuilder } from "../BuilderContext";

interface Props {
  section: Section;
  isSelected: boolean;
  isPreview: boolean;
}

export default function CustomBlockSection({ section, isSelected, isPreview }: Props) {
  const { selectedElementId, setSelectedElementId, deleteCustomElement, updateCustomElement, reorderCustomElements, addCustomElement } = useBuilder();
  const elements = section.customElements || [];
  const gridCols = section.customGridCols || 2;

  const [dragEl, setDragEl] = useState<number | null>(null);
  const [dragOverEl, setDragOverEl] = useState<number | null>(null);

  const handleElDragStart = (idx: number) => { setDragEl(idx); };
  const handleElDragOver = (e: React.DragEvent, idx: number) => { e.preventDefault(); setDragOverEl(idx); };
  const handleElDrop = (idx: number) => {
    if (dragEl !== null && dragEl !== idx) reorderCustomElements(section.id, dragEl, idx);
    setDragEl(null); setDragOverEl(null);
  };

  return (
    <div className="py-10 px-6 min-h-[200px]">
      {/* Header */}
      <div className="mb-8">
        <h2
          className={`${section.titleSize} font-bold ${section.textColor} mb-2`}
          contentEditable={!isPreview && isSelected}
          suppressContentEditableWarning
        >
          {section.title}
        </h2>
        <p className={`${section.subtitleSize} ${section.textColor} opacity-60`}>
          {section.subtitle}
        </p>
      </div>

      {/* Add element bar (edit mode only) */}
      {isSelected && !isPreview && (
        <div className="mb-6 flex flex-wrap gap-2 p-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-neutral-500 self-center mr-2 uppercase">+ Add</span>
          {(["text", "heading", "button", "image", "badge", "divider", "spacer"] as const).map((t) => (
            <button
              key={t}
              onClick={() => addCustomElement(section.id, t)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-neutral-300 text-xs cursor-pointer transition-all capitalize"
            >
              <ElementIcon type={t} /> {t}
            </button>
          ))}
        </div>
      )}

      {/* Elements grid */}
      <div
        className={`grid gap-4 ${
          gridCols === 2 ? "grid-cols-2"
          : gridCols === 3 ? "grid-cols-3"
          : gridCols === 4 ? "grid-cols-4"
          : "grid-cols-2"
        }`}
      >
        {elements.map((el, idx) => (
          <div
            key={el.id}
            className={`relative group ${el.width || "col-span-1"} transition-all duration-200 ${
              dragOverEl === idx ? "scale-[1.02] opacity-70" : ""
            }`}
            draggable={isSelected && !isPreview}
            onDragStart={() => handleElDragStart(idx)}
            onDragOver={(e) => handleElDragOver(e, idx)}
            onDrop={() => handleElDrop(idx)}
            onDragEnd={() => { setDragEl(null); setDragOverEl(null); }}
            onClick={(e) => { if (!isPreview && isSelected) { e.stopPropagation(); setSelectedElementId(el.id); } }}
          >
            {/* Selection ring */}
            {isSelected && !isPreview && selectedElementId === el.id && (
              <div className="absolute inset-0 ring-2 ring-purple-500 ring-offset-2 ring-offset-transparent rounded-[inherit] pointer-events-none z-10" />
            )}

            {/* Drag handle + delete (hover) */}
            {isSelected && !isPreview && (
              <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="cursor-grab active:cursor-grabbing p-1 rounded bg-neutral-800 border border-white/10 text-neutral-400">
                  <GripVertical className="w-3 h-3" />
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteCustomElement(section.id, el.id); }}
                  className="p-1 rounded bg-red-900/80 border border-red-500/30 text-red-300 hover:bg-red-800 cursor-pointer transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Element render */}
            <ElementRenderer el={el} isPreview={isPreview} isSelected={isSelected} sectionId={section.id} />
          </div>
        ))}

        {elements.length === 0 && (
          <div className="col-span-full py-10 flex flex-col items-center justify-center gap-3 text-neutral-600 border border-dashed border-white/10 rounded-2xl">
            <AlignCenter className="w-8 h-8" />
            <p className="text-sm">No elements yet. Click above to add one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Individual element renderer ─────────────

function ElementRenderer({ el, isPreview, isSelected, sectionId }: {
  el: CustomElement;
  isPreview: boolean;
  isSelected: boolean;
  sectionId: string;
}) {
  const { updateCustomElement } = useBuilder();

  // Build inline styles from element properties
  const containerStyle: React.CSSProperties = {
    backgroundColor: el.bgColor && !el.bgColor.startsWith("bg-") ? el.bgColor : undefined,
    color: el.textColor && !el.textColor.startsWith("text-") ? el.textColor : undefined,
  };

  const textStyle: React.CSSProperties = {
    color: el.textColor && !el.textColor.startsWith("text-") ? el.textColor : undefined,
  };

  const baseClasses = [
    el.padding || "p-4",
    el.rounded || "",
    el.shadow || "",
    el.border || "",
    el.align || "",
    el.fontSize || "text-sm",
    el.fontWeight || "font-normal",
    el.marginTop || "",
    el.marginBottom || "",
    el.opacity || "",
    el.lineHeight || "",
    el.letterSpacing || "",
    // tailwind bg/text if using class names
    el.bgColor?.startsWith("bg-") ? el.bgColor : "",
    el.textColor?.startsWith("text-") ? el.textColor : "",
  ].filter(Boolean).join(" ");

  switch (el.type) {
    case "divider":
      return (
        <div
          className={`w-full h-px ${el.marginTop || "mt-2"} ${el.marginBottom || "mb-2"}`}
          style={{ backgroundColor: el.bgColor && !el.bgColor.startsWith("bg-") ? el.bgColor : "rgba(255,255,255,0.1)" }}
        />
      );

    case "spacer":
      return <div className={el.padding || "p-6"} />;

    case "image":
      return (
        <div className={`overflow-hidden ${el.rounded || "rounded-xl"} ${el.shadow || ""}`}>
          <img
            src={el.content}
            alt="block image"
            className={`w-full ${el.imageHeight || "h-48"} ${el.imageFit || "object-cover"}`}
          />
        </div>
      );

    case "button":
      return (
        <div className={`${el.align || "text-left"} ${el.marginTop || ""} ${el.marginBottom || ""}`}>
          <button
            className={`inline-flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${el.padding || "px-6 py-3"} ${el.rounded || "rounded-xl"} ${el.shadow || ""} ${el.fontSize || "text-sm"} ${el.fontWeight || "font-semibold"} ${el.border || ""}`}
            style={{
              backgroundColor: el.buttonColor || "#7c3aed",
              color: el.textColor && !el.textColor.startsWith("text-") ? el.textColor : "#ffffff",
              ...(el.buttonVariant === "outline" ? { backgroundColor: "transparent", border: `2px solid ${el.buttonColor || "#7c3aed"}` } : {}),
              ...(el.buttonVariant === "ghost" ? { backgroundColor: "transparent" } : {}),
            }}
          >
            {el.content}
          </button>
        </div>
      );

    case "badge":
      return (
        <div className={`inline-flex items-center justify-center ${el.padding || "px-3 py-1"} ${el.rounded || "rounded-full"} ${el.border || ""} ${el.fontSize || "text-xs"} ${el.fontWeight || "font-medium"} ${el.shadow || ""}`}
          style={containerStyle}>
          {el.content}
        </div>
      );

    case "heading":
      return (
        <h3
          className={`${baseClasses} w-full`}
          style={textStyle}
          contentEditable={!isPreview && isSelected}
          suppressContentEditableWarning
          onBlur={(e) => updateCustomElement(sectionId, el.id, { content: e.currentTarget.textContent || "" })}
        >
          {el.content}
        </h3>
      );

    default: // text
      return (
        <p
          className={`${baseClasses} w-full`}
          style={{ ...containerStyle, ...textStyle }}
          contentEditable={!isPreview && isSelected}
          suppressContentEditableWarning
          onBlur={(e) => updateCustomElement(sectionId, el.id, { content: e.currentTarget.textContent || "" })}
        >
          {el.content}
        </p>
      );
  }
}

// ─── Element type icon ────────────────────────

function ElementIcon({ type }: { type: string }) {
  const cls = "w-3 h-3";
  switch (type) {
    case "heading": return <Heading className={cls} />;
    case "image":   return <ImageIcon className={cls} />;
    case "button":  return <Square className={cls} />;
    case "badge":   return <span className="text-[9px] font-bold">B</span>;
    case "divider": return <Minus className={cls} />;
    case "spacer":  return <span className="text-[9px]">⬜</span>;
    default:        return <Type className={cls} />;
  }
}
