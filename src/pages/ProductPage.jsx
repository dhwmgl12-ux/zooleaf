import React, { useState, useEffect } from 'react';
import CategorySidebar from '../components/product/category_and_product/CategorySidebar';
import ProductCard from '../components/product/category_and_product/ProductCard';
import { getTickets } from '../api/productApi';

export default function ProductPage() {
  const [tickets, setTickets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체상품');
  const [selectedTargets, setSelectedTargets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      const data = await getTickets({
        category: selectedCategory,
        targets: selectedTargets,
      });
      setTickets(data);
      setLoading(false);
    };

    fetchTickets();
  }, [selectedCategory, selectedTargets]);

  // 1. 카테고리 클릭
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // 2. 관람 대상 체크박스
  const handleToggleTarget = (target) => {
    setSelectedTargets((prev) =>
      prev.includes(target)
        ? prev.filter((t) => t !== target)
        : [...prev, target]
    );
  };

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px', color: '#2C3E35' }}>
        입장권 & 패키지
      </h1>

      <div style={{ display: 'flex', gap: '30px' }}>
        <aside aria-label="상품 카테고리 및 필터">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedTargets={selectedTargets}
            onToggleTarget={handleToggleTarget}
          />
        </aside>

        <section style={{ flex: 1 }} aria-label="상품 목록">
          {loading ? (
            <p style={{ textAlign: 'center', padding: '50px', color: '#666666' }}>
              상품 정보를 불러오는 중입니다...
            </p>
          ) : (
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {tickets.map((ticket) => (
                <li key={ticket.id}>
                  <ProductCard product={ticket} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}