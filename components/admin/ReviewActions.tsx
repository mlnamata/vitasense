"use client";

import { useActionState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { moderateReview } from "@/app/actions/admin";
import type { FormState } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };

export default function ReviewActions({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState(moderateReview, initialState);
  const hidden = state.values?.decision === "hide";

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <span
        className={
          hidden
            ? "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-200"
            : "rounded-full bg-sage-50 px-2.5 py-1 text-xs font-semibold text-sage-800 ring-1 ring-inset ring-sage-200"
        }
      >
        {hidden ? "Skrytá" : "Zveřejněná"}
      </span>
      <button
        type="submit"
        name="decision"
        value={hidden ? "publish" : "hide"}
        disabled={pending}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-900/10 transition hover:bg-slate-900/[0.04] disabled:opacity-50"
      >
        {hidden ? <Eye className="size-4" aria-hidden="true" /> : <EyeOff className="size-4" aria-hidden="true" />}
        {hidden ? "Zveřejnit" : "Skrýt"}
      </button>
      {state.status !== "idle" && (
        <span role="status" className="basis-full text-xs text-slate-500">
          {state.message}
        </span>
      )}
    </form>
  );
}
