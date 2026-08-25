const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 8;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

export function getEmailError(email) {
  if (!email) return '이메일을 입력해주세요!';
  if (!EMAIL_REGEX.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return '';
}

export function getPasswordError(password) {
  if (!password) return '비밀번호를 입력해주세요!';
  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    return `비밀번호는 ${PASSWORD_MIN_LENGTH} ~ ${PASSWORD_MAX_LENGTH}자로 입력해주세요!`;
  }
  if (!PASSWORD_REGEX.test(password)) {
    return '비밀번호는 영문 / 숫자 / 특수문자를 모두 포함해야 합니다.';
  }
  return '';
}

export function getPasswordConfirmError(password, passwordConfirm) {
  if (!passwordConfirm) return '비밀번호 확인을 입력해주세요!';
  if (password !== passwordConfirm) return '비밀번호가 일치하지 않습니다!';
  return '';
}

export function getNameError(name) {
  if (!name) return '이름을 입력해주세요!'
  if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
    return `이름은 ${NAME_MIN_LENGTH} ~ ${NAME_MAX_LENGTH}자로 입력해주세요!`
  }
  return '';
}