// Shared maths for the decorative hero readings. Everything numeric is a slow,
// mean-reverting random walk held inside a safe cold-chain band.

export const WALK_SIZE = 32;

/** Deterministic start so the server render is the same on every request. */
export const INITIAL_WALK: number[] = Array.from(
  { length: WALK_SIZE },
  (_, i) => 0.5 + 0.28 * Math.sin(i * 2.1 + 0.7),
);

const TEMP_MIN = 2.8;
const TEMP_SPAN = 4.4; // 2.8 to 7.2 °C
const RH_MIN = 43;
const RH_SPAN = 14; // 43 to 57 %RH

export const formatTemp = (w: number) => (TEMP_MIN + w * TEMP_SPAN).toFixed(1);
export const formatRh = (w: number) => (RH_MIN + w * RH_SPAN).toFixed(0);

/** One step of the walk, clamped well inside the band. */
export function stepWalk(walk: number[]): number[] {
  return walk.map((v) => Math.min(0.95, Math.max(0.05, v + (0.5 - v) * 0.08 + (Math.random() - 0.5) * 0.14)));
}
