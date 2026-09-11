import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getProductById } from "../api/productApi"
import DetailImage from "../components/detail/DetailImage";
import DetailContent from "../components/detail/DetailContent";
import DetailPrice from "../components/detail/DetailPrice";
import Breadcrumb from "../components/common/Breadcrumb";
import { DetailPageContainer } from "./DetailPage.styles";
import LoadingSpinner from "../components/common/LoadingSpinner"
import ErrorState from "../components/common/ErrorState"
import EmptyState from "../components/common/EmptyState"
import NotFoundPage from "./NotFoundPage";

export default function ProductDetailPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState (null);

  const navigate = useNavigate();

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
    return <LoadingSpinner />;
  }

  const isNotFound =
    error?.status === 404 ||
    error?.code === "PRODUCT_NOT_FOUND";
  
  if (isNotFound) {
    return <NotFoundPage />;
  }

  if (error) {
    return (
      <ErrorState 
        title="상품 정보를 불러오지 못했습니다."
        description="잠시 후 다시 시도해주세요."
        buttonText="다시 시도"
        onButtonClick={() => window.location.reload()}
      />
    )
  }

  if (!product) {
    return (
      <EmptyState 
        title="상품을 찾을 수 없습니다."
        description="요청하신 상품이 존재하지 않거나 삭제된 상품입니다."
        buttonText="상품 목록으로 돌아가기"
        onButtonClick={() => navigate("/products")}
      />
    )
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: '입장권 & 패키지', to: '/products' },
          { label: product.name },
        ]}
      />

      <DetailPageContainer>
        <div className="detail-image-area">
          <DetailImage 
            imageUrl={product.imageUrl ?? product.thumbnailImage}
            name={product.name}
          />
        </div>
        <div className="detail-content-area">
          <DetailContent product={product} /> 
        </div>
        <div className="detail-price-area">
          <DetailPrice product={product} productType="product" />
        </div>
      </DetailPageContainer>
    </>
  )
}
