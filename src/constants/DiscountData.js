import cardImg from '../assets/images/discount-card.webp';
import telImg from '../assets/images/discount-tel.webp';
import affiliateImg from '../assets/images/discount-Affiliate.webp';
import dayImg from '../assets/images/discount-day.webp';

import disabledImg from '../assets/images/discount-disabledPerson.webp';
import soldierImg from '../assets/images/discount-soldier.webp';
import oldsterImg from '../assets/images/discount-oldster.webp';
import veteranImg from '../assets/images/discount-veteran.webp';

export const PARTNERSHIP_DISCOUNTS = [
  {
    id: 1,
    title: '제휴카드 할인',
    benefitName: 'ZOOLEAF 제휴카드 할인',
    discountRate: '종일권 50% 할인',
    target: '제휴카드 회원 본인 + 동반 1인',
    applicableItems: '대인·소인 종일권',
    conditions: [
      { text: '지정 제휴카드', highlight: true },
      { text: '로 결제 시 적용', highlight: false },
    ],
    subCondition: '카드사별 이용 실적 조건이 적용될 수 있음',
    image: affiliateImg,
  },
  {
    id: 2,
    title: '통신사 멤버십 할인',
    benefitName: 'ZOOLEAF 통신사 멤버십 할인',
    discountRate: '종일권 40% 할인',
    target: '제휴 통신사 멤버십 회원',
    applicableItems: '대인·소인 종일권',
    conditions: [
      { text: '유효한 멤버십 인증', highlight: true },
      { text: ' 필요, ', highlight: false },
      { text: '본인', highlight: true },
      { text: '에 한하여 적용', highlight: false },
    ],
    image: telImg,
  },
  {
    id: 3,
    title: '문화누리카드 할인',
    benefitName: '문화누리카드 할인',
    discountRate: '종일권 30% 할인',
    target: '문화누리카드 소지자 본인',
    applicableItems: '종일권',
    conditions: [
      { text: '문화누리카드', highlight: true },
      { text: '로 결제, ', highlight: false },
      { text: '본인', highlight: true },
      { text: '에 한하여 적용', highlight: false },
    ],
    image: cardImg,
  },
  {
    id: 4,
    title: '문화가 있는 날 할인',
    benefitName: 'ZOOLEAF 문화가 있는 날 할인',
    discountRate: '종일권 30% 할인',
    target: '해당 행사일 ZOOLEAF 방문객',
    applicableItems: '대인·소인 종일권',
    useDay: '매월 마지막주 수요일',
    conditions: [
      { text: '해당 행사일', highlight: true },
      { text: '방문 시 적용, ', highlight: false },
      { text: '지정된 날짜', highlight: true },
      { text: '에만 이용 가능', highlight: false },
    ],
    image: dayImg,
  },
];

export const SPECIAL_DISCOUNTS = [
  {
    id: 1,
    image: disabledImg,
    descriptions: [
      '장애인 1~3급: 본인 및 동반 1인 50% 할인 (복지카드 소지자)',
      '장애인 4~6급: 본인 50% 할인 (복지카드 소지자)',
    ],
  },
  {
    id: 2,
    image: soldierImg,
    descriptions: [
      '군인/군무원: 할인 또는 현역병 우대 혜택 적용 (휴가증, 외출증등 신분 증빙 서류 지참)',
      '국군 장병 특별 우대: 휴가자 본인 할인 적용 (휴가증 및 군인 신분증 제시)',
    ],
  },
  {
    id: 3,
    image: oldsterImg,
    descriptions: ['만 65세 이상 본인 50% 할인 (신분증 지참)'],
  },
  {
    id: 4,
    image: veteranImg,
    descriptions: ['본인 및 유족/배우자 50% 할인 (유공자증 또는 증서 제시 시)'],
  },
];
