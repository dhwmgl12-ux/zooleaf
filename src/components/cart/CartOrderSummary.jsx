import { useRef, useState } from "react";
import useOrderStore from "../../store/orderStore";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import useAddressStore from "../../store/addressStore";
import useToastStore from "../../store/toastStore";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
<<<<<<< HEAD
import useCartStore from "../../store/cartStore";
import { CART_BENEFITS, getBenefitDetails } from "../../utils/cartBenefits";
import BenefitVerifyModal from "./BenefitVerifyModal";
=======
>>>>>>> 1720224 (feat:장바구니 공통모달)
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

  // 구매 모달을 열 때마다 주문 요청 ID 발급
  const orderRequestId = useRef(null);
  const purchaseInProgress = useRef(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const isCartBusy = useCartStore(
    (state) => state.isLoading || state.isUpdating,
  );

  const showToast = useToastStore((state) => state.showToast);

  // 구매 모달 열림 여부: 처음에는 닫힘
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // 구매하기 클릭 → 모달 열기
  const handlePurchase = () => {
    orderRequestId.current = crypto.randomUUID();
    setIsPurchaseModalOpen(true);
  };

  // 아니오 클릭 → 모달 닫기
  const handleCloseModal = () => {
    if (purchaseInProgress.current) return;
    setIsPurchaseModalOpen(false);
  };

  const handleConfirm = async () => {
    if (purchaseInProgress.current || isCartBusy) return;
    const userId = useAuthStore.getState().user?.id;

    if (!userId) {
      setIsPurchaseModalOpen(false);
      navigate("/login");
      return;
    }

    // 확인 시점의 최신 기본 배송지 확인
    const address = useAddressStore
      .getState()
      .addressesByUser[userId]?.find((item) => item.isDefault);

    if (!address) {
      setIsPurchaseModalOpen(false);
      showToast("배송지를 먼저 등록해주세요.");
      navigate("/mypage");
      return;
    }

    if (cartItems.length === 0 || !orderRequestId.current) {
      return;
    }

    purchaseInProgress.current = true;
    setIsPurchasing(true);
    try {
      useOrderStore.getState().createTestOrder(
        userId,
        orderRequestId.current,
        cartItems,
        {
          shippingFee,
          discountAmount: discountTotal,
        },
        address,
      );

      const removed = await useCartStore
        .getState()
        .removeSelected(cartItems.map((item) => item.cartItemId));

      orderRequestId.current = null;
      setIsPurchaseModalOpen(false);

      showToast(
        removed
          ? "테스트 주문을 생성했습니다. 실제 결제는 발생하지 않습니다."
          : "주문은 생성되었지만 장바구니 갱신에 실패했습니다. 주문내역을 확인한 후 구매한 상품을 장바구니에서 삭제해주세요.",
      );
      navigate("/mypage");
    } catch (error) {
      showToast(error.message);
    } finally {
      purchaseInProgress.current = false;
      setIsPurchasing(false);
    }
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
<<<<<<< HEAD
        disabled={cartItems.length === 0 || isCartBusy}
=======
        disabled={cartItems.length === 0 || isPurchasing || isCartBusy}
>>>>>>> 504b235 (장바구니에서 구매한 물품제거 및 주문 취소시 주문내역에서 제거)
        onClick={handlePurchase}
      >
        구매하기
      </PurchaseButton>

      {isPurchaseModalOpen && (
<<<<<<< HEAD
<<<<<<< HEAD
        <Modal
          variant="cart"
=======
        <Modal
>>>>>>> 1720224 (feat:장바구니 공통모달)
          isOpen={isPurchaseModalOpen}
          onClose={handleCloseModal}
          title="구매 확인"
        >
          <ModalText>
<<<<<<< HEAD
            {hasShippingAddress
              ? "결제를 진행하시겠습니까?"
              : "배송지를 등록해야 합니다."}
          </ModalText>
=======
        <ModalOverlay>
          <ModalBox
            role="dialog"
            aria-modal="true"
            aria-labelledby="purchase-modal-message"
          >
            <ModalText id="purchase-modal-message">
              {!hasShippingAddress
                ? "배송지가 없습니다. 마이페이지에서 등록하시겠습니까?"
                : import.meta.env.DEV
                  ? "주문 내역에 저장됩니다. 계속 진행하시겠어요?"
                  : "결제 기능은 아직 준비 중입니다."}
            </ModalText>
>>>>>>> 2c5d97f (feat:장바구니 구매 확인 분기 수정)

<<<<<<< HEAD
          <ModalButtonArea data-modal-actions>
            <ModalCancelButton
              data-modal-cancel
              type="button"
              onClick={handleCloseModal}
            >
              취소
            </ModalCancelButton>

            <ModalDeleteButton
              data-modal-confirm
              type="button"
              disabled={isCartBusy}
              onClick={handleConfirm}
            >
              확인
            </ModalDeleteButton>
          </ModalButtonArea>
        </Modal>
=======
            <ModalButtonArea>
              <ModalCancelButton type="button" disabled={isPurchasing} onClick={handleCloseModal}>
                아니오
              </ModalCancelButton>

              <ModalDeleteButton type="button" disabled={isPurchasing || isCartBusy} onClick={handleConfirm}>
                {isPurchasing ? "처리 중..." : "예"}
              </ModalDeleteButton>
            </ModalButtonArea>
          </ModalBox>
        </ModalOverlay>
>>>>>>> 504b235 (장바구니에서 구매한 물품제거 및 주문 취소시 주문내역에서 제거)
=======
            {!hasShippingAddress
              ? "배송지가 없습니다. 마이페이지에서 등록하시겠습니까?"
              : import.meta.env.DEV
                ? "주문 내역에 저장됩니다. 계속 진행하시겠어요?"
                : "결제 기능은 아직 준비 중입니다."}
          </ModalText>

          <ModalButtonArea>
            <ModalCancelButton
              type="button"
              disabled={isPurchasing}
              onClick={handleCloseModal}
            >
              아니오
            </ModalCancelButton>

            <ModalDeleteButton
              type="button"
              disabled={isPurchasing || isCartBusy}
              onClick={handleConfirm}
            >
              {isPurchasing ? "처리 중..." : "예"}
            </ModalDeleteButton>
          </ModalButtonArea>
        </Modal>
>>>>>>> 1720224 (feat:장바구니 공통모달)
      )}
    </OrderSummary>
  );
}
