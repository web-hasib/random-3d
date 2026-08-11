"use client";
// sections/ImageBlockSection.tsx
import { Section } from "../types";
import { useBuilder } from "../BuilderContext";

interface Props { section: Section; isSelected: boolean; isPreview: boolean; }
export default function ImageBlockSection({ section, isSelected, isPreview }: Props) {
  const { updateSectionField, fileInputRef, handleImageUpload } = useBuilder();
  return (
    <div className="py-16 px-8">
      <div className="text-center mb-8">
        <h2 className={`${section.titleSize} font-bold ${section.textColor} mb-2`} contentEditable={!isPreview && isSelected} suppressContentEditableWarning onBlur={(e) => updateSectionField(section.id, "title", e.currentTarget.textContent || "")}>{section.title}</h2>
        <p className={`${section.subtitleSize} ${section.textColor} opacity-60`} contentEditable={!isPreview && isSelected} suppressContentEditableWarning onBlur={(e) => updateSectionField(section.id, "subtitle", e.currentTarget.textContent || "")}>{section.subtitle}</p>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl cursor-pointer group" onClick={() => !isPreview && isSelected && fileInputRef.current?.click()}>
        {section.imageUrl ? (
          <img src={section.imageUrl} alt={section.title} className="w-full h-80 object-cover group-hover:scale-[1.02] transition-transform duration-500" />
        ) : (
          <div className="w-full h-80 bg-white/[0.02] flex items-center justify-center text-neutral-500 text-sm">
            Click to upload image
          </div>
        )}
      </div>
    </div>
  );
}
