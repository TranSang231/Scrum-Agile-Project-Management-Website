// hooks/useTimer.js
import { useState, useEffect } from 'react';

export const useTimer = (initialCountdown) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isTimerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, countdown]);

  const startTimer = () => {
    setIsTimerActive(true);
    setCountdown(60); // or any default value
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setCountdown(0);
  };

  return { countdown, isTimerActive, startTimer, stopTimer };
};
