import { CheckCircleIcon } from "@/components/ui/icons";

type SummaryBoxProps = {
  points: string[];
};

// "Quick summary" callout at the top of every post (brief §7.10).
export default function SummaryBox({ points }: SummaryBoxProps) {
  if (points.length === 0) return null;

  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-7">
      <p className="text-xs font-semibold tracking-[0.14em] text-brand-700 uppercase">Quick summary</p>
      <ul className="mt-4 space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex gap-3 text-base leading-relaxed text-ink">
            <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-600" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
