"use client";

import React, { useState, useEffect } from "react";

type ChefCardProps = {
  // Unique id for persistence or keys
  id: string;
  // YouTube channel URL
  href: string;
  // Channel/Brand name
  title: string;
  // Chef's actual name
  chefName: string;
  // Portrait image path
  portraitSrc: string;
  // Description of their cooking style
  description: string;
  // Optional array of recipe images for gallery
  recipeImages?: string[];
  // Grain intensity for procedural texture (0-1)
  grainIntensity?: number;
  // Optional className to extend styles
  className?: string;
};

export default function ChefCard({
  id,
  href,
  title,
  chefName,
  portraitSrc,
  description,
  recipeImages = [],
  grainIntensity = 0.2,
  className,
}: ChefCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  // Auto-advance slideshow every 3 seconds
  useEffect(() => {
    if (recipeImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % recipeImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [recipeImages.length]);

  const handleImageClick = () => {
    if (recipeImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % recipeImages.length);
    }
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`block focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-shadow duration-200 ${className ?? ""}`}
    >
      <div
        id={id}
        className="relative rounded-lg shadow-[0_6px_16px_rgba(0,0,0,0.35)] border border-black/5 bg-white overflow-hidden"
        style={{
          position: "relative",
        }}
      >
        {/* Main content container - responsive layout */}
        <div className="p-6">
          <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
            {/* Left section: Portrait, title, description */}
            <div className="flex-1 min-w-0">
              {/* Header with portrait and title info */}
              <div className="flex items-start gap-4 mb-4">
                {/* Portrait image - forced to 1:1 aspect ratio */}
                <div className="flex-shrink-0">
                  <img
                    src={portraitSrc}
                    alt={`${chefName} portrait`}
                    className="w-25 h-25 object-cover rounded-full border-2 border-black/10 shadow-md"
                  />
                </div>
                {/* Title and chef name */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-blue-800 mb-1 leading-tight font-[family-name:var(--font-jetbrains-mono)] underline">
                    {title}
                  </h3>
                  <p className="text-xl text-black/70 font-medium font-[family-name:var(--font-jetbrains-mono)]">
                    {chefName}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-black/80 text-base leading-relaxed font-[family-name:var(--font-jetbrains-mono)]">
                {description}
              </p>
            </div>

            {/* Recipe images gallery - desktop: right side, mobile: bottom */}
            {recipeImages.length > 0 && !isMobile && (
              <div className="flex-shrink-0 w-40">
                <div 
                  className="w-40 h-40 rounded-md overflow-hidden border border-black/10 cursor-pointer"
                  onClick={handleImageClick}
                >
                  <img
                    src={recipeImages[currentImageIndex]}
                    alt={`Recipe ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                {/* Gallery indicators */}
                {recipeImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-2">
                    {recipeImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-black/60' 
                            : 'bg-black/20 hover:bg-black/40'
                        }`}
                        aria-label={`View recipe image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recipe images gallery - mobile only: bottom */}
          {recipeImages.length > 0 && isMobile && (
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-xs">
                <div 
                  className="w-full aspect-square rounded-md overflow-hidden border border-black/10 cursor-pointer"
                  onClick={handleImageClick}
                >
                  <img
                    src={recipeImages[currentImageIndex]}
                    alt={`Recipe ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                {/* Gallery indicators */}
                {recipeImages.length > 1 && (
                  <div className="flex justify-center gap-2 mt-2">
                    {recipeImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-black/60' 
                            : 'bg-black/20 hover:bg-black/40'
                        }`}
                        aria-label={`View recipe image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            opacity: Math.max(0.1, Math.min(1, grainIntensity)),
            mixBlendMode: "multiply",
          }}
        />

      </div>
    </a>
  );
}
