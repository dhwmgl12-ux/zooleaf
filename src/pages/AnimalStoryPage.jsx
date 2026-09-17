import { useState, useEffect, useRef } from 'react';
import { fetchAnimalStories } from '../api/AnimalStoryApi.js';
import AnimalStoryCard from './AnimalStoryCard.jsx';
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
} from './AnimalStory.style.js';
import Breadcrumb from '../components/common/Breadcrumb.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import ErrorState from '../components/common/ErrorState.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Pagination from '../components/product/Pagination.jsx';

export default function AnimalStory() {
  const [allAnimals, setAllAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentZone, setCurrentZone] = useState('전체');
  const [currentSort, setCurrentSort] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const ITEMS_PER_PAGE = 6;

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

  // 분리한 API 함수를 호출하여 데이터 가져오기
  useEffect(() => {
    const controller = new AbortController();

    const loadAnimals = async () => {
      try {
        setLoading(true);
        setError('');
        const animals = await fetchAnimalStories(controller.signal);
        setAllAnimals(animals);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || '동물 데이터를 불러오지 못했습니다.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadAnimals();

    return () => controller.abort();
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
  const filteredAnimals = allAnimals
    .filter((animal) => {
      if (currentZone === '전체') return true;
      return animal.zone === currentZone;
    })
    .sort((a, b) => {
      if (currentSort === 'name') {
        return a.name.localeCompare(b.name, 'ko');
      }
      return a.id - b.id; // 최신순
    });

  // 2. 페이지네이션 계산
  const totalPages = Math.ceil(filteredAnimals.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAnimals = filteredAnimals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Breadcrumb items={[{ label: '홈', to: '/' }, { label: '동물 이야기' }]} />
      <Container>
        <Title>동물 이야기</Title>
        <SubTitle>자연과 교감하는 ZOOLEAF 동물 친구들</SubTitle>

        <FilterBox>
          <ZoneTabs>
            {['전체', '사파리존', '판다존', '파충류관', '버드가든', '어린이동물원'].map((zone) => (
              <TabBtn key={zone} active={currentZone === zone} onClick={() => handleTabClick(zone)}>
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
                <DropdownItem onClick={() => handleSortSelect('latest')}>전체</DropdownItem>
                <DropdownItem onClick={() => handleSortSelect('name')}>이름순</DropdownItem>
              </DropdownList>
            )}
          </DropdownWrapper>
        </FilterBox>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error} />
        ) : filteredAnimals.length === 0 ? (
          <EmptyState message="등록된 동물 친구가 없습니다." />
        ) : (
          <>
            <AnimalGrid>
              {currentAnimals.map((animal, index) => (
                <AnimalStoryCard key={animal.id} animal={animal} priority={index < 2}/>
              ))}
            </AnimalGrid>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />        
          </>
        )}
      </Container>
    </>
  );
}
