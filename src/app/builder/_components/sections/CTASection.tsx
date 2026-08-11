"use client";
// sections/CTASection.tsx
import { ArrowRight } from "lucide-react";
import { Section } from "../types";
import { useBuilder } from "../BuilderContext";

interface Props { section: Section; isSelected: boolean; isPreview: boolean; }
export default function CTASection({ section, isSelected, isPreview }: Props) {
  const { updateSectionField } = useBuilder();
  const u = (f: any, v: any) => updateSectionField(section.id, f, v);
  return (
    <div className="py-20 px-8 flex flex-col items-center text-center">
      <h2 className={`${section.titleSize} font-bold ${section.textColor} mb-4 max-w-2xl`} contentEditable={!isPreview && isSelected} suppressContentEditableWarning onBlur={(e) => u("title", e.currentTarget.textContent || "")}>{section.title}</h2>
      <p className={`${section.subtitleSize} ${section.textColor} opacity-60 mb-8 max-w-lg`} contentEditable={!isPreview && isSelected} suppressContentEditableWarning onBlur={(e) => u("subtitle", e.currentTarget.textContent || "")}>{section.subtitle}</p>
      <button className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-100 transition-all shadow-xl active:scale-[0.98] cursor-pointer">
        {section.buttonText || "Get Started"} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
