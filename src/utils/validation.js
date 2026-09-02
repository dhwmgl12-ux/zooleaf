const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 8;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
const PHONE_REGEX = /^10[016789]-\d{3,4}-\d{4}$/;
const BIRTH_DATE_REGEX = /^\d{4}.\d{2}.\d{2}$/;

export function getEmailError(email) {
  if (!email) return '이메일을 입력해주세요!';
  if (!EMAIL_REGEX.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return '';
}

export function getPasswordError(password) {
  if (!password) return '비밀번호를 입력해주세요!';
  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH ||
    !PASSWORD_REGEX.test(password)
  ) {
    return '비밀번호를 확인해주세요.';
  }
  return '';
}

export function getPasswordConfirmError(password, passwordConfirm) {
  if (!passwordConfirm) return '비밀번호 확인을 입력해주세요!';
  if (password !== passwordConfirm) return '비밀번호가 일치하지 않습니다!';
  return '';
}

export function getNameError(name) {
  if (!name) return '이름을 입력해주세요!';
  if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
    return `이름은 ${NAME_MIN_LENGTH} ~ ${NAME_MAX_LENGTH}자로 입력해주세요!`;
  }
  return '';
}

export function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`
}

export function getPhoneError(phone) {
  if (!phone) return '휴대폰 번호를 입력해주세요!';
  if (!PHONE_REGEX.test(phone)) return '올바른 전화번호 형식이 아닙니다.'
  return '';
}

export function formatBirthDate(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length < 5) return digits;
  if (digits.length < 7) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
}

export function getBirthDateError(birthDate) {
  if (!birthDate) return '생년월일을 입력해주세요!'
  if (!BIRTH_DATE_REGEX.test(birthDate)) {
    return '올바른 생년월일 형식이 아닙니다. (yyyy-mm-dd)';
  }
  return '';
}
