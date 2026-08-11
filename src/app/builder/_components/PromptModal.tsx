"use client";

// PromptModal.tsx — Custom link/color input modal
import { X, Link, Palette } from "lucide-react";
import { useBuilder } from "./BuilderContext";

const COLOR_PRESETS = [
  "#ffffff","#a78bfa","#7c3aed","#3b82f6","#10b981",
  "#f59e0b","#ef4444","#f97316","#ec4899","#64748b",
];

export default function PromptModal() {
  const { promptConfig, setPromptConfig } = useBuilder();
  if (!promptConfig.isOpen) return null;

  const close = () => setPromptConfig((p) => ({ ...p, isOpen: false }));
  const submit = () => { promptConfig.onSubmit(promptConfig.value); close(); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={close}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-neutral-900/90 border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            {promptConfig.type === "color" ? <Palette className="w-4 h-4 text-purple-400" /> : <Link className="w-4 h-4 text-blue-400" />}
            {promptConfig.title}
          </h3>
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer transition-all"><X className="w-4 h-4" /></button>
        </div>

        {promptConfig.type === "color" && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {COLOR_PRESETS.map((c) => (
                <button key={c} onClick={() => setPromptConfig((p) => ({ ...p, value: c }))}
                  className={`w-7 h-7 rounded-lg cursor-pointer border-2 transition-all hover:scale-110 ${promptConfig.value === c ? "border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <input type="color" value={promptConfig.value} onChange={(e) => setPromptConfig((p) => ({ ...p, value: e.target.value }))} className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent flex-shrink-0" />
              <div className="w-6 h-6 rounded-full border-2 border-white/20 flex-shrink-0" style={{ backgroundColor: promptConfig.value }} />
            </div>
          </div>
        )}

        <input
          type="text"
          value={promptConfig.value}
          onChange={(e) => setPromptConfig((p) => ({ ...p, value: e.target.value }))}
          placeholder={promptConfig.placeholder}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          autoFocus
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-purple-500/50 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-all mb-4"
        />

        <div className="flex gap-2">
          <button onClick={close} className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-neutral-400 hover:text-white text-sm cursor-pointer transition-all">Cancel</button>
          <button onClick={submit} className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm cursor-pointer transition-all hover:from-indigo-600 hover:to-purple-700">Apply</button>
        </div>
      </div>
    </div>
  );
}
