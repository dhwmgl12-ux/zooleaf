export default function CategorySidebar({
  selectedCategory,
  onSelectCategory,
  selectedTargets,
  onToggleTarget,
}) {
  const categories = ['전체상품', '입장권', '패키지'];
  const targets = ['가족', '커플', '어린이'];

  return (
    <aside aria-label="상품 카테고리 및 필터">
        {/* 카테고리 */}
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                onClick={() => onSelectCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 관람 */}
      <div>
        <h3>관람 대상</h3>
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
      </div>
    </aside>
  );
}