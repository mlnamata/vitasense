import type { Metadata } from "next";
import LegalPage from "@/components/content/LegalPage";
import { RETURNS } from "@/lib/legal";

export const metadata: Metadata = {
  title: RETURNS.title,
  description: RETURNS.description,
};

export default function Page() {
  return <LegalPage doc={RETURNS} />;
}
