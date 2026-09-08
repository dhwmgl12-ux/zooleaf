import CartOrderSummary from "../components/cart/CartOrderSummary";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import emptyCartImage from "../assets/images/cart-empty.webp";
import CartItemRow from "../components/cart/CartItemRow";
import {
  Container, Title, CartTopBar, SelectAllLabel, CheckBox,
  CartLayout, CartContent, EmptyCart, EmptyCartImage,
  CategorySection, CategoryTitle, ContinueShoppingButton,
} from "./CartPage.styles";

const categories = [
  { type: "ticket", title: "입장권 항목" },
  { type: "experience", title: "체험권 항목" },
  { type: "goods", title: "굿즈 항목" },
];

export default function CartPage() {
  const cart = useCart();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>장바구니</Title>
      <CartTopBar>
        <SelectAllLabel>
          <CheckBox type="checkbox" checked={cart.isAllSelected} onChange={cart.toggleAll} />
          전체 선택 ({cart.selectedCount} / {cart.cartItems.length})
        </SelectAllLabel>
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
                    selected={cart.isSelected(item)}
                    onSelect={() => cart.toggleItem(item)}
                    onIncrease={() => cart.increaseQuantity(item.id, item.type)}
                    onDecrease={() => cart.decreaseQuantity(item.id, item.type)}
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
    </Container>
  );
}
