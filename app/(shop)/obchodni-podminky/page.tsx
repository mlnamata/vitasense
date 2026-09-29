import type { Metadata } from "next";
import LegalPage from "@/components/content/LegalPage";
import { TERMS } from "@/lib/legal";

export const metadata: Metadata = {
  title: TERMS.title,
  description: TERMS.description,
};

export default function Page() {
  return <LegalPage doc={TERMS} />;
}
