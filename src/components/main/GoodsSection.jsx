import { useState } from "react";
import GoodsCard from "../goods/GoodsCard";
import MainSectionHeader from "./MainSectionHeader";
import { MainSectionContainer, MainSectionMoreLink, MainCardList,} from './MainSection.styles.js'


const GOODS_PER_VIEW = 5;

export default function GoodsSection({ goods = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const lastIndex = Math.max(0, goods.length - GOODS_PER_VIEW);

  const handlePrevious = () => {
    setCurrentIndex((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setCurrentIndex((current) =>
      Math.min(lastIndex, current + 1),
    );
  };

  const visibleGoods = goods.slice(
    currentIndex,
    currentIndex + GOODS_PER_VIEW,
  );

  return (
    <MainSectionContainer>
      <MainSectionHeader 
        title="ZOOLEAF Shop"
        description="다양한 굿즈들을 만나보세요."
      />

      <div>
        <button
          className="prev-btn"
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="이전 이미지 보기"
          >
          <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L1 15L11 29" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="next-btn"
          type="button"
          onClick={handleNext}
          disabled={currentIndex === lastIndex}
          aria-label="다음 이미지 보기"
        >
          <svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 15L1 29" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <MainCardList>
          {goods.map((item) => (
            <li key={item.id}>
              <GoodsCard goods={item} />
            </li>
          ))}
        </MainCardList>
      </div>

      <MainSectionMoreLink to="/animals">더 보러가기</MainSectionMoreLink>
    </MainSectionContainer>
  )
}
