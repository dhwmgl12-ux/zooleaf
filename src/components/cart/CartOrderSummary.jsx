import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";
import useCartStore from "../../store/cartStore";
import { CART_BENEFITS, getBenefitDetails } from "../../utils/cartBenefits";
import BenefitVerifyModal from "./BenefitVerifyModal";
import { createOrder } from "../../api/orderApi";
import { deleteSelectedCartItems } from "../../api/cartApi";
import useAuthStore from "../../store/authStore";
import useAddressStore from "../../store/addressStore";
import useToastStore from "../../store/toastStore";
import { saveOrderDisplayAmounts } from "../../utils/orderDisplayAmounts";

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

export default function CartOrderSummary({ cartItems }) {
  // 페이지 이동에 사용할 함수
  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.showToast);

  // 구매 모달 열림 여부: 처음에는 닫힘
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const [isOrdering, setIsOrdering] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");

  const [isCheckingAddress, setIsCheckingAddress] = useState(false);
  const [needsAddress, setNeedsAddress] = useState(false);

  const orderingRef = useRef(false);

  // 응답 오류 후 같은 주문을 재시도할 때 requestId 재사용
  const pendingOrderRef = useRef(null);

  // 구매 확인 모달 열기
  const handlePurchase = async () => {
    if (orderingRef.current || isCartBusy || cartItems.length === 0) {
      return;
    }

    const userId = useAuthStore.getState().user?.id;

    if (!userId) {
      navigate("/login");
      return;
    }

    orderingRef.current = true;
    setIsCheckingAddress(true);
    setPurchaseError("");

    try {
      const addresses = await useAddressStore.getState().fetchAddresses(userId);

      if (!addresses) {
        throw new Error("로그인 상태가 변경되었습니다. 다시 확인해주세요.");
      }

      const hasDefaultAddress = addresses.some((address) => address.isDefault);

      setNeedsAddress(!hasDefaultAddress);
      setIsPurchaseModalOpen(true);
    } catch (error) {
      showToast(error.message || "배송지 정보를 확인하지 못했습니다.");
    } finally {
      orderingRef.current = false;
      setIsCheckingAddress(false);
    }
  };

  // 요청 중에는 모달을 닫지 않음
  const handleCloseModal = () => {
    if (orderingRef.current) return;

    setIsPurchaseModalOpen(false);
    setPurchaseError("");
  };

  // 주문 저장 → 구매한 상품 삭제 → 마이페이지 이동
  const handleConfirm = async () => {
    if (orderingRef.current || isCartBusy || cartItems.length === 0) {
      return;
    }

    const userId = useAuthStore.getState().user?.id;

    if (!userId) {
      setIsPurchaseModalOpen(false);
      navigate("/login");
      return;
    }

    // 화면에서 합쳐 보여주는 상품의 원본 항목들
    const sourceItems = cartItems.flatMap((item) => item.sourceItems ?? [item]);

    const cartItemIds = [
      ...new Set(sourceItems.map((item) => item.cartItemId)),
    ];

    if (cartItemIds.some((id) => id == null)) {
      setPurchaseError(
        "상품 정보를 확인할 수 없습니다. 장바구니를 새로고침해 주세요.",
      );
      return;
    }

    orderingRef.current = true;
    setIsOrdering(true);
    setPurchaseError("");

    try {
      // 장바구니로 바로 진입해도 서버 배송지를 조회
      const addresses = await useAddressStore.getState().fetchAddresses(userId);

      if (!addresses) {
        throw new Error("로그인 상태가 변경되었습니다. 다시 확인해 주세요.");
      }

      const address = addresses.find((item) => item.isDefault);

      if (!address) {
        setNeedsAddress(true);
        return;
      }

      // 상품·수량·배송지·혜택이 같으면 같은 요청 ID 사용
      const signature = JSON.stringify({
        userId,
        items: sourceItems.map((item) => ({
          cartItemId: item.cartItemId,
          quantity: item.quantity,
        })),
        addressId: address.addressId,
        benefitId: benefitId || null,
      });

      if (pendingOrderRef.current?.signature !== signature) {
        pendingOrderRef.current = {
          signature,
          requestId: crypto.randomUUID(),
        };
      }

      // API 응답을 기다리기 전에 구매 당시 화면 금액을 확보합니다.
      const displayAmounts = {
        subtotal: productTotal,
        shippingFee,
        discountAmount: discountTotal,
      };

      const result = await createOrder({
        requestId: pendingOrderRef.current.requestId,
        cartItemIds,
        addressId: address.addressId,
        benefitId: benefitId || null,
      });

      if (benefitDiscount > 0) {
        const saved = saveOrderDisplayAmounts(
          userId,
          result.data?.orderId,
          displayAmounts,
        );

        if (!saved) {
          showToast(
            "주문은 저장됐지만 시연용 할인 금액은 이 브라우저에 저장하지 못했습니다.",
          );
        }
      }

      // 여기부터는 주문 저장이 성공한 상태
      // 장바구니 삭제 실패를 주문 실패로 처리하지 않음
      let cartRemoved = true;

      try {
        await deleteSelectedCartItems(cartItemIds);
      } catch {
        cartRemoved = false;
      }

      // 장바구니 화면과 헤더의 상품 수 갱신
      try {
        await useCartStore.getState().fetchCart();
      } catch {
        // 주문 저장 결과에는 영향을 주지 않음
      }

      pendingOrderRef.current = null;
      setIsPurchaseModalOpen(false);

      showToast(
        cartRemoved
          ? "주문이 저장되었습니다."
          : "주문은 저장됐지만 장바구니 상품 삭제에 실패했습니다. 주문내역을 확인한 뒤 남은 상품을 삭제해주세요.",
      );

      navigate("/mypage");
    } catch (error) {
      setPurchaseError(
        error.message ||
          "주문 요청 결과를 확인하지 못했습니다. 주문내역을 확인해 주세요.",
      );
    } finally {
      orderingRef.current = false;
      setIsOrdering(false);
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

  const isCartBusy = useCartStore(
    (state) => state.isLoading || state.isUpdating,
  );

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
          disabled={isOrdering}
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
        disabled={
          cartItems.length === 0 ||
          isCartBusy ||
          isOrdering ||
          isCheckingAddress
        }
        onClick={handlePurchase}
      >
        {isCheckingAddress
          ? "배송지 확인 중..."
          : isOrdering
            ? "주문 처리 중..."
            : "구매하기"}
      </PurchaseButton>

      {isPurchaseModalOpen && (
        <Modal
          variant="cart"
          isOpen={isPurchaseModalOpen}
          onClose={handleCloseModal}
          title={needsAddress ? "배송지 등록 안내" : "구매 확인"}
        >
          <ModalText>
            {needsAddress
              ? "구매하려면 기본 배송지를 먼저 등록해주세요."
              : "선택한 상품을 주문하시겠습니까?"}
          </ModalText>

          {purchaseError && <p role="alert">{purchaseError}</p>}

          <ModalButtonArea data-modal-actions>
            <ModalCancelButton
              data-modal-cancel
              type="button"
              onClick={handleCloseModal}
              disabled={isOrdering}
            >
              취소
            </ModalCancelButton>

            <ModalDeleteButton
              data-modal-confirm
              type="button"
              disabled={isCartBusy || isOrdering}
              onClick={
                needsAddress
                  ? () => {
                      setIsPurchaseModalOpen(false);
                      navigate("/mypage");
                    }
                  : handleConfirm
              }
            >
              {needsAddress
                ? "배송지 등록하기"
                : isOrdering
                  ? "주문 처리 중..."
                  : "예"}
            </ModalDeleteButton>
          </ModalButtonArea>
        </Modal>
      )}
    </OrderSummary>
  );
}
