import { cn } from "@/lib/cn";

type Props = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
  tone?: "light" | "dark";
  className?: string;
};

/* 16px text keeps iOS Safari from zooming in on focus. */
export default function EmailInput({
  id,
  label = "E-mailová adresa",
  hideLabel = false,
  defaultValue,
  invalid = false,
  describedBy,
  tone = "light",
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={hideLabel ? "sr-only" : "text-sm font-semibold text-slate-700"}
      >
        {label}
      </label>
      <input
        id={id}
        name="email"
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="vas@email.cz"
        defaultValue={defaultValue}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-14 w-full rounded-2xl px-5 text-base ring-1 ring-inset transition duration-300 focus:outline-none focus:ring-2",
          tone === "dark"
            ? "bg-white/[0.06] text-white ring-white/15 placeholder:text-slate-500 focus:bg-white/10 focus:ring-sage-400 aria-invalid:ring-red-300"
            : "bg-cream text-slate-900 ring-slate-900/10 placeholder:text-slate-400 focus:bg-white focus:ring-sage-600 aria-invalid:ring-red-400"
        )}
      />
    </div>
  );
}
