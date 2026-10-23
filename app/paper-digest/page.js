import { PaperDigestPageContent } from "@/components/pages/paper-digest";

export const metadata = {
  title: "Paper Digest | HydroAgent-Lab",
  description:
    "New papers on large language models in hydrology and water resources, screened and summarized by AI every day, with a daily email digest."
};

export default function PaperDigestPage() {
  return <PaperDigestPageContent lang="en" />;
}
