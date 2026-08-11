"use client";

// sections/CarouselSection.tsx
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Section } from "../types";
import { useBuilder } from "../BuilderContext";

interface Props { section: Section; isSelected: boolean; isPreview: boolean; }

export default function CarouselSection({ section, isSelected, isPreview }: Props) {
  const { activeSlideIndices, handleSlideNav, addCarouselSlide, deleteCarouselSlide } = useBuilder();
  const slides = section.slides || [];
  const current = activeSlideIndices[section.id] || 0;
  const slide = slides[current];

  return (
    <div className="py-16 px-8">
      <div className="text-center mb-8">
        <h2 className={`${section.titleSize} font-bold ${section.textColor} mb-2`}>{section.title}</h2>
        <p className={`${section.subtitleSize} ${section.textColor} opacity-60`}>{section.subtitle}</p>
      </div>

      {slide ? (
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] max-w-4xl mx-auto border border-white/10">
          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-2xl font-bold text-white mb-1">{slide.title}</h3>
            <p className="text-neutral-300 text-sm">{slide.subtitle}</p>
          </div>
          {slides.length > 1 && (
            <>
              <button onClick={() => handleSlideNav(section.id, slides.length, "prev")} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => handleSlideNav(section.id, slides.length, "next")} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          {/* Dots */}
          <div className="absolute top-4 right-4 flex gap-1.5">
            {slides.map((_, i) => (
              <div key={i} className={`rounded-full transition-all ${i === current ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40"}`} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 rounded-3xl border border-dashed border-white/10 text-neutral-500 text-sm">
          No slides yet. Add one in the panel.
        </div>
      )}
    </div>
  );
}
