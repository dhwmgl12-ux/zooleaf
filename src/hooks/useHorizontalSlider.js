import { useRef } from "react";

export default function useHorizontalSlider() {
  const sliderRef = useRef(null);

  const handleMove = (direction) => {
    const slider = sliderRef.current;
    const firstCard = slider?.querySelector("li");

    if (!slider || !firstCard) { return; }

    const sliderStyle = window.getComputedStyle(slider);
    const gap = Number.parseFloat(sliderStyle.columnGap) || 0;

    const moveDistance = firstCard.offsetWidth + gap;

    slider.scrollBy({
      left: direction * moveDistance,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => { handleMove(-1); };

  const handleNext = () => { handleMove(1); };

  return {
    sliderRef,
    handlePrevious,
    handleNext,
  };
}