import { useState } from "react";
import { getEmailError, getPasswordError, getPasswordConfirmError, getNameError } from "../utils/validation";

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = getEmailError(email)
    const passwordError = getPasswordError(password);

    setErrors({ email: emailError, password: passwordError })

    if (emailError || passwordError) {
      return;
    }
    // API 명세 확정되면 authApi.js의 login() 함수로 교체
    console.log('로그인 시도:', {email, password});
  }

  return { email, password, errors, handleChange, handleSubmit }
}

export function useSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConFirm] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    if (fieldName === 'name') setName(value);
    if (fieldName === 'email') setEmail(value);
    if (fieldName === 'password') setPassword(value);
    if (fieldName === 'passwordConfirm') setPasswordConFirm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = getNameError(name);
    const emailError = getEmailError(email);
    const passwordError = getPasswordError(password);
    const passwordConfirmError = getPasswordConfirmError(password, passwordConfirm);
    
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
    });
    
    if (nameError || emailError || passwordError || passwordConfirmError) {
      return;
    }
    
    // API 명세 확정되면 authApi.js의 login() 함수로 교체
    console.log('회원가입 시도:', { name, email, password });
  }
  return { name, email, password, passwordConfirm, errors, handleChange, handleSubmit }
};
