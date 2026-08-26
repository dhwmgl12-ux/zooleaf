export default function ProductCard({ product }) {
  return (
    <article>
      {/* 추후 img,alt로 대체) */}
      <div>
        <span>상품 이미지 영역</span>
      </div>

      <div>
        <h4>{product?.name || "상품명"}</h4>
        <p>{product?.price ? `${product.price.toLocaleString()}원` : "0원"}</p>
        <button type="button">예매</button>
      </div>
    </article>
  );
}