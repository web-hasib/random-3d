"use client";
// sections/ContactSection.tsx
import { Send } from "lucide-react";
import { Section } from "../types";
import { useBuilder } from "../BuilderContext";

interface Props { section: Section; isSelected: boolean; isPreview: boolean; }
export default function ContactSection({ section, isSelected, isPreview }: Props) {
  const { updateSectionField, updateFormField, contactFormInputs, setContactFormInputs } = useBuilder();
  const fields = section.formFields || [];

  return (
    <div className="py-20 px-8 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className={`${section.titleSize} font-bold ${section.textColor} mb-3`} contentEditable={!isPreview && isSelected} suppressContentEditableWarning onBlur={(e) => updateSectionField(section.id, "title", e.currentTarget.textContent || "")}>{section.title}</h2>
        <p className={`${section.subtitleSize} ${section.textColor} opacity-60`} contentEditable={!isPreview && isSelected} suppressContentEditableWarning onBlur={(e) => updateSectionField(section.id, "subtitle", e.currentTarget.textContent || "")}>{section.subtitle}</p>
      </div>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="group">
            {isSelected && !isPreview ? (
              <input
                className="block text-xs font-semibold text-neutral-400 mb-1 bg-transparent border-b border-dashed border-white/10 focus:outline-none focus:border-purple-500/50 w-full pb-1"
                value={field.label}
                onChange={(e) => updateFormField(section.id, field.id, "label", e.target.value)}
              />
            ) : (
              <label className="block text-xs font-semibold text-neutral-400 mb-1">{field.label}</label>
            )}
            {field.type === "textarea" ? (
              <textarea
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-purple-500/40 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-all resize-none"
                rows={4}
                placeholder={field.placeholder}
                value={contactFormInputs[field.id] || ""}
                onChange={(e) => setContactFormInputs((p) => ({ ...p, [field.id]: e.target.value }))}
              />
            ) : (
              <input
                type={field.type}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-purple-500/40 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-all"
                placeholder={field.placeholder}
                value={contactFormInputs[field.id] || ""}
                onChange={(e) => setContactFormInputs((p) => ({ ...p, [field.id]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/20 cursor-pointer mt-2">
          <Send className="w-4 h-4" /> {section.buttonText || "Send Message"}
        </button>
      </div>
    </div>
  );
}
