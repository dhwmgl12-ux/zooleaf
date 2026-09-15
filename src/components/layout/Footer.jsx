import {
  FooterColumn,
  FooterColumnDetails,
  FooterContainer,
  FooterContent,
  FooterCopyright,
  FooterPolicyButton,
  FooterPolicyItem,
  FooterPolicyList,
  FooterTitle,
} from './Footer.styles.js';
import { ContentContainer } from './ContentContainer.styles.js';
import Modal from '../common/Modal.jsx';
import { PRIVACY_POLICY_TEXT, TERMS_TEXT } from '../../constants/legalText.js';
import { useState } from 'react';

export default function Footer() {
  const [openModal, setOpenModal] = useState(null);

  return (
    <FooterContainer>
      <ContentContainer>
        <FooterContent>
          <FooterColumn>
            <FooterTitle>ZOOLEAF</FooterTitle>
            <FooterColumnDetails>
              <p>주식회사 주리프 | 대표 김00</p>
              <p>사업자등록번호 100-00-00000</p>
              <p>통신판매업 신고 제2026-0000-00000호</p>
              <p>서울특별시 00구 00로 123, ZOOLEAF</p>
              <p>help@zooleaf.example </p>
            </FooterColumnDetails>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>고객센터</FooterTitle>
            <FooterColumnDetails>
              <p>02-0000-0000</p>
              <ul>
                <li>운영시간 09:00 - 18:00</li>
                <li>점심시간 12:00 - 13:00</li>
              </ul>
            </FooterColumnDetails>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>ZOOLEAF와 함께해요</FooterTitle>
            <FooterColumnDetails>
              <ul>
                <li>동물원 후원</li>
                <li>자원봉사 안내</li>
                <li>동물복지 프로그램</li>
              </ul>
            </FooterColumnDetails>
          </FooterColumn>

          <FooterColumn>
            <FooterTitle>PARTNERS</FooterTitle>
            <FooterColumnDetails>
              <ul>
                <li>협력기관</li>
                <li>제휴사 안내</li>
                <li>제휴 문의</li>
              </ul>
            </FooterColumnDetails>
          </FooterColumn>
        </FooterContent>

        <FooterPolicyList>
          <FooterPolicyItem>
            <FooterPolicyButton type="button" onClick={() => setOpenModal('terms')}>
              이용약관
            </FooterPolicyButton>
          </FooterPolicyItem>
          <FooterPolicyItem>
            <FooterPolicyButton type="button" onClick={() => setOpenModal('privacy')}>
              개인정보처리방침
            </FooterPolicyButton>
          </FooterPolicyItem>
          <FooterPolicyItem>이메일무단수집거부</FooterPolicyItem>
        </FooterPolicyList>

        <FooterCopyright>© 2026 ZOOLEAF. All rights reserved.</FooterCopyright>
      </ContentContainer>
      <Modal isOpen={openModal === 'terms'} onClose={() => setOpenModal(null)} title="이용약관">
        {TERMS_TEXT}
      </Modal>
      <Modal
        isOpen={openModal === 'privacy'}
        onClose={() => setOpenModal(null)}
        title="개인정보처리방침"
      >
        {PRIVACY_POLICY_TEXT}
      </Modal>
    </FooterContainer>
  );
}
