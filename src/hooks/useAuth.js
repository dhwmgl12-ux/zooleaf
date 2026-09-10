import { useEffect, useState } from 'react';
import {
  getEmailError,
  getPasswordError,
  getPasswordConfirmError,
  getNameError,
  getPhoneError,
  getBirthDateError,
  formatPhoneNumber,
  formatBirthDate,
  mapServerErrorToField,
} from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import { login, signup, checkId, logout, getMe } from '../api/authApi';
import useAuthStore from '../store/authStore';
import useToastStore from '../store/toastStore';

const initialSignupForm = {
  id: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
  birthDate: '',
  agreeTerms: false,
  agreePrivacy: false,
  agreeMarketing: false,
};

function useRedirectIfLoggedIn() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (useAuthStore.getState().isLoggedIn) {
      showToast('이미 로그인되어 있습니다.');
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const showToast = useToastStore((state) => state.showToast);
  const [form, setForm] = useState({ id: '', password: '' });
  const [errors, setErrors] = useState({ id: '', password: '', form: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useRedirectIfLoggedIn();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, password } = form;

    const idError = getEmailError(id);
    const passwordError = getPasswordError(password);

    setErrors({ id: idError, password: passwordError });

    if (idError || passwordError) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login({ id, password });
      setAuth(result.token, result.userInfo);
      showToast(result.message);
      navigate('/');
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
      setForm((prev) => ({ ...prev, password: '' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { ...form, errors, isSubmitting, handleChange, handleSubmit };
}

export function useSignup() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const [form, setForm] = useState(initialSignupForm);
  const [idCheckStatus, setIdCheckStatus] = useState('idle');
  const [idCheckMessage, setIdCheckMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    birthDate: '',
    agreeTerms: '',
    agreePrivacy: '',
    form: '',
  });

  useRedirectIfLoggedIn();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;

    if (name === 'phone') val = formatPhoneNumber(val);
    if (name === 'birthDate') val = formatBirthDate(val);

    setForm((prev) => ({ ...prev, [name]: val }));

    if (name === 'id') {
      setIdCheckStatus('idle');
      setIdCheckMessage('');
    }
  };

  const handleCheckId = async () => {
    const idError = getEmailError(form.id);
    if (idError) {
      setErrors((prev) => ({ ...prev, id: idError }));
      return;
    }

    setIdCheckStatus('checking');
    try {
      const result = await checkId(form.id);
      if (result.isDuplicate) {
        setIdCheckStatus('duplicate');
        setErrors((prev) => ({ ...prev, id: result.message }));
      } else {
        setIdCheckStatus('available');
        setIdCheckMessage(result.message);
        setErrors((prev) => ({ ...prev, id: '' }));
      }
    } catch (err) {
      setIdCheckStatus('idle');
      setErrors((prev) => ({ ...prev, id: err.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      id,
      password,
      passwordConfirm,
      name,
      phone,
      birthDate,
      agreeTerms,
      agreePrivacy,
      agreeMarketing,
    } = form;

    const idError = getEmailError(id);
    const passwordError = getPasswordError(password);
    const passwordConfirmError = getPasswordConfirmError(password, passwordConfirm);
    const nameError = getNameError(name);
    const phoneError = getPhoneError(phone);
    const birthDateError = getBirthDateError(birthDate);
    const agreeTermsError = agreeTerms ? '' : '약관에 동의하여 주세요.';
    const agreePrivacyError = agreePrivacy ? '' : '수집 및 이용에 동의하여 주세요.';

    const nextErrors = {
      id: idError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
      name: nameError,
      phone: phoneError,
      birthDate: birthDateError,
      agreeTerms: agreeTermsError,
      agreePrivacy: agreePrivacyError,
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    if (idCheckStatus !== 'available') {
      setErrors((prev) => ({ ...prev, id: '아이디 중복확인을 진행해주세요.' }));
      return;
    }

    setIsSubmitting(true);
    try {
      const birthDateForServer = birthDate.replace(/\./g, '-');
      const result = await signup({
        id,
        password,
        passwordConfirm,
        name,
        phone,
        birthDate: birthDateForServer,
        agreeTerms,
        agreePrivacy,
        agreeMarketing,
      });

      showToast(`${result.data.name}님 환영합니다.`);
      navigate('/login');
    } catch (err) {
      const field = mapServerErrorToField(err.message);
      setErrors((prev) => ({ ...prev, [field]: err.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...form,
    idCheckStatus,
    idCheckMessage,
    isSubmitting,
    errors,
    handleChange,
    handleCheckId,
    handleSubmit,
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const showToast = useToastStore((state) => state.showToast);

  const handleLogout = async () => {
    try {
      const result = await logout();
      showToast(result.message);
    } catch (err) {
      showToast(err.message);
    } finally {
      sessionStorage.removeItem('token');
      clearAuth();
      navigate('/login');
    }
  };
  return { handleLogout };
}

export function useAuthRestore() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      clearAuth();
      return;
    }

    getMe()
      .then((result) => {
        setAuth(sessionStorage.getItem('token'), result.data);
      })
      .catch(() => {
        sessionStorage.removeItem('token');
        clearAuth();
      });
  }, [setAuth, clearAuth]);
}
