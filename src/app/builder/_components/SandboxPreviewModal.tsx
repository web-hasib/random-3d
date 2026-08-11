"use client";

// SandboxPreviewModal.tsx — Live preview iframe
import { X, ExternalLink, Globe } from "lucide-react";
import { useBuilder } from "./BuilderContext";

export default function SandboxPreviewModal() {
  const { isLivePreviewOpen, livePreviewUrl, setIsLivePreviewOpen } = useBuilder();
  if (!isLivePreviewOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col">
      <div className="bg-neutral-950/95 border-b border-white/[0.06] px-6 py-3 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Globe className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-mono text-neutral-300 truncate max-w-xs">{livePreviewUrl}</span>
        </div>
        <div className="flex gap-2">
          <a href={livePreviewUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/20 cursor-pointer transition-all">
            <ExternalLink className="w-3.5 h-3.5" /> Open
          </a>
          <button onClick={() => setIsLivePreviewOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white cursor-pointer transition-all"><X className="w-4 h-4" /></button>
        </div>
      </div>
      <iframe src={livePreviewUrl} className="flex-1 w-full bg-white" title="Live Preview" sandbox="allow-scripts allow-same-origin allow-forms" />
    </div>
  );
}
