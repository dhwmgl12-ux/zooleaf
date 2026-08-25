import { useState } from "react";
import { getEmailError, getPasswordError } from "../utils/validation";

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