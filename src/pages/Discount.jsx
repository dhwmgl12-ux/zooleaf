// src/pages/Discount.jsx
import React from 'react';
import {
  PARTNERSHIP_DISCOUNTS,
  SPECIAL_DISCOUNTS,
} from '../constants/DiscountData';
import {
  DiscountPage,
  PageTitle,
  NoticeBox,
  DiscountSection,
  DiscountCard,
  CardImageWrap,
  CardInfoWrap,
  ConditionArea,
  SubCond,
  SpecialHeader,
  SpecialSection,
  SpecialCard,
  SpecialImageWrap,
  SpecialTextWrap,
} from './Discount.styles';
export default function Discount() {
  return (
    <DiscountPage>
      <PageTitle>제휴 & 할인</PageTitle>

      <NoticeBox>
        <h3>주의사항</h3>
        <p className="highlight-red">다른 할인과 중복 적용 불가</p>
      </NoticeBox>

      <DiscountSection>
        {PARTNERSHIP_DISCOUNTS.map((item) => (
          <DiscountCard key={item.id}>
            <CardImageWrap>
              <img src={item.image} alt={item.title} />
            </CardImageWrap>
            <CardInfoWrap>
              <h2>{item.title}</h2>
              <p>혜택명: {item.benefitName}</p>
              <p>할인: {item.discountRate}</p>
              <p>대상: {item.target}</p>
              <p>적용 상품: {item.applicableItems}</p>
              {item.useDay && <p>이용일: {item.useDay}</p>}

              <ConditionArea>
                <strong>이용 조건</strong>
                <p>
                  {item.conditions.map((cond, idx) => (
                    <span
                      key={idx}
                      style={{ color: cond.highlight ? '#D90429' : 'inherit' }}
                    >
                      {cond.text}
                    </span>
                  ))}
                </p>
                {item.subCondition && <SubCond>{item.subCondition}</SubCond>}
              </ConditionArea>
            </CardInfoWrap>
          </DiscountCard>
        ))}
      </DiscountSection>

      <SpecialHeader>
        <h2>우대 적용</h2>
      </SpecialHeader>

      <SpecialSection>
        {SPECIAL_DISCOUNTS.map((special) => (
          <SpecialCard key={special.id}>
            <SpecialImageWrap>
              <img src={special.image} alt="우대 아이콘" />
            </SpecialImageWrap>
            <SpecialTextWrap>
              {special.descriptions.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </SpecialTextWrap>
          </SpecialCard>
        ))}
      </SpecialSection>
    </DiscountPage>
  );
}
