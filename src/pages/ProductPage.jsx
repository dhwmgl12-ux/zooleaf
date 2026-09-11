import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategorySidebar from '../components/product/CategorySidebar';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/product/Pagination';
import { getProducts } from '../api/productApi';
import bannerImage from '../assets/images/banner.webp';
import { ProductPageContainer } from './ProductPage.styles';

const PRODUCTS_PER_PAGE = 12;
const GRID_COLUMNS = 3;
const CATEGORY_MAP = {
  전체상품: undefined,
  입장권: 'ticket',
  패키지: 'package',
  Membership: 'membership',
};
const TICKET_ORDER = [
  '대인 종일권',
  '소인 종일권',
  '우대 종일권',
  '대인 오후권',
  '소인 오후권',
  '우대 오후권',
];

function EmptyCell() {
  return <div aria-hidden="true" />;
}

function getTicketOrder(name = '') {
  const normalizedName = name.replace('ZOOLEAF ', '');
  const order = TICKET_ORDER.indexOf(normalizedName);
  return order === -1 ? TICKET_ORDER.length : order;
}

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: '전체상품',
    target: '전체',
    time: '전체',
    page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isTicketCategory = filters.category === '입장권';
  const displayedProducts = [...products].sort(
    (first, second) => getTicketOrder(first.name) - getTicketOrder(second.name),
  );

  const handleSelectCategory = (category) => {
    setFilters({
      category,
      target: '전체',
      time: '전체',
      page: 1,
    });
  };

  const handleSelectTarget = (target) => {
    setFilters((prev) => ({
      ...prev,
      target,
      page: 1,
    }));
  };

  const handleSelectTime = (time) => {
    setFilters((prev) => ({ ...prev, time, page: 1 }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getProducts({
          category: CATEGORY_MAP[filters.category],
          page: filters.page,
          limit: PRODUCTS_PER_PAGE,
          visitorType: isTicketCategory ? filters.target : undefined,
          availableTimeType: isTicketCategory ? filters.time : undefined,
        });

        setProducts(data?.products ?? []);
        setTotalPages(data?.pagination?.totalPages ?? 1);
      } catch (err) {
        setProducts([]);
        setError(err.message || '상품을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, isTicketCategory]);

  return (
    <ProductPageContainer>
      <Link
        to="/discount"
        aria-label="ZOOLEAF 제휴 및 할인 혜택 보기"
        className="product-page__banner"
      >
        <img src={bannerImage} alt="ZOOLEAF 할인 혜택을 확인해 보세요" />
      </Link>

      <div className="product-page__layout">
        <CategorySidebar
          selectedCategory={filters.category}
          onSelectCategory={handleSelectCategory}
          selectedTarget={filters.target}
          onSelectTarget={handleSelectTarget}
          selectedTime={filters.time}
          onSelectTime={handleSelectTime}
        />

        <section className="product-page__content" aria-label="상품 목록">
          <h1>
            {filters.category === '전체상품'
              ? '입장권 & 패키지'
              : filters.category}
          </h1>

          {loading ? (
            <p>불러오는 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : products.length === 0 ? (
            <p>상품이 없습니다.</p>
          ) : (
            <div className="product-page__grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {Array.from(
                {
                  length:
                    (GRID_COLUMNS - (products.length % GRID_COLUMNS)) %
                    GRID_COLUMNS,
                },
                (_, index) => (
                  <EmptyCell key={`empty-${index}`} />
                ),
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
      </div>
    </ProductPageContainer>
  );
}
