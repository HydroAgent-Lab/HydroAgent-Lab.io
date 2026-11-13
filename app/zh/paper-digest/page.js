import { PaperDigestPageContent, paperDigestMetadata } from "@/components/pages/paper-digest";

export const metadata = paperDigestMetadata("zh");

export default function PaperDigestZhPage() {
  return <PaperDigestPageContent lang="zh" />;
}
