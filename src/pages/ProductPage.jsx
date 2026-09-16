import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategorySidebar from '../components/product/CategorySidebar';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../api/productApi';
import bannerImage from '../assets/images/banner.webp';
import mobileBannerImage from '../assets/images/banner-mobile.webp';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { ProductPageContainer, ProductPageLayout, ProductBanner } from './ProductPage.styles';
import Breadcrumb from '../components/common/Breadcrumb';

const PRODUCTS_PER_PAGE = 12;
const GRID_COLUMNS = 3;
const CATEGORY_MAP = {
  전체상품: undefined,
  입장권: 'ticket',
  패키지: 'package',
  Membership: 'membership',
};

function EmptyCell() {
  return <div aria-hidden="true" />;
}

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '전체상품',
    target: '전체',
    time: '전체',
    page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isTicketCategory = filters.category === '입장권';
  const displayedProducts = products;

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
    const controller = new AbortController();

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
          signal: controller.signal,
        });

        setProducts(data?.products ?? []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setProducts([]);
          setError(err.message || '상품을 불러오지 못했습니다.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [filters, isTicketCategory]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: 'Shop', to: '/goods' }
        ]}
      />

      <ProductPageContainer>
        <h2>
          {filters.category === '전체상품'
            ? '입장권 & 패키지'
            : filters.category}
        </h2>

        <ProductBanner
          to="/discount"
          aria-label="ZOOLEAF 제휴 및 할인 혜택 보기"
          className="product-page__banner"
        >
          <picture>
            <source media="(max-width: 375px)" srcSet={mobileBannerImage} />
            <img src={bannerImage} alt="ZOOLEAF 할인 혜택을 확인해 보세요" />
          </picture>
        </ProductBanner>

        <ProductPageLayout className="product-page__layout">
          <CategorySidebar
            selectedCategory={filters.category}
            onSelectCategory={handleSelectCategory}
            selectedTarget={filters.target}
            onSelectTarget={handleSelectTarget}
            selectedTime={filters.time}
            onSelectTime={handleSelectTime}
          />

          <div className="product-page__content" aria-label="상품 목록">

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorState
                title="상품을 불러올 수 없습니다."
                description={error}
                onButtonClick={() => window.location.reload()}
              />
            ) : displayedProducts.length === 0 ? (
              <EmptyState title="등록된 상품이 없습니다." />
            ) : (
              <div className="product-page__grid">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {Array.from(
                  {
                    length:
                      (GRID_COLUMNS - (displayedProducts.length % GRID_COLUMNS)) %
                      GRID_COLUMNS,
                  },
                  (_, index) => (
                    <EmptyCell key={`empty-${index}`} />
                  ),
                )}
              </div>
            )}
          </div>
        </ProductPageLayout>
      </ProductPageContainer>
    </>
  );
}
