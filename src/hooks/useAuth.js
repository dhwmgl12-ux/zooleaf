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

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const showToast = useToastStore((state) => state.showToast);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ id: '', password: '', form: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (useAuthStore.getState().isLoggedIn) {
      showToast('이미 로그인되어 있습니다.');
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    setIsSubmitting(true);
    try {
      const result = await login({ id, password });
      setAuth(result.token, result.userInfo);
      showToast(result.message); // 로그인에 성공했습니다.
      navigate('/');
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
      setPassword('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { id, password, errors, isSubmitting, handleChange, handleSubmit };
}

export function useSignup() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const [id, setId] = useState('');
  const [idCheckStatus, setIdCheckStatus] = useState('idle');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConFirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
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

  useEffect(() => {
    if (useAuthStore.getState().isLoggedIn) {
      showToast('이미 로그인되어 있습니다.')
      navigate('/', {replace: true})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const { name: fieldName, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (fieldName === 'id') {
      setId(val);
      setIdCheckStatus('idle');
    }
    if (fieldName === 'password') setPassword(val);
    if (fieldName === 'passwordConfirm') setPasswordConFirm(val);
    if (fieldName === 'name') setName(val);
    if (fieldName === 'phone') setPhone(formatPhoneNumber(val));
    if (fieldName === 'birthDate') setBirthDate(formatBirthDate(val));
    if (fieldName === 'agreeTerms') setAgreeTerms(val);
    if (fieldName === 'agreePrivacy') setAgreePrivacy(val);
    if (fieldName === 'agreeMarketing') setAgreeMarketing(val);
  };

  const handleCheckId = async () => {
    const idError = getEmailError(id);
    if (idError) {
      setErrors((prev) => ({ ...prev, id: idError }));
      return;
    }

    setIdCheckStatus('checking');
    try {
      const result = await checkId(id);
      if (result.isDuplicate) {
        setIdCheckStatus('duplicate');
        setErrors((prev) => ({ ...prev, id: result.message }));
      } else {
        setIdCheckStatus('available');
        setErrors((prev) => ({ ...prev, id: '' }));
      }
    } catch (err) {
      setIdCheckStatus('idle');
      setErrors((prev) => ({ ...prev, id: err.message }));
    }
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

    if (idCheckStatus !== 'available') {
      setErrors((prev) => ({ ...prev, id: '아이디 중복확인을 진행해주세요.' }));
      return;
    }

    setIsSubmitting(true)
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
    id,
    idCheckStatus,
    password,
    passwordConfirm,
    name,
    phone,
    birthDate,
    agreeTerms,
    agreePrivacy,
    agreeMarketing,
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
