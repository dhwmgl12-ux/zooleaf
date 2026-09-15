import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getGoodsById } from "../api/goodsApi";
import DetailImage from "../components/detail/DetailImage";
import DetailContent from "../components/detail/DetailContent";
import DetailPrice from "../components/detail/DetailPrice";
import Breadcrumb from '../components/common/Breadcrumb';
import LoadingSpinner from "../components/common/LoadingSpinner"
import ErrorState from "../components/common/ErrorState"
import EmptyState from "../components/common/EmptyState"
import NotFoundPage from "./NotFoundPage";

import { DetailPageContainer } from "../components/detail/DetailPage.styles";

export default function GoodsDetailPage() {
  const { goodsId } = useParams();

  const [goods, setGoods] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchGoods = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getGoodsById(
          goodsId,
          controller.signal
        );

        setGoods(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchGoods();

    return () => {
      controller.abort();
    };
  }, [goodsId]);

  if (isLoading) {
      return <LoadingSpinner />;
    }
  
  const isNotFound =
    error?.status === 404 ||
    error?.code === "GOODS_NOT_FOUND";
  
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

  if (!goods) {
    return (
      <EmptyState 
        title="상품을 찾을 수 없습니다."
        description="요청하신 상품이 존재하지 않거나 삭제된 상품입니다."
        buttonText="상품 목록으로 돌아가기"
        onButtonClick={() => navigate("/goods")}
      />
    )
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: 'Shop', to: '/goods' },
          { label: goods.name },
        ]}
      />

      <DetailPageContainer>
        <div className="detail-image-area">
          <DetailImage 
            imageUrl={goods.imageUrl}
            images={goods.options ?? []}
            name={goods.name}
          />
        </div>
        <div className="detail-content-area">
          <DetailContent product={goods} /> 
        </div>
        <div className="detail-price-area">
          <DetailPrice product={goods} productType="goods" />
        </div>
      </DetailPageContainer>
    </>
  )
}
