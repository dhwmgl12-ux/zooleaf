const TICKET_DATA = [
  { id: 1, name: '종일권 대인', price: 32000, category: '입장권', target: '가족', theme: '#FFFFFF' },
  { id: 2, name: '종일권 소인', price: 22000, category: '입장권', target: '어린이', theme: '#FFFFFF' },
  { id: 3, name: '종일권 우대', price: 16000, category: '입장권', target: '어린이', theme: '#FFFFFF' },
  { id: 4, name: '오후권 대인', price: 24000, category: '입장권', target: '가족', theme: '#FFFFFF' },
  { id: 5, name: '오후권 소인', price: 16000, category: '입장권', target: '어린이', theme: '#FFFFFF' },
  { id: 6, name: '오후권 우대', price: 12000, category: '입장권', target: '어린이', theme: '#FFFFFF' },
  { id: 7, name: '나이트 사파리 패키지 대인', price: 49000, category: '패키지', target: '커플', theme: '#2C3E35' },
  { id: 8, name: '나이트 사파리 패키지 소인', price: 39000, category: '패키지', target: '어린이', theme: '#2C3E35' },
  { id: 9, name: '나이트 사파리 패키지 우대', price: 25000, category: '패키지', target: '커플', theme: '#2C3E35' },
  { id: 10, name: '패밀리 데이 패키지', price: 89000, category: '패키지', target: '가족', theme: '#F1EEE2' },
  { id: 11, name: '커플 데이트 패키지', price: 59000, category: '패키지', target: '커플', theme: '#FEEBF8' },
  { id: 12, name: '드림 투어 패키지', price: 69000, category: '패키지', target: '가족', theme: '#E2EDF1' },
  { id: 13, name: '연간 멤버십', price: 149000, category: 'Membership', target: '가족', theme: '#FFF891' },
];

const GOODS_DATA = [
  { id: 101, name: '레서판다 봉제인형', price: 35200, originalPrice: 39000, discountRate: 10, category: '인형', badge: 'BEST' },
  { id: 102, name: '코끼리 봉제인형', price: 26000, originalPrice: 26000, discountRate: 0, category: '인형', badge: null },
  { id: 103, name: '기린 봉제인형', price: 26000, originalPrice: 26000, discountRate: 0, category: '인형', badge: null },
  { id: 104, name: 'ZooLeaf 머그컵', price: 15000, originalPrice: 15000, discountRate: 0, category: '생활', badge: null },
  { id: 105, name: 'ZooLeaf 스텐인리스 보틀', price: 25200, originalPrice: 28000, discountRate: 10, category: '생활', badge: null },
  { id: 106, name: 'ZooLeaf 애니멀 텀블러', price: 19800, originalPrice: 22000, discountRate: 10, category: '생활', badge: null },
  { id: 107, name: 'ZooLeaf 사파리 탐험 노트', price: 6000, originalPrice: 6000, discountRate: 0, category: '문구', badge: null },
  { id: 108, name: 'ZooLeaf 포토카드 & 엽서 세트', price: 10200, originalPrice: 12000, discountRate: 15, category: '문구', badge: null },
  { id: 109, name: 'ZooLeaf 주니어 탐험가 세트', price: 33150, originalPrice: 39000, discountRate: 15, category: '문구', badge: null },
];

export async function getTickets(options = {}) {
  const { category = '전체상품', targets = [] } = options;

  await new Promise((resolve) => setTimeout(resolve, 300));

  let result = TICKET_DATA;

  if (category !== '전체상품') {
    result = result.filter((item) => item.category === category);
  }

  if (targets.length > 0) {
    result = result.filter((item) => targets.includes(item.target));
  }

  return result;
}

export async function getGoods(options = {}) {
  const { category = '전체' } = options;

  await new Promise((resolve) => setTimeout(resolve, 300));

  if (category !== '전체') {
    return GOODS_DATA.filter((item) => item.category === category);
  }

  return GOODS_DATA;
}