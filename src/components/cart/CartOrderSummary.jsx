import { useState } from "react";
import useToastStore from "../../store/toastStore";
import { useNavigate } from "react-router-dom";
import {
  OrderSummary,
  SummaryTitle,
  SummaryRow,
  Divider,
  BenefitArea,
  BenefitTitle,
  BenefitSelect,
  TotalArea,
  TotalLabel,
  DiscountInfo,
  TotalPrice,
  NoticeArea,
  NoticeButton,
  NoticeContent,
  PurchaseButton,
  ModalOverlay,
  ModalBox,
  ModalText,
  ModalButtonArea,
  ModalCancelButton,
  ModalDeleteButton,
} from "../../pages/CartPage.styles";

export default function CartOrderSummary({ cartItems, hasShippingAddress }) {
  // 페이지 이동에 사용할 함수
  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.showToast);

  // 구매 모달 열림 여부: 처음에는 닫힘
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // 구매하기 클릭 → 모달 열기
  const handlePurchase = () => {
    setIsPurchaseModalOpen(true);
  };

  // 아니오 클릭 → 모달 닫기
  const handleCloseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  const handleConfirm = () => {
    setIsPurchaseModalOpen(false);

    // 배송지가 없으면 구매 진행을 막고 등록 화면으로 이동
    if (!hasShippingAddress) {
      navigate("/mypage");
      return;
    }

    // 배송지가 있어도 빈 장바구니는 구매 불가
    if (cartItems.length === 0) {
      return;
    }

    // 주문 API가 준비되면 이 위치에서 호출
    showToast("배송지가 확인되었습니다. 결제 기능은 아직 연결 전입니다.");
  };

  const productTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // 기존 상품 자체 할인
  const itemDiscountTotal = cartItems.reduce((sum, item) => {
    const discountRate = item.discountRate ?? 0;

    return sum + item.price * discountRate * item.quantity;
  }, 0);

  // 결제 혜택

  const [benefitRate, setBenefitRate] = useState(0);

  const benefitDiscount = productTotal * benefitRate;

  const discountTotal = itemDiscountTotal + benefitDiscount;

  // 배송비

  const hasGoods = cartItems.some((item) => item.type === "goods");

  const shippingFee = hasGoods ? 3000 : 0;

  // 최종 금액

  const finalTotal = Math.max(0, productTotal - discountTotal + shippingFee);

  // 유의사항 아코디언

  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  return (
    <OrderSummary>
      <SummaryTitle>구매 하기</SummaryTitle>

      <SummaryRow>
        <span>상품 금액</span>

        <strong>{productTotal.toLocaleString()}원</strong>
      </SummaryRow>

      <SummaryRow>
        <span>할인 금액</span>
        <strong>-{discountTotal.toLocaleString()}원</strong>
      </SummaryRow>

      <SummaryRow>
        <span>배송비</span>
        <strong>{shippingFee.toLocaleString()}원</strong>
      </SummaryRow>

      <Divider />

      {/* 결제 혜택 */}
      <BenefitArea>
        <BenefitTitle>결제 혜택</BenefitTitle>

        <BenefitSelect
          value={benefitRate}
          onChange={(e) => setBenefitRate(Number(e.target.value))}
        >
          <option value={0}>할인 혜택을 선택해주세요.</option>
          <option value={0.5}>ZooLeaf 제휴카드 - 최대 50%</option>
          <option value={0.4}>통신사 멤버십 - 40%</option>
          <option value={0.3}>문화 누리 카드 - 30%</option>
          <option value={0.3}>문화가 있는 날 - 30%</option>
        </BenefitSelect>
      </BenefitArea>

      <Divider />

      <TotalArea>
        <TotalLabel>총 금액</TotalLabel>

        <div>
          {benefitRate > 0 && (
            <DiscountInfo>
              -{Math.round(benefitRate * 100)}% (
              {benefitDiscount.toLocaleString()}원 할인 )
            </DiscountInfo>
          )}

          <TotalPrice>{finalTotal.toLocaleString()}원</TotalPrice>
        </div>
      </TotalArea>

      {/* 유의사항 */}
      <NoticeArea>
        <NoticeButton
          type="button"
          onClick={() => setIsNoticeOpen((prev) => !prev)}
        >
          <span>유의 사항</span>
          <span>{isNoticeOpen ? "▲" : "▼"}</span>
        </NoticeButton>

        {isNoticeOpen && (
          <NoticeContent>
            <p>· 할인 혜택은 다른 할인과 중복 적용되지 않을 수 있습니다.</p>
            <p>· 입장권 및 체험권은 지정된 이용일에만 사용할 수 있습니다.</p>
            <p>· 굿즈가 포함된 주문에는 배송비가 추가될 수 있습니다.</p>
            <p>· 결제 완료 후 취소 및 환불은 상품별 정책에 따라 처리됩니다.</p>
          </NoticeContent>
        )}
      </NoticeArea>

      <PurchaseButton
        type="button"
        disabled={cartItems.length === 0}
        onClick={handlePurchase}
      >
        구매하기
      </PurchaseButton>

      {isPurchaseModalOpen && (
        <ModalOverlay>
          <ModalBox
            role="dialog"
            aria-modal="true"
            aria-labelledby="purchase-modal-message"
          >
            <ModalText id="purchase-modal-message">
              {hasShippingAddress
                ? "결제를 진행하시겠습니까?"
                : "배송지가 없습니다. 마이페이지에서 등록하시겠습니까?"}
            </ModalText>

            <ModalButtonArea>
              <ModalCancelButton type="button" onClick={handleCloseModal}>
                아니오
              </ModalCancelButton>

              <ModalDeleteButton type="button" onClick={handleConfirm}>
                예
              </ModalDeleteButton>
            </ModalButtonArea>
          </ModalBox>
        </ModalOverlay>
      )}
    </OrderSummary>
  );
}
