import { useEffect, useState } from 'react';

import Breadcrumb from '../components/common/Breadcrumb';
import { getExperiences } from '../api/experienceApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import ExperienceCard from "../components/experience/ExperienceCard.jsx";

import {
  ExperiencePageWrapper,
  ExperienceTitle,
  ExperienceGrid,
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
      <section aria-label="체험 프로그램 목록">
        <ExperienceTitle>체험 프로그램</ExperienceTitle>
        {loading ? (
          <LoadingSpinner />
          ) : error ? (
            <ErrorState message={error} />
          ) : experiences.length === 0 ? (
            <EmptyState message="등록된 체험 프로그램이 없습니다." />
          ) : (
          <ExperienceGrid>
            {experiences.map((experience) => (
              <li key={experience.id}>
                <ExperienceCard experience={experience} />
              </li>
            ))}
          </ExperienceGrid>
        )}
      </section>
    </ExperiencePageWrapper>
  );
}
