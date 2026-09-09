import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Title,
  SubTitle,
  FilterBox,
  ZoneTabs,
  TabBtn,
  DropdownWrapper,
  DropdownHeader,
  DropdownList,
  DropdownItem,
  AnimalGrid,
  AnimalCard,
  AnimalImg,
  AnimalInfo,
  InfoRow,
  TmiBox,
  Pagination,
  PageBtn,
} from './AnimalStory.style.js';

export default function AnimalStory() {
  const [allAnimals, setAllAnimals] = useState([]); // 서버에서 받아온 전체 동물 데이터
  const [currentZone, setCurrentZone] = useState('전체');
  const [currentSort, setCurrentSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 개수

  // 외부 클릭 시 드롭다운 닫기 처리
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 최초 1회 전체 데이터를 넉넉하게(limit=50) 받아와서 상태에 저장
  useEffect(() => {
    const fetchAllAnimals = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
        // 전체 데이터(29마리)를 모두 가져오기 위해 limit을 크게 설정
        const url = `${BASE_URL}/animals?page=1&limit=50`;

        const response = await fetch(url);
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('서버에서 올바른 JSON 응답을 반환하지 않았습니다.');
        }

        const result = await response.json();

        if (result.success) {
          setAllAnimals(result.data.animals);
        }
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
    };

    fetchAllAnimals();
  }, []);

  const handleTabClick = (zone) => {
    setCurrentZone(zone);
    setCurrentPage(1);
  };

  const handleSortSelect = (sortValue) => {
    setCurrentSort(sortValue);
    setIsOpen(false);
    setCurrentPage(1);
  };

  // 1. 존(Zone) 필터링
  let filteredAnimals = allAnimals.filter((animal) => {
    if (currentZone === '전체') return true;
    return animal.zone === currentZone;
  });

  // 2. 전체 데이터 기준 정렬 (이름순 또는 최신순)
  if (currentSort === 'name') {
    filteredAnimals.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  } else {
    // 최신순 (id 기준 오름차순 또는 내림차순 등 기본 정렬)
    filteredAnimals.sort((a, b) => a.id - b.id);
  }

  // 3. 페이지네이션 계산 (6개씩 끊기)
  const totalItems = filteredAnimals.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAnimals = filteredAnimals.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <Container>
      <Title>동물 이야기</Title>
      <SubTitle>자연과 교감하는 ZOOLEAF 동물 친구들</SubTitle>

      <FilterBox>
        <ZoneTabs>
          {[
            '전체',
            '사파리존',
            '판다존',
            '파충류관',
            '버드가든',
            '어린이동물원',
          ].map((zone) => (
            <TabBtn
              key={zone}
              active={currentZone === zone}
              onClick={() => handleTabClick(zone)}
            >
              {zone}
            </TabBtn>
          ))}
        </ZoneTabs>

        <div className="divider" />

        <DropdownWrapper ref={dropdownRef}>
          <DropdownHeader onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
            <span>{currentSort === 'latest' ? '전체' : '이름순'}</span>
            <svg
              width="13"
              height="6"
              viewBox="0 0 13 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 0.5L6.83345 5.5L12.5 0.5"
                stroke="#687C73"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </DropdownHeader>
          {isOpen && (
            <DropdownList>
              <DropdownItem onClick={() => handleSortSelect('latest')}>
                전체
              </DropdownItem>
              <DropdownItem onClick={() => handleSortSelect('name')}>
                이름순
              </DropdownItem>
            </DropdownList>
          )}
        </DropdownWrapper>
      </FilterBox>

      <AnimalGrid>
        {currentAnimals.map((animal) => (
          <AnimalCard key={animal.id}>
            <AnimalImg src={animal.imageUrl} alt={animal.name} />
            <AnimalInfo>
              <h3>
                {animal.name} <span>({animal.species})</span>
              </h3>

              <InfoRow>
                <strong>특징:</strong>
                <span>{animal.description}</span>
              </InfoRow>

              <InfoRow>
                <strong>위치:</strong>
                <span>{animal.zone}</span>
              </InfoRow>

              <TmiBox>
                <span className="tmi-label">사육사가 전하는 동물 TMI</span>
                <p className="tmi-text">{animal.keeperTmi}</p>
              </TmiBox>
            </AnimalInfo>
          </AnimalCard>
        ))}
      </AnimalGrid>

      <Pagination>
        <PageBtn
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt;
        </PageBtn>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <PageBtn
              key={page}
              active={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageBtn>
          ),
        )}

        <PageBtn
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          &gt;
        </PageBtn>
      </Pagination>
    </Container>
  );
}
