import { FooterContainer } from "./Footer.styles.js"
import { ContentContainer } from "./ContentContainer.styles.js"

export default function Footer() {
  return (
    <FooterContainer>
      <ContentContainer className="footer-inner">
        <div className="footer-content">
          <div className="footer-company">
            <h2 className="footer__title">ZOOLEAF</h2>
            <div>
              <p>주식회사 주리프 | 대표 김00</p>
              <p>사업자등록번호 100-00-00000</p>
              <p>통신판매업 신고 제2026-0000-00000호</p>
              <p>서울특별시 00구 00로 123, ZOOLEAF</p>
              <p>help@zooleaf.example </p>
            </div>
          </div>
          <div className="footer-customer">
            <h2 className="footer__title">고객센터</h2>
            <p>02-0000-0000</p>
            <ul>
              <li>운영시간 09:00 - 18:00</li>
              <li>점심시간 12:00 - 13:00</li>
            </ul>
          </div>
          <div className="footer-links">
            <h2 className="footer__title">ZOOLEAF와 함께해요</h2>
            <ul>
              <li>동물원 후원</li>
              <li>자원봉사 안내</li>
              <li>동물복지 프로그램</li>
            </ul>
          </div>
          <div className="footer-partners">
            <h2 className="footer__title">PARTNERS</h2>
            <ul>
              <li>협력기관</li>
              <li>제휴사 안내</li>
              <li>제휴 문의</li>
            </ul>
          </div>
        </div>
        <ul className="footer-policy">
          <li>이용약관</li>
          <li>개인정보처리방침</li>
          <li>이메일무단수집거부</li>
        </ul>
        <p className="footer-copyright">© 2026 ZOOLEAF. All rights reserved.</p>
      </ContentContainer>
    </FooterContainer>
  )
}
