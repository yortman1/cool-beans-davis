"use client";

import React from "react";
import Image from "next/image";

type StickerProps = {
  // Unique id for persistence or keys
  id: string;
  // URL/path to the sticker image
  stickerSrc: string;
  // Alt text for accessibility
  alt?: string;
  // Width of the sticker in pixels
  width: number;
  // Rotation angle in degrees
  angle: number;
  // X offset from anchor point (positive = right, negative = left)
  xOffset: number;
  // Y offset from anchor point (positive = down, negative = up)
  yOffset: number;
  // Whether to show the anchor point (for debugging/positioning)
  showAnchor?: boolean;
  // Whether to hide on mobile (< 768px)
  hideOnMobile?: boolean;
  // Optional className to extend styles
  className?: string;
};

export default function Sticker({
  id,
  stickerSrc,
  alt = "Sticker",
  width,
  angle,
  xOffset,
  yOffset,
  showAnchor = false,
  hideOnMobile = false,
  className,
}: StickerProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
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

  // Hide on mobile if hideOnMobile is true
  if (hideOnMobile && isMobile) {
    return null;
  }

  // Calculate height to maintain aspect ratio (assuming square stickers for now)
  const height = width;

  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      {/* Anchor point (optional visual indicator) */}
      {showAnchor && (
        <div
          className="absolute w-2 h-2 bg-red-500 rounded-full border border-white z-50"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      
      {/* Sticker */}
      <div
        id={id}
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`,
          zIndex: 30,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <Image
          src={stickerSrc}
          alt={alt}
          width={width}
          height={height}
          className="drop-shadow-md w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3))',
          }}
          onError={(e) => {
            console.error('Sticker image failed to load:', stickerSrc, e);
          }}
          onLoad={() => {
            console.log('Sticker image loaded successfully:', stickerSrc);
          }}
        />
      </div>
    </div>
  );
}
