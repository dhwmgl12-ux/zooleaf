
export function checkId(id) {
  return apiClient('/auth/check-id', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

export function signup({
  id,
  password,
  passwordConfirm,
  name,
  phone,
  birthDate,
  agreeTerms,
  agreePrivacy,
  agreeMarketing,
}) {
  return apiClient('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      id,
      password,
      passwordConfirm,
      name,
      phone,
      birthDate,
      agreeTerms,
      agreePrivacy,
      agreeMarketing,
    }),
  });
}

// 로그인

export function login({id, password}) {
  return apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({id, password}),
  });
}

// 로그아웃

