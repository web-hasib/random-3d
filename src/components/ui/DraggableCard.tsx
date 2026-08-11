"use client";

import React, { useState, useRef } from "react";
import { cn } from "../../utils/cn";
import { Move } from "lucide-react";

interface DraggableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  initialX?: number;
  initialY?: number;
}

export default function DraggableCard({
  children,
  className,
  title = "Draggable Node",
  initialX = 40,
  initialY = 40,
  ...props
}: DraggableCardProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".drag-handle")) return;

    setIsDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    if (dragRef.current) {
      dragRef.current.setPointerCapture(e.pointerId);
    }
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    if (dragRef.current) {
      dragRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      ref={dragRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        touchAction: "none",
      }}
      className={cn(
        "absolute z-30 glass-card rounded-xl border border-white/10 w-72 md:w-80 shadow-2xl transition-shadow duration-300",
        isDragging ? "shadow-purple-500/20 cursor-grabbing border-purple-500/30" : "cursor-grab",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="drag-handle flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/5 select-none rounded-t-xl">
        <span className="font-mono text-[10px] tracking-widest text-neutral-400 font-bold uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
          {title}
        </span>
        <Move className="w-3.5 h-3.5 text-neutral-500" />
      </div>

      <div className="p-5 space-y-4">
        {children}
      </div>
    </div>
  );
}
