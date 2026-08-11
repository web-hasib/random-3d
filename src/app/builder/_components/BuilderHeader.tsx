"use client";

// ─────────────────────────────────────────────
// BuilderHeader.tsx — Sticky top navigation bar
// ─────────────────────────────────────────────

import { Layers, Globe, Server, Play, Eye, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuilder } from "./BuilderContext";

export default function BuilderHeader() {
  const { activeTab, setActiveTab, isPreviewMode, setIsPreviewMode, handleDeploy } = useBuilder();

  return (
    <header className="border-b border-white/[0.06] bg-black/70 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-semibold text-lg tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent flex items-center gap-2">
            NextGen WebOS{" "}
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Builder
            </span>
          </h1>
          <p className="text-[11px] text-neutral-400">Open-source site builder, DNS mapper & hosting engine</p>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="flex bg-neutral-900/60 p-1 rounded-xl border border-white/[0.06]">
        {(["editor", "domain", "hosting"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setIsPreviewMode(false); }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer capitalize",
              activeTab === tab ? "bg-white/10 text-white shadow-sm" : "text-neutral-400 hover:text-white"
            )}
          >
            {tab === "editor" && <Layers className="w-3.5 h-3.5" />}
            {tab === "domain" && <Globe className="w-3.5 h-3.5" />}
            {tab === "hosting" && <Server className="w-3.5 h-3.5" />}
            {tab === "editor" ? "Site Builder" : tab === "domain" ? "Domain Setup" : "Hosting Control"}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {activeTab === "editor" && (
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
          >
            {isPreviewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {isPreviewMode ? "Edit Mode" : "Preview Canvas"}
          </button>
        )}
        <button
          onClick={() => { setActiveTab("hosting"); handleDeploy(); }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold transition-all shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.98] cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Deploy Site
        </button>
      </div>
    </header>
  );
}
