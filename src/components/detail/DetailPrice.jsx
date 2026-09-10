import { useState } from "react";

import fullStarIcon from "../../assets/icons/full-black.svg";
import emptyStarIcon from "../../assets/icons/empty-black.svg";
import halfStarIcon from "../../assets/icons/half-black.svg";
import { DetailPriceContainer } from "./DetailPrice.styles"; 
import { DetailPriceInfo } from "./DetailPrice.styles"; 
import { Rating } from "./DetailPrice.styles"; 
import { DetailPriceForm } from "./DetailPrice.styles"; 
import { DeliveryInfo } from "./DetailPrice.styles"; 
import { OptionSelector } from "./DetailPrice.styles"; 

export default function DetailPrice({ product, productType, }) {
  const [selectedOptionValue, setSelectedOptionValue] = useState("");
  const [quantity, setQuantity] = useState(0);

  const {
    name,
    // TODO(API): goods의 subCategory가 categoryId로 변경되면 제거
    subCategory,
    price = 0,
    discountRate,
    discountPrice,
    description,
    rating = 0,
    reviewCount = 0,
    categoryId,
    visitorType,
    availableTimeType,
  } = product;

  const CATEGORY_LABELS = {
    goods: "ZOOLEAF GOODS",
    product: "입장권 & 패키지",
    experience: "프로그램",
  };

  const categoryLabel = CATEGORY_LABELS[productType] ?? "";

  const CATEGORY_ID_LABELS = {
    ticket: "입장권",
    package: "패키지",
  };
  // TODO(API): goods가 categoryId를 제공하면 subCategory fallback 제거
  const detailCategoryKey = categoryId ?? subCategory;

  const detailCategoryLabel =
    CATEGORY_ID_LABELS[detailCategoryKey] ??
    detailCategoryKey ??
    "";

  const isGoods = productType === "goods";

  const hasOptions = Array.isArray(product.options);
  
  const selectedOption = hasOptions ? product.options.find(
    (option) => option.value === selectedOptionValue,
  ) : null;
  
  const handleOptionChange = (event) => {
    const nextOptionValue = event.target.value;
    
    setSelectedOptionValue(nextOptionValue);
    setQuantity(nextOptionValue ? 1 : 0);
  };
  
  const handleRemoveOption = () => {
    setSelectedOptionValue("");
    setQuantity(0);
  };
  
  const handleDecrease = () => {
    setQuantity((current) => Math.max(0, current - 1));
  };
  
  const handleIncrease = () => {
    setQuantity((current) => current + 1);
  };
  
  const salePrice =
  discountPrice ?? price;
  
  const originalTotal = price * quantity;
  const productTotal = salePrice * quantity;

  const discountAmount = Math.max(0, originalTotal - productTotal);
  
  const discountPercent =
  discountRate !== null && discountRate !== undefined ? Math.round(discountRate * 100) : 0;
  
  const totalPrice = productTotal;
  
  
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
  
  
  const isDayTicket = categoryId === "ticket" && availableTimeType === "종일";
  const isAdultOrChild = visitorType === "대인" || visitorType === "소인";
  const showPaymentBenefits = isDayTicket && isAdultOrChild;
  
  const isCartDisabled = quantity === 0 || (hasOptions && !selectedOption);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (isCartDisabled) { return; }

    const carItem = {
      id: product.id,
      name,
      price: unitPrice,
      quantity,
      ...(selectedOption ? { option: selectedOption.name } : {}),
    }

    console.log(carItem);
  }

  return (
    <DetailPriceContainer >
      <DetailPriceInfo>
        <nav>
          <ol>
            <li>{categoryLabel}</li>
            {detailCategoryLabel && (
              <li>{detailCategoryLabel}</li>
            )}
          </ol>
        </nav>
        <h2>{name}</h2>
        {description && <p>{description}</p>}

        <Rating aria-label={`평점 ${rating}점, 후기 ${reviewCount}개`}>
          <div aria-hidden="true">
            {starIcons.map((icon, index) => ( 
              <img key={index} src={icon} alt="" />
            ))}
          </div>
          <span>
            {rating} ({reviewCount})
          </span>
        </Rating>

        <p>
          {price.toLocaleString()}원
        </p>
      </DetailPriceInfo>

      <DetailPriceForm onSubmit={handleSubmit}>
        <DeliveryInfo>
          <dt>배송비</dt>
          <dd>
            {isGoods ? (
              <>
                <span>3000원</span>
                <p>50,000원 이상 구매 시 무료 배송</p>
              </>
            ) : <span>0원</span>
            }
          </dd>
        </DeliveryInfo>

        {hasOptions ? (
          <>
            <OptionSelector>
              <legend>옵션</legend>
              <select name="goodsOption" value={selectedOptionId} onChange={handleOptionChange} aria-label="상품 옵션">
                <option value="">옵션을 선택해 주세요</option>
                {product.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </OptionSelector>
          
            {selectedOption && (
              <div className="selected-option">
                <div className="selected-header">
                  <h3>{name}</h3>
                  <button
                    type="button"
                    onClick={handleRemoveOption}
                    aria-label={`${selectedOption.name} 옵션 삭제`}
                  >
                    ×
                  </button>
                </div>
    
                <p>{selectedOption.name}</p>
    
                <div>
                  <div aria-label="상품 수량">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity === 0}
                      aria-label="수량 줄이기"
                    >
                      −
                    </button>
    
                    <output aria-live="polite">
                      {quantity}
                    </output>
    
                    <button
                      type="button"
                      onClick={handleIncrease}
                      aria-label="수량 늘리기"
                    >
                      +
                    </button>
                  </div>
    
                  <p>{productTotal.toLocaleString()}원</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <fieldset className="detail-price__quantity-area">
            <legend>수량</legend>

            <div aria-label="상품 수량">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity === 0}
                aria-label="수량 줄이기"
              >
                −
              </button>

              <output aria-live="polite">
                {quantity}
              </output>

              <button
                type="button"
                onClick={handleIncrease}
                aria-label="수량 늘리기"
              >
                +
              </button>
            </div>
          </fieldset>
        )}

        <dl>
          <dt>할인 혜택</dt>
          <dd> -{discountAmount.toLocaleString()}원 ({discountPercent}%)</dd>
        </dl>

        {showPaymentBenefits && (
          <section>
            <h3>결제 헤택</h3>
            <ul>
              <li>ZooLeaf 제휴카드<span>최대 50%</span></li>
              <li>통신사 멤버십<span>40%</span></li>
              <li>문화가 있는 날<span>30%</span></li>
            </ul>
          </section>
        )}

        <dl className="detail-price__total">
          <dt>총 금액</dt>
          <dd>{totalPrice.toLocaleString()}원</dd>
        </dl>

        <button
          type="submit"
          disabled={isCartDisabled}
        >
          {isCartDisabled ? "상품을 선택해 주세요" : "장바구니"}
        </button>
      </DetailPriceForm>

    </DetailPriceContainer>
  )
}
