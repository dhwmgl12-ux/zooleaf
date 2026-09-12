import { useState } from "react";
import { DetailImageContainer, ThumbnailList, MainImageViewport, ImageTrack, SlideButton } from "./DetailImage.styles";

export default function DetailImage({
  imageUrl,
  name,
  images = [],
}) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      key: "main",
      label: "대표 이미지",
      imageUrl,
    },

    ...images.map((image, index) => ({
      key: image.id ?? image.value ?? `image-${index}`,

      label: image.label ?? image.value ?? `상품 이미지 ${index + 1}`,

      imageUrl: typeof image === "string" ? image : image.imageUrl,
    })),
  ].filter((image) => image.imageUrl);

  if (galleryImages.length === 0) {
    return <p>등록된 이미지가 없습니다.</p>;
  }

  const hasGallery = galleryImages.length > 1;
  const lastIndex = galleryImages.length - 1;

  const handlePrevious = () => {
    setCurrentIndex((current) => current === 0 ? lastIndex : current - 1,);
  }

  const handleNext = () => {
    setCurrentIndex((current) => current === lastIndex ? 0 : current + 1,)
  }

  return (
    <DetailImageContainer>
      <MainImageViewport className="main-image-area">
        <ImageTrack $currentIndex={currentIndex}>
          {galleryImages.map((image) => (
            <li key={image.key}>
              <img
                src={image.imageUrl}
                alt={`${name} ${image.label}`}
              />
            </li>
          ))}
        </ImageTrack>

        {hasGallery && (
          <>
            <SlideButton
              className="prev-btn"
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              aria-label="이전 이미지 보기"
              >
              <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 15L11 29" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SlideButton>

            <SlideButton
              className="next-btn"
              type="button"
              onClick={handleNext}
              disabled={currentIndex === lastIndex}
              aria-label="다음 이미지 보기"
            >
              <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 15L1 29" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SlideButton>
          </>
        )}
      </MainImageViewport>

      {hasGallery && (
        <ThumbnailList aria-label="상품 이미지 목록">
        {galleryImages.map((image, index) => {
          const isActive = currentIndex === index;

          return (
            <li key={image.key}>
              <button
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`${image.label} 보기`}
                aria-current={isActive ? "true" : undefined}
              >
                <img
                  src={image.imageUrl}
                  alt=""
                />
              </button>
            </li>
          );
        })}
      </ThumbnailList>
      )}
    </DetailImageContainer>
  );
}
