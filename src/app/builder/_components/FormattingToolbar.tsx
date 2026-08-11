"use client";

// ─────────────────────────────────────────────
// FormattingToolbar.tsx — Sticky WYSIWYG bar
// ─────────────────────────────────────────────

import {
  Type, Bold, Italic, Underline, Strikethrough,
  Code, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link as LinkIcon, Palette,
} from "lucide-react";
import { useBuilder } from "./BuilderContext";

export default function FormattingToolbar() {
  const { formatText, triggerLinkModal, triggerColorModal } = useBuilder();

  return (
    <div className="bg-neutral-900/90 border border-white/[0.08] p-2 rounded-2xl flex flex-wrap items-center gap-1.5 shadow-xl backdrop-blur-md sticky top-24 z-30">
      <div className="text-[10px] uppercase font-mono text-neutral-400 px-2 border-r border-white/10 mr-1 flex items-center gap-1">
        <Type className="w-3 h-3 text-purple-400" /> Format
      </div>

      <Btn title="Bold"        onClick={() => formatText("bold")}><Bold className="w-3.5 h-3.5" /></Btn>
      <Btn title="Italic"      onClick={() => formatText("italic")}><Italic className="w-3.5 h-3.5" /></Btn>
      <Btn title="Underline"   onClick={() => formatText("underline")}><Underline className="w-3.5 h-3.5" /></Btn>
      <Btn title="Strikethrough" onClick={() => formatText("strikeThrough")}><Strikethrough className="w-3.5 h-3.5" /></Btn>
      <Btn title="Code"        onClick={() => formatText("code")}><Code className="w-3.5 h-3.5" /></Btn>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <Btn title="Align Left"   onClick={() => formatText("justifyLeft")}><AlignLeft className="w-3.5 h-3.5" /></Btn>
      <Btn title="Align Center" onClick={() => formatText("justifyCenter")}><AlignCenter className="w-3.5 h-3.5" /></Btn>
      <Btn title="Align Right"  onClick={() => formatText("justifyRight")}><AlignRight className="w-3.5 h-3.5" /></Btn>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <Btn title="Bullet List"  onClick={() => formatText("insertUnorderedList")}><List className="w-3.5 h-3.5" /></Btn>
      <Btn title="Ordered List" onClick={() => formatText("insertOrderedList")}><ListOrdered className="w-3.5 h-3.5" /></Btn>

      <div className="w-px h-5 bg-white/10 mx-1" />

      <Btn title="Insert Link"  onClick={triggerLinkModal}><LinkIcon className="w-3.5 h-3.5" /></Btn>
      <Btn title="Text Color"   onClick={triggerColorModal} className="flex items-center gap-1">
        <Palette className="w-3.5 h-3.5" />
        <span className="text-[9px] font-mono text-purple-400">Color</span>
      </Btn>
    </div>
  );
}

// ─── Local toolbar button ─────────────────────
function Btn({
  children,
  onClick,
  title,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  title?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
