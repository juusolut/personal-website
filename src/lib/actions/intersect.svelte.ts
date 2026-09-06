type IntersectOptions = {
  onIntersect: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | Document | null;
};

export function intersect(node: HTMLElement, options: IntersectOptions) {
  // 1. Destructure onIntersect callback and collect the observer options
  const { onIntersect, ...observerOptions } = options;

  // 2. Pass observerOptions (including threshold) to the IntersectionObserver constructor
  const observer = new IntersectionObserver(([entry]) => {
    onIntersect(entry.isIntersecting, entry);
  }, observerOptions);

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}