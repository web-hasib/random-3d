"use client";

// ─────────────────────────────────────────────
// Canvas.tsx — Main droppable section canvas
// ─────────────────────────────────────────────

import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { useBuilder } from "./BuilderContext";
import { SectionType } from "./types";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import CarouselSection from "./sections/CarouselSection";
import ReviewCarouselSection from "./sections/ReviewCarouselSection";
import CTASection from "./sections/CTASection";
import ContactSection from "./sections/ContactSection";
import FooterSection from "./sections/FooterSection";
import ImageBlockSection from "./sections/ImageBlockSection";
import CustomBlockSection from "./sections/CustomBlockSection";

export default function Canvas() {
  const {
    sections, setSections, selectedSectionId, setSelectedSectionId, setSelectedElementId,
    isPreviewMode, addSection,
    deleteSection, moveSection,
    draggedIndex, setDraggedIndex,
    dragOverIndex, setDragOverIndex,
    isDraggingNew,
  } = useBuilder();

  const handleCanvasDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleCanvasDrop = (e: React.DragEvent) => {
    const type = e.dataTransfer.getData("newSectionType") as SectionType;
    if (type) { addSection(type); }
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      setSections((prev) => {
        const newList = [...prev];
        const [moved] = newList.splice(draggedIndex, 1);
        newList.splice(dragOverIndex, 0, moved);
        return newList;
      });
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div
      className={`lg:col-span-6 min-h-[80vh] rounded-2xl overflow-hidden border transition-all duration-300 ${
        isDraggingNew
          ? "border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          : "border-white/[0.06]"
      }`}
      onDragOver={handleCanvasDragOver}
      onDrop={handleCanvasDrop}
    >
      {sections.length === 0 && (
        <div className="h-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-neutral-600">
          <div className="text-5xl">🖼️</div>
          <p className="text-sm font-medium">Drag a block here or click a preset to start building</p>
        </div>
      )}

      {sections.map((section, index) => {
        const isSelected = selectedSectionId === section.id;
        const isPreview = isPreviewMode;

        // Build container styles
        const bgStyle: React.CSSProperties = section.bgImageUrl
          ? { backgroundImage: `url(${section.bgImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
          : {};

        return (
          <div
            key={section.id}
            draggable={!isPreviewMode}
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => { e.preventDefault(); setDragOverIndex(index); }}
            onDragEnd={() => { setDraggedIndex(null); setDragOverIndex(null); }}
            onClick={() => { setSelectedSectionId(section.id); setSelectedElementId(null); }}
            className={`relative group transition-all duration-200 ${section.bgColor} ${
              isSelected && !isPreviewMode ? "ring-2 ring-inset ring-purple-500/40" : ""
            } ${dragOverIndex === index ? "scale-[1.01] opacity-80" : ""}`}
            style={bgStyle}
          >
            {/* BG overlay when image set */}
            {section.bgImageUrl && (
              <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            )}

            {/* Section controls overlay (edit mode) */}
            {isSelected && !isPreviewMode && (
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); moveSection(index, "up"); }} className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-neutral-300 hover:text-white hover:bg-black/80 cursor-pointer transition-all">
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); moveSection(index, "down"); }} className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-neutral-300 hover:text-white hover:bg-black/80 cursor-pointer transition-all">
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className="p-1.5 rounded-lg bg-red-900/60 backdrop-blur-sm border border-red-500/20 text-red-300 hover:bg-red-900/80 cursor-pointer transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Section type label */}
            {isSelected && !isPreviewMode && (
              <div className="absolute top-3 left-3 z-20 px-2 py-1 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-semibold uppercase tracking-wider">
                {section.type}
              </div>
            )}

            {/* Drag indicator */}
            {dragOverIndex === index && draggedIndex !== null && draggedIndex !== index && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500/60 z-30" />
            )}

            {/* Relative wrapper for content above overlay */}
            <div className="relative z-10">
              <SectionContent section={section} isSelected={isSelected} isPreview={isPreview} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Section type router ──────────────────────

function SectionContent({ section, isSelected, isPreview }: { section: any; isSelected: boolean; isPreview: boolean }) {
  const props = { section, isSelected, isPreview };
  switch (section.type) {
    case "hero":             return <HeroSection {...props} />;
    case "features":         return <FeaturesSection {...props} />;
    case "carousel":         return <CarouselSection {...props} />;
    case "review-carousel":  return <ReviewCarouselSection {...props} />;
    case "cta":              return <CTASection {...props} />;
    case "contact":          return <ContactSection {...props} />;
    case "footer":           return <FooterSection {...props} />;
    case "image-block":      return <ImageBlockSection {...props} />;
    case "custom-block":     return <CustomBlockSection {...props} />;
    default:                 return null;
  }
}
