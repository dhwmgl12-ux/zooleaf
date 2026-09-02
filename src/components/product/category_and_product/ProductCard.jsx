// src/components/product/category_and_product/ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  // 카드 클릭시 상세 페이지로
  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  // 어두운 배경색 유무
  const isDarkTheme = product.theme === '#2C3E35' || product.theme === '#121815';
  const isTicket = 'theme' in product || product.category === '입장권' || product.category === '패키지';

  // 다크 테마 글자 및 버튼 색상 대비
  const textColor = isDarkTheme ? '#FFFFFF' : '#2C3E35';
  const buttonBgColor = isDarkTheme ? '#FFFFFF' : '#2D6A4F';
  const buttonTextColor = isDarkTheme ? '#2C3E35' : '#FFFFFF';

  return (
    <article
      onClick={handleCardClick}
      style={{
        backgroundColor: product.theme || '#FFFFFF',
        color: textColor,
        borderRadius: '16px',
        padding: '24px 20px',
        border: isDarkTheme ? 'none' : '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        minHeight: '260px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      {/* 굿즈 BEST 배지 */}
      {product.badge && (
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#D90429',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 'bold',
            padding: '2px 8px',
            borderRadius: '12px',
          }}
        >
          {product.badge}
        </span>
      )}

      {/* 이미지가 있으면 이미지, 티켓이면 ZOOLEAF */}
      <div
        style={{
          height: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '10px',
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ maxHeight: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div
            style={{
              fontWeight: '900',
              fontSize: '22px',
              letterSpacing: '2px',
              opacity: 0.9,
            }}
          >
            ZOOLEAF
          </div>
        )}
      </div>

      {/* 상품 정보 */}
      <div style={{ width: '100%', margin: '16px 0 12px 0' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', wordBreak: 'keep-all' }}>
          {product.name}
        </h4>

        {/* 할인율이 있을시 취소선*/}
        {product.discountRate > 0 && (
          <div style={{ fontSize: '12px', color: isDarkTheme ? '#CCCCCC' : '#888888', textDecoration: 'line-through' }}>
            {product.originalPrice?.toLocaleString()}원
          </div>
        )}

        {/* final 가격 / 할인율 */}
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          {product.discountRate > 0 && (
            <span style={{ color: '#D90429', marginRight: '6px' }}>
              -{product.discountRate}%
            </span>
          )}
          {product.price ? `${product.price.toLocaleString()}원` : '0원'}
        </div>
      </div>

      {/*예매/상세 버튼 */}
      <button
        type="button"
        style={{
          width: '100%',
          padding: '10px 0',
          backgroundColor: buttonBgColor,
          color: buttonTextColor,
          border: 'none',
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        {isTicket ? '예매하기' : '자세히보기'}
      </button>
    </article>
  );
}