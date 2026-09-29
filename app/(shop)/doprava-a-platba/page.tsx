import type { Metadata } from "next";
import LegalPage from "@/components/content/LegalPage";
import { SHIPPING } from "@/lib/legal";

export const metadata: Metadata = {
  title: SHIPPING.title,
  description: SHIPPING.description,
};

export default function Page() {
  return <LegalPage doc={SHIPPING} />;
}
