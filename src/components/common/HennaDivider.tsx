import React from 'react';

export function HennaDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center my-8 text-peach-deep opacity-80 ${className}`}
      aria-hidden="true"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-peach-deep/60 to-transparent w-24 sm:w-36" />
      <svg
        className="w-10 h-6 mx-2 text-peach-deep fill-none stroke-current"
        viewBox="0 0 60 30"
        strokeWidth="1.5"
      >
        {/* Soft Henna Floret & Teardrop Geometry */}
        <path d="M30 5 C25 15, 20 20, 10 20 C20 20, 25 25, 30 25 C35 25, 40 20, 50 20 C40 20, 35 15, 30 5 Z" />
        <circle cx="30" cy="18" r="2" fill="currentColor" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" />
        <circle cx="42" cy="20" r="1.5" fill="currentColor" />
      </svg>
      <div className="h-px bg-gradient-to-r from-transparent via-peach-deep/60 to-transparent w-24 sm:w-36" />
    </div>
  );
}
