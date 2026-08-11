import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glass" | "glow" | "simple";
  children: React.ReactNode;
}

export default function Button({ variant = "simple", children, className, ...props }: ButtonProps) {
  return (
    <button
      style={{
        padding: "12px 24px",
        borderRadius: "9999px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        transition: "all 0.3s ease"
      }}
      className={cn(
        "px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer",
        variant === "simple" && "text-neutral-300 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.01] backdrop-blur-md",
        variant === "glass" && "glass-card text-neutral-200 hover:text-white hover:bg-white/5",
        variant === "glow" && "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-lg shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
