import React from 'react';
import { zooIntroData } from '../constants/IntroData';
import {
  PageContainer,
  HeroSection,
  ContentSection,
  InfoBlock,
} from './Intro.style';
import MapImage from '../assets/images/Directions-map.webp';
import BusImage from '../assets/images/directions.png';

export function IntroPage() {
  const subtitleText = zooIntroData.hero.subtitle;
  const parts = subtitleText.split('동물이 ');
  return (
    <PageContainer>
      <HeroSection>
        <div className="hero-content">
          <p className="sub-title">
            {parts[0]}동물이
            <br className="small-mobile-br" />
            {parts[1]}
          </p>
          <h2>{zooIntroData.hero.title}</h2>
        </div>
      </HeroSection>

      <ContentSection>
        {zooIntroData.sections.map((section, idx) => (
          <InfoBlock key={idx}>
            <h2>{section.title}</h2>
            {section.content ? (
              <p>{section.content}</p>
            ) : (
              <ul>
                {section.items.map((item, i) => (
                  <li key={i}>
                    <strong>{item.strong}</strong> {item.text}
                  </li>
                ))}
              </ul>
            )}
          </InfoBlock>
        ))}

        {/* 오시는 길 영역 */}
        <InfoBlock className="map-block">
          <h2>{zooIntroData.transport.title}</h2>
          <div className="transport-info">
            {zooIntroData.transport.items.map((t, idx) => (
              <div className="transport-item" key={idx}>
                <strong>{t.category}</strong>
                <p>{t.desc}</p>
              </div>
            ))}
            <p className="address">{zooIntroData.transport.address}</p>
          </div>
          <div className="map-wrap">
            <img src={BusImage} alt="오시는길 버스등" className="bus-img" />
            <img src={MapImage} alt="오시는 길 약도" className="map-img" />
          </div>
        </InfoBlock>
      </ContentSection>
    </PageContainer>
  );
}
export default IntroPage;
