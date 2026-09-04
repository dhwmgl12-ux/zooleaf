import React, { useEffect, useState } from 'react';
import CategorySidebar from '../components/product/category_and_product/CategorySidebar';
import ProductCard from '../components/product/category_and_product/ProductCard';
import Pagination from '../components/product/category_and_product/Pagination';
import { getProducts } from '../api/productApi';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 카테고리
  const [selectedCategory, setSelectedCategory] = useState('전체상품');

  // 관람 대상
  const [selectedTargets, setSelectedTargets] = useState([]);

  // 이용 시간
  const [selectedTime, setSelectedTime] = useState('전체');

  // 화면에서 사용하는 카테고리명 → API에서 사용하는 값
  const categoryMap = {
    전체상품: undefined,
    입장권: 'ticket',
    패키지: 'package',
    Membership: 'membership',
  };

  // 입장권일 때만 관람 대상 / 이용 시간 필터 사용
  const isTicketCategory = selectedCategory === '입장권';

  // 카테고리 선택
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedTargets([]);
    setSelectedTime('전체');
    setCurrentPage(1);
  };

  // 관람 대상 선택
  const handleToggleTarget = (target) => {
    setSelectedTargets((prev) =>
      prev.includes(target)
        ? prev.filter((item) => item !== target)
        : [...prev, target]
    );

    setCurrentPage(1);
  };

  // 이용 시간 선택
  const handleSelectTime = (time) => {
    setSelectedTime(time);
    setCurrentPage(1);
  };

  // 상품 목록 API 호출
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts({
          category: categoryMap[selectedCategory],

          visitorType: isTicketCategory
            ? selectedTargets[0]
            : undefined,

          availableTimeType: isTicketCategory
            ? selectedTime
            : undefined,

          page: currentPage,
          limit: 9,
        });

        setProducts(data?.products ?? []);
        setTotalPages(data?.pagination?.totalPages ?? 1);
      } catch (error) {
        console.error('상품 목록을 불러오지 못했습니다.', error);

        setProducts([]);
        setTotalPages(1);
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
        {products.length > 0 ? (
          <div>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p>상품이 없습니다.</p>
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