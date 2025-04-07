// hooks/useVisibility.js
import { useState } from 'react';

export const useVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return { isVisible, toggleVisibility };
};
