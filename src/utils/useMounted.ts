import { useEffect, useState } from "react";

/**
 * `false` during SSR and the first client render, `true` afterwards.
 *
 * Cart contents live in a cookie the server can't read, so anything derived
 * from them has to be held back until after hydration — otherwise React
 * re-renders with different markup and logs a hydration mismatch. The old
 * header rendered `cart.cartItems.length` directly and did exactly that.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
