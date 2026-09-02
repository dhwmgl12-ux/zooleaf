import React from "react";
import "./discount.css";

function DiscountCard({
  title,
  benefitName,
  discountRate,
  target,
  product,
  condition,
  highlightWords,
  image,
}) {
  // 여러 개의 강조 단어를 감지하여 쪼개는 함수
  const renderConditionText = (text, words) => {
    if (!words || words.length === 0) return text;

    // words 배열에 있는 단어들을 정규식 패턴으로 묶음 (예: (지정 제휴카드|본인))
    const regex = new RegExp(`(${words.join("|")})`, "g");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (words.includes(part)) {
        return (
          <span key={index} className="highlightWord">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="card-item">
      <div className="card-thumb">
        <img src={image} alt={title} />
      </div>
      <div className="card-desc">
        <h3>{title}</h3>
        <p>
          <strong>혜택명:</strong> {benefitName}
        </p>
        <p>
          <strong>할인:</strong> {discountRate}
        </p>
        <p>
          <strong>대상:</strong> {target}
        </p>
        <p>
          <strong>적용 상품:</strong> {product}
        </p>

        <div className="condition-box">
          <p className="condition-title">이용 조건</p>
          <p className="condition-text">
            {(() => {
              if (!highlightWords || highlightWords.length === 0)
                return condition;
              const regex = new RegExp(`(${highlightWords.join("|")})`, "g");
              return condition.split(regex).map((part, index) => {
                if (highlightWords.includes(part)) {
                  return (
                    <span key={index} className="highlightWord">
                      {part}
                    </span>
                  );
                }
                return part;
              });
            })()}
          </p>
        </div>
      </div>
    </div>
  );
}
function PrefermentCard({ icon, title, desc }) {
  return (
    <div className="prefer-item">
      <div className="prefer-thumb">
        <img src={icon} alt="우대 아이콘" />
      </div>
      <div className="prefer-desc">
        <p className="prefer-title">{title}</p>
        {desc && <p className="prefer-sub">{desc}</p>}
      </div>
    </div>
  );
}

export default DiscountCard;
