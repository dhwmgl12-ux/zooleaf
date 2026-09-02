import { useState } from "react"

export default function ProductGallery({
  thumbnailImage,
  imageUrl,
  thumbnails = [],
  options = [],
  name,
}) {
  const galleryImages = [
    thumbnailImage || imageUrl,
    ...thumbnails,
    ...options.map((option) => option.imageUrl),
  ].filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1 
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  }

  if (!galleryImages || galleryImages.length === 0) {
    return <p>등록된 상품 이미지가 없습니다.</p>;
  }

  const getImageAlt = (index) => {
    if (index === 0) {
      return `${name} - 대표 이미지`;
    }

    const optionIndex = index - thumbnails.length - 1;
    const option = options[optionIndex];

    return option ? `${name} - ${option.value}` : name;
  }

  return (
    <section className="product-gallery">
      <div className="product-gallery__main">
        <img className="product-gallery__main-image" src={galleryImages[currentIndex]} alt={getImageAlt(currentIndex)} />
        {galleryImages.length > 1 && (
          <div className="product-gallery__arrow">
            <button type="button" onClick={handlePrevious} aria-label="이전 이미지 보기"></button>
            <button type="button" onClick={handleNext} aria-label="다음 이미지 보기"></button>
          </div>
        )}
      </div>
      <div className="product-gallery__options">
        {galleryImages.length > 1 && (
          galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={image} alt={getImageAlt(index)} />
            </button>
          ))
        )}
      </div>
    </section>
  )
}
