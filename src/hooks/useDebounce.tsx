import { useEffect, useState } from "react";

interface TProps {
  value: string;
  delay?: number;
}

const useDebounce = ({ value, delay = 500 }: TProps) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
