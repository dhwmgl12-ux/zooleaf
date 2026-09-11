import { useState } from "react";

import fullStarIcon from "../../assets/icons/full-black.svg";
import emptyStarIcon from "../../assets/icons/empty-black.svg";
import halfStarIcon from "../../assets/icons/half-black.svg";
import {
  DetailPriceContainer,
  DetailPriceInfo,
  Rating,
  DetailPriceForm,
  DeliveryInfo,
  OptionSelector,
  SelectedOptionCard,
  QuantitySelector,
  QuantityControl,
  DiscountInfo,
  PaymentBenefits,
  TotalPriceRow,
  CartButton,
  OptionDropdown,
  OptionButton,
  OptionList,
  SelectedOptionCardTop,
  SelectedOptionCardBottom,
} from "./DetailPrice.styles.js";

export default function DetailPrice({ product, productType, }) {
  const [quantity, setQuantity] = useState(0);
  const [selectedOptionValue, setSelectedOptionValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

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

  const handleDecrease = () => {
    setQuantity((current) => Math.max(0, current - 1));
  };
  
  const handleIncrease = () => {
    setQuantity((current) => current + 1);
  };

  const hasOptions = Array.isArray(product.options);
  
  const selectedOption = hasOptions ? product.options.find(
    (option) => option.value === selectedOptionValue,
  ) : null;
  
  const handleOptionSelect = (optionValue) => {
    const clickedOption = product.options.find(
      (option) => option.value === optionValue,
    )

    if (!clickedOption) { return }

    setSelectedOptions((currentOptions) => {
      const alreadySeleted = currentOptions.some(
        (option) => option.value === optionValue,
      );

      if (alreadySeleted) {
        return currentOptions.map((option) => 
          option.value === optionValue ? {...option, quantity: option.quantity + 1} : option,
        );
      }
      
      return [
        ...currentOptions,
        {...clickedOption, quantity: 1,},
      ]
    })

    setSelectedOptionValue(optionValue);
    setIsOptionOpen(false);
  };

  const handleOptionDecrease = (optionValue) => {
    setSelectedOptions((currentOptions) => 
      currentOptions.map((option) => 
        option.value === optionValue ? {...option, quantity: Math.max(1, option.quantity - 1,),} : option,
      ),
    )
  };

  const handleOptionIncrease = (optionValue) => {
    setSelectedOptions((currentOptions) => 
      currentOptions.map((option) => 
        option.value === optionValue ? {...option, quantity: option.quantity + 1} : option,
      ),
    )
  };
  
  const handleRemoveOption = (optionValue) => {
    setSelectedOptions((currentOptions) =>
      currentOptions.filter(
        (option) => option.value !== optionValue,
      ),
    );
  };
  
  const selectedOptionQuantity =
    selectedOptions.reduce(
      (total, option) => total + option.quantity, 0,
    );

  const totalQuantity = hasOptions ? selectedOptionQuantity : quantity;
  
  const salePrice = discountPrice ?? price;
  
  const originalTotal = price * totalQuantity;
  const productTotal = salePrice * totalQuantity;

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
  
  const isCartDisabled = hasOptions ? selectedOptions.length === 0 : quantity === 0;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (isCartDisabled) { return; }

    const carItem = {
      id: product.id,
      name,
      price: salePrice,
      quantity: totalQuantity,
      ...(hasOptions ? {
            options: selectedOptions.map((option) => ({
              value: option.value,
              quantity: option.quantity,
            })),
          } : {}),
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
              <h3 htmlFor="goods-option" >옵션</h3>
              <OptionDropdown>
                <OptionButton 
                  type="button"
                  aria-expanded={isOptionOpen}
                  aria-controls="goods-option-list"
                  onClick={() => {setIsOptionOpen((current) => !current)}}
                >
                  옵션을 선택해 주세요
                  <svg width="13" height="6" viewBox="0 0 13 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 0.5L6.83345 5.5L12.5 0.5" stroke="#687C73" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </OptionButton>
                {isOptionOpen && (
                  <OptionList>
                    {product.options.map((option) => (
                      <li key={option.value}>
                        <button
                          type="button"
                          data-selected={selectedOptionValue === option.value}
                          onClick={() => {handleOptionSelect(option.value)}}
                        >
                          {option.value}
                        </button>
                      </li>
                    ))}
                  </OptionList>
                )}
              </OptionDropdown>
            </OptionSelector>
          
            {selectedOptions.map((option) => (
              <SelectedOptionCard className="selected-option" key={option.value}>
                <SelectedOptionCardTop>
                  <h3>{name}</h3>
                  <button
                    type="button"
                    onClick={()=> handleRemoveOption(option.value)}
                    aria-label={`${selectedOption.value} 옵션 삭제`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.75 0.75L10.75 10.75M0.75 10.75L10.75 0.75" stroke="#2C3E35" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </SelectedOptionCardTop>
    
                <p>{option.value}</p>
    
                <SelectedOptionCardBottom>
                  <QuantityControl $compact aria-label={`${option.value} 수량`}>
                    <button
                      type="button"
                      onClick={() => handleOptionDecrease(option.value)}
                      disabled={option.quantity === 1}
                      aria-label={`${option.value} 수량 줄이기`}
                    >
                      −
                    </button>
    
                    <output aria-live="polite">
                      {option.quantity}
                    </output>
    
                    <button
                      type="button"
                      onClick={() => handleOptionIncrease(option.value)}
                      aria-label={`${option.value} 수량 늘리기`}
                    >
                      +
                    </button>
                  </QuantityControl>
    
                  <p>{(salePrice * option.quantity).toLocaleString()}원</p>
                </SelectedOptionCardBottom>
              </SelectedOptionCard>
            ))}
          </>
        ) : (
          <QuantitySelector className="detail-price__quantity-area">
            <h3>수량</h3>

            <QuantityControl aria-label="상품 수량">
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
            </QuantityControl>
          </QuantitySelector>
        )}

        <DiscountInfo>
          <dt>할인 혜택</dt>
          <dd> -{discountAmount.toLocaleString()}원 ({discountPercent}%)</dd>
        </DiscountInfo>

        {showPaymentBenefits && (
          <PaymentBenefits>
            <h3>결제 헤택</h3>
            <ul>
              <li>ZooLeaf 제휴카드<span>최대 50%</span></li>
              <li>통신사 멤버십<span>40%</span></li>
              <li>문화가 있는 날<span>30%</span></li>
            </ul>
          </PaymentBenefits>
        )}

        <TotalPriceRow className="detail-price__total">
          <dt>총 금액</dt>
          <dd>{totalPrice.toLocaleString()}원</dd>
        </TotalPriceRow>

        <CartButton
          type="submit"
          disabled={isCartDisabled}
        >
          {isCartDisabled ? "상품을 선택해 주세요" : "장바구니"}
        </CartButton>
      </DetailPriceForm>

    </DetailPriceContainer>
  )
}
