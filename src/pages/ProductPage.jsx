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

  // 카테고리 categoryId 연결
  const categoryMap = {
    전체상품: undefined,
    입장권: 'ticket',
    패키지: 'package',
    Membership: 'membership',
  };

  // 카테고리 선택
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
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

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts({
        category: categoryMap[selectedCategory],
        page: currentPage,
        limit: 12,
        visitorType: selectedTargets[0],
        availableTimeType: selectedTime,
      });

      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
    };

    fetchProducts();
  }, [currentPage, selectedCategory, selectedTargets, selectedTime]);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <CategorySidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        selectedTargets={selectedTargets}
        onToggleTarget={handleToggleTarget}
        selectedTime={selectedTime}
        onSelectTime={handleSelectTime}
      />

      <div style={{ flex: 1 }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}