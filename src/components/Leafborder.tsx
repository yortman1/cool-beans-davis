'use client';
import { useEffect, useState } from 'react';

interface LeafBorderProps {
  leafSize?: number;
  leafSpacing?: number;
  contentBounds?: {
    top: number;
    bottom?: number; // Optional - will auto-calculate if not provided
  };
}

export default function LeafBorder({ 
  leafSize = 40, 
  leafSpacing = 60,
  contentBounds = { top: 0 } // Default bounds, bottom will auto-calculate
}: LeafBorderProps) {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewportSize({ width, height });
      setIsMobile(width < 768); // Mobile breakpoint at 768px
    };

    const updateScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateDocumentHeight = () => {
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    updateViewport();
    updateScroll();
    updateDocumentHeight();

    window.addEventListener('resize', updateViewport);
    window.addEventListener('scroll', updateScroll);
    // Update document height on resize and scroll in case content changes
    window.addEventListener('resize', updateDocumentHeight);
    window.addEventListener('scroll', updateDocumentHeight);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateDocumentHeight);
      window.removeEventListener('scroll', updateDocumentHeight);
    };
  }, []);

  // Use provided bottom or auto-calculate from document height
  const effectiveBottom = contentBounds.bottom ?? documentHeight;

  // Apply mobile scaling to leaf size and spacing
  const responsiveLeafSize = isMobile ? leafSize * 0.6 : leafSize; // 40% smaller on mobile
  const responsiveLeafSpacing = isMobile ? leafSpacing * 0.7 : leafSpacing; // Tighter spacing on mobile

  // Fixed count for top/bottom borders
  const fixedHorizontalLeafCount = 20;
  
  // Calculate total width of the fixed leaf row and center it
  const totalLeafRowWidth = (fixedHorizontalLeafCount - 1) * responsiveLeafSpacing;
  const horizontalRowStartOffset = (viewportSize.width - totalLeafRowWidth) / 2;
  
  // Calculate number of leaves needed for vertical borders (generous amount for scrolling)
  const verticalLeafCount = Math.ceil((effectiveBottom - contentBounds.top + viewportSize.height * 2) / responsiveLeafSpacing) + 4;

  // Helper function to get random leaf properties
  const getRandomLeafProps = (baseIndex: number) => {
    // Use baseIndex as seed for consistent randomness per position
    const seed = baseIndex * 12345;
    const random1 = ((seed * 9301 + 49297) % 233280) / 233280;
    const random2 = (((seed + 1) * 9301 + 49297) % 233280) / 233280;
    const random3 = (((seed + 2) * 9301 + 49297) % 233280) / 233280;
    const random4 = (((seed + 3) * 9301 + 49297) % 233280) / 233280;
    const random5 = (((seed + 4) * 9301 + 49297) % 233280) / 233280;
    const random6 = (((seed + 5) * 9301 + 49297) % 233280) / 233280;
    const random7 = (((seed + 6) * 9301 + 49297) % 233280) / 233280;
    
    return {
      leafNumber: Math.floor(random1 * 6) + 1, // Random leaf 1-6
      angleJitter: (random2 - 0.5) * 60, // ±30 degrees
      sizeJitter: 0.9 + (random3 * 0.5), // 90% to 110% size
      positionJitter: (random4 - 0.5) * (responsiveLeafSpacing * 0.5), // Small position variation
      horizontalFlip: random5 > 0.5, // Random horizontal mirror
      animationDelay: random6 * 3, // 0-3 second delay for natural timing
      animationDuration: 3 + (random7 * 2) // 3-5 second duration variation
    };
  };

  // Generate leaf elements for top border (fixed 20 leaves, centered)
  const topLeaves = Array.from({ length: fixedHorizontalLeafCount }, (_, i) => {
    const leafProps = getRandomLeafProps(i + 1000); // Offset seed for top leaves
    const adjustedSize = responsiveLeafSize * leafProps.sizeJitter;
    
    return (
      <div
        key={`top-${i}`}
        className="fixed pointer-events-none"
        style={{
          left: horizontalRowStartOffset + (i * responsiveLeafSpacing) - adjustedSize / 2 + leafProps.positionJitter,
          top: contentBounds.top - adjustedSize / 2 - scrollY,
          width: adjustedSize,
          height: adjustedSize,
          backgroundImage: `url('/images/leaves/leaf_${leafProps.leafNumber}.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transform: `rotate(${leafProps.angleJitter}deg) scaleX(${leafProps.horizontalFlip ? -1 : 1})`,
          opacity: 1,
          filter: 'drop-shadow(4px 6px 12px rgb(0, 0, 0))',
          zIndex: 1100 // Higher than side borders to draw on top
        }}
      />
    );
  });

  // Generate leaf elements for bottom border (fixed 20 leaves, centered)
  const bottomLeaves = Array.from({ length: fixedHorizontalLeafCount }, (_, i) => {
    const leafProps = getRandomLeafProps(i + 2000); // Different seed offset for bottom leaves
    const adjustedSize = responsiveLeafSize * leafProps.sizeJitter;
    
    return (
      <div
        key={`bottom-${i}`}
        className="fixed pointer-events-none"
        style={{
          left: horizontalRowStartOffset + (i * responsiveLeafSpacing) - adjustedSize / 2 + leafProps.positionJitter,
          top: effectiveBottom - adjustedSize / 2 - scrollY,
          width: adjustedSize,
          height: adjustedSize,
          backgroundImage: `url('/images/leaves/leaf_${leafProps.leafNumber}.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transform: `rotate(${leafProps.angleJitter}deg) scaleX(${leafProps.horizontalFlip ? -1 : 1})`,
          opacity: 1,
          filter: 'drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.6))',
          zIndex: 10
        }}
      />
    );
  });

  // Generate leaf elements for left border (scroll with content, stick to left edge)
  const leftLeaves = Array.from({ length: verticalLeafCount }, (_, i) => {
    const leafY = contentBounds.top - viewportSize.height + (i * responsiveLeafSpacing);
    const leafProps = getRandomLeafProps(i + 3000); // Different seed offset for left leaves
    const adjustedSize = responsiveLeafSize * leafProps.sizeJitter;
    
    return (
      <div
        key={`left-${i}`}
        className="fixed pointer-events-none"
        style={{
          left: -adjustedSize / 2,
          top: leafY - scrollY + leafProps.positionJitter,
          width: adjustedSize,
          height: adjustedSize,
          backgroundImage: `url('/images/leaves/leaf_${leafProps.leafNumber}.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transform: `rotate(${leafProps.angleJitter}deg) scaleX(${leafProps.horizontalFlip ? -1 : 1})`,
          opacity: 1,
          filter: 'drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.6))',
          zIndex: 1000 - i // Higher up leaves have higher z-index
        }}
      />
    );
  });

  // Generate leaf elements for right border (scroll with content, stick to right edge)
  const rightLeaves = Array.from({ length: verticalLeafCount }, (_, i) => {
    const leafY = contentBounds.top - viewportSize.height + (i * responsiveLeafSpacing);
    const leafProps = getRandomLeafProps(i + 4000); // Different seed offset for right leaves
    const adjustedSize = responsiveLeafSize * leafProps.sizeJitter;
    
    return (
      <div
        key={`right-${i}`}
        className="fixed pointer-events-none"
        style={{
          right: -adjustedSize / 2,
          top: leafY - scrollY + leafProps.positionJitter,
          width: adjustedSize,
          height: adjustedSize,
          backgroundImage: `url('/images/leaves/leaf_${leafProps.leafNumber}.png')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transform: `rotate(${leafProps.angleJitter}deg) scaleX(${leafProps.horizontalFlip ? -1 : 1})`,
          opacity: 1,
          filter: 'drop-shadow(4px 6px 12px rgba(0, 0, 0, 0.6))',
          zIndex: 1000 - i // Higher up leaves have higher z-index
        }}
      />
    );
  });

  if (viewportSize.width === 0) return null; // Don't render until we have viewport size

  return (
    <>
      {/* Brick background - scrolls with content, covers full document height */}
      <div 
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: `${Math.max(viewportSize.height, documentHeight)}px`, // Cover full document height
          backgroundImage: "url('/images/brick.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: '800px 800px', // Explicit size in pixels
          backgroundPosition: 'center top', // Center horizontally, align to top
          zIndex: 1 // Below leaves
        }}
      />
      
      {/* All leaf borders - fixed positioning, centered to viewport */}
      {topLeaves}
      {bottomLeaves}
      {leftLeaves}
      {rightLeaves}
    </>
  );
}
