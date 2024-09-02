// src/hooks/useCountdown.js

import {useState, useEffect, useRef} from 'react';

/**
 * useCountdown
 * @param {number} initialSeconds - The starting point of the countdown in seconds.
 * @returns {object} - An object containing hours, minutes, seconds, and a reset function.
 */
const useCountdown = (initialSeconds: number) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start the countdown
    startCountdown();

    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, [initialSeconds]);

  const startCountdown = () => {
    // Clear any existing intervals
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const resetCountdown = (newTime = initialSeconds) => {
    setTimeLeft(newTime);
    startCountdown();
  };

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return {hours, minutes, seconds, resetCountdown};
};

export default useCountdown;
