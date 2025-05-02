// hooks/usePasswordValidation.js
import { useState, useEffect } from 'react';

export const usePasswordValidation = (password) => {
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const passwordConditions = [
    { text: 'Use 8 or more characters', isValid: password.length >= 8 },
    { text: 'Use upper and lower case letters (e.g. Aa)', isValid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { text: 'Use a number (e.g. 1234)', isValid: /\d/.test(password) },
    { text: 'Use a symbol (e.g. !@#$)', isValid: /[!@#$%^&*(),._?":{}|<>]/.test(password) }
  ];

  useEffect(() => {
    const isValid = passwordConditions.every(cond => cond.isValid);
    setIsPasswordValid(isValid);
  }, [password]);

  return { isPasswordValid, passwordConditions };
};
