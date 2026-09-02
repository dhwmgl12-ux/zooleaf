import { useState } from 'react';
import {
  getEmailError,
  getPasswordError,
  getPasswordConfirmError,
  getNameError,
  getPhoneError,
  getBirthDateError,
  formatPhoneNumber,
  formatBirthDate,
} from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../api/authApi';


export function useLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ id: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') setId(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idError = getEmailError(id);
    const passwordError = getPasswordError(password);

    setErrors({ id: idError, password: passwordError });

    if (idError || passwordError) {
      return;
    }

    try {
      const result = await login({ id, password });

      sessionStorage.setItem('token', result.token);

      // TODO : 장바구니 Zustand 스토어 완성되면 여기서 localStorage -> 서버 병합 로직 호출

      navigate('/');
    } catch (err) {
      setErrors((prev) => ({ ...prev, password: err.message }));
    }
  };

  return { id, password, errors, handleChange, handleSubmit };
}

export function useSignup() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConFirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [errors, setErrors] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    birthDate: '',
    agreeTerms: '',
    agreePrivacy: '',
  });

  const handleChange = (e) => {
    const { name: fieldName, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (fieldName === 'id') setId(val);
    if (fieldName === 'password') setPassword(val);
    if (fieldName === 'passwordConfirm') setPasswordConFirm(val);
    if (fieldName === 'name') setName(val);
    if (fieldName === 'phone') setPhone(formatPhoneNumber(val));
    if (fieldName === 'birthDate') setBirthDate(formatBirthDate(val));
    if (fieldName === 'agreeTerms') setAgreeTerms(val);
    if (fieldName === 'agreePrivacy') setAgreePrivacy(val);
    if (fieldName === 'agreeMarketing') setAgreeMarketing(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idError = getEmailError(id);
    const passwordError = getPasswordError(password);
    const passwordConfirmError = getPasswordConfirmError(password, passwordConfirm);
    const nameError = getNameError(name);
    const phoneError = getPhoneError(phone);
    const birthDateError = getBirthDateError(birthDate);
    const agreeTermsError = agreeTerms ? '' : '약관에 동의하여 주세요.';
    const agreePrivacyError = agreePrivacy ? '' : '수집 및 이용에 동의하여 주세요.';

    setErrors({
      id: idError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
      name: nameError,
      phone: phoneError,
      birthDate: birthDateError,
      agreeTerms: agreeTermsError,
      agreePrivacy: agreePrivacyError,
    });

    if (
      idError ||
      passwordError ||
      passwordConfirmError ||
      nameError ||
      phoneError ||
      birthDateError ||
      agreeTermsError ||
      agreePrivacyError
    ) {
      return;
    }

    try {
      await signup({
        id,
        password,
        passwordConfirm,
        name,
        phone,
        birthDate,
        agreeTerms,
        agreePrivacy,
        agreeMarketing,
      });

      navigate('/login')
    } catch (err) {
      setErrors((prev) => ({ ...prev, id: err.message }));
    }
  };

  return { id, password, passwordConfirm, name, phone, birthDate, agreeTerms, agreePrivacy, agreeMarketing, errors, handleChange, handleSubmit };
}
