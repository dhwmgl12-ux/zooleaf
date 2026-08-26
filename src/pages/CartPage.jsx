import useCartStore from "../store/cartStore";

function CartPage() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  // 티켓 / 패키지
  const ticketItems = cartItems.filter((item) => item.type === "ticket");

  // 체험 프로그램
  const experienceItems = cartItems.filter(
    (item) => item.type === "experience",
  );

  // 굿즈
  const goodsItems = cartItems.filter((item) => item.type === "goods");

  // 상품 금액
  const productTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // 할인 금액
  const discountTotal = cartItems.reduce((sum, item) => {
    const discountRate = item.discountRate ?? 0;

    return sum + item.price * discountRate * item.quantity;
  }, 0);

  // 굿즈가 있을 경우에만 배송비
  const hasGoods = goodsItems.length > 0;
  const shippingFee = hasGoods ? 3000 : 0;

  // 최종 금액
  const finalTotal = productTotal - discountTotal + shippingFee;

  return (
    <main className="cart-page">
      <h1>장바구니</h1>

      <div className="cart-layout">
        <section className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>장바구니에 담긴 상품이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* 티켓 / 패키지 */}
              {ticketItems.length > 0 && (
                <section className="cart-category">
                  <h2>티켓 / 패키지</h2>

                  {ticketItems.map((item) => (
                    <article
                      key={`${item.type}-${item.id}`}
                      className="cart-item"
                    >
                      <img src={item.imageUrl} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        {item.visitDate && <p>이용일: {item.visitDate}</p>}

                        <p>인원: {item.quantity}명</p>

                        <p>{item.price.toLocaleString()}원 / 1인</p>
                      </div>

                      <div className="cart-item-price">
                        <strong>
                          {(item.price * item.quantity).toLocaleString()}원
                        </strong>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.type)}
                        >
                          삭제
                        </button>
                      </div>
                    </article>
                  ))}
                </section>
              )}

              {/* 체험 프로그램 */}
              {experienceItems.length > 0 && (
                <section className="cart-category">
                  <h2>체험 프로그램</h2>

                  {experienceItems.map((item) => (
                    <article
                      key={`${item.type}-${item.id}`}
                      className="cart-item"
                    >
                      <img src={item.imageUrl} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        {item.visitDate && <p>이용일: {item.visitDate}</p>}

                        {item.time && <p>시간: {item.time}</p>}

                        <p>인원: {item.quantity}명</p>

                        <p>{item.price.toLocaleString()}원 / 1인</p>
                      </div>

                      <div className="cart-item-price">
                        <strong>
                          {(item.price * item.quantity).toLocaleString()}원
                        </strong>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.type)}
                        >
                          삭제
                        </button>
                      </div>
                    </article>
                  ))}
                </section>
              )}

              {/* ZooLeaf 굿즈 */}
              {goodsItems.length > 0 && (
                <section className="cart-category">
                  <h2>ZooLeaf 굿즈</h2>

                  {goodsItems.map((item) => (
                    <article
                      key={`${item.type}-${item.id}-${item.option ?? ""}`}
                      className="cart-item"
                    >
                      <img src={item.imageUrl} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        {item.option && <p>옵션: {item.option}</p>}

                        <p>{item.price.toLocaleString()}원</p>

                        <div className="quantity-control">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id, item.type)}
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id, item.type)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-price">
                        <strong>
                          {(item.price * item.quantity).toLocaleString()}원
                        </strong>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.type)}
                        >
                          삭제
                        </button>
                      </div>
                    </article>
                  ))}
                </section>
              )}
            </>
          )}
        </section>

        {/* 구매 요약 */}
        <aside className="order-summary">
          <h2>구매 하기</h2>

          <div className="summary-row">
            <span>상품 금액</span>

            <strong>{productTotal.toLocaleString()}원</strong>
          </div>

          <div className="summary-row">
            <span>할인 금액</span>

            <strong>- {discountTotal.toLocaleString()}원</strong>
          </div>

          <div className="summary-row">
            <span>배송비</span>

            <strong>{shippingFee.toLocaleString()}원</strong>
          </div>

          <hr />

          <div className="summary-row total">
            <span>총 금액</span>

            <strong>{finalTotal.toLocaleString()}원</strong>
          </div>

          <button type="button" disabled={cartItems.length === 0}>
            구매 하기
          </button>
        </aside>
      </div>
    </main>
  );
}

export default CartPage;
