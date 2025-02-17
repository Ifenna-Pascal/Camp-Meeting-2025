'use client';
import { useEffect, useState } from 'react';

export const useDebounce = (input: string, delay: number = 300): string => {
  const [debouncedInput, setDebouncedInput] = useState<string>('');
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedInput(input);
    }, delay);
    return () => clearTimeout(debounceTimer);
  }, [input, delay]);
  return debouncedInput;
};
