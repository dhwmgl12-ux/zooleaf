import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences } from '../api/experienceApi';

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
    <main>
      <section aria-label="체험 프로그램 목록">
        <h1>체험 프로그램</h1>

        {loading ? (
          <p>체험 프로그램을 불러오는 중입니다.</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : experiences.length === 0 ? (
          <p>등록된 체험 프로그램이 없습니다.</p>
        ) : (
          <div>
            {experiences.map((experience) => (
              <article key={experience.id}>
                <img src={experience.imageUrl} alt={experience.name} />
                <h2>{experience.name}</h2>
                <strong>{experience.price.toLocaleString()}원</strong>
                <Link to={`/experience/${experience.id}`}>예매하기</Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
