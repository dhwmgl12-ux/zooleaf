const API_BASE_URL = 'https://api.mylecture.kr/api/14/team2';

export async function getExperiences(signal) {
  const isPublic = true; // /experiences가 공개 API라면 true
  const token = !isPublic ? sessionStorage.getItem('token') : null;

  const response = await fetch(`${API_BASE_URL}/experiences`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || '요청에 실패했습니다.');
  }

  return data.data?.experiences ?? [];
}
