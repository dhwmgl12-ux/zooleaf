import { useState } from "react";
import { DetailImageContainer, ThumbNailContainer } from "./DetailImage.styles";

export default function DetailImage({
  imageUrl,
  name,
  options,
}) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const optionImages = Array.isArray(options) ? options.filter((option) => option.imageUrl) : [];

  const galleryImages = [
    {
      key: "main",
      label: "대표 이미지",
      imageUrl,
    },

    ...optionImages.map((option) => ({
      key: option.value,
      label: option.value,
      imageUrl: option.imageUrl,
    })),
  ].filter((image) => image.imageUrl)

   if (!galleryImages.length === 0) {
    return <p>등록된 이미지가 없습니다.</p>;
  }

  const hasGallery = galleryImages.length > 1;
  const lastIndex = galleryImages.length - 1;

  const handlePrevious = () => {
    setCurrentIndex((current) => Math.max(0, current - 1),);
  }

  const handleNext = () => {
    setCurrentIndex((current) => Math.max(lastIndex, current + 1))
  }

  return (
    <DetailImageContainer>
      <ThumbNailContainer>
        <ul>
          {galleryImages.map((image) => (
            <li key={image.key}>
              <img
                src={image.imageUrl}
                alt={`${name} ${image.label}`}
              />
            </li>
          ))}
        </ul>

        {hasGallery && (
          <>
            <button type="button" onClick={handlePrevious} disabled={currentIndex === 0} aria-label="이전 이미지 보기">
              <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 15L11 29" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button type="button" onClick={handleNext} disabled={currentIndex === lastIndex} aria-label="다음 이미지 보기">
              <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 15L1 29" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </ThumbNailContainer>

      {hasGallery && (
        <ul>
          {galleryImages.map((image, index) => {
            const isActive = currentIndex === index;

            return (
              <li>
                <button type="button" onClick={() => setCurrentIndex(index)} aria-label={`${image.label} 보기`} aria-current={isActive ? "true" : undefined}>
                  <img
                    src={image.imageUrl}
                    alt={`${name} ${image.label}`}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </DetailImageContainer>
  );
}
