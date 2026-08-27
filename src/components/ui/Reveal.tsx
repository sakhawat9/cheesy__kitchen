import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts its children in as they scroll into view.
 *
 * Uses one IntersectionObserver per element and disconnects on first trigger,
 * so nothing stays subscribed once it has played. Content is visible from the
 * first paint if JS never runs — the observer only *removes* the hidden state,
 * and `prefers-reduced-motion` short-circuits the whole thing (the CSS in
 * global.css also flattens the transition).
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: any) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Trigger a little before the element reaches the fold, so the motion
      // finishes about when the reader gets there.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
