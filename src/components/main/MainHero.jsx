import { useEffect, useState } from "react";

import { MainHeroContainer, MainHeroInner, MainHeroTitle, MainHeroContent, MainHeroMoreLink } from "./MainHero.styles";
import zooleafLogo from '../../assets/images/zooleaf-logo-2.webp'
import heroDesktop from "../../assets/videos/zooleaf-banner-wide.mp4"
import heroMobile from "../../assets/videos/zooleaf-mobile-banner.mp4"
import {theme} from '../../styles/variables'

const MOBILE_QUERY = `(max-width: ${theme.layout.breakpoint.mobile})`;

export default function MainHero() {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(MOBILE_QUERY);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener(
      "change",
      handleChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange,
      );
    };
  }, []);

  const heroVideo = isMobile ? heroMobile : heroDesktop;

  return (
    <MainHeroContainer data-header-hero>
      <video
        key={heroVideo}
        className="hero-video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <MainHeroInner>
        <MainHeroContent className="main-hero__content">
          <MainHeroTitle>
            <div>
              <img src={zooleafLogo} alt="ZOOLEAF" />
              <span>에서</span>
            </div>
            <p>동물 친구들이 기다리고 있어요.</p>
          </MainHeroTitle>

          <MainHeroMoreLink to="/products">
            티켓 예매하러 가기
          </MainHeroMoreLink>
        </MainHeroContent>
      </MainHeroInner>
    </MainHeroContainer>
  );
}
