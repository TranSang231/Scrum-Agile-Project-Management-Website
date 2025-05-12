// hooks/useMessage.js
import { useState } from 'react';

export const useMessage = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const setSuccessMessage = (msg) => {
    setMessage(msg);
    setMessageType('success');
  };

  const setErrorMessage = (msg) => {
    setMessage(msg);
    setMessageType('error');
  };

  return { message, messageType, setSuccessMessage, setErrorMessage };
};
