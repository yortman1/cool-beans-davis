'use client';
import { ReactNode, useEffect, useState } from 'react';

interface CorkboardProps {
  children: ReactNode;
  className?: string;
  frameWidth?: number; // Width of the wood frame in pixels
  fixedWidth?: number; // Optional fixed width in pixels
  fixedHeight?: number; // Optional fixed height in pixels
}

export default function Corkboard({ 
  children, 
  className = '', 
  frameWidth = 20,
  fixedWidth,
  fixedHeight
}: CorkboardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark as client-side rendered
    
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
  const containerStyle: React.CSSProperties = {
    // External shadow cast onto the background
    filter: 'drop-shadow(8px 12px 24px rgba(0, 0, 0, 0.4)) drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.2))',
  };

  // Add fixed dimensions if specified, otherwise use responsive widths
  if (fixedWidth) {
    containerStyle.width = `${fixedWidth}px`;
  } else {
    // Apply responsive width directly in style to ensure it works
    containerStyle.width = isMobile ? '95vw' : '95vw';
    containerStyle.maxWidth = isMobile ? 'none' : '896px'; // 896px = max-w-4xl (56rem)
    containerStyle.minWidth = '320px';
  }
  
  if (fixedHeight) containerStyle.height = `${fixedHeight}px`;

  // Don't render until we know if we're mobile or not (prevents flash)
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Debug indicator - remove after testing */}
      <div className="fixed top-2 right-2 z-[9999] bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
        {isMobile ? '📱 MOBILE' : '🖥️ DESKTOP'}
      </div>
      
      <div 
        className={`relative ${className}`}
        style={containerStyle}
      >
      {/* Wood frame borders - simpler approach */}
      
      {/* Top border */}
      <div 
        className="absolute top-0 left-0 right-0"
        style={{
          height: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/wood.png')",
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
        }}
      />
      
      {/* Bottom border */}
      <div 
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/wood.png')",
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
        }}
      />
      
      {/* Left border */}
      <div 
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: `${frameWidth}px`,
          marginTop: `${frameWidth}px`,
          marginBottom: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/wood_vertical.png')",
          backgroundRepeat: 'repeat-y',
          backgroundSize: `${frameWidth}px auto`,
        }}
      />
      
      {/* Right border */}
      <div 
        className="absolute right-0 top-0 bottom-0"
        style={{
          width: `${frameWidth}px`,
          marginTop: `${frameWidth}px`,
          marginBottom: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/wood_vertical.png')",
          backgroundRepeat: 'repeat-y',
          backgroundSize: `${frameWidth}px auto`,
        }}
      />
      
      {/* Corner pieces to cover the overlaps */}
      {/* Top-left corner */}
      <div 
        className="absolute top-0 left-0"
        style={{
          width: `${frameWidth}px`,
          height: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/wood.png')",
          backgroundSize: 'cover',
        }}
      />
      
      {/* Top-right corner */}
      <div 
        className="absolute top-0 right-0"
        style={{
          width: `${frameWidth}px`,
          height: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/wood.png')",
          backgroundSize: 'cover',
        }}
      />
      
      {/* Bottom-left corner */}
      <div 
        className="absolute bottom-0 left-0"
        style={{
          width: `${frameWidth}px`,
          height: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/wood.png')",
          backgroundSize: 'cover',
        }}
      />
      
      {/* Bottom-right corner */}
      <div 
        className="absolute bottom-0 right-0"
        style={{
          width: `${frameWidth}px`,
          height: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/wood.png')",
          backgroundSize: 'cover',
        }}
      />
      
      {/* Cork texture background with inset shadow for depth */}
      <div 
        className="absolute"
        style={{
          top: `${frameWidth}px`,
          left: `${frameWidth}px`,
          right: `${frameWidth}px`,
          bottom: `${frameWidth}px`,
          backgroundImage: "url('/images/corkboard/cork.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px', // Smaller cork texture to better match wood scale
          boxShadow: `inset 0 0 ${frameWidth}px rgba(0, 0, 0, 0.5), inset 0 0 ${frameWidth * 1.5}px rgba(0, 0, 0, 0.2)`,
        }}
      />
      
      {/* Content area with padding to avoid frame overlap */}
      <div 
        className="relative z-10"
        style={{
          padding: `${frameWidth * 1.2}px`, // Slightly more padding for the inset cork area
        }}
      >
        {children}
      </div>
    </div>
    </>
  );
}
