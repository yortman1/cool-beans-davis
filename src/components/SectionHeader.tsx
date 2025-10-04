"use client";

import React, { useEffect, useState } from "react";

type SectionHeaderProps = {
  // Unique id for persistence or keys
  id: string;
  // Header text (usually one word)
  text: string;
  // Paper color token; you can use tailwind tokens or custom hex
  paperColor: "green-50" | "yellow-50" | "blue-50" | "red-50";
  // Rule/grid style for the paper (no red edge for college)
  ruled?: "none" | "grid" | "college";
  // Pin style options
  pinStyle?: "plastic" | "metal" | "none";
  // Text size - standard Tailwind text sizes
  textSize?: "text-2xl" | "text-3xl" | "text-4xl" | "text-5xl";
  // Grain intensity for procedural texture (0-1)
  grainIntensity?: number;
  // Optional className to extend styles
  className?: string;
};

function paperBg(color: SectionHeaderProps["paperColor"], ruled: SectionHeaderProps["ruled"]) {
  const base = (() => {
    switch (color) {
      case "green-50":
        return "#ecfdf5"; // tailwind emerald-50 close enough
      case "yellow-50":
        return "#fffbeb"; // amber-50
      case "blue-50":
        return "#eff6ff"; // blue-50
      case "red-50":
        return "#fef2f2"; // red-50
    }
  })();

  // Compose layers using non-shorthand background properties to avoid React dev warnings
  let backgroundImage: string | undefined;
  let backgroundSize: string | undefined;
  let backgroundRepeat: string | undefined;
  let backgroundPosition: string | undefined;

  if (ruled === "grid") {
    backgroundImage = "linear-gradient(0deg, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)";
    backgroundSize = "24px 24px, 24px 24px";
    backgroundRepeat = "repeat, repeat";
    backgroundPosition = "top left, top left";
  } else if (ruled === "college") {
    // College ruled without the red margin line
    backgroundImage = "repeating-linear-gradient(0deg, rgba(0,0,255,0.10) 0, rgba(0,0,255,0.10) 1px, transparent 1px, transparent 24px)";
    backgroundSize = "auto";
    backgroundRepeat = "repeat";
    backgroundPosition = "top left";
  }

  const style: React.CSSProperties = { backgroundColor: base };
  if (backgroundImage) {
    style.backgroundImage = backgroundImage;
    style.backgroundSize = backgroundSize;
    style.backgroundRepeat = backgroundRepeat;
    style.backgroundPosition = backgroundPosition;
  }
  return style;
}

function getPinImages(pinStyle: SectionHeaderProps["pinStyle"]) {
  switch (pinStyle) {
    case "plastic":
      return {
        left: "/images/pins/pin_1_plastic.png",
        right: "/images/pins/pin_2_plastic.png"
      };
    case "metal":
      return {
        left: "/images/pins/pin_1_metal.png",
        right: "/images/pins/pin_2_metal.png"
      };
    default:
      return null;
  }
}

export default function SectionHeader({
  id,
  text,
  paperColor,
  ruled = "none",
  pinStyle = "plastic",
  textSize = "text-5xl",
  grainIntensity = 0.2,
  className,
}: SectionHeaderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile breakpoint at 768px
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  const pins = getPinImages(pinStyle);

  // Mobile text size mapping - one size smaller than desktop
  const getMobileTextSize = () => {
    switch (textSize) {
      case "text-5xl": return "text-3xl";
      case "text-4xl": return "text-2xl";
      case "text-3xl": return "text-1xl";
      case "text-2xl": return "text-xl";
      default: return "text-4xl";
    }
  };

  const actualTextSize = isMobile ? getMobileTextSize() : textSize;

  return (
    <div className={`flex justify-center ${className ?? ""}`}>
      {/* Header container - width based on content */}
      <div
        id={id}
        className="relative rounded-md shadow-[0_6px_16px_rgba(0,0,0,0.35)] border border-black/5 inline-block"
        style={{
          ...paperBg(paperColor, ruled),
          position: "relative",
          overflow: "visible", // Allow pins to render outside the header border
        }}
      >
        {/* Pins - centered vertically with text */}
        {pins && (
          <>
            {/* Left pin */}
            <img
              src={pins.left}
              alt="pin left"
              className="absolute top-1/2 -left-3 w-10 h-10 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]"
              style={{ 
                transform: "translateY(-50%) rotate(-4deg)",
                zIndex: 10
              }}
            />
            {/* Right pin */}
            <img
              src={pins.right}
              alt="pin right"
              className="absolute top-1/2 -right-3 w-10 h-10 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]"
              style={{ 
                transform: "translateY(-50%) rotate(5deg)",
                zIndex: 10
              }}
            />
          </>
        )}

        {/* Header Text */}
        <div className={`${isMobile ? 'px-6 py-3' : 'px-12 py-4'}`}>
          <h2 
            className={`${actualTextSize} text-black/80 font-[family-name:var(--font-magazine)] tracking-wide ${isMobile ? 'whitespace-normal text-center' : 'whitespace-nowrap'}`}
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
          >
            {text}
          </h2>
        </div>

        {/* Grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-md"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
              opacity: 0.2,
              mixBlendMode: "multiply",
            }}
        />
      </div>
    </div>
  );
}
