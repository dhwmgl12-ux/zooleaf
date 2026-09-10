import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import emptyCartImage from "../../assets/images/cart-empty.webp";
import CartItemRow from "./CartItemRow";
import CartOrderSummary from "./CartOrderSummary";
import CartDeleteModal from "./CartDeleteModal";
import useAddressStore from "../../store/addressStore";
import useAuthStore from "../../store/authStore";

import {
  CartTopBar,
  SelectAllLabel,
  CheckBox,
  SelectDeleteButton,
  CartLayout,
  CartContent,
  EmptyCart,
  EmptyCartImage,
  CategorySection,
  CategoryTitle,
  ContinueShoppingButton,
} from "../../pages/CartPage.styles";

// 장바구니 상품 카테고리 정보
const categories = [
  { type: "ticket", title: "입장권 항목" },
  { type: "experience", title: "체험권 항목" },
  { type: "goods", title: "굿즈 항목" },
];

export default function CartContents() {
  const cart = useCart();
  const navigate = useNavigate();

  const userId = useAuthStore((state) => state.user?.id);

  // 마이페이지에서 등록한 기본 배송지가 있는지 확인
  const hasShippingAddress = useAddressStore((state) =>
    Boolean(
      userId &&
      state.addressesByUser[userId]?.some((address) => address.isDefault),
    ),
  );

  // 장바구니 데이터를 불러오는 중일 때 표시
  if (cart.isLoading) return <p role="status">장바구니를 불러오는 중입니다.</p>;

  return (
    <>
      {/* 장바구니 조회/수정 중 발생한 에러 표시*/}
      {cart.error && (
        <div role="alert">
          {cart.error}
          <button
            type="button"
            disabled={cart.isUpdating}
            onClick={cart.fetchCart}
          >
            다시 불러오기
          </button>
        </div>
      )}

      {/* 전체 선택 및 선택 삭제 영역 */}
      <CartTopBar>
        <SelectAllLabel>
          <CheckBox
            type="checkbox"
            checked={cart.isAllSelected}
            onChange={cart.toggleAll}
          />
          전체 선택 ({cart.selectedCount} / {cart.cartItems.length})
        </SelectAllLabel>
        <SelectDeleteButton
          type="button"
          disabled={cart.selectedCount === 0 || cart.isUpdating}
          onClick={() => cart.openDeleteModal()}
        >
          선택 삭제
        </SelectDeleteButton>
      </CartTopBar>

      <CartLayout>
        <CartContent>
          {/* 장바구니가 비어 있을 때 */}
          {cart.cartItems.length === 0 ? (
            <EmptyCart>
              <EmptyCartImage src={emptyCartImage} alt="빈 장바구니" />
              <p>장바구니에 담긴 상품이 없습니다</p>
              <p>다양한 상품들과 굿즈를 둘러보고 쇼핑의 즐거움을 만나보세요</p>
            </EmptyCart>
          ) : (
            // 상품을 카테고리별로 나누어 출력
            categories.map(({ type, title }) => {
              const items = cart.cartItems.filter((item) => item.type === type);
              if (items.length === 0) return null;

              return (
                <CategorySection key={type}>
                  <CategoryTitle>{title}</CategoryTitle>

                  {/* 해당 카테고리의 상품 목록 */}
                  {items.map((item) => (
                    <CartItemRow
                      key={cart.getItemKey(item)}
                      item={item}
                      disabled={cart.isUpdating}
                      selected={cart.isSelected(item)}
                      onSelect={() => cart.toggleItem(item)}
                      onIncrease={() => cart.increaseQuantity(item.cartItemId)}
                      onDecrease={() => cart.decreaseQuantity(item.cartItemId)}
                      onDelete={() => cart.openDeleteModal(item)}
                    />
                  ))}
                </CategorySection>
              );
            })
          )}
          {/* 굿즈 페이지로 이동 */}
          <ContinueShoppingButton
            type="button"
            onClick={() => navigate("/goods")}
          >
            쇼핑 계속하기
          </ContinueShoppingButton>
        </CartContent>
        {/* 결제 금액 요약 영역 */}
        <CartOrderSummary
          cartItems={cart.cartItems}
          hasShippingAddress={hasShippingAddress}
        />
      </CartLayout>

      {/* 상품 삭제 확인 모달 */}
      {cart.deleteModal && (
        <CartDeleteModal
          disabled={cart.isUpdating}
          error={cart.error}
          mode={cart.deleteModal.mode}
          onClose={cart.closeDeleteModal}
          onConfirm={cart.confirmDelete}
        />
      )}
    </>
  );
}
