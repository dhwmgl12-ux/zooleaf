import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { MainHeroContainer } from "./MainHero.styles";
import zooleafLogo from '../../assets/images/zooleaf-logo-2.webp'
import {theme} from '../../styles/variables'

export default function MainHero() {
  const [isMobile, setIsMobile] = useState(() => 
    window.matchMedia("(max-width: ${theme.layout.tablet})").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: ${theme.layout.tablet})");
    const hanleChange = (event) => setIsMobile(event.matches);

    media.addEventListener("change", hanleChange);
    return () => media.removeEventListener("change", hanleChange);
  }, []);

  const videoId = isMobile ? "Wsy--WXw7ZI" : "joy7jWQkBE4";

  return (
    <MainHeroContainer data-header-hero>
      {/* <iframe
        key={videoId}
        className="hero-video"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1`}
        title="ZOOLEAF 소개 영상"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        
      /> */}
      <div>
        <h2>
          <span><img src={zooleafLogo} alt="ZOOLEAF" /></span>에서
          <br />
          동물 친구들이 기다리고 있어요.
        </h2>

        <Link to="/products">
          티켓 예매하러 가기
        </Link>
      </div>
    </MainHeroContainer>
  );
}
