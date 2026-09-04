export default function CategorySidebar({
  selectedCategory,
  onSelectCategory,
  selectedTargets,
  onToggleTarget,
  selectedTime,
  onSelectTime,
}) {
  const categories = ['전체상품', '입장권', '패키지', 'Membership'];
  const targets = ['대인', '소인', '우대'];
  const times = ['전체', '종일', '오후'];

  const isTicketCategory = selectedCategory === '입장권';

  return (
    <aside aria-label="상품 카테고리 및 필터">
      {/* 카테고리 */}
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

      {/* 입장권 전용 필터 */}
      {isTicketCategory && (
        <>
          {/* 관람 대상 */}
          <section aria-labelledby="target-filter-title">
            <h3 id="target-filter-title">관람 대상</h3>

            <ul>
              {targets.map((target) => (
                <li key={target}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedTargets.includes(target)}
                      onChange={() => onToggleTarget(target)}
                    />
                    <span>{target}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>

          {/* 이용 시간 */}
          <section aria-labelledby="time-filter-title">
            <h3 id="time-filter-title">이용 시간</h3>

            <ul>
              {times.map((time) => (
                <li key={time}>
                  <button
                    type="button"
                    onClick={() => onSelectTime(time)}
                    aria-pressed={selectedTime === time}
                  >
                    {time}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </aside>
  );
}