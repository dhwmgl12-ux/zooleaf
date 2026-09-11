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
  }

  if (
    !values.recipientName ||
    values.recipientName.length > 50 ||
    !/\p{L}/u.test(values.recipientName)
  ) {
    errors.recipientName = "수령인 이름을 1~50자로 입력해주세요.";
  }

  const digits = values.phone.replace(/\D/g, "");

  // 010은 11자리, 기존 휴대폰 식별번호는 10~11자리
  if (!/^(?:010\d{8}|01[16789]\d{7,8})$/.test(digits)) {
    errors.phone = "올바른 국내 휴대폰 번호를 입력해주세요.";
  }

  if (!values.address || values.address.length > 200) {
    errors.address = "기본주소와 필요한 상세주소를 200자 이내로 입력해주세요.";
  }

  return { values, errors };
}
