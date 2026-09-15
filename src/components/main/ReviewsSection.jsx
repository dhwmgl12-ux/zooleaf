import ReviewCard from "../review/ReviewCard";
import MainSectionHeader from "./MainSectionHeader";
import useHorizontalSlider from "../../hooks/useHorizontalSlider";

import {
  MainSectionContainer,
  MainSliderContainer,
  MainSliderList,
  MainSliderButton,
} from "./MainSection.styles";

export default function ReviewsSection({reviews = [],}) {
  const {
    sliderRef,
    handlePrevious,
    handleNext,
  } = useHorizontalSlider();
  
  return (
    <MainSectionContainer>
      <MainSectionHeader 
        title="리뷰"
        description="방문객들의 ZOOLEAF 이야기"
      />

      <MainSliderContainer>
        <MainSliderButton
          type="button"
          $direction="previous"
          $tabletOnly
          onClick={handlePrevious}
          aria-label="이전 리뷰 보기"
        >
          <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L1 15L11 29" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </MainSliderButton>

        <MainSliderList ref={sliderRef} $variant="reviews" >
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </MainSliderList>

        <MainSliderButton
          type="button"
          $direction="next"
          $tabletOnly
          onClick={handleNext}
          aria-label="다음 리뷰 보기"
        >
          <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 15L1 29" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </MainSliderButton>
      </MainSliderContainer>
    </MainSectionContainer>
  )
}
