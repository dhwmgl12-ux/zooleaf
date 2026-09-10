import { useState } from 'react';
import { Sidebar } from './CategorySidebar.styles';

export default function CategorySidebar({
  selectedCategory,
  onSelectCategory,
  selectedTarget,
  onSelectTarget,
  selectedTime,
  onSelectTime,
}) {
  const categories = ['전체상품', '입장권', '패키지', 'Membership'];
  const targets = ['전체', '대인', '소인', '우대'];
  const times = ['전체', '종일', '오후'];
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (filterName) => {
    setOpenFilter((current) => (current === filterName ? null : filterName));
  };

  return (
    <Sidebar aria-label="상품 카테고리 및 필터">
      <nav aria-label="상품 카테고리">
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                onClick={() => onSelectCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="filter-options">
          <section className="filter-dropdown">
            <button
              type="button"
              onClick={() => toggleFilter('target')}
              aria-expanded={openFilter === 'target'}
            >
              관람 대상 <span className="filter-arrow" aria-hidden="true" />
            </button>

            {openFilter === 'target' && (
              <ul aria-label="관람 대상 선택">
              {targets.map((target) => (
                <li key={target}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTarget(target);
                      setOpenFilter(null);
                    }}
                    aria-pressed={selectedTarget === target}
                  >
                    {target}
                  </button>
                </li>
              ))}
            </ul>
            )}
          </section>

          <section className="filter-dropdown">
            <button
              type="button"
              onClick={() => toggleFilter('time')}
              aria-expanded={openFilter === 'time'}
            >
              이용 시간 <span className="filter-arrow" aria-hidden="true" />
            </button>

            {openFilter === 'time' && (
              <ul aria-label="이용 시간 선택">
              {times.map((time) => (
                <li key={time}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTime(time);
                      setOpenFilter(null);
                    }}
                    aria-pressed={selectedTime === time}
                  >
                    {time}
                  </button>
                </li>
              ))}
            </ul>
            )}
          </section>
      </div>
    </Sidebar>
  );
}
