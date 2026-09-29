import type { Metadata } from "next";
import LegalPage from "@/components/content/LegalPage";
import { PRIVACY } from "@/lib/legal";

export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.description,
};

export default function Page() {
  return <LegalPage doc={PRIVACY} />;
}
