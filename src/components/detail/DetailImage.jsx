
export default function DetailImage({
  imageUrl,
  name,
}) {
   if (!imageUrl) {
    return <p>등록된 이미지가 없습니다.</p>;
  }

  return (
    <div className="detail-image">
      <img
        className="detail-image__image"
        src={imageUrl}
        alt={`${name} 대표 이미지`}
      />
    </div>
  );
}
