import { data, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getExperienceById } from "../api/experienceApi";
import DetailImage from "../components/detail/DetailImage";
import DetailContent from "../components/detail/DetailContent";
import DetailPrice from "../components/detail/DetailPrice";
import Breadcrumb from '../components/common/Breadcrumb';
import LoadingSpinner from "../components/common/LoadingSpinner"
import ErrorState from "../components/common/ErrorState"
import EmptyState from "../components/common/EmptyState"
import NotFoundPage from "./NotFoundPage";

import {
  DetailPageContainer,
} from "./DetailPage.styles";

export default function ExperienceDetailPage() {
  const { experienceId } = useParams();

  const [experience, setExperience] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchExperience = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getExperienceById(
          experienceId,
          controller.signal
        );

        setExperience(data);
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

    setExperience(data);
    fetchExperience();

    return () => {
      controller.abort();
    };
  }, [experienceId]);

  if (isLoading) {
      return <LoadingSpinner />;
    }
  
  const isNotFound =
    error?.status === 404 ||
    error?.code === "EXPERIENCE_NOT_FOUND";
  
  if (isNotFound) {
    return <NotFoundPage />;
  }

  if (error) {
    return (
      <ErrorState 
        title="프로그램을 정보를 불러오지 못했습니다."
        description="잠시 후 다시 시도해주세요."
        buttonText="다시 시도"
        onButtonClick={() => window.location.reload()}
      />
    )
  }

  if (!experience) {
    return (
      <EmptyState 
        title="프로그램을 찾을 수 없습니다."
        description="요청하신 상품이 존재하지 않거나 삭제된 상품입니다."
        buttonText="프로그램 목록으로 돌아가기"
        onButtonClick={() => navigate("/experiences")}
      />
    )
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: '프로그램', to: '/experiences' },
          { label: experience.name },
        ]}
      />

      <DetailPageContainer>
        <div className="detail-image-area">
          <DetailImage 
            imageUrl={experience.imageUrl ?? experience.thumbnailImage}
            name={experience.name}
          />
        </div>
        <div className="detail-content-area">
          <DetailContent product={experience} /> 
        </div>
        <div className="detail-price-area">
          <DetailPrice product={experience} productType="experience" />
        </div>
      </DetailPageContainer>
    </>
  )
}
