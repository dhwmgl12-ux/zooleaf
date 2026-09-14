import {
  getNameError,
  getPhoneError,
  getBirthDateError,
  formatPhoneNumber,
} from "./validation";

export function validateProfile(form) {
  const values = {
    ...form,
    name: form.name.trim(),
    phone: formatPhoneNumber(form.phone),
    birthDate: form.birthDate.trim(),
  };

  const fieldErrors = {
    name: getNameError(values.name),
    phone: getPhoneError(values.phone),
    birthDate: getBirthDateError(values.birthDate.replaceAll("-", ".")),
  };

  const errors = Object.fromEntries(
    Object.entries(fieldErrors).filter(([, message]) => message),
  );

  return { values, errors };
}
