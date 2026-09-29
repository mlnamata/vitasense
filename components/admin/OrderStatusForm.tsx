"use client";

import { useActionState } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { updateOrderStatus } from "@/app/actions/admin";
import { buttonClass } from "@/components/ui/button";
import { SelectField } from "@/components/ui/TextField";
import { ORDER_STATUS_LABELS } from "@/lib/content";
import type { FormState, OrderStatus } from "@/lib/types";

const initialState: FormState = { status: "idle", message: "" };
const OPTIONS = Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({ value, label }));

export default function OrderStatusForm({ number, status }: { number: string; status: OrderStatus }) {
  const [state, formAction, pending] = useActionState(updateOrderStatus, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="number" value={number} />
      <SelectField label="Stav objednávky" name="status" options={OPTIONS} defaultValue={status} />
      <button type="submit" disabled={pending} className={buttonClass({ size: "md", className: "w-full" })}>
        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
        Uložit stav
      </button>
      {state.status !== "idle" && (
        <p
          role="status"
          className={
            state.status === "success"
              ? "flex items-start gap-2 text-sm text-sage-800"
              : "text-sm font-medium text-red-700"
          }
        >
          {state.status === "success" && <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
          {state.message}
        </p>
      )}
    </form>
  );
}
