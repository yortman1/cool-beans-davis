"use client";

import React from "react";
import Image from "next/image";

type PolaroidProps = {
  // Unique id for persistence or keys
  id: string;
  // Image source URL
  imageSrc: string;
  // Alt text for the image
  imageAlt?: string;
  // Optional caption text at the bottom
  caption?: string;
  // Rotation angle in degrees (-20 to 20 is realistic)
  rotation?: number;
  // Size of the polaroid (width/height since it's square)
  size?: number;
  // Vintage filter intensity (0-1)
  vintageIntensity?: number;
  // Optional className to extend styles
  className?: string;
  // Optional web link (e.g., Instagram source)
  linkTo?: string;
};

export default function Polaroid({
  id,
  imageSrc,
  imageAlt = "Polaroid photo",
  caption,
  rotation = 0,
  size = 200,
  vintageIntensity = 0.3,
  className,
  linkTo,
}: PolaroidProps) {
  // Calculate dimensions - polaroid has white border
  const borderWidth = size * 0.08; // 8% border
  const bottomBorderWidth = size * 0.2; // 20% bottom border (thicker)
  const imageSize = size - (borderWidth * 2);
  
  // Handle click navigation
  const handleClick = () => {
    if (linkTo) {
      window.open(linkTo, '_blank', 'noopener,noreferrer');
    }
  };

  const polaroidStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size + (bottomBorderWidth - borderWidth)}px`, // Extra height for thick bottom
    transform: `rotate(${rotation}deg)`,
    filter: 'drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.4))',
    cursor: linkTo ? 'pointer' : 'default',
    transition: linkTo ? 'filter 0.2s ease' : 'none',
  };

  const imageStyle: React.CSSProperties = {
    width: `${imageSize}px`,
    height: `${imageSize}px`,
    // Vintage filter effects
    filter: `
      sepia(${vintageIntensity * 0.3}) 
      contrast(${1 + vintageIntensity * 0.1}) 
      brightness(${1 + vintageIntensity * 0.05}) 
      saturate(${1 - vintageIntensity * 0.2})
      hue-rotate(${vintageIntensity * 10}deg)
    `,
  };

  return (
    <div
      id={id}
      className={`relative bg-white ${className ?? ""}`}
      style={polaroidStyle}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (linkTo) {
          e.currentTarget.style.filter = 'drop-shadow(6px 8px 16px rgba(0, 0, 0, 0.5))';
        }
      }}
      onMouseLeave={(e) => {
        if (linkTo) {
          e.currentTarget.style.filter = 'drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.4))';
        }
      }}
    >
      {/* White polaroid border */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          padding: `${borderWidth}px ${borderWidth}px ${bottomBorderWidth}px ${borderWidth}px`,
        }}
      >
        {/* Image container */}
        <div 
          className="relative w-full h-full overflow-hidden bg-gray-100"
          style={{ height: `${imageSize}px` }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageSize}
            height={imageSize}
            className="object-cover"
            style={imageStyle}
          />
          
          {/* Subtle paper grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        {/* Caption area */}
        {caption && (
          <div 
            className="flex items-center justify-center text-center text-black/70 text-xs font-handwriting"
            style={{ 
              height: `${bottomBorderWidth - borderWidth}px`,
              fontFamily: 'var(--font-caveat)',
              fontSize: `${size * 0.1}px`, // Scale font with polaroid size
              lineHeight: '1.2'
            }}
          >
            {caption}
          </div>
        )}
      </div>
      
      {/* Subtle aging effects */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-sm"
        style={{
          background: `linear-gradient(135deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0) 70%, 
            rgba(139,69,19,${vintageIntensity * 0.05}) 100%
          )`,
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  );
}
