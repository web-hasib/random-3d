"use client";

// ─────────────────────────────────────────────
// sections/ReviewCarouselSection.tsx
// ─────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Building2, Plus, Trash2 } from "lucide-react";
import { Section } from "../types";
import { useBuilder } from "../BuilderContext";

interface Props {
  section: Section;
  isSelected: boolean;
  isPreview: boolean;
}

export default function ReviewCarouselSection({ section, isSelected, isPreview }: Props) {
  const { activeReviewIndices, handleReviewNav } = useBuilder();
  const reviews = section.reviews || [];
  const current = activeReviewIndices[section.id] || 0;
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance
  useEffect(() => {
    if (!autoPlay || reviews.length <= 1) return;
    const t = setInterval(() => handleReviewNav(section.id, reviews.length, "next"), 5000);
    return () => clearInterval(t);
  }, [autoPlay, reviews.length, section.id, handleReviewNav]);

  if (reviews.length === 0) {
    return (
      <div className="py-20 text-center text-neutral-500 text-sm">
        No reviews yet. Add reviews in the settings panel.
      </div>
    );
  }

  const review = reviews[current];

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/5 blur-3xl rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center mb-14 relative">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
          <Star className="w-3.5 h-3.5 fill-current" /> Trusted by Thousands
        </span>
        <h2
          className={`${section.titleSize} font-bold ${section.textColor} mb-3`}
          contentEditable={!isPreview && isSelected}
          suppressContentEditableWarning
          onBlur={(e) => {}}
        >
          {section.title}
        </h2>
        <p className={`${section.subtitleSize} ${section.textColor} opacity-60 max-w-xl mx-auto`}>
          {section.subtitle}
        </p>
      </div>

      {/* Main card */}
      <div
        className="max-w-3xl mx-auto relative"
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {/* Prev/next buttons */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={() => handleReviewNav(section.id, reviews.length, "prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleReviewNav(section.id, reviews.length, "next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Review card */}
        <div
          key={review.id}
          className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-2xl transition-all duration-500"
        >
          <Quote className="w-10 h-10 text-purple-400/30 mb-6" />

          {/* Stars */}
          <div className="flex gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 transition-all ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-neutral-700"}`}
              />
            ))}
          </div>

          {/* Quote text */}
          <p className="text-lg md:text-xl text-neutral-200 leading-relaxed mb-8 font-light italic">
            &ldquo;{review.text}&rdquo;
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
            <img
              src={review.avatarUrl}
              alt={review.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/30"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=7c3aed&color=fff`; }}
            />
            <div>
              <div className="font-semibold text-white text-base">{review.name}</div>
              <div className="text-sm text-neutral-400 flex items-center gap-1.5 mt-0.5">
                {review.role}
                <span className="text-neutral-600">·</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {review.company}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => {}}
                className={`rounded-full transition-all cursor-pointer ${i === current ? "w-6 h-2 bg-purple-500" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Side cards (desktop only, blurred) */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-8 opacity-30 pointer-events-none scale-90 origin-right">
        {reviews[(current - 1 + reviews.length) % reviews.length] && (
          <MiniCard review={reviews[(current - 1 + reviews.length) % reviews.length]} />
        )}
      </div>
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-8 opacity-30 pointer-events-none scale-90 origin-left">
        {reviews[(current + 1) % reviews.length] && (
          <MiniCard review={reviews[(current + 1) % reviews.length]} />
        )}
      </div>
    </section>
  );
}

function MiniCard({ review }: { review: Section["reviews"] extends (infer T)[] | undefined ? T : never }) {
  if (!review) return null;
  return (
    <div className="w-64 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 backdrop-blur-sm">
      <p className="text-xs text-neutral-400 line-clamp-3 italic mb-3">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center gap-2">
        <img src={review.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
        <div>
          <div className="text-xs font-medium text-white">{review.name}</div>
          <div className="text-[10px] text-neutral-500">{review.role}</div>
        </div>
      </div>
    </div>
  );
}
