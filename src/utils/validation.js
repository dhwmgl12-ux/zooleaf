const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 20;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 8;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
const PHONE_REGEX = /^(?:010-\d{4}-\d{4}|01[16789]-\d{3,4}-\d{4})$/;
const BIRTH_DATE_REGEX = /^\d{4}\.\d{2}\.\d{2}$/;

export function getEmailError(email) {
  if (!email) return "이메일을 입력해주세요!";
  if (!EMAIL_REGEX.test(email)) return "올바른 이메일 형식이 아닙니다.";
  return "";
}

export function getPasswordError(password) {
  if (!password) return "비밀번호를 입력해주세요!";
  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH ||
    !PASSWORD_REGEX.test(password)
  ) {
    return "비밀번호를 확인해주세요.";
  }
  return "";
}

export function getPasswordConfirmError(password, passwordConfirm) {
  if (!passwordConfirm) return "비밀번호 확인을 입력해주세요!";
  if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
  return "";
}

export function getNameError(name) {
  const value = name.trim();

  if (!value) return "이름을 입력해주세요!";

  if (value.length < NAME_MIN_LENGTH || value.length > NAME_MAX_LENGTH) {
    return `이름은 ${NAME_MIN_LENGTH} ~ ${NAME_MAX_LENGTH}자로 입력해주세요.`;
  }

  if (/[ㄱ-ㅎㅏ-ㅣ\u1100-\u11FF]/u.test(value)) {
    return "자음·모음만 입력하지 말고 이름을 완성해주세요.";
  }

  return "";
}

export function formatPhoneNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  // 010은 3-4-4 형식
  // 그 외 기존 휴대폰 번호는 10자리일 때 3-3-4 형식
  const middleEnd = !digits.startsWith("010") && digits.length === 10 ? 6 : 7;

  return [
    digits.slice(0, 3),
    digits.slice(3, middleEnd),
    digits.slice(middleEnd),
  ].join("-");
}

export function getPhoneError(phone) {
  if (!phone) return "휴대폰 번호를 입력해주세요!";
  if (!PHONE_REGEX.test(phone)) return "올바른 전화번호 형식이 아닙니다.";
  return "";
}

export function formatBirthDate(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length < 5) return digits;
  if (digits.length < 7) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
  return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6, 8)}`;
}

export function getBirthDateError(birthDate) {
  if (!birthDate) return "생년월일을 입력해주세요!";
  if (!BIRTH_DATE_REGEX.test(birthDate)) {
    return "올바른 생년월일 형식이 아닙니다. (yyyy.mm.dd)";
  }

  const [year, month, day] = birthDate.split(".").map(Number);
  const date = new Date(year, month - 1, day);

  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isRealDate) return "존재하지 않는 날짜입니다.";

  const today = new Date();
  const MIN_AGE = 14;
  const ageLimitDate = new Date(
    today.getFullYear() - MIN_AGE,
    today.getMonth(),
    today.getDate(),
  );
  if (date > ageLimitDate) return `만 ${MIN_AGE}세 이상만 가입 할 수 있습니다.`;

  const MIN_YEAR = 1900;
  if (year < MIN_YEAR) return `생년월일은 ${MIN_YEAR}년 이후여야 합니다.`;

  return "";
}

export function mapServerErrorToField(message) {
  if (message.includes("아이디")) return "id";
  if (message.includes("비밀번호 확인") || message.includes("일치"))
    return "passwordConfirm";
  if (message.includes("비밀번호")) return "password";
  if (message.includes("이름")) return "name";
  if (message.includes("전화번호") || message.includes("휴대폰"))
    return "phone";
  if (message.includes("생년월일")) return "birthDate";
  if (message.includes("약관")) return "agreeTerms";
  if (message.includes("개인정보")) return "agreePrivacy";

  return "form";
}
