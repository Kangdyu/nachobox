import { useEffect, useState } from "react";

function useScroll() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handler = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return scroll;
}

export default useScroll;
