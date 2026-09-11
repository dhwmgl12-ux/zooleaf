import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { getExperiences } from '../api/experienceApi';
import {
  ExperiencePageWrapper,
  ExperienceMain,
  ExperienceTitle,
  ExperienceGrid,
  ExperienceCard,
  CardImageContainer,
  CardOverlayText,
  ReserveButton,
  StatusText,
} from './ExperiencePage.style';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getExperiences(controller.signal);
        setExperiences(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || '체험 프로그램을 불러오지 못했습니다.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchExperiences();

    return () => controller.abort();
  }, []);

  return (
    <ExperiencePageWrapper>
      <Breadcrumb items={[{ label: '홈', to: '/' }, { label: '프로그램' }]} />
      <ExperienceMain>
        <section aria-label="체험 프로그램 목록">
          <ExperienceTitle>체험 프로그램</ExperienceTitle>

          {loading ? (
            <StatusText>체험 프로그램을 불러오는 중입니다.</StatusText>
          ) : error ? (
            <StatusText role="alert" style={{ color: 'red' }}>
              {error}
            </StatusText>
          ) : experiences.length === 0 ? (
            <StatusText>등록된 체험 프로그램이 없습니다.</StatusText>
          ) : (
            <ExperienceGrid>
              {experiences.map((experience) => (
                <ExperienceCard key={experience.id}>
                  <CardImageContainer>
                    <img src={experience.imageUrl} alt={experience.name} />
                    <CardOverlayText>
                      <h2>{experience.name}</h2>
                      <strong>{experience.price.toLocaleString()}원</strong>
                    </CardOverlayText>
                  </CardImageContainer>
                  <ReserveButton as={Link} to={`/experience/${experience.id}`}>
                    예매하기
                  </ReserveButton>
                </ExperienceCard>
              ))}
            </ExperienceGrid>
          )}
        </section>
      </ExperienceMain>
    </ExperiencePageWrapper>
  );
}
