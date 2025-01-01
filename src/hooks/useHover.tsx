import { useEffect, useRef, useState } from "react";

const useHover = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener("mouseenter", () => setIsHover(true));
      element.addEventListener("mouseleave", () => setIsHover(false));
    }

    return () => {
      if (element) {
        element?.removeEventListener("mouseenter", () => setIsHover(true));
        element?.removeEventListener("mouseleave", () => setIsHover(false));
      }
    };
  }, []);

  return { ref, isHover };
};


export default useHover;