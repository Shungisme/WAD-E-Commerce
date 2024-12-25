import { useEffect, useState } from "react";

interface TProps {
  value: string;
  delay?: number;
}

const useDebounce = ({ value, delay = 500 }: TProps) => {
  const [debounceValue, setDebouceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value,delay]);

  return debounceValue;
};

export default useDebounce;
