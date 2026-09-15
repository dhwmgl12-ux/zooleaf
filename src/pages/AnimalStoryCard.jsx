import { useState } from "react";
import { AnimalCard, AnimalImg, AnimalInfo, InfoRow, TmiBox } from "./AnimalStory.style";


export default function AnimalStoryCard({animal}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <AnimalCard>
      <AnimalImg
        src={animal.imageUrl}
        alt={animal.name}
        loading="lazy"
        decoding="async"
        $loaded={loaded}
        onLoad={() => setLoaded(true)}
        />
        <AnimalInfo>
          <h3>
            {animal.name} <span>({animal.species})</span>
          </h3>

          <InfoRow>
            <strong>특징:</strong>
            <span>{animal.description}</span>
          </InfoRow>

          <InfoRow>
            <strong>위치:</strong>
            <span>{animal.zone}</span>
          </InfoRow>

          <TmiBox>
            <span className="tmi-label">사육사가 전하는 동물 TMI</span>
            <p className="tmi-text">{animal.keeperTmi}</p>
          </TmiBox>
        </AnimalInfo>
    </AnimalCard>
  );
}