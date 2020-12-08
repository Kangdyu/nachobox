import { useEffect, useState } from "react";

function useScrollAlert(point: number) {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY === point) {
        setAlert(true);
      } else {
        setAlert(false);
      }
    };
    handler();
    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [point]);

  return alert;
}

export default useScrollAlert;
