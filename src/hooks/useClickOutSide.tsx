import { RefObject, useEffect, useRef } from "react";

interface TProps {
  elementRef: RefObject<HTMLElement>;
  callback: () => void;
}

const useClickOutSide = (props: TProps) => {
  const { elementRef, callback } = props;
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        elementRef.current && 
        !elementRef.current.contains(e.target as Node) &&
        e.target instanceof Node
      ) {
        callbackRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef]);
};

export default useClickOutSide;