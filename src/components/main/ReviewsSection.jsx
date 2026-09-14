import MainSectionHeader from './MainSectionHeader'
import { MainSectionContainer, MainSectionMoreLink, MainCardList,} from './MainSection.styles.js'
import ReviewCard from "../review/ReviewCard";

export default function ReviewsSection({reviews = [],}) {
  return (
    <MainSectionContainer>
      <MainSectionHeader 
        title="리뷰"
        description="방문객들의 ZOOLEAF 이야기"
      />

      <MainCardList>
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </MainCardList>
    </MainSectionContainer>
  )
}
