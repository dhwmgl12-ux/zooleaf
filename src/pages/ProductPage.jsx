import React, { useState } from 'react';
import CategorySidebar from '../components/product/category_and_product/CategorySidebar';
import ProductCard from '../components/product/category_and_product/ProductCard';
import Pagination from '../components/product/category_and_product/Pagination';

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* <CategorySidebar /> */}

      <div style={{ flex: 1 }}>
        <ProductCard />

        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}