"use client";

// sections/FeaturesSection.tsx
import { Zap, Shield, Globe, Box } from "lucide-react";
import { Section } from "../types";
import { useBuilder } from "../BuilderContext";

const ICONS: Record<string, React.ReactNode> = {
  zap: <Zap className="w-5 h-5" />, shield: <Shield className="w-5 h-5" />, globe: <Globe className="w-5 h-5" />,
};

interface Props { section: Section; isSelected: boolean; isPreview: boolean; }

export default function FeaturesSection({ section, isSelected, isPreview }: Props) {
  const { updateSectionField, updateFeatureItem } = useBuilder();
  const items = section.items || [];

  return (
    <div className="py-20 px-8">
      <div className="text-center mb-14">
        <h2 className={`${section.titleSize} font-bold ${section.textColor} mb-3`}
          contentEditable={!isPreview && isSelected} suppressContentEditableWarning
          onBlur={(e) => updateSectionField(section.id, "title", e.currentTarget.textContent || "")}>
          {section.title}
        </h2>
        <p className={`${section.subtitleSize} ${section.textColor} opacity-60 max-w-xl mx-auto`}
          contentEditable={!isPreview && isSelected} suppressContentEditableWarning
          onBlur={(e) => updateSectionField(section.id, "subtitle", e.currentTarget.textContent || "")}>
          {section.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10 transition-all hover:-translate-y-1 duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
              {ICONS[item.icon || ""] || <Box className="w-5 h-5" />}
            </div>
            <h3 className={`text-base font-semibold ${section.textColor} mb-2`}
              contentEditable={!isPreview && isSelected} suppressContentEditableWarning
              onBlur={(e) => updateFeatureItem(section.id, i, "title", e.currentTarget.textContent || "")}>
              {item.title}
            </h3>
            <p className={`text-sm ${section.textColor} opacity-50 leading-relaxed`}
              contentEditable={!isPreview && isSelected} suppressContentEditableWarning
              onBlur={(e) => updateFeatureItem(section.id, i, "desc", e.currentTarget.textContent || "")}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
