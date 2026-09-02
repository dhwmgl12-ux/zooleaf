import React from "react";
import "./App.css";
import DiscountCard from "./components/product/discount/discount";

// 📂 assets 폴더에 있는 이미지들을 각각 불러옵니다
import cardImg1 from "./assets/discount/discount-Affiliate.png";
import cardImg2 from "./assets/discount/discount-tel.png";
import cardImg3 from "./assets/discount/discount-card.png";
import cardImg4 from "./assets/discount/discount-day.png";

import preferImg1 from "./assets/discount/discount-disabledPerson.png";
import preferImg2 from "./assets/discount/discount-soldier.png";
import preferImg3 from "./assets/discount/discount-oldster.png";
import preferImg4 from "./assets/discount/discount-veteran.png";

function App() {
  // 📊 카드별로 다 다른 데이터와 이미지를 매칭해 둡니다
  const discountList = [
    {
      title: "제휴카드 할인",
      benefitName: "ZOOLEAF 제휴카드 할인",
      discountRate: "종일권 50% 할인",
      target: "제휴카드 회원 본인 + 동반 1인",
      product: "대인·소인 종일권",
      condition: "지정 제휴카드로 결제 시 적용", // 👈 일반 텍스트로 저장
      highlightWords: ["지정 제휴카드"], // 👈 강조할 단어 지정
      image: cardImg1,
    },
    {
      title: "통신사 멤버십 할인",
      benefitName: "ZOOLEAF 통신사 멤버십 할인",
      discountRate: "종일권 40% 할인",
      target: "제휴 통신사 멤버십 회원",
      product: "대인·소인 종일권",
      condition: "유효한 멤버십 인증 필요, 본인에 한하여 적용",
      highlightWords: ["유효한 멤버십 인증", "본인"],
      image: cardImg2,
    },
    {
      title: "문화누리카드 할인",
      benefitName: "문화누리카드 할인",
      discountRate: "종일권 30% 할인",
      target: "문화누리카드 소지자 본인",
      product: "종일권",
      condition: "문화누리카드로 결제, 본인에 한하여 적용",
      highlightWords: ["문화누리카드", "본인"],
      image: cardImg3,
    },
    {
      title: "문화가 있는 날 할인",
      benefitName: "ZOOLEAF 문화가 있는 날 할인",
      discountRate: "종일권 30% 할인",
      target: "해당 행사일 ZOOLEAF 방문객",
      product: "대인·소인 종일권",
      condition: "매월 마지막주 수요일 (지정된 날짜에만 이용 가능)",
      highlightWords: ["지정된 날짜"],
      image: cardImg4,
    },
  ];
  const prefermentList = [
    {
      icon: preferImg1,
      items: [
        {
          title: "장애인 1~3급: 본인 및 동반 1인 50% 할인",
          desc: "(복지카드 소지자)",
        },
        { title: "장애인 4~6급: 본인 50% 할인", desc: "(복지카드 소지자)" },
      ],
    },
    {
      icon: preferImg2,
      items: [
        {
          title: "군인/군무원: 할인 또는 현역병 우대 혜택 적용",
          desc: "(휴가증, 외출증 등 신분 증빙 서류 지참)",
        },
        {
          title: "국군 장병 특별 우대: 휴가자 본인 할인 적용",
          desc: "(휴가증 및 군인 신분증 제시)",
        },
      ],
    },
    {
      icon: preferImg3,
      items: [{ title: "만 65세 이상 본인 50% 할인", desc: "(신분증 지참)" }],
    },
    {
      icon: preferImg4,
      items: [
        {
          title: "본인 및 유족/배우자 50% 할인",
          desc: "(유공자증 또는 증서 제시 시 적용)",
        },
      ],
    },
  ];

  return (
    <div className="page-wrapper">
      {" "}
      {/* 👈 화면 전체 배경을 담당하는 상자*/}
      <div className="container">
        {" "}
        {/* 👈 콘텐츠를 가운데로 모아주는 상자 */}
        <h1 className="page-title">제휴&할인</h1>
        <div className="notice-box">
          <h3 className="notice-title">주의사항</h3>
          <p className="notice-text">다른 할인과 중복 적용 불가</p>
        </div>
        {/* 데이터 개수만큼 카드가 자동으로 뚝딱 만들어집니다 */}
        <div className="card-list">
          {discountList.map((item, index) => (
            <DiscountCard
              key={index}
              title={item.title}
              benefitName={item.benefitName}
              discountRate={item.discountRate}
              target={item.target}
              product={item.product}
              condition={item.condition}
              highlightWords={item.highlightWords}
              image={item.image}
            />
          ))}
        </div>
        {/* 우대 적용 타이틀 박스 */}
        <div className="prefer-section-title">우대 적용</div>
        {/* 우대 적용 카드 목록 */}
        <div className="prefer-list">
          {prefermentList.map((item, index) => (
            <div className="prefer-item" key={index}>
              <div className="prefer-thumb">
                <img src={item.icon} alt="우대 아이콘" />
              </div>
              <div className="prefer-desc">
                {item.items.map((sub, subIndex) => (
                  <div className="prefer-desc-item" key={subIndex}>
                    <h3>{sub.title}</h3>
                    <p>{sub.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
