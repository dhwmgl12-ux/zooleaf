import CartContents from "../components/cart/CartContents";
import { Container, Title } from "./CartPage.styles";

export default function CartPage() {
  return (
    <Container>
      <Title>장바구니</Title>
      <CartContents />
    </Container>
  );
}
