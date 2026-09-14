// src/components/experience/ExperienceCard.jsx
import { Link } from 'react-router-dom';
import {
  ExperienceCardContainer,
  CardImageContainer,
  CardOverlayText,
  ReserveButton,
} from './ExperienceCard.style'; // 또는 기존 스타일 파일 경로

export default function ExperienceCard({ experience }) {
  return (
    <ExperienceCardContainer>
      <CardImageContainer>
        <img src={experience.imageUrl} alt={experience.name} />
        <CardOverlayText>
          <h2>{experience.name}</h2>
          <strong>{experience.price.toLocaleString()}원</strong>
        </CardOverlayText>
      </CardImageContainer>
      <ReserveButton as={Link} to={`/experiences/${experience.id}`}>
        예매하기
      </ReserveButton>
    </ExperienceCardContainer>
  );
}
