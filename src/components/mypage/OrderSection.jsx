import { useEffect, useRef, useState } from "react";
import Modal from "../common/Modal";
import useAuthStore from "../../store/authStore";
import useOrderStore from "../../store/orderStore";
import useToastStore from "../../store/toastStore";
import { statusLabels } from "../../utils/orderStatus";
import {
  Card,
  CardHeader,
  HeadingGroup,
  CardTitle,
  IconCircle,
  OutlineButton,
  ProfileModalActions,
  ProfileCancelButton,
  ProfileSaveButton,
  OrderEmpty,
  OrderList,
  OrderCard,
  OrderBodyButton,
  OrderThumbnail,
  OrderText,
  OrderSide,
  OrderStatus,
  OrderActions,
  OrderModalContent,
  OrderInfoGrid,
  OrderInfoBox,
  OrderProduct,
  OrderProductTitle,
  OrderAmountBox,
  OrderAmountRow,
  OrderGrandTotal,
  DeliveryPanel,
  DeliveryTitle,
} from "../../pages/Mypage.styles";

const emptyOrders = [];

const formatMoney = (amount) => `${amount.toLocaleString("ko-KR")}원`;

const formatDate = (value) =>
  new Date(value).toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

const formatDateTime = (value) =>
  new Date(value).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

