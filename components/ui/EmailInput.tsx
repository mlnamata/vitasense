import { cn } from "@/lib/cn";

type Props = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
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
        className="h-14 w-full rounded-2xl bg-cream px-5 text-base text-slate-900 ring-1 ring-inset ring-slate-900/10 transition duration-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sage-600 aria-invalid:ring-red-400"
      />
    </div>
  );
}
