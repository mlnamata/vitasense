import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  className,
  id,
}: Props) {
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", className)}>
      <p
        className={cn(
          "text-[13px] font-semibold uppercase tracking-[0.16em]",
          dark ? "text-sage-300" : "text-sage-700"
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-3 text-balance text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
            dark ? "text-slate-300" : "text-slate-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
