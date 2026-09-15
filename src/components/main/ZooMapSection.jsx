import { useState } from 'react';

import zoneMapImage from '../../assets/images/zone-map.webp'
import zoneBirdImage from '../../assets/images/zone-bird.webp'
import zoneFarmImage from '../../assets/images/zone-farm.webp'
import zonePandaImage from '../../assets/images/zone-panda.webp'
import zoneReptileImage from '../../assets/images/zone-reptile.webp'
import zoneSafariImage from '../../assets/images/zone-safari.webp'
import MainSectionHeader from './MainSectionHeader'
import { MainSectionContainer, MainSectionMoreLink, } from './MainSection.styles.js'
import {
  DesktopMap,
  MapImage,
  MapHotspot,
  ZoneCard,
  AnimalList,
  MobilePopularAnimals,
} from "./ZooMapSection.styles";

export default function ZooMapSection({zones=[],}) {
  const ZONE_IMAGES = {
    safari: zoneSafariImage,
    panda: zonePandaImage,
    reptile: zoneReptileImage,
    bird: zoneBirdImage,
    farm: zoneFarmImage,
  };

  const ZONE_POSITIONS = {
    safari: { top: "5.3%", left: "2.8%", width: "43%", height: "48%" },
    panda: { top: "1.2%", left: "31.7%", width: "35%", height: "33%" },
    reptile: { top: "4.6%", left: "56.5%", width: "20%", height: "35%" },
    bird: { top: "6%", left: "71.5%", width: "28%", height: "39%" },
    farm: { top: "43%", left: "57.5%", width: "43%", height: "43%" },
  };

  const [activeZone, setActiveZone] = useState(null);

  const mobileAnimals = [];

  zones.forEach((zone) => {
    zone.popularAnimals?.forEach((animal) => {
      const isAlreadyIncluded = mobileAnimals.some(
        (item) => item.id === animal.id,
      );
    
      if (!isAlreadyIncluded) {
        mobileAnimals.push(animal);
      }
    });
  });
  
  const displayedMobileAnimals = mobileAnimals.slice(0, 8);

  return (
    <MainSectionContainer>
      <MainSectionHeader 
        title="ZOOLEAF 동물원 탐험하기"
        description="ZOOLEAF 곳곳에서 기다리고 있는 동물 친구들을 만나보세요."
      />

      <DesktopMap onMouseLeave={() => setActiveZone(null)} >
        <MapImage
          src={zoneMapImage}
          alt="ZOOLEAF 동물원 구역 안내 지도"
        />

        {zones.map((zone) => {
          const position = ZONE_POSITIONS[zone.id];
          const zoneImage = ZONE_IMAGES[zone.id];

          if (!position || !zoneImage) {
            return null;
          }
        
          return (
            <MapHotspot
              key={zone.id}
              type="button"
              $position={position}
              aria-label={`${zone.name} 인기 동물 보기`}
              onMouseEnter={() => setActiveZone(zone)}
              onFocus={() => setActiveZone(zone)}
              onBlur={() => setActiveZone(null)}
            >
              <img
                src={zoneImage}
                alt=""
              />
            </MapHotspot>
          );
        })}

        {activeZone && (
          <ZoneCard>
            <h3>{activeZone.name}<span>의 인기 스타들</span></h3>

            <AnimalList>
              {activeZone.popularAnimals?.map((animal) => (
                <li key={animal.id}>
                  <img src={animal.imageUrl} alt={animal.name} />
                  <span>{animal.name}</span>
                </li>
              ))}
            </AnimalList>
          </ZoneCard>
        )}
      </DesktopMap>

      <MobilePopularAnimals>
        <h3>ZOOLEAF<span>의 인기 스타들</span></h3>

        <AnimalList>
          {displayedMobileAnimals.map((animal) => (
            <li key={animal.id}>
              <img
                src={animal.imageUrl}
                alt=""
              />
              <span>{animal.name}</span>
            </li>
          ))}
        </AnimalList>
      </MobilePopularAnimals>

      <MainSectionMoreLink to="/animals">더 많은 동물 보러가기</MainSectionMoreLink>
    </MainSectionContainer>
  )
}