export default function OrderSection() {
  const userId = useAuthStore((state) => state.user?.id);
  const showToast = useToastStore((state) => state.showToast);

  const orders = useOrderStore(
    (state) => state.ordersByUser[userId] ?? emptyOrders,
  );
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const cancelOrder = useOrderStore((state) => state.cancelOrder);

  // type: detail / cancel / delivery / returns
  const [modal, setModal] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const cancellingRef = useRef(false);

  useEffect(() => {
    let ignore = false;

    const loadOrders = async () => {
      setIsLoading(true);
      setLoadError("");
      setModal(null);

      try {
        await fetchOrders(userId);
      } catch (error) {
        if (!ignore) {
          setLoadError(error.message || "주문 내역을 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      ignore = true;
    };
  }, [userId, fetchOrders, retryCount]);

  const selectedOrder = orders.find(
    (order) => order.orderId === modal?.orderId,
  );

  const selectedStatus = selectedOrder?.status;

  const closeModal = () => {
    if (cancellingRef.current) return;

    setModal(null);
    setCancelError("");
  };

  const openModal = (type, orderId) => {
    if (cancellingRef.current) return;

    setCancelError("");
    setModal({ type, orderId });
  };

  const handleCancel = async () => {
    if (!selectedOrder || cancellingRef.current) return;

    if (selectedOrder.status !== "paid") {
      setCancelError("결제 완료 상태의 주문만 취소할 수 있습니다.");
      return;
    }

    cancellingRef.current = true;
    setIsCancelling(true);
    setCancelError("");

    try {
      await cancelOrder(userId, selectedOrder.orderId);

      // 서버에서 취소가 완료된 뒤 모달 닫기
      setModal(null);
      showToast("주문을 취소했습니다.");

      // 취소 성공과 목록 재조회 실패를 구분
      setIsLoading(true);
      setLoadError("");

      try {
        await fetchOrders(userId);
      } catch {
        setLoadError(
          "주문 취소는 완료됐지만 목록을 불러오지 못했습니다. 다시 불러오기를 눌러주세요.",
        );
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      // 취소 실패 시 모달을 유지하고 오류 표시
      setCancelError(
        error.message || "주문 취소에 실패했습니다. 다시 시도해 주세요.",
      );
    } finally {
      cancellingRef.current = false;
      setIsCancelling(false);
    }
  };

  const modalTitles = {
    detail: "주문내역",
    cancel: "주문 취소할까요?",
    delivery: "배송 조회",
    returns: "교환/반품",
  };

  return (
    <Card>
      <CardHeader>
        <HeadingGroup>
          <IconCircle aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 4H5v18h14V4h-3" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
              <path d="M9 11h6M9 15h6M9 19h4" />
            </svg>
          </IconCircle>

          <div>
            <CardTitle>주문 내역 조회</CardTitle>
            <p>최근 주문한 내역을 확인할 수 있습니다.</p>
          </div>
        </HeadingGroup>
      </CardHeader>

      {isLoading ? (
        <p role="status">주문 내역을 불러오는 중입니다.</p>
      ) : loadError ? (
        <div role="alert">
          <p>{loadError}</p>
          <OutlineButton
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            다시 불러오기
          </OutlineButton>
        </div>
      ) : orders.length === 0 ? (
        <OrderEmpty>
          <p>현재 주문한 내역이 없습니다.</p>
          <p>상품을 구매해주세요.</p>
        </OrderEmpty>
      ) : (
        <OrderList>
          {orders.map((order) => {
            const firstItem = order.items[0];
            const otherCount = Math.max(0, order.items.length - 1);

            const hasGoods = order.items.some(
              (item) => item.itemType === "goods",
            );

            // 추가
            const status = order.status;

            return (
              <OrderCard key={order.orderId}>
                <OrderBodyButton
                  type="button"
                  onClick={() => openModal("detail", order.orderId)}
                  aria-label={`${order.orderNumber} 주문 상세 보기`}
                >
                  {firstItem?.imageUrl ? (
                    <OrderThumbnail src={firstItem.imageUrl} alt="" />
                  ) : (
                    <OrderThumbnail as="span" aria-hidden="true">
                      상품
                    </OrderThumbnail>
                  )}

                  <OrderText>
                    <small>주문번호: {order.orderNumber}</small>

                    <strong>
                      {firstItem?.name ?? "상품 정보 없음"}
                      {otherCount > 0 && ` 외 ${otherCount}종`}
                    </strong>

                    <span>
                      {formatDate(order.createdAt)}
                      {" · "}
                      {formatMoney(order.totalAmount)}
                    </span>
                  </OrderText>
                </OrderBodyButton>

                <OrderSide>
                  <OrderStatus>{statusLabels[status]}</OrderStatus>

                  <OrderActions>
                    {status === "paid" && (
                      <OutlineButton
                        type="button"
                        onClick={() => openModal("cancel", order.orderId)}
                      >
                        주문 취소
                      </OutlineButton>
                    )}

                    {hasGoods &&
                      (status === "shipping" || status === "delivered") && (
                        <OutlineButton
                          type="button"
                          onClick={() => openModal("delivery", order.orderId)}
                        >
                          배송 조회
                        </OutlineButton>
                      )}

                    {hasGoods && status === "delivered" && (
                      <OutlineButton
                        type="button"
                        onClick={() => openModal("returns", order.orderId)}
                      >
                        교환/반품
                      </OutlineButton>
                    )}
                  </OrderActions>
                </OrderSide>
              </OrderCard>
            );
          })}
        </OrderList>
      )}

      <Modal
        variant="mypage"
        isOpen={Boolean(modal && selectedOrder)}
        onClose={closeModal}
        title={modalTitles[modal?.type] ?? "주문내역"}
      >
        {selectedOrder && (
          <OrderModalContent>
            {/* 주문 상세 */}
            {modal?.type === "detail" && (
              <>
                <p>주문번호: {selectedOrder.orderNumber}</p>

                <OrderInfoGrid>
                  <OrderInfoBox>
                    <span>주문 일시</span>
                    <strong>{formatDateTime(selectedOrder.createdAt)}</strong>
                  </OrderInfoBox>

                  <OrderInfoBox>
                    <span>주문 상태</span>
                    <strong>{statusLabels[selectedStatus]}</strong>
                  </OrderInfoBox>
                </OrderInfoGrid>

                {selectedOrder.items.map((item) => (
                  <OrderProduct key={item.orderItemId}>
                    {item.imageUrl ? (
                      <OrderThumbnail src={item.imageUrl} alt="" />
                    ) : (
                      <OrderThumbnail as="span" aria-hidden="true">
                        상품
                      </OrderThumbnail>
                    )}

                    <div>
                      <OrderProductTitle>{item.name}</OrderProductTitle>
                      <p>
                        {item.option ? `${item.option} · ` : ""}
                        수량 {item.quantity}개
                      </p>
                      {item.visitDate && <p>이용일: {item.visitDate}</p>}
                      <p>단가 {formatMoney(item.unitPrice)}</p>
                      <strong>{formatMoney(item.lineTotal)}</strong>
                    </div>
                  </OrderProduct>
                ))}

                <OrderAmountBox>
                  <OrderAmountRow>
                    <span>상품 금액</span>
                    <span>{formatMoney(selectedOrder.subtotal)}</span>
                  </OrderAmountRow>

                  <OrderAmountRow>
                    <span>배송비</span>
                    <span>{formatMoney(selectedOrder.shippingFee)}</span>
                  </OrderAmountRow>

                  <OrderAmountRow>
                    <span>할인</span>
                    <span>-{formatMoney(selectedOrder.discountAmount)}</span>
                  </OrderAmountRow>

                  <OrderGrandTotal>
                    <strong>총 결제 금액</strong>
                    <strong>{formatMoney(selectedOrder.totalAmount)}</strong>
                  </OrderGrandTotal>
                </OrderAmountBox>
              </>
            )}

            {/* 주문 취소 확인 */}
            {modal?.type === "cancel" && (
              <>
                <p>선택한 주문 전체가 취소 처리됩니다.</p>
                <p>계속 진행하시겠어요?</p>

                {cancelError && (
                  <p role="alert" style={{ color: "#b42318" }}>
                    {cancelError}
                  </p>
                )}

                <ProfileModalActions data-order-modal-actions>
                  <ProfileCancelButton
                    type="button"
                    onClick={closeModal}
                    disabled={isCancelling}
                  >
                    돌아가기
                  </ProfileCancelButton>

                  <ProfileSaveButton
                    type="button"
                    onClick={handleCancel}
                    disabled={isCancelling}
                  >
                    {isCancelling ? "취소 처리 중..." : "주문 취소"}
                  </ProfileSaveButton>
                </ProfileModalActions>
              </>
            )}

            {/* 배송 조회 */}
            {modal?.type === "delivery" && (
              <>
                <p>주문번호: {selectedOrder.orderNumber}</p>

                <DeliveryPanel>
                  <p>현재 배송 상태</p>

                  <DeliveryTitle>
                    {statusLabels[selectedStatus] ?? "상태 확인 필요"}
                  </DeliveryTitle>

                  {selectedOrder.tracking?.trackingNumber ? (
                    <>
                      <p>
                        택배사: {selectedOrder.tracking.carrier || "미등록"}
                      </p>
                      <p>
                        운송장 번호: {selectedOrder.tracking.trackingNumber}
                      </p>
                    </>
                  ) : (
                    <p>아직 운송장 정보가 등록되지 않았습니다.</p>
                  )}

                  {selectedStatus === "delivered" &&
                    selectedOrder.tracking?.deliveredAt && (
                      <p>
                        배송 완료 일시:{" "}
                        {formatDateTime(selectedOrder.tracking.deliveredAt)}
                      </p>
                    )}

                  <small>주문 조회 시 서버에서 받은 배송 정보입니다.</small>
                </DeliveryPanel>

                {selectedOrder.shippingAddress && (
                  <DeliveryPanel>
                    <DeliveryTitle>받는 곳</DeliveryTitle>
                    <p>
                      받는 분: {selectedOrder.shippingAddress.recipientName}
                    </p>
                    <p>연락처: {selectedOrder.shippingAddress.phone}</p>
                    <p>주소: {selectedOrder.shippingAddress.address}</p>
                  </DeliveryPanel>
                )}

                <ProfileSaveButton type="button" onClick={closeModal}>
                  확인
                </ProfileSaveButton>
              </>
            )}

            {/* 교환/반품 안내 */}
            {modal?.type === "returns" && (
              <>
                <p>현재 사이트에서는 교환/반품 신청을 지원하지 않습니다.</p>
                <p>이 화면에서는 신청이 접수되지 않습니다.</p>

                <ProfileSaveButton type="button" onClick={closeModal}>
                  확인
                </ProfileSaveButton>
              </>
            )}
          </OrderModalContent>
        )}
      </Modal>
    </Card>
  );
}
