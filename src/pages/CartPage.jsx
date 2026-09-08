import useCart from "../hooks/useCart";
import {
  Container,
  Title,
  CartTopBar,
  SelectAllLabel,
  CheckBox,
} from "./CartPage.styles";

export default function CartPage() {
  const cart = useCart();

  return (
    <Container>
      <Title>장바구니</Title>
      <CartTopBar>
        <SelectAllLabel>
          <CheckBox
            type="checkbox"
            checked={cart.isAllSelected}
            onChange={cart.toggleAll}
          />
          전체 선택 ({cart.selectedCount} / {cart.cartItems.length})
        </SelectAllLabel>
      </CartTopBar>
    </Container>
  );
}
