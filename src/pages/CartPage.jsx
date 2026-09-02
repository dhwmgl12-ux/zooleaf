import useCartStore from "../store/cartStore";

function CartPage() {
  {
    /*Zustand 장바구니 상태와 기능 가져오기 */
  }
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();

  {
    /* 장바구니에서 티켓 상품만 추출 */
  }
  const ticketItems = cartItems.filter((item) => item.type === "ticket");

  {
    /* 장바구니에서 체험 프로그램만 추출 */
  }
  const experienceItems = cartItems.filter(
    (item) => item.type === "experience",
  );

  {
    /* 장바구니에서 굿즈만 추출 */
  }
  const goodsItems = cartItems.filter((item) => item.type === "goods");

  {
    /* 전체 상품 금액 계산 */
  }
  {
    /* 각 상품의 가격 × 수량을 모두 더함 */
  }
  const productTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  {
    /* 전체 할인 금액 계산 */
  }
  const discountTotal = cartItems.reduce((sum, item) => {
    // discountRate가 없으면 0으로 처리
    const discountRate = item.discountRate ?? 0;

    // 가격 × 할인율 × 수량을 누적
    return sum + item.price * discountRate * item.quantity;
  }, 0);

  {
    /* 굿즈가 하나라도 있는지 확인 */
  }
  const hasGoods = goodsItems.length > 0;

  {
    /* 굿즈가 있으면 배송비 3,000원, 없으면 0원*/
  }
  const shippingFee = hasGoods ? 3000 : 0;

  {
    /*최종 결제 금액 계산*/
  }
  const finalTotal = productTotal - discountTotal + shippingFee;

  return (
    <main className="cart-page">
      <h1>장바구니</h1>

      <div className="cart-layout">
        <section className="cart-content">
          {/* 장바구니가 비어 있는지 확인 */}
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>장바구니에 담긴 상품이 없습니다.</p>
            </div>
          ) : (
            <>
              {/* 티켓 / 패키지 영역 */}
              {ticketItems.length > 0 && (
                <section className="cart-category">
                  <h2>티켓 / 패키지</h2>

                  {/* 티켓 상품들을 하나씩 화면에 출력 */}
                  {ticketItems.map((item) => (
                    <article
                      key={`${item.type}-${item.id}`}
                      className="cart-item"
                    >
                      {/* 상품 이미지 */}
                      <img src={item.imageUrl} alt={item.name} />

                      <div className="cart-item-info">
                        {/* 상품 이름 */}
                        <h3>{item.name}</h3>

                        {/* 이용일이 있을 때만 표시 */}
                        {item.visitDate && <p>이용일: {item.visitDate}</p>}

                        {/* 선택 인원 */}
                        <p>인원: {item.quantity}명</p>

                        {/* 1인당 가격 */}
                        <p>{item.price.toLocaleString()}원 / 1인</p>
                      </div>

                      <div className="cart-item-price">
                        {/* 상품 총 가격 = 가격 × 인원 */}
                        <strong>
                          {(item.price * item.quantity).toLocaleString()}원
                        </strong>

                        {/* 해당 상품 삭제 */}
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

              {/* 체험 프로그램 영역 */}
              {experienceItems.length > 0 && (
                <section className="cart-category">
                  <h2>체험 프로그램</h2>

                  {/* 체험 프로그램들을 하나씩 출력 */}
                  {experienceItems.map((item) => (
                    <article
                      key={`${item.type}-${item.id}`}
                      className="cart-item"
                    >
                      <img src={item.imageUrl} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        {/* 이용일이 있을 때만 표시 */}
                        {item.visitDate && <p>이용일: {item.visitDate}</p>}

                        {/* 체험 시간이 있을 때만 표시 */}
                        {item.time && <p>시간: {item.time}</p>}

                        <p>인원: {item.quantity}명</p>

                        <p>{item.price.toLocaleString()}원 / 1인</p>
                      </div>

                      <div className="cart-item-price">
                        {/* 체험 프로그램 총 가격 */}
                        <strong>
                          {(item.price * item.quantity).toLocaleString()}원
                        </strong>

                        {/* 해당 체험 상품 삭제 */}
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

              {/* ZooLeaf 굿즈 영역 */}
              {goodsItems.length > 0 && (
                <section className="cart-category">
                  <h2>ZooLeaf 굿즈</h2>

                  {/* 굿즈 상품들을 하나씩 출력 */}
                  {/* 옵션이 다른 같은 상품도 구분하기 위해 option 포함*/}
                  {goodsItems.map((item) => (
                    <article
                      key={`${item.type}-${item.id}-${item.option ?? ""}`}
                      className="cart-item"
                    >
                      <img src={item.imageUrl} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        {/* 옵션이 있을 때만 표시 */}
                        {item.option && <p>옵션: {item.option}</p>}

                        <p>{item.price.toLocaleString()}원</p>

                        {/* 굿즈 수량 조절 */}
                        {/* 수량 1 감소 */}
                        <div className="quantity-control">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id, item.type)}
                          >
                            -
                          </button>

                          {/* 현재 수량 */}
                          {/* 수량 1 증가 */}
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
                        {/* 굿즈 총 가격 = 가격 × 수량 */}
                        <strong>
                          {(item.price * item.quantity).toLocaleString()}원
                        </strong>

                        {/* 해당 굿즈 삭제 */}
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

        {/* 오른쪽 구매 금액 요약 영역 */}
        <aside className="order-summary">
          <h2>구매 하기</h2>

          {/* 할인 적용 전 상품 총액 */}
          <div className="summary-row">
            <span>상품 금액</span>

            <strong>{productTotal.toLocaleString()}원</strong>
          </div>

          {/* 전체 할인 금액 */}
          <div className="summary-row">
            <span>할인 금액</span>

            <strong>-{discountTotal.toLocaleString()}원</strong>
          </div>

          {/* 굿즈가 있을 때만 발생하는 배송비 */}
          <div className="summary-row">
            <span>배송비</span>

            <strong>{shippingFee.toLocaleString()}원</strong>
          </div>

          <hr />

          {/* 실제 최종 결제 금액 */}
          <div className="summary-row total">
            <span>총 금액</span>

            <strong>{finalTotal.toLocaleString()}원</strong>
          </div>

          {/* 장바구니가 비어 있으면 구매 버튼 비활성화 */}
          <button type="button" disabled={cartItems.length === 0}>
            구매 하기
          </button>
        </aside>
      </div>
    </main>
  );
}

export default CartPage;
