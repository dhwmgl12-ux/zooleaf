import { useEffect, useState } from 'react';
import {
  MainHeroContainer,
  MainHeroTitle,
  MainHeroContent,
  MainHeroMoreLink,
} from './MainHero.styles';
import zooleafLogo from '../../assets/images/zooleaf-logo-2.webp';
import posterDesktop from '../../../public/assets/images/fallback.webp';
import posterMobile from '../../../public/assets/images/fallback-mobile.webp';
import { theme } from '../../styles/variables';

const HERO_VIDEO_DESKTOP_URL =
  'https://res.cloudinary.com/mn4cunbf/video/upload/v1789434545/zooleaf-banner-wide.mp4';
const HERO_VIDEO_MOBILE_URL =
  'https://res.cloudinary.com/mn4cunbf/video/upload/v1789434545/zooleaf-mobile-banner.mp4';

const MOBILE_QUERY = `(max-width: ${theme.layout.breakpoint.mobile})`;

export default function MainHero() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const heroVideo = isMobile ? HERO_VIDEO_MOBILE_URL : HERO_VIDEO_DESKTOP_URL;
  const poster = isMobile ? posterMobile : posterDesktop
  return (
    <MainHeroContainer data-header-hero>
      {hasVideoError ? (
        <img className='hero-video' src={poster} alt='' aria-hidden='true'/>
      ) : (
        <video
        key={heroVideo}
        className="hero-video"
        src={heroVideo}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onError={() => setHasVideoError(true)}
        />
      )}

        <MainHeroContent className="main-hero__content">
          <MainHeroTitle>
            <div>
              <img src={zooleafLogo} alt="ZOOLEAF" />
              <span>에서</span>
            </div>
            <p>동물 친구들이 기다리고 있어요.</p>
          </MainHeroTitle>

        <MainHeroMoreLink to="/products">티켓 예매하러 가기</MainHeroMoreLink>
      </MainHeroContent>
    </MainHeroContainer>
  );
}
