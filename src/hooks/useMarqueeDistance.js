import { useEffect, useState } from "react";

export default function useMarqueeDistance(containerRef, textRef) {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !textRef.current) return;
      const overflow = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setDistance(overflow > 0 ? overflow : 0);
    };

    const frame = requestAnimationFrame(measure); 
    window.addEventListener('resize', measure);
    
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
    };
  }, [containerRef, textRef]);
    
  return distance;
}
