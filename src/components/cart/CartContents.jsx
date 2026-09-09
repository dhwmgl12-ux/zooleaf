import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import emptyCartImage from "../../assets/images/cart-empty.webp";
import CartItemRow from "./CartItemRow";
import CartOrderSummary from "./CartOrderSummary";
import CartDeleteModal from "./CartDeleteModal";
import {
  CartTopBar, SelectAllLabel, CheckBox, SelectDeleteButton,
  CartLayout, CartContent, EmptyCart, EmptyCartImage,
  CategorySection, CategoryTitle, ContinueShoppingButton,
} from "../../pages/CartPage.styles";

const categories = [
  { type: "ticket", title: "입장권 항목" },
  { type: "experience", title: "체험권 항목" },
  { type: "goods", title: "굿즈 항목" },
];

export default function CartContents() {
  const cart = useCart();
  const navigate = useNavigate();

  if (cart.isLoading) return <p role="status">장바구니를 불러오는 중입니다.</p>;

  return (
    <>
      {cart.error && <div role="alert">{cart.error}<button type="button" disabled={cart.isUpdating} onClick={cart.fetchCart}>다시 불러오기</button></div>}
      <CartTopBar>
        <SelectAllLabel>
          <CheckBox type="checkbox" checked={cart.isAllSelected} onChange={cart.toggleAll} />
          전체 선택 ({cart.selectedCount} / {cart.cartItems.length})
        </SelectAllLabel>
        <SelectDeleteButton type="button" disabled={cart.selectedCount === 0 || cart.isUpdating} onClick={() => cart.openDeleteModal()}>
          선택 삭제
        </SelectDeleteButton>
      </CartTopBar>
      <CartLayout>
        <CartContent>
          {cart.cartItems.length === 0 ? (
            <EmptyCart>
              <EmptyCartImage src={emptyCartImage} alt="빈 장바구니" />
              <p>장바구니에 담긴 상품이 없습니다</p>
              <p>다양한 상품들과 굿즈를 둘러보고 쇼핑의 즐거움을 만나보세요</p>
            </EmptyCart>
          ) : categories.map(({ type, title }) => {
            const items = cart.cartItems.filter((item) => item.type === type);
            if (items.length === 0) return null;

            return (
              <CategorySection key={type}>
                <CategoryTitle>{title}</CategoryTitle>
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
          })}
          <ContinueShoppingButton type="button" onClick={() => navigate("/goods")}>
            쇼핑 계속하기
          </ContinueShoppingButton>
        </CartContent>
        <CartOrderSummary cartItems={cart.cartItems} />
      </CartLayout>
      {cart.deleteModal && (
        <CartDeleteModal disabled={cart.isUpdating} error={cart.error} mode={cart.deleteModal.mode} onClose={cart.closeDeleteModal} onConfirm={cart.confirmDelete} />
      )}
    </>
  );
}


