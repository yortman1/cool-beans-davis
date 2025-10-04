"use client";

import React from "react";

type NavButtonProps = {
  // Unique id for persistence or keys
  id: string;
  // Button text
  text: string;
  // Destination page/URL
  linkTo: string;
  // Optional className to extend styles
  className?: string;
};

export default function NavButton({
  id,
  text,
  linkTo,
  className,
}: NavButtonProps) {
  // Handle navigation
  const handleClick = () => {
    if (linkTo.startsWith('http') || linkTo.startsWith('https')) {
      // External URL
      window.open(linkTo, '_blank', 'noopener,noreferrer');
    } else {
      // Internal page navigation
      window.location.href = linkTo;
    }
  };

  return (
    <div className="flex justify-center w-full">
      <button
        id={id}
        onClick={handleClick}
        className={`relative rounded-md shadow-[0_6px_16px_rgba(0,0,0,0.35)] border border-black/5 cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-shadow duration-200 ${className ?? ""}`}
        style={{
          backgroundColor: "#fffff0", // ivory
          backgroundImage: "linear-gradient(0deg, rgba(46, 91, 216, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 92, 216, 0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px, 24px 24px",
          backgroundRepeat: "repeat, repeat",
          backgroundPosition: "top left, top left",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Button Text */}
        <div className="px-6 py-4">
          <span className="text-lg font-bold text-blue-800 font-[family-name:var(--font-jetbrains-mono)] tracking-wide">
            {text}
          </span>
        </div>

        {/* Grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-md"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            opacity: 0.15,
            mixBlendMode: "multiply",
          }}
        />
      </button>
    </div>
  );
}
