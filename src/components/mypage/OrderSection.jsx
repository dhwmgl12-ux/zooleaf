import { useState } from "react";
import Modal from "../common/Modal";
import useAuthStore from "../../store/authStore";
import useOrderStore from "../../store/orderStore";
import useToastStore from "../../store/toastStore";
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
  DeliveryEvent,
} from "../../pages/Mypage.styles";

const emptyOrders = [];

const statusLabels = {
  paid: "결제 완료",
  delivered: "배송 완료",
  cancelled: "주문 취소",
};

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
  const cancelOrder = useOrderStore((state) => state.cancelOrder);
  const completeTestDelivery = useOrderStore(
    (state) => state.completeTestDelivery,
  );

  // type: detail / cancel / delivery / returns
  const [modal, setModal] = useState(null);

  const selectedOrder = orders.find(
    (order) => order.orderId === modal?.orderId,
  );

  const closeModal = () => setModal(null);

  const openModal = (type, orderId) => {
    setModal({ type, orderId });
  };

  const handleCancel = () => {
    if (!selectedOrder) return;

    const success = cancelOrder(userId, selectedOrder.orderId);

    showToast(
      success
        ? "테스트 주문을 취소했습니다. 실제 환불은 발생하지 않습니다."
        : "취소할 수 없는 주문입니다.",
    );

    closeModal();
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

      {orders.length === 0 ? (
        <OrderEmpty>
          <p>현재 주문한 내역이 없습니다.</p>
          <p>상품을 구매해주세요.</p>
        </OrderEmpty>
      ) : (
        <OrderList>
          {orders.map((order) => {
            const firstItem = order.items[0];
            const otherCount = order.items.length - 1;
            const hasGoods = order.items.some(
              (item) => item.itemType === "goods",
            );

            return (
              <OrderCard key={order.orderId}>
                <OrderBodyButton
                  type="button"
                  onClick={() => openModal("detail", order.orderId)}
                  aria-label={`${order.orderNumber} 주문 상세 보기`}
                >
                  {firstItem.imageUrl ? (
                    <OrderThumbnail src={firstItem.imageUrl} alt="" />
                  ) : (
                    <OrderThumbnail as="span" aria-hidden="true">
                      상품
                    </OrderThumbnail>
                  )}

                  <OrderText>
                    <small>주문번호: {order.orderNumber}</small>

                    <strong>
                      {firstItem.name}
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
                  <OrderStatus>{statusLabels[order.status]}</OrderStatus>

                  <OrderActions>
                    {order.status === "paid" && (
                      <>
                        <OutlineButton
                          type="button"
                          onClick={() => openModal("cancel", order.orderId)}
                        >
                          주문 취소
                        </OutlineButton>

                        {import.meta.env.DEV && hasGoods && (
                          <OutlineButton
                            type="button"
                            onClick={() =>
                              completeTestDelivery(userId, order.orderId)
                            }
                          >
                            테스트: 배송 완료
                          </OutlineButton>
                        )}
                      </>
                    )}

                    {order.status === "delivered" && (
                      <>
                        <OutlineButton
                          type="button"
                          onClick={() => openModal("delivery", order.orderId)}
                        >
                          배송 조회
                        </OutlineButton>

                        <OutlineButton
                          type="button"
                          onClick={() => openModal("returns", order.orderId)}
                        >
                          교환/반품
                        </OutlineButton>
                      </>
                    )}
                  </OrderActions>
                </OrderSide>
              </OrderCard>
            );
          })}
        </OrderList>
      )}

      <Modal
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
                    <strong>{statusLabels[selectedOrder.status]}</strong>
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

                <ProfileModalActions>
                  <ProfileCancelButton type="button" onClick={closeModal}>
                    취소
                  </ProfileCancelButton>

                  <ProfileSaveButton type="button" onClick={handleCancel}>
                    확인
                  </ProfileSaveButton>
                </ProfileModalActions>
              </>
            )}

            {/* 초록색 테마 배송 조회 */}
            {modal?.type === "delivery" && (
              <>
                <p>{selectedOrder.orderNumber}</p>

                <DeliveryPanel>
                  <p>현재 배송 상태</p>
                  <DeliveryTitle>배송 완료</DeliveryTitle>
                  <p>
                    {selectedOrder.tracking?.carrier}
                    {" · "}
                    {selectedOrder.tracking?.trackingNumber}
                  </p>
                  <small>실제 운송장이 아닌 테스트 배송 정보입니다.</small>
                </DeliveryPanel>

                <DeliveryEvent>
                  <DeliveryTitle>배송 완료</DeliveryTitle>
                  {selectedOrder.tracking?.deliveredAt && (
                    <p>{formatDateTime(selectedOrder.tracking.deliveredAt)}</p>
                  )}
                  <p>상품이 안전하게 배송 완료되었습니다.</p>
                </DeliveryEvent>
              </>
            )}

            {/* 이미지와 동일하게 개발 중 안내 */}
            {modal?.type === "returns" && (
              <>
                <p>교환/반품 페이지는 현재 개발 중이에요.</p>
                <p>조금만 기다려주세요!</p>

                <ProfileModalActions>
                  <ProfileCancelButton type="button" onClick={closeModal}>
                    취소
                  </ProfileCancelButton>

                  <ProfileSaveButton type="button" onClick={closeModal}>
                    확인
                  </ProfileSaveButton>
                </ProfileModalActions>
              </>
            )}
          </OrderModalContent>
        )}
      </Modal>
    </Card>
  );
}
