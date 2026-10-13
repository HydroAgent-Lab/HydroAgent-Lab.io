import { PaperDigestPageContent } from "@/components/pages/paper-digest";

export const metadata = {
  title: "Paper Digest | HydroAgent-Lab",
  description: "每天抓取最新 AI 大模型论文，由 AI 提取要点、生成摘要，通过邮件推送给订阅者。"
};

export default function PaperDigestZhPage() {
  return <PaperDigestPageContent lang="zh" />;
}
