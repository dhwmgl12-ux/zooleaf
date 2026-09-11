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
export async function getExperienceDetail(id, signal) {
  const isPublic = true;
  const token = !isPublic ? sessionStorage.getItem('token') : null;

  const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    const error = new Error(
      data.message || "상세 정보를 불러오지 못했습니다.",
    );
  
    error.status = response.status;
    error.code = data.code;
  
    throw error;
  }

  return data.data;
}
