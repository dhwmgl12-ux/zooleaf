import React, { useEffect, useState } from 'react';
import CategorySidebar from '../components/product/CategorySidebar';
import ProductCard from '../components/product/ProductCard';
import Pagination from '../components/product/Pagination';
import { getProducts } from '../api/productApi';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState('전체상품');
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [selectedTime, setSelectedTime] = useState('전체');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categoryMap = {
    전체상품: undefined,
    입장권: 'ticket',
    패키지: 'package',
    Membership: 'membership',
  };

  const isTicketCategory = selectedCategory === '입장권';

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedTargets([]);
    setSelectedTime('전체');
    setCurrentPage(1);
  };

  const handleToggleTarget = (target) => {
    setSelectedTargets((prev) =>
      prev.includes(target)
        ? prev.filter((item) => item !== target)
        : [...prev, target]
    );

    setCurrentPage(1);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getProducts({
          category: categoryMap[selectedCategory],
          page: currentPage,
          limit: 12,
          visitorType: isTicketCategory
            ? selectedTargets[0]
            : undefined,
          availableTimeType: isTicketCategory
            ? selectedTime
            : undefined,
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
  }, [
    currentPage,
    selectedCategory,
    selectedTargets,
    selectedTime,
    isTicketCategory,
  ]);

  return (
    <main>
      <CategorySidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        selectedTargets={selectedTargets}
        onToggleTarget={handleToggleTarget}
        selectedTime={selectedTime}
        onSelectTime={handleSelectTime}
      />

      <section aria-label="상품 목록">
        <h1>
          {selectedCategory === '전체상품'
            ? '입장권 · 패키지'
            : selectedCategory}
        </h1>

        {loading ? (
          <p>불러오는 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <div>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </section>
    </main>
  );
}