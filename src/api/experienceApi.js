const API_BASE_URL = 'https://api.mylecture.kr/api/14/team2';

export async function getExperiences(signal) {
  const response = await fetch(`${API_BASE_URL}/experiences`, { signal });

  if (!response.ok) {
    throw new Error('체험 프로그램을 불러오지 못했습니다.');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || '체험 프로그램을 불러오지 못했습니다.');
  }

  return result.data?.experiences ?? [];
}
