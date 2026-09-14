import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import useCartStore from "../../store/cartStore";
import { CART_BENEFITS, getBenefitDetails } from "../../utils/cartBenefits";
import BenefitVerifyModal from "./BenefitVerifyModal";
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
  ModalText,
  ModalButtonArea,
  ModalCancelButton,
  ModalDeleteButton,
  BenefitDetails,
  BenefitDetailAmount,
  BenefitDetailNote,
} from "../../pages/CartPage.styles";

export default function CartOrderSummary({ cartItems, hasShippingAddress }) {
  // 페이지 이동에 사용할 함수
  const navigate = useNavigate();
  const isCartBusy = useCartStore(
    (state) => state.isLoading || state.isUpdating,
  );

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

  // 예 클릭 → 마이페이지 이동
  const handleConfirm = () => {
    setIsPurchaseModalOpen(false);
    navigate("/mypage"); // 실제 마이페이지 경로에 맞춰야 해요.
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
  const [benefitId, setBenefitId] = useState("");
  // 문화가 있는 날 확인 날짜 — 서버 저장 없이 화면에서만 사용
  const [benefitDate, setBenefitDate] = useState("");

  //  결제 혜택 모달 , 입력 검증
  const [pendingBenefitId, setPendingBenefitId] = useState("");

  const pendingBenefit = CART_BENEFITS.find(
    (benefit) => benefit.id === pendingBenefitId,
  );

  const handleBenefitChange = (event) => {
    const nextId = event.target.value;

    if (!nextId) {
      setBenefitId("");
      setBenefitDate("");
      setPendingBenefitId("");
      return;
    }

    // 모달을 취소하면 기존에 적용한 혜택을 유지
    setPendingBenefitId(nextId);
  };

  const handleBenefitApply = (verifiedId, verifiedDate = "") => {
    setBenefitId(verifiedId);
    setBenefitDate(verifiedId === "cultureDay" ? verifiedDate : "");
    setPendingBenefitId("");
  };

  //
  const selectedBenefit = CART_BENEFITS.find(
    (benefit) => benefit.id === benefitId,
  );

  const benefitRate = selectedBenefit?.rate ?? 0;

  // 표시할 내역과 실제 할인액을 같은 계산 결과로 사용
  const { totalDiscount: benefitDiscount, details: benefitDetails } =
    getBenefitDetails(cartItems, benefitId, benefitDate);

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
          aria-label="결제 혜택"
          value={benefitId}
          onChange={handleBenefitChange}
        >
          <option value="">할인 혜택을 선택해주세요.</option>

          {CART_BENEFITS.map((benefit) => (
            <option key={benefit.id} value={benefit.id}>
              {benefit.label}
            </option>
          ))}
        </BenefitSelect>

        {pendingBenefit && (
          <BenefitVerifyModal
            key={pendingBenefit.id}
            benefit={pendingBenefit}
            onClose={() => setPendingBenefitId("")}
            onApply={handleBenefitApply}
          />
        )}
        {benefitId === "cultureDay" && benefitDate && (
          <p>
            할인 확인용 날짜: {benefitDate}
            <br />
            실제 입장권의 방문일은 변경되지 않습니다.
          </p>
        )}

        {benefitId && benefitDiscount === 0 && (
          <p role="status">
            선택한 상품 중 해당 혜택을 적용할 수 있는 입장권이 없습니다.
          </p>
        )}
        {benefitDiscount > 0 && (
          <BenefitDetails aria-live="polite" aria-atomic="true">
            <strong>결제 혜택 적용 내역</strong>

            <ul>
              {benefitDetails.map((detail) => (
                <li key={detail.key}>
                  <p>
                    <strong>{detail.name}</strong>
                  </p>

                  {detail.option && <p>옵션: {detail.option}</p>}
                  {detail.visitDate && <p>이용일: {detail.visitDate}</p>}

                  <p>
                    {detail.unitPrice.toLocaleString()}원 ×{" "}
                    {detail.appliedQuantity}장 × {Math.round(detail.rate * 100)}
                    %
                  </p>

                  <BenefitDetailAmount>
                    {detail.discountAmount.toLocaleString()}원 할인
                  </BenefitDetailAmount>

                  {detail.unappliedQuantity > 0 && (
                    <p>
                      이 상품의 나머지 {detail.unappliedQuantity}장은 결제 혜택
                      미적용
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <BenefitDetailNote>
              결제 혜택 할인 합계: {benefitDiscount.toLocaleString()}원
              <br />위 내역에 없는 상품에는 결제 혜택이 적용되지 않습니다. 상품
              자체 할인은 별도입니다.
            </BenefitDetailNote>
          </BenefitDetails>
        )}
      </BenefitArea>

      <Divider />

      <TotalArea>
        <TotalLabel>총 금액</TotalLabel>

        <div>
          {benefitDiscount > 0 && (
            <DiscountInfo>
              -{Math.round(benefitRate * 100)}% (
              {benefitDiscount.toLocaleString()}원 할인)
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
        disabled={cartItems.length === 0 || isCartBusy}
        onClick={handlePurchase}
      >
        구매하기
      </PurchaseButton>

      {isPurchaseModalOpen && (
        <Modal
          variant="cart"
          isOpen={isPurchaseModalOpen}
          onClose={handleCloseModal}
          title="구매 확인"
        >
          <ModalText>
            {hasShippingAddress
              ? "결제를 진행하시겠습니까?"
              : "배송지를 등록해야 합니다."}
          </ModalText>

          <ModalButtonArea>
            <ModalCancelButton type="button" onClick={handleCloseModal}>
              아니오
            </ModalCancelButton>

            <ModalDeleteButton
              type="button"
              disabled={isCartBusy}
              onClick={handleConfirm}
            >
              예
            </ModalDeleteButton>
          </ModalButtonArea>
        </Modal>
      )}
    </OrderSummary>
  );
}
