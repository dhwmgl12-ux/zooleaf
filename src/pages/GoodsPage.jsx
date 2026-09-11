import { useEffect, useState } from "react";
import GoodsCard from "../components/goods/GoodsCard";
import Pagination from "../components/product/Pagination";
import { getGoods } from "../api/goodsApi";
import { GoodsPageContainer } from "./GoodsPage.styles";

const GOODS_PER_PAGE = 9;
const GRID_COLUMNS = 3;
const GOODS_CATEGORIES = ["전체상품", "문구", "생활", "인형", "패션"];
const SORT_OPTIONS = [
  { value: "", label: "정렬 기준" },
  { value: "오름차순", label: "가격 낮은 순" },
  { value: "내림차순", label: "가격 높은 순" },
];
const DEFAULT_GOODS_ORDER = [
  ["레서판다"],
  ["코끼리"],
  ["기린"],
  ["머그컵"],
  ["보틀"],
  ["텀블러"],
  ["노트"],
  ["포카", "엽서"],
  ["주니어", "탐험가"],
  ["그립톡"],
  ["미러"],
  ["키링"],
  ["캡"],
  ["에코백"],
];

function EmptyCell() {
  return <div aria-hidden="true" />;
}

function getDefaultOrder(name = "") {
  const order = DEFAULT_GOODS_ORDER.findIndex((keywords) =>
    keywords.some((keyword) => name.includes(keyword)),
  );
  return order === -1 ? DEFAULT_GOODS_ORDER.length : order;
}

function getGoodsPrice(goods) {
  return goods.discountRate > 0 && goods.discountPrice != null
    ? goods.discountPrice
    : (goods.price ?? 0);
}

export default function GoodsPage() {
  const [goods, setGoods] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    subCategory: "전체상품",
    sort: "",
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const usesDefaultOrder = filters.subCategory === "전체상품" && !filters.sort;
  const usesClientPagination = usesDefaultOrder || Boolean(filters.sort);
  const orderedGoods = [...goods].sort((first, second) => {
    if (usesDefaultOrder) {
      return getDefaultOrder(first.name) - getDefaultOrder(second.name);
    }

    if (filters.sort === "오름차순") {
      return getGoodsPrice(first) - getGoodsPrice(second);
    }

    if (filters.sort === "내림차순") {
      return getGoodsPrice(second) - getGoodsPrice(first);
    }

    return 0;
  });
  const displayedGoods = usesClientPagination
    ? orderedGoods.slice(
        (filters.page - 1) * GOODS_PER_PAGE,
        filters.page * GOODS_PER_PAGE,
      )
    : orderedGoods;

  const handleSelectCategory = (subCategory) => {
    setFilters((prev) => ({ ...prev, subCategory, page: 1 }));
  };

  const handleSelectSort = (sort) => {
    setFilters((prev) => ({ ...prev, sort, page: 1 }));
    setIsSortOpen(false);
  };

  const selectedSortLabel = SORT_OPTIONS.find(
    (option) => option.value === filters.sort,
  )?.label;

  useEffect(() => {
    const controller = new AbortController();

    const fetchGoods = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getGoods({
          subCategory: filters.subCategory,
          sort: filters.sort,
          page: usesClientPagination ? 1 : filters.page,
          limit: GOODS_PER_PAGE,
          signal: controller.signal,
        });

        if (usesClientPagination) {
          const totalPageCount = data?.pagination?.totalPages ?? 1;
          const remainingPages = Array.from(
            { length: Math.max(0, totalPageCount - 1) },
            (_, index) => index + 2,
          );
          const remainingGoods = await Promise.all(
            remainingPages.map((page) =>
              getGoods({
                subCategory: filters.subCategory,
                sort: filters.sort,
                page,
                limit: GOODS_PER_PAGE,
                signal: controller.signal,
              }),
            ),
          );
          const allGoods = [
            ...(data?.goods ?? []),
            ...remainingGoods.flatMap((result) => result?.goods ?? []),
          ];

          setGoods(allGoods);
          setTotalPages(
            Math.max(1, Math.ceil(allGoods.length / GOODS_PER_PAGE)),
          );
        } else {
          setGoods(data?.goods ?? []);
          setTotalPages(data?.pagination?.totalPages ?? 1);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setGoods([]);
          setError(err.message || "굿즈 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchGoods();

    return () => controller.abort();
  }, [filters, usesClientPagination]);

  return (
    <GoodsPageContainer>
      <section aria-label="굿즈 목록">
        <h1>Shop</h1>

        <div className="goods-page__filters">
          <nav aria-label="굿즈 카테고리">
            <ul>
              {GOODS_CATEGORIES.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(category)}
                    aria-pressed={filters.subCategory === category}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="goods-page__sort">
            <button
              className="goods-page__sort-trigger"
              type="button"
              onClick={() => setIsSortOpen((isOpen) => !isOpen)}
              aria-expanded={isSortOpen}
            >
              {selectedSortLabel}
              <span className="goods-page__sort-arrow" aria-hidden="true" />
            </button>
            {isSortOpen && (
              <ul aria-label="정렬 기준 선택">
                {SORT_OPTIONS.map((option) => (
                  <li key={option.value || "default"}>
                    <button
                      type="button"
                      onClick={() => handleSelectSort(option.value)}
                      aria-pressed={filters.sort === option.value}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {loading ? (
          <p>불러오는 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : displayedGoods.length === 0 ? (
          <p>굿즈가 없습니다.</p>
        ) : (
          <div className="goods-page__grid">
            {displayedGoods.map((item) => (
              <GoodsCard key={item.id} goods={item} />
            ))}
            {Array.from(
              {
                length:
                  (GRID_COLUMNS - (displayedGoods.length % GRID_COLUMNS)) %
                  GRID_COLUMNS,
              },
              (_, index) => (
                <EmptyCell key={`empty-${index}`} />
              ),
            )}
          </div>
        )}

        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => {
            setFilters((prev) => ({ ...prev, page }));
          }}
        />
      </section>
    </GoodsPageContainer>
  );
}
