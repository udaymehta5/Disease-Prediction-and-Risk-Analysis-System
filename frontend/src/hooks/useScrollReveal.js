import { useEffect, useRef } from 'react';

export function useScrollReveal(options = { threshold: 0.15 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (elementRef.current) {
        elementRef.current.classList.add('revealed');
      }
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }, options);

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options]);

  return elementRef;
}

export default useScrollReveal;
