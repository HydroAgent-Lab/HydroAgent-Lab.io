import { PaperDigestPageContent } from "@/components/pages/paper-digest";

export const metadata = {
  title: "Paper Digest | HydroAgent-Lab",
  description:
    "A daily email digest of the latest papers on AI and large language models, extracted and summarized by AI."
};

export default function PaperDigestPage() {
  return <PaperDigestPageContent lang="en" />;
}
