"use client";

import React from "react";

type CorkCardProps = {
  // Unique id for persistence or keys
  id: string;
  // Optional link target; when provided the card becomes a link
  href?: string;
  // Visible title at the top of the card
  title: string;
  // Paper color token; you can use tailwind tokens or custom hex
  paperColor: "green-50" | "yellow-50" | "blue-50" | "red-50";
  // Rule/grid style for the paper
  ruled?: "none" | "grid" | "college";
  // Font style for progressive urban community vibes
  fontStyle?: "handwritten" | "mono" | "serif";
  // PNG overlay for crinkle effect; transparent black texture
  crinkleOverlaySrc?: string;
  // Opacity of crinkle overlay (0-1)
  crinkleOpacity?: number;
  // Grain intensity for procedural texture (0-1)
  grainIntensity?: number;
  // Pin decorations at the top corners
  pinPlacement?: "none" | "left" | "right" | "both";
  // Optional children content inside the card
  children?: React.ReactNode;
  // Optional className to extend styles
  className?: string;
  // Optional page/URL to navigate to when clicked
  linkTo?: string;
};

function paperBg(color: CorkCardProps["paperColor"], ruled: CorkCardProps["ruled"]) {
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

function getFontClass(fontStyle: CorkCardProps["fontStyle"]) {
  switch (fontStyle) {
    case "handwritten":
      return "font-[family-name:var(--font-caveat)]";
    case "mono":
      return "font-[family-name:var(--font-jetbrains-mono)]";
    case "serif":
      return "font-[family-name:var(--font-crimson-text)]";
    default:
      return ""; // Use default font
  }
}

export default function CorkCard({
  id,
  href,
  title,
  paperColor,
  ruled = "none",
  fontStyle = "mono",
  crinkleOverlaySrc,
  crinkleOpacity = 0.45,
  grainIntensity = 0.2,
  pinPlacement = "both",
  children,
  className,
  linkTo,
}: CorkCardProps) {
  const fontClass = getFontClass(fontStyle);
  
  const content = (
    <div
      id={id}
      className={`relative rounded-md border border-black/5 ${fontClass} ${className ?? ""} ${linkTo ? 'cursor-pointer transition-shadow duration-200' : ''}`}
      style={{
        ...paperBg(paperColor, ruled),
        // procedural grain via SVG turbulence texture
        // adjust with --paper-grain-opacity (0..1)
        position: "relative",
        overflow: "visible", // Allow pins to render outside the card border
        filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))',
      }}
      onMouseEnter={(e) => {
        if (linkTo) {
          e.currentTarget.style.filter = 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))';
        }
      }}
      onMouseLeave={(e) => {
        if (linkTo) {
          e.currentTarget.style.filter = 'drop-shadow(0 6px 16px rgba(0,0,0,0.35))';
        }
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
              style={{ transform: "rotate(-4deg)" }}
            />
          )}
          {(pinPlacement === "both" || pinPlacement === "right") && (
            <img
              src="/images/corkboard/pin_2.png"
              alt="pin right"
              className="absolute -top-2 -right-2 w-10 h-10 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.45)]"
              style={{ transform: "rotate(5deg)" }}
            />
          )}
        </>
      )}

      {/* Title */}
      <div className="px-5 pt-6 pb-3">
        <h3 className={`text-xl font-semibold underline ${linkTo ? 'text-blue-800' : 'text-black/80'}`}>
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-5 pb-6 text-black/80">
        {children}
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

      {/* This might not be working!! Crinkle overlay (transparent PNG) */}
      {crinkleOverlaySrc && (
        <img
          aria-hidden
          src={crinkleOverlaySrc}
          alt="crinkle texture"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: "multiply", opacity: Math.max(0, Math.min(1, crinkleOpacity)) }}
        />
      )}
    </div>
  );

  // Handle click navigation
  const handleClick = () => {
    if (linkTo) {
      if (linkTo.startsWith('http') || linkTo.startsWith('https')) {
        // External URL
        window.open(linkTo, '_blank', 'noopener,noreferrer');
      } else {
        // Internal page navigation
        window.location.href = linkTo;
      }
    }
  };

  // If it's a traditional href link, wrap in anchor tag
  if (href) {
    return (
      <a href={href} className="block focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md">
        {content}
      </a>
    );
  }

  // If it has linkTo prop, make it clickable
  if (linkTo) {
    return (
      <div 
        onClick={handleClick} 
        className="block focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md"
      >
        {content}
      </div>
    );
  }

  // Default: no navigation
  return content;
}


