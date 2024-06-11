import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

function useIsInView() {
  const [show, setShow] = useState(false);
  const [ref, entry] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  useEffect(() => {
    if (!show && entry && entry.isIntersecting) {
      setShow(true);
    }
  }, [entry, show]);

  return [show, ref];
}

export default useIsInView;
