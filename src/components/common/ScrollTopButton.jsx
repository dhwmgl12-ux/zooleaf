import { useEffect, useState } from "react"
import { TopButton } from "./ScrollTopButton.style";

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(() => window.scrollY > 400);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <TopButton type="button" $visible={isVisible} onClick={scrollToTop} aria-label="맨 위로 이동">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M10 15V5M10 5L5 10M10 5L15 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </TopButton>
  );
}
