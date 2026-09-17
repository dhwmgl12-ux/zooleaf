import { useState } from 'react';
import { AnimalCard, AnimalImg, AnimalInfo, InfoRow, TmiBox } from './AnimalStory.style';

function getThumbnailUrl(imageUrl, size = 240) {
  return `https://res.cloudinary.com/mn4cunbf/image/fetch/w_${size},h_${size},c_fill,f_webp,q_auto/${encodeURIComponent(imageUrl)}`;
}

export default function AnimalStoryCard({ animal, priority = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <AnimalCard>
      <AnimalImg
        src={getThumbnailUrl(animal.imageUrl)}
        alt={animal.name}
        width={200}
        height={200}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
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
