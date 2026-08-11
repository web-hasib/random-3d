"use client";

// sections/HeroSection.tsx
import { Section } from "../types";
import { useBuilder } from "../BuilderContext";

interface Props { section: Section; isSelected: boolean; isPreview: boolean; }

export default function HeroSection({ section, isSelected, isPreview }: Props) {
  const { updateSectionField } = useBuilder();
  const u = (f: any, v: any) => updateSectionField(section.id, f, v);

  return (
    <div className="relative py-28 px-8 flex flex-col items-center text-center overflow-hidden min-h-[480px] justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/10 blur-3xl rounded-full" />
      </div>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6 relative">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        Live Builder Platform
      </div>
      <h1
        className={`${section.titleSize} font-extrabold ${section.textColor} leading-[1.1] tracking-tight mb-6 max-w-3xl relative`}
        contentEditable={!isPreview && isSelected}
        suppressContentEditableWarning
        onBlur={(e) => u("title", e.currentTarget.textContent || "")}
      >
        {section.title}
      </h1>
      <p
        className={`${section.subtitleSize} ${section.textColor} opacity-60 max-w-xl mb-10 relative leading-relaxed`}
        contentEditable={!isPreview && isSelected}
        suppressContentEditableWarning
        onBlur={(e) => u("subtitle", e.currentTarget.textContent || "")}
      >
        {section.subtitle}
      </p>
      <div className="flex gap-3 relative">
        <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 active:scale-[0.98] cursor-pointer">
          {section.buttonText || "Get Started"}
        </button>
        <button className="px-7 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all cursor-pointer">
          Learn More
        </button>
      </div>
    </div>
  );
}
