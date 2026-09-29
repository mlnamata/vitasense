import { cn } from "@/lib/cn";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  className?: string;
};

const control =
  "w-full rounded-2xl bg-white px-4 text-base text-slate-900 ring-1 ring-inset ring-slate-900/10 transition duration-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sage-600 aria-invalid:ring-2 aria-invalid:ring-red-400";

function Message({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={id} className="text-sm font-medium text-red-700">
        {error}
      </p>
    );
  }
  return hint ? (
    <p id={id} className="text-sm text-slate-500">
      {hint}
    </p>
  ) : null;
}

/* 16px text keeps iOS Safari from zooming in on focus. */
export function TextField({
  label,
  name,
  error,
  hint,
  className,
  ...input
}: BaseProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">) {
  const id = input.id ?? `field-${name}`;
  const messageId = `${id}-message`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        {...input}
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={cn(control, "h-14")}
      />
      <Message id={messageId} error={error} hint={hint} />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  hint,
  className,
  ...textarea
}: BaseProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  const id = textarea.id ?? `field-${name}`;
  const messageId = `${id}-message`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <textarea
        rows={4}
        {...textarea}
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={cn(control, "min-h-28 py-3.5 leading-relaxed")}
      />
      <Message id={messageId} error={error} hint={hint} />
    </div>
  );
}
