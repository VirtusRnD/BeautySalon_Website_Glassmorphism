import React, { useState, useEffect, useRef } from "react";

const CustomScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  const updateScrollData = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const heightRatio = windowHeight / documentHeight;
    const calculatedHeight = Math.max(heightRatio * windowHeight, 40);

    setThumbHeight(calculatedHeight);

    const maxScroll = documentHeight - windowHeight;
    const currentScroll = window.scrollY;

    if (maxScroll > 0) {
      setScrollProgress(currentScroll / maxScroll);
    }
  };

  useEffect(() => {
    updateScrollData();
    window.addEventListener("scroll", updateScrollData, { passive: true });
    window.addEventListener("resize", updateScrollData);

    return () => {
      window.removeEventListener("scroll", updateScrollData);
      window.removeEventListener("resize", updateScrollData);
    };
  }, []);

  const handlePointerDown = (e) => {
    // 👑 FIX 1: Prevent the default browser drag behavior
    e.preventDefault();

    setIsDragging(true);

    // 👑 FIX 2: Temporarily disable text selection across the entire website
    document.body.style.userSelect = "none";

    const startY = e.clientY;
    const startScrollY = window.scrollY;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const maxThumbY = windowHeight - thumbHeight;

    const handlePointerMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const scrollDelta = (deltaY / maxThumbY) * maxScroll;
      window.scrollTo(0, startScrollY + scrollDelta);
    };

    const handlePointerUp = () => {
      setIsDragging(false);

      // 👑 FIX 3: Re-enable text selection when you let go of the mouse
      document.body.style.userSelect = "";

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const maxThumbTranslate = window.innerHeight - thumbHeight;
  const thumbTranslateY = scrollProgress * maxThumbTranslate;

  return (
    <div
      ref={trackRef}
      className="fixed top-0 right-0 h-screen w-3 md:w-4 z-[9999] pointer-events-none"
    >
      <div
        onPointerDown={handlePointerDown}
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTranslateY}px)`,
        }}
        className={`absolute right-1 w-2 md:w-2.5 rounded-full pointer-events-auto cursor-grab active:cursor-grabbing transition-colors duration-300
        bg-ocean-light/40 backdrop-blur-md border border-white/30 shadow-[0_0_10px_rgba(0,0,0,0.1)]
        ${isDragging ? "bg-ocean-light/70 border-white/60" : "hover:bg-ocean-light/60"}
        `}
      />
    </div>
  );
};

export default CustomScrollbar;
