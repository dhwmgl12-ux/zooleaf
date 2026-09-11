export function formatAddressPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  const middleEnd = digits.length === 10 ? 6 : 7;

  return [
    digits.slice(0, 3),
    digits.slice(3, middleEnd),
    digits.slice(middleEnd),
  ].join("-");
}

export function validateAddress(form) {
  const values = {
    ...form,
    label: form.label.trim(),
    recipientName: form.recipientName.trim(),
    phone: formatAddressPhone(form.phone),
    address: form.address.trim(),
  };

  const errors = {};

  if (!values.label || values.label.length > 30) {
    errors.label = "배송지명을 1~30자로 입력해주세요.";
  } else if (/[ㄱ-ㅎㅏ-ㅣ\u1100-\u11FF]/u.test(values.label)) {
    errors.label = "자음·모음만 입력하지 말고 배송지명을 완성해주세요.";
  }

  if (
    values.recipientName.length < 2 ||
    values.recipientName.length > 8 ||
    !/\p{L}/u.test(values.recipientName)
  ) {
    errors.recipientName = "수령인 이름을 2~8자로 입력해주세요.";
  } else if (/[ㄱ-ㅎㅏ-ㅣ\u1100-\u11FF]/u.test(values.recipientName)) {
    errors.recipientName =
      "자음·모음만 입력하지 말고 수령인 이름을 완성해주세요.";
  }

  const digits = values.phone.replace(/\D/g, "");

  // 010은 11자리, 기존 휴대폰 식별번호는 10~11자리
  if (!/^(?:010\d{8}|01[16789]\d{7,8})$/.test(digits)) {
    errors.phone = "올바른 국내 휴대폰 번호를 입력해주세요.";
  }

  if (!values.address || values.address.length > 200) {
    errors.address = "주소를 1~200자로 입력해주세요.";
  } else if (/[ㄱ-ㅎㅏ-ㅣ\u1100-\u11FF]/u.test(values.address)) {
    errors.address = "자음·모음만 입력하지 말고 주소를 완성해주세요.";
  }

  return { values, errors };
}
