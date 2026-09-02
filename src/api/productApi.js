// 입장권 / 패키지
export const TICKET_DATA = [
  { id: 1, name: '종일권 대인', price: 32000, category: '입장권', target: '가족', theme: '#FFFFFF' },
  { id: 2, name: '종일권 소인', price: 22000, category: '입장권', target: '어린이', theme: '#FFFFFF' },
  { id: 3, name: '종일권 우대', price: 16000, category: '입장권', target: '어린이', theme: '#FFFFFF' },
  { id: 4, name: '오후권 대인', price: 24000, category: '입장권', target: '가족', theme: '#FFFFFF' },
  { id: 5, name: '오후권 소인', price: 16000, category: '입장권', target: '어린이', theme: '#FFFFFF' },
  { id: 6, name: '오후권 우대', price: 12000, category: '입장권', target: '어린이', theme: '#FFFFFF' },
  { id: 7, name: '나이트 사파리 패키지 대인', price: 49000, category: '패키지', target: '가족', theme: '#2C3E35' },
  { id: 8, name: '나이트 사파리 패키지 소인', price: 39000, category: '패키지', target: '어린이', theme: '#2C3E35' },
  { id: 9, name: '나이트 사파리 패키지 우대', price: 25000, category: '패키지', target: '어린이', theme: '#2C3E35' },
  { id: 10, name: '패밀리 네이처 패키지', price: 89000, category: '패키지', target: '가족', theme: '#F1EEE2' },
  { id: 11, name: '커플 데이트 패키지', price: 59000, category: '패키지', target: '커플', theme: '#FEEBF8' },
  { id: 12, name: '드림 투어 패키지', price: 69000, category: '패키지', target: '어린이', theme: '#EBF3FA' },
];

// 굿즈
export const GOODS_DATA = [
  { id: 101, name: '레서판다 봉제인형', price: 35200, originalPrice: 44000, discountRate: 20, badge: 'BEST', category: '인형', image: '/assets/goods/redpanda.png' },
  { id: 102, name: '코끼리 봉제인형', price: 26000, originalPrice: 26000, discountRate: 0, badge: '', category: '인형', image: '/assets/goods/elephant.png' },
  { id: 103, name: '기린 봉제인형', price: 26000, originalPrice: 26000, discountRate: 0, badge: '', category: '인형', image: '/assets/goods/giraffe.png' },
  { id: 104, name: 'ZooLeaf 머그컵', price: 15000, originalPrice: 15000, discountRate: 0, badge: '', category: '생활', image: '/assets/goods/mug.png' },
  { id: 105, name: 'ZooLeaf 스테인리스 보틀', price: 25200, originalPrice: 28000, discountRate: 10, badge: '', category: '생활', image: '/assets/goods/bottle.png' },
  { id: 106, name: 'ZooLeaf 미니원 텀블러', price: 19800, originalPrice: 22000, discountRate: 10, badge: '', category: '생활', image: '/assets/goods/tumbler.png' },
  { id: 107, name: 'ZooLeaf 사파리 탐험 노트', price: 6000, originalPrice: 6000, discountRate: 0, badge: '', category: '문구', image: '/assets/goods/notebook.png' },
  { id: 108, name: 'ZooLeaf 포토카드 & 엽서 세트', price: 10200, originalPrice: 12000, discountRate: 15, badge: '', category: '문구', image: '/assets/goods/postcard.png' },
  { id: 109, name: 'ZooLeaf 주니어 탐험가 세트', price: 33150, originalPrice: 39000, discountRate: 15, badge: '', category: '문구', image: '/assets/goods/explorer_set.png' },
];

// 입장권/패키지 데이터
export const getTickets = async ({ category = '전체', targets = [] } = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...TICKET_DATA];

      if (category && category !== '전체' && category !== '전체상품') {
        filtered = filtered.filter((item) => item.category === category);
      }

      if (targets && targets.length > 0) {
        filtered = filtered.filter((item) => targets.includes(item.target));
      }

      resolve(filtered);
    }, 150);
  });
};

// 굿즈 데이터
export const getGoods = async ({ category = '전체상품', sort = '추천' } = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...GOODS_DATA];

      if (category && category !== '전체상품' && category !== '전체') {
        filtered = filtered.filter((item) => item.category === category);
      }

      if (sort === '낮은가격' || sort === '오름차순') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === '높은가격' || sort === '내림차순') {
        filtered.sort((a, b) => b.price - a.price);
      }

      resolve(filtered);
    }, 150);
  });
};