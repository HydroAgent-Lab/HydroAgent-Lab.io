import { PaperDigestPageContent, paperDigestMetadata } from "@/components/pages/paper-digest";

export const metadata = paperDigestMetadata("en");

export default function PaperDigestPage() {
  return <PaperDigestPageContent lang="en" />;
}
