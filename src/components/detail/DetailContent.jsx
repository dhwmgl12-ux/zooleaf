import { DetailContentContainer } from "./DetailContent.styles.js";

export default function DetailContent({product}) {
  const {
    name,
    detailImage,
  } = product;

  return (
    <DetailContentContainer className="detail-content">
      <ul className="detail-utils">
        <li><a href="#detail-description">상세 설명</a></li>
        <li><a href="#detail-guide">이용 안내</a></li>
        <li><a href="#detail-refund">취소/환불</a></li>
      </ul>

      <section id="detail-description" className="detail-description">
        {detailImage ? (
          <img src={detailImage} alt={`&{name} 상세 설명`} />
        ) : (
          <p>등록된 상세 이미지가 없습니다.</p>
        )}
      </section>

      <section id="detail-guide" className="detail-guide">
        <h2>이용 안내</h2>
        <ul>
          <li>상품 구매 전 옵션 및 상품 정보를 반드시 확인해 주세요.</li>
          <li>상품 이미지는 모니터 환경에 따라 실제 색상과 차이가 있을 수 있습니다.</li>
          <li>상품 준비 및 배송 상황에 따라 배송 일정이 변경될 수 있습니다.</li>
          <li>상품 관련 문의는 고객센터를 이용해 주세요.</li>
        </ul>
      </section>

      <section id="detail-refund" className="detail-refund">
        <h2>취소 / 환불 안내</h2>
        <ul>
          <li>상품 준비 전에는 주문 취소가 가능합니다.</li>
          <li>단순 변심에 의한 반품은 상품 수령 후 7일 이내 신청해 주세요.</li>
          <li>배송이 시작된 이후에는 상품 수령 후 반품 절차를 통해 환불이 가능합니다.</li>
          <li>사용 또는 훼손된 상품은 교환 및 환불이 어려울 수 있습니다.</li>
          <li>상품 불량 및 오배송의 경우 배송비는 ZOOLEAF에서 부담합니다.</li>
        </ul>
      </section>
      
    </DetailContentContainer>
  )
}
