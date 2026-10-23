import { PaperDigestPageContent } from "@/components/pages/paper-digest";

export const metadata = {
  title: "Paper Digest | HydroAgent-Lab",
  description: "水利 × 大模型领域的新文献：每天由 AI 筛选并生成摘要，并通过邮件推送给订阅者。"
};

export default function PaperDigestZhPage() {
  return <PaperDigestPageContent lang="zh" />;
}
