import { countryMarkers } from "@/data/location-content";

// Stylised presence map: markers and supply routes from India, on a dot grid.
// Deliberately draws NO country borders (boundary depictions are legally
// sensitive, especially for India); positions are approximate, for orientation only.

const W = 880;
const H = 440;
// Longitude 39–79°E, latitude 10–33°N mapped linearly onto the canvas.
const x = (lon: number) => ((lon - 39) / (79 - 39)) * W;
const y = (lat: number) => ((33 - lat) / (33 - 10)) * H;

// Label placement per marker, so the tightly grouped Gulf states stay readable.
const labelOffset: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  india: { dx: 0, dy: 34, anchor: "middle" },
  "saudi-arabia": { dx: -16, dy: 5, anchor: "end" },
  uae: { dx: 0, dy: 30, anchor: "middle" },
  qatar: { dx: 15, dy: -8, anchor: "start" },
  oman: { dx: 16, dy: 5, anchor: "start" },
  kuwait: { dx: 0, dy: -16, anchor: "middle" },
  bahrain: { dx: -15, dy: -4, anchor: "end" },
  yemen: { dx: 0, dy: 30, anchor: "middle" },
};

export default function PresenceMap() {
  const hub = countryMarkers.india;
  const hx = x(hub.lon);
  const hy = y(hub.lat);
  const others = Object.entries(countryMarkers).filter(([slug]) => slug !== "india");

  return (
    <figure className="relative overflow-hidden rounded-3xl bg-navy-900 ring-1 ring-white/10">
      <div aria-hidden="true" className="bg-dot-grid absolute inset-0" />
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute top-1/2 left-[78%] size-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div aria-hidden="true" className="glow-cyan pointer-events-none absolute top-[42%] left-[28%] size-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-15" />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="presence-map-title presence-map-desc"
        className="relative block h-auto w-full"
      >
        <title id="presence-map-title">Countries we serve</title>
        <desc id="presence-map-desc">
          A stylised map with markers for India, Saudi Arabia, the United Arab Emirates, Qatar, Oman, Kuwait, Bahrain
          and Yemen, and supply routes from India to each of the other seven.
        </desc>

        {/* Supply routes: gentle arcs from the India hub */}
        {others.map(([slug, marker]) => {
          const mx = x(marker.lon);
          const my = y(marker.lat);
          const cx = (hx + mx) / 2;
          const cy = Math.min(hy, my) - 60 - Math.abs(hx - mx) * 0.06;
          return (
            <path
              key={slug}
              d={`M${hx},${hy} Q${cx},${cy} ${mx},${my}`}
              fill="none"
              stroke="var(--color-cyan-400)"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              className="motion-safe:animate-route"
            />
          );
        })}

        {/* Markers */}
        {Object.entries(countryMarkers).map(([slug, marker]) => {
          const isHub = slug === "india";
          const px = x(marker.lon);
          const py = y(marker.lat);
          const label = labelOffset[slug];
          return (
            <g key={slug}>
              <circle cx={px} cy={py} r={isHub ? 20 : 12} fill={isHub ? "var(--color-brand-400)" : "var(--color-cyan-400)"} opacity="0.2" />
              <circle cx={px} cy={py} r={isHub ? 9 : 5.5} fill={isHub ? "var(--color-brand-400)" : "var(--color-cyan-400)"} stroke="var(--color-navy-950)" strokeWidth="2" />
              <text
                x={px + label.dx}
                y={py + label.dy}
                textAnchor={label.anchor}
                fill="white"
                fontSize={isHub ? 18 : 15}
                fontWeight={isHub ? 700 : 600}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {marker.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="relative border-t border-white/10 px-5 py-3 text-center text-xs text-slate-400">
        Stylised illustration. Marker positions are approximate and no borders are shown.
      </figcaption>
    </figure>
  );
}
