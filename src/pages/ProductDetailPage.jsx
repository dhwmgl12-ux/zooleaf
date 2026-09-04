import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import DetailImage from "../components/detail/DetailImage";
import DetailLayout from "../components/detail/DetailLayout";
import DetailPrice from "../components/detail/DetailPrice";

export default function ProductDetailPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState (null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProductById(
          productId,
          controller.signal
        );

        setProduct(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      controller.abort();
    };
  }, [productId]);

  if (isLoading) {
    return <p>상품 정보를 불러오는 중입니다.</p>;
  }

  if (error) {
    return (
      <div>
        <p>상품 정보를 불러오지 못했습니다.</p>
        <p>일시적인 오류가 발생했습니다.</p>
        <p>잠시 후 다시 시도해주세요.</p>
        <Link to={`/products/${productId}`} reloadDocument>다시 시도</Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <p>상품을 찾을 수 없습니다.</p>
        <p>요청하신 상품이 존재하지 않거나 삭제된 상품입니다.</p>
        <Link to="/products">상품 목록을 돌아가기</Link>
      </div>
    )
  }

  return (
    <>
      <div className="product-details">
        <DetailImage 
          imageUrl={product.thumbnailImage || product.imageUrl}
          name={product.name}
        />
        <DetailLayout product={product} />
      </div>
      <DetailPrice product={product} />
    </>
  )
}
