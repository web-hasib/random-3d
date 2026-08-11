"use client";
// sections/FooterSection.tsx
import { Section } from "../types";
import { useBuilder } from "../BuilderContext";

interface Props { section: Section; isSelected: boolean; isPreview: boolean; }
export default function FooterSection({ section, isSelected, isPreview }: Props) {
  const { updateSectionField } = useBuilder();
  return (
    <div className="py-10 px-8 text-center border-t border-white/[0.04]">
      <p className={`${section.titleSize} font-semibold ${section.textColor} mb-1`} contentEditable={!isPreview && isSelected} suppressContentEditableWarning onBlur={(e) => updateSectionField(section.id, "title", e.currentTarget.textContent || "")}>{section.title}</p>
      <p className={`${section.subtitleSize} ${section.textColor} opacity-40`} contentEditable={!isPreview && isSelected} suppressContentEditableWarning onBlur={(e) => updateSectionField(section.id, "subtitle", e.currentTarget.textContent || "")}>{section.subtitle}</p>
    </div>
  );
}
