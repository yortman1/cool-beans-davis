"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type InfoCardProps = {
  // Unique id for persistence or keys
  id: string;
  // Card title
  title: string;
  // Main text content (can be string or JSX)
  text: string;
  // Additional text that appears full-width below image/text section
  additionalText?: string;
  // Image/graph source (optional)
  imageSrc?: string;
  // Alt text for the image
  imageAlt?: string;
  // Image position (left or right)
  imagePosition?: "left" | "right";
  // Image width as proportion of total width (0-1, e.g., 0.4 = 40%)
  imageWidthRatio?: number;
  // Multiple sources for the card
  sources?: Array<{
    text: string;
    url?: string;
  }>;
  // Paper color token
  paperColor?: "green-50" | "yellow-50" | "blue-50" | "red-50";
  // Rule/grid style for the paper
  ruled?: "none" | "grid" | "college";
  // Grain intensity for procedural texture (0-1)
  grainIntensity?: number;
  // Pin decorations at the top corners
  pinPlacement?: "none" | "left" | "right" | "both";
  // Whether the card is expandable (collapsed by default)
  expandable?: boolean;
  // Optional className to extend styles
  className?: string;
};

function paperBg(color: InfoCardProps["paperColor"], ruled: InfoCardProps["ruled"]) {
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
      default:
        return "#ffffff"; // white default
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
    backgroundImage = "repeating-linear-gradient(0deg, rgba(0,0,255,0.10) 0, rgba(0,0,255,0.10) 1px, transparent 1px, transparent 24px), linear-gradient(90deg, rgba(255,0,0,0.15) 40px, transparent 40px)";
    backgroundSize = "auto, auto";
    backgroundRepeat = "repeat, no-repeat";
    backgroundPosition = "top left, top left";
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

export default function InfoCard({
  id,
  title,
  text,
  additionalText,
  imageSrc,
  imageAlt = "Information graphic",
  imagePosition = "right",
  imageWidthRatio = 0.4,
  sources,
  paperColor,
  ruled = "none",
  grainIntensity = 0.2,
  pinPlacement = "both",
  expandable = false,
  className,
}: InfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(!expandable); // Start collapsed if expandable
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

  // Handle source link click
  const handleSourceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Toggle expand/collapse
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Calculate image width based on ratio
  const imageWidthPercent = Math.max(0.2, Math.min(0.8, imageWidthRatio)) * 100;
  const imageWidthStyle = { width: `${imageWidthPercent}%` };

  return (
    <div className="flex justify-center w-full">
      <div
        id={id}
        className={`relative rounded-md shadow-[0_6px_16px_rgba(0,0,0,0.35)] border border-black/5 w-[90%] ${className ?? ""}`}
        style={{
          ...paperBg(paperColor, ruled),
          position: "relative",
          overflow: "visible", // Allow pins to render outside the card border
        }}
      >
      {/* Pins */}
      {pinPlacement !== "none" && (
        <>
          {(pinPlacement === "both" || pinPlacement === "left") && (
            <img
              src="/images/corkboard/pin_1.png"
              alt="pin left"
              className="absolute -top-2 -left-2 w-10 h-10 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]"
              style={{ transform: "rotate(-4deg)", zIndex: 10 }}
            />
          )}
          {(pinPlacement === "both" || pinPlacement === "right") && (
            <img
              src="/images/corkboard/pin_2.png"
              alt="pin right"
              className="absolute -top-2 -right-2 w-10 h-10 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]"
              style={{ transform: "rotate(5deg)", zIndex: 10 }}
            />
          )}
        </>
      )}

      {/* Title with optional expand button */}
      <div className="px-6 pt-6 pb-4 flex justify-between items-start">
        <h2 className="text-2xl font-bold text-black/90 underline font-[family-name:var(--font-jetbrains-mono)]">
          {title}
        </h2>
        {expandable && (
          <button
            onClick={toggleExpand}
            className="ml-4 flex-shrink-0 hover:scale-110 transition-transform duration-200"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <Image
              src="/images/expander.png"
              alt={isExpanded ? "Collapse" : "Expand"}
              width={32}
              height={32}
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        )}
      </div>

      {/* Main content area - only shown when expanded */}
      {isExpanded && (
        <>
          <div className={`px-6 pb-6 ${imageSrc ? `flex gap-6 ${
            isMobile 
              ? 'flex-col' 
              : imagePosition === "left" ? "flex-row" : "flex-row-reverse"
          }` : ''}`}>
            {/* Image section - only show if imageSrc provided */}
            {imageSrc && (
              <div className={`flex-shrink-0 relative z-10 ${isMobile ? 'w-full' : ''}`} style={isMobile ? {} : imageWidthStyle}>
                <div className="overflow-hidden border-6 border-white shadow-md">
                  <Image
                    src={imageSrc}
                    alt={imageAlt || "Information graphic"}
                    width={Math.round(400 * imageWidthRatio)}
                    height={Math.round(300 * imageWidthRatio)}
                    className="w-full h-auto object-contain bg-white"
                  />
                </div>
              </div>
            )}

            {/* Text section */}
            <div className="flex-1 min-w-0">
              <div className={`text-black/80 leading-relaxed font-[family-name:var(--font-jetbrains-mono)] ${isMobile ? 'text-sm' : 'text-m'} whitespace-pre-line`}>
                {text}
              </div>
            </div>
          </div>

          {/* Additional text section - full width below image/text */}
          {additionalText && (
            <div className="px-6 pb-6">
              <div className={`text-black/80 leading-relaxed font-[family-name:var(--font-jetbrains-mono)] ${isMobile ? 'text-sm' : 'text-m'} whitespace-pre-line`}>
                {additionalText}
              </div>
            </div>
          )}

          {/* Sources section at bottom */}
          {sources && sources.length > 0 && (
            <div className="px-6 pb-6">
              <div className="text-xs text-black/60 font-[family-name:var(--font-jetbrains-mono)]">
                <div className="font-semibold mb-2">References:</div>
                {sources.map((source, index) => (
                  <div key={index} className="mb-1 text-left">
                    {source.url ? (
                      <button
                        onClick={() => handleSourceClick(source.url!)}
                        className="text-blue-800 underline hover:text-blue-900 cursor-pointer text-left"
                      >
                        {source.text}
                      </button>
                    ) : (
                      <span className="text-left">{source.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: Math.max(0.1, Math.min(1, grainIntensity)),
          mixBlendMode: "multiply",
        }}
      />
      </div>
    </div>
  );
}
