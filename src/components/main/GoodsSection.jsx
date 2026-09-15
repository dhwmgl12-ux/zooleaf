
import GoodsCard from "../goods/GoodsCard";
import MainSectionHeader from "./MainSectionHeader";
import useHorizontalSlider from "../../hooks/useHorizontalSlider";
import {
  MainSectionContainer,
  MainSectionMoreLink,
  MainSliderContainer,
  MainSliderList,
  MainSliderButton,
} from "./MainSection.styles";

export default function GoodsSection({ goods = [] }) {
  const {
    sliderRef,
    handlePrevious,
    handleNext,
  } = useHorizontalSlider();

  return (
    <MainSectionContainer>
      <MainSectionHeader 
        title="ZOOLEAF Shop"
        description="다양한 굿즈들을 만나보세요."
      />

      <MainSliderContainer>
        <MainSliderButton
          type="button"
          $direction="previous"
          onClick={handlePrevious}
          aria-label="이전 상품 보기"
        >
          <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L1 15L11 29" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </MainSliderButton>

        <MainSliderList ref={sliderRef} $variant="goods" >
          {goods.map((item) => (
            <li key={item.id}>
              <GoodsCard goods={item} />
            </li>
          ))}
        </MainSliderList>

        <MainSliderButton
          type="button"
          $direction="next"
          onClick={handleNext}
          aria-label="다음 상품 보기"
        >
          <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 15L1 29" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </MainSliderButton>
      </MainSliderContainer>

      <MainSectionMoreLink to="/goods">더 보러가기</MainSectionMoreLink>
    </MainSectionContainer>
  )
}
