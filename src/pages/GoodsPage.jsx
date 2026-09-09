import { useEffect, useState } from 'react';
import GoodsCard from '../components/goods/GoodsCard';
import Pagination from '../components/product/Pagination';
import { getGoods } from '../api/goodsApi';

const GOODS_PER_PAGE = 9;
const GRID_COLUMNS = 3;
const GOODS_CATEGORIES = ['전체상품', '문구', '생활', '인형', '패션'];

function EmptyCell() {
  return <div aria-hidden="true" />;
}

export default function GoodsPage() {
  const [goods, setGoods] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    subCategory: '전체상품',
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectCategory = (subCategory) => {
    setFilters({ subCategory, page: 1 });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchGoods = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getGoods({
          subCategory: filters.subCategory,
          page: filters.page,
          limit: GOODS_PER_PAGE,
          signal: controller.signal,
        });

        setGoods(data?.goods ?? []);
        setTotalPages(data?.pagination?.totalPages ?? 1);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setGoods([]);
          setError(err.message || '굿즈 목록을 불러오지 못했습니다.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchGoods();

    return () => controller.abort();
  }, [filters]);

  return (
    <main>
      <section aria-label="굿즈 목록">
        <h1>Shop</h1>

        <nav aria-label="굿즈 카테고리">
          <ul>
            {GOODS_CATEGORIES.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  aria-pressed={filters.subCategory === category}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {loading ? (
          <p>불러오는 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : goods.length === 0 ? (
          <p>굿즈가 없습니다.</p>
        ) : (
          <div>
            {goods.map((item) => (
              <GoodsCard key={item.id} goods={item} />
            ))}
            {Array.from(
              {
                length: (GRID_COLUMNS - (goods.length % GRID_COLUMNS)) % GRID_COLUMNS,
              },
              (_, index) => <EmptyCell key={`empty-${index}`} />
            )}
          </div>
        )}

        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => {
            setFilters((prev) => ({ ...prev, page }));
          }}
        />
      </section>
    </main>
  );
}
