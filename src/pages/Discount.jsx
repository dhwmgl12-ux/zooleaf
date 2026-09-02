import "./variables.js";

export default function Discount() {
  return (
    <>
      <main class="container">
        <div class="page-title-area">
          <p class="breadcrumb">
            홈 &gt; 입장료&amp;혜택안내 &gt; 제휴&amp;할인
          </p>
          <h1 class="page-title">제휴&amp;할인</h1>
        </div>

        <section class="notice-box">
          <h2>주의사항</h2>
          <p>다른 할인과 중복 적용 불가</p>
        </section>

        <section class="discount-section">
          <h2 class="section-title">제휴카드 할인</h2>

          <div class="card-item">
            <div class="card-thumb">
              <img src="card-sample.png" alt="제휴카드 이미지" />
            </div>
            <div class="card-desc">
              <h3>제휴카드 할인</h3>
              <p class="target">
                <strong>혜택:</strong> 신용카드, 간편결제사 제휴할인 등...
              </p>
              <p class="condition">
                <strong>기준:</strong> 전월실적 충족 시 적용
              </p>
            </div>
          </div>
        </section>

        <section class="benefit-section">
          <h2 class="section-title">우대 적용</h2>

          <div class="benefit-item">
            <div class="benefit-icon">♿</div>
            <div class="benefit-desc">
              <p>장애인 (중증): 본인 및 보호자 1인 50% 할인</p>
              <p>(복지카드 소지자)</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
