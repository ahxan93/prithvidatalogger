"use client";

import { useEffect, useState } from "react";

/**
 * True once hydrated and the query matches; always false on the server and on
 * first client render, so SSR markup is stable and nothing extra is in the
 * initial HTML — callers use this to add content only after hydration.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
