import { useEffect, useState } from "react";

export default function useMarqueeDistance(containerRef, textRef) {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!containerRef.current || !textRef.current) return;
      const overflow = textRef.current.scrollWidth - containerRef.current.clientWidth;
      setDistance(overflow > 0 ? overflow : 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [containerRef, textRef]);
    
  return distance;
}
