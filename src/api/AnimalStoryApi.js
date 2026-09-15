const API_BASE_URL = 'https://api.mylecture.kr/api/14/team2';

export async function fetchAnimalStories() {
  const response = await fetch(`${API_BASE_URL}/animals?page=1&limit=50`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('동물 이야기를 불러오지 못했습니다.');
  }

  const result = await response.json();

  // 만약 result.data 자체가 동물들의 배열이라면:
  if (Array.isArray(result.data)) {
    return result.data;
  }

  // 만약 result.data.animals 형태로 들어있다면:
  if (result.data && Array.isArray(result.data.animals)) {
    return result.data.animals;
  }

  // 만약 result.data 내부에 다른 이름(예: list 등)으로 들어있다면 그에 맞게 수정
  return result.data.list || [];
}
