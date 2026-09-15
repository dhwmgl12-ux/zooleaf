import fullStarIcon from "../../assets/icons/full-white.svg";
import emptyStarIcon from "../../assets/icons/empty-white.svg";
import halfStarIcon from "../../assets/icons/half-white.svg";
import { ReviewCardContainer, ReviewCardContent, Rating } from "./ReviewCard.styles";

export default function ReviewCard({
  review = {},
}) {
  const {
    imageUrl,
    userName = "방문객",
    rating = 0,
    content = "",
  } = review;

  const starPositions = [1, 2, 3, 4, 5];
  const reviewRating = Math.min(5, Math.max(0, Number(rating) || 0),);
  const roundedRating = Math.round(reviewRating * 2) / 2;

  const starIcons = starPositions.map((starPosition) => {
    if (roundedRating >= starPosition) {
      return fullStarIcon;
    }
    
    if (roundedRating >= starPosition - 0.5) {
      return halfStarIcon;
    }
    
    return emptyStarIcon;
  });

  return (
    <ReviewCardContainer className="review-card__list">
      {imageUrl && (
        <img 
          src={imageUrl}
          alt={`${userName}님의 방문 후기`}
        />
      )}

      <ReviewCardContent className="review-card__content">
        <Rating aria-label={`평점 ${rating}점, 후기 ${rating}개`}>
          <p>별점:</p>
          <div aria-hidden="true">
            {starIcons.map((icon, index) => ( 
              <img key={index} src={icon} alt="" />
            ))}
          </div>
          <span>
            {rating}
          </span>
        </Rating>
        
        <p className="review-card__text">{review.content}</p>
      </ReviewCardContent>
    </ReviewCardContainer>
  )
}
