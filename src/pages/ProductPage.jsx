// src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import CategorySidebar from '../components/product/category_and_product/CategorySidebar';
import ProductCard from '../components/product/category_and_product/ProductCard';
import { getTickets } from '../api/productApi';

export default function ProductPage() {
  const [tickets, setTickets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
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

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px', color: '#2C3E35' }}>
        입장권 & 패키지
      </h1>

      <div style={{ display: 'flex', gap: '30px' }}>
        
        {/* 2.사이드바/필터 */}
        <aside aria-label="상품 카테고리 및 필터">
          <CategorySidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTargets={selectedTargets}
            setSelectedTargets={setSelectedTargets}
          />
        </aside>

        {/* 3.상품 목록 */}
        <section style={{ flex: 1 }} aria-label="상품 목록">
          {loading ? (
            <p style={{ textAlign: 'center', padding: '50px', color: '#666666' }}>
              상품 정보를 불러오는 중입니다...
            </p>
          ) : (
            /* 4.ul/li*/
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