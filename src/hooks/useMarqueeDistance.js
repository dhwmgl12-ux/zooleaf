import { useEffect, useState } from "react";

export default function useMarqueeDistance(containerRef, textRef) {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measureOverflow = () => {
      if (!containerRef.current || !textRef.current) return;
      const overflow = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setDistance(overflow > 0 ? overflow : 0);
    };

    const frame = requestAnimationFrame(measureOverflow); 
    window.addEventListener('resize', measureOverflow);
    
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', measureOverflow);
    };
  }, [containerRef, textRef]);
    
  return distance;
}
